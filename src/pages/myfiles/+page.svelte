<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { liveQuery } from "dexie";
  import { filesize } from "filesize";
  import toast from "svelte-french-toast";
  import WebApp from "@twa-dev/sdk";
  import { upload, getBalance } from "@lighthouse-web3/sdk";
  import { inview } from "svelte-inview";
  import InfiniteLoading from "svelte-infinite-loading";
  import "@vime/core/themes/default.css";
  import { goto } from "$app/navigation";

  /** Icons */
  import ArrowDownWideNarrow from "svelte-lucide/ArrowDownWideNarrow.svelte";
  import ExternalLink from "svelte-lucide/ExternalLink.svelte";
  import Plus from "svelte-lucide/Plus.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import XCircle from "svelte-lucide/XCircle.svelte";
  import MoreVertical from "svelte-lucide/MoreVertical.svelte";
  import Search from "svelte-lucide/Search.svelte";

  /** Lib imports */
  import { analytics } from "$lib/lib/analytics/analytics.js";
  import { ITEMS_PER_PAGE } from "$lib/lib/config";
  import { db } from "$lib/lib/db";
  import { nanoid } from "$lib/lib/nanoid";
  import { state } from "$lib/lib/stores/state";
  import { getUploadsCount, sync } from "$lib/lib/storageProvider/sync.js";
  import { openLink } from "$lib/lib/link";
  import { uploadStatus } from "$lib/lib/enums/uploadStatus";

  /** Component imports */
  import FilePreview from "./ui/filePreview.svelte";
  import StackedListItem from "$shared/ui/list/stackedItem.svelte";
  import UploadButton from "$shared/ui/button/upload.svelte";
  import Action from "$lib/ui/modal/action.svelte";



  // Storage provider main data
  const storageProviderID = state.account.storage.provider.id;
  const storageProviderProtocol = state.account.storage.provider.protocol;
  const storageProviderGatewayUrl = state.account.storage.provider.gatewayUrl;
  const storageProviderApiKey = state.account.storage.provider.apiKey;

  // Files array
  let files;

  // Search, sorting, pagination
  let searchBoxVisible = false;
  let searchQuery = "";
  let orderBy = "created";
  let orderByDesc = true;
  let page = 1;

  // File list element binding, vertical scroll position, scroll direction
  let fileListElement;
  let fileListElementY = 0;
  let fileListElementScrollDirection;

  // Remove dialog
  let modalOrderBy;

  // InView indicator
  let isInView;

  // InView options to set the root element
  let inViewOptionsScroll = {
    root: fileListElement,
    rootMargin: "50px"
  };
  let inViewOptionsImage = {
    rootMargin: "50px",
    unobserveOnEnter: true
  };

  // Single file upload progress
  let uploadProgress = 0;
  let uploadedData = 0;
  let totalData = 0;

  // Wallet public key
  $: walletPublicKey = state.wallet.publicKey;

  // Upload button visible/hidden state
  $: uploadButtonVisible = fileListElementY < 100 || fileListElementScrollDirection === "down";
  // Items offset for the files table query of a IndexedDB
  $: offset = ITEMS_PER_PAGE * (page-1);

  // Single file upload progress
  $: if (uploadedData > 0) {
    console.log(uploadedData);
    console.log(totalData);

    uploadProgress = Number(((100 * uploadedData)/totalData).toFixed(0));

    console.log(uploadProgress);
  }


  onMount(() => {
    db.files.count().then(async function (results) {
      //console.log(results);

      if (results === 0) {
        const uploadsCount = await getUploadsCount(storageProviderApiKey);
        //console.log(uploadsCount);

        if (uploadsCount > 0) {
          const sfPromise = sync(storageProviderApiKey);

          await toast.promise(sfPromise, {
            loading: "Syncing file list",
            success: "File list was synchronized",
            error: "Could not synchronize file list"
          });
        }
      }
    });

    updateStorageInfo();
  });

  const inviewHandleScroll = (event) => {
    const { inView, entry, scrollDirection, observer, node } = event.detail;

    fileListElementY = fileListElement.scrollTop;
    fileListElementScrollDirection = scrollDirection.vertical;
  }

  const inviewHandleLazyLoad = (event) => {
    const { inView } = event.detail;

    isInView = inView;
  }

  const handleFileInputChange = async (event) => {
    let filesToUpload = [];

    WebApp.enableClosingConfirmation();
    //console.log(event.target.files,

    // Add files to the database
    for (const file of event.target.files) {
      const id = nanoid();
      const dateNow = Date.now();

      const newFile = {
        id: id,
        cid: id,
        pid: id,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        status: uploadStatus.PENDING,
        encryption: false,
        created: dateNow,
        updated: dateNow,
        protocol: storageProviderProtocol,
        storageProvider: storageProviderID,
        txHash: undefined,
        publicKey: undefined,
        url: URL.createObjectURL(file)
      };

      filesToUpload.push(newFile);

      // Add files to DB
      try {
        await db.files.add(newFile);
      } catch (e) {
        console.log(e);
      }
    }

    for (let i = 0; i < filesToUpload.length; i++) {
      try {
        await db.files.update(filesToUpload[i].id, {
          "status": uploadStatus.UPLOADING
        });

        const uploadResponse = await uploadFile([event.target.files.item(i)], storageProviderApiKey);

        try {
          await db.files.update(filesToUpload[i].id, {
            cid: uploadResponse.Hash,
            size: uploadResponse.Size,
            status: uploadStatus.QUEUED,
            updated: Date.now(),
            url: storageProviderGatewayUrl + uploadResponse.Hash
          });

          state.account.storage.info.used = state.account.storage.info.used + filesToUpload[i].size;

          analytics.capture("file_uploaded", {
            filetype: filesToUpload[i].mimeType,
            storage_protocol: filesToUpload[i].protocol,
            storage_provider: filesToUpload[i].storageProvider
          });
        } catch (e) {
          await db.files.update(filesToUpload[i].id, {
            "status": uploadStatus.FAILED
          });

          analytics.capture("file_upload_failed", {
            filetype: filesToUpload[i].mimeType,
            storage_protocol: filesToUpload[i].protocol,
            storage_provider: filesToUpload[i].storageProvider
          });

          console.error(e);
        }
      } catch (e) {
        await db.files.update(filesToUpload[i].id, {
          "status": uploadStatus.FAILED
        });

        console.error(e);
      }
    }

    WebApp.disableClosingConfirmation();
  };

  const progressCallback = (progressData) => {
    uploadedData = progressData.uploaded;
    totalData = progressData.total;
  };

  async function uploadFile(file, apiKey) {
    uploadProgress = 0;

    const output = await upload(file, apiKey, false, null, progressCallback);

    if (output.data && output.data.Hash) {
      return output.data;
    }

    return output;
  }

  const setStatus = async (id, status) => {
    try {
      await db.files.update(id, {
        "status": status
      });
    } catch (e) {
      console.error(e);
    }
  }

  const removeFile = async (id) => {
    try {
      await db.files.delete(id);
      toast.success("File removed");
    } catch (e) {
      console.error(e);
    }
  }

  const updateStorageInfo = async() => {
    state.account.storage.info = { used: 0, limit: 0 };

    const balance =  await getBalance(walletPublicKey);

    if (balance) {
      state.account.storage.info = {
        used: balance.data.dataUsed,
        limit: balance.data.dataLimit
      };
    }
  }

  $: files = liveQuery(async () => {
    let filter;

    if (searchQuery.length === 46) {
      filter = file => file.cid.startsWith(searchQuery);
    } else if (searchQuery.startsWith(".")) {
        filter = file => file.name.toLowerCase().endsWith(searchQuery.toLowerCase());
    } else {
      filter = file => file.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    }

    // Get filtered files collection
    let collection;

    if (orderByDesc) {
      collection =
        db.files
          .orderBy(orderBy)
          .reverse()
          .filter(filter);
    } else {
      collection =
        db.files
          .orderBy(orderBy)
          .filter(filter);
    }

    // Get all files
    let allFiles = await db.files.toArray();

    for (const file of allFiles) {
      if (file.status === uploadStatus.DELETED) {
        await removeFile(file.id);
      }
    }

    // Return a paged result
    return await collection
      .offset(offset)
      .limit(ITEMS_PER_PAGE)
      .toArray();
  });
</script>

{#if uploadButtonVisible}
  <UploadButton on:change={handleFileInputChange}>
    <Plus class="h-8 w-8 text-white" />
  </UploadButton>
{/if}

<div class="flex-none px-2">
  <div class="flex bg-base-300 rounded-lg py-1 px-1.5 pr-1 w-full items-center">
    <div class="flex-1 pl-1.5">
      {#if searchBoxVisible}
        <input type="text" placeholder="Search" class="input input-bordered input-sm w-full"
               bind:value={searchQuery} in:slide={{ delay: 100, axis: 'x', easing: quintOut }}
        />
      {:else}
        <div class="flex w-full" role="button" tabindex="0"
             in:slide={{ delay: 100, easing: quintOut }}
             on:click={updateStorageInfo} on:keypress={updateStorageInfo}
        >
          {#if state.account.storage.info.used === 0 && state.account.storage.info.limit === 0}
            <span class="loading loading-infinity loading-md"></span>
          {:else}
            <p class="flex-none">
              <strong>{filesize(state.account.storage.info.used, { round: 1 })}</strong> of { filesize(state.account.storage.info.limit, { round: 1 }) } used
            </p>
          {/if}
        </div>
      {/if}
    </div>
    <div class="flex justify-end">
      <div class="flex items-stretch">
        <button class="btn btn-ghost px-2.5 py-2 ml-1.5 mr-1" on:click={() => (searchBoxVisible = !searchBoxVisible)}>
          <Search class="h-6 w-6" />
        </button>
        <button class="btn btn-ghost px-2.5 py-2" on:click={() => { modalOrderBy.showModal(); }}>
          <ArrowDownWideNarrow class="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</div>

<ul role="list" class="flex-1 divide-y divide-neutral-900 w-full list-none overflow-y-scroll overscroll-none px-2" bind:this={fileListElement}>
  {#if $files}
    {#each $files as currentFile, index (currentFile.id)}
      {@const { id, cid, pid, name, size, mimeType, status, encryption, created, updated, protocol, storageProvider, txHash, publicKey, url } = currentFile }

      <StackedListItem>
        <div class="flex w-full gap-x-3">
          <div role="button" tabindex="0" class="flex-none w-24 h-24 shrink-0 grow-0"
               on:click={() => goto("/file/details/" + id)}
               on:keypress={() => goto("/file/details/" + id)}
          >
            <FilePreview mimeType={mimeType} url={url} alt="" />
          </div>

          <div class="flex flex-1 flex-col w-16">
            <div class="flex w-full">
              <p class="truncate text-ellipsis overflow-hidden text-base whitespace-nowrap font-semibold">{name}</p>
            </div>

            <div class="flex flex-1 w-full h-5">
              {#if status === uploadStatus.PENDING}
                <span class="loading loading-ring loading-sm"></span>
              {:else if status === uploadStatus.UPLOADING}
                <progress class="progress w-full" value="{uploadProgress}" max="100"></progress>
              {:else if status === uploadStatus.FAILED}
                <div class="badge badge-error badge-outline mt-1">Upload error</div>
              {:else if status === uploadStatus.QUEUED || status === uploadStatus.STORED}
                <p class="truncate text-ellipsis overflow-hidden text-xs text-gray-500 whitespace-nowrap leading-5 mt-1">
                  CID: {cid}
                </p>
              {/if}
            </div>

            <div class="flex grow w-full justify-end items-end gap-x-1.5">
              {#if status === uploadStatus.QUEUED || status === uploadStatus.STORED}
                <button class="btn btn-sm btn-neutral" on:click={() => openLink(url)}>
                  <ExternalLink class="h-4 w-4" />Open
                </button>
                <button class="btn btn-sm btn-neutral" on:click={() => goto("/file/share/" + id)}>
                  <Share2 class="h-4 w-4" />Share
                </button>
                <button class="btn btn-sm btn-neutral"
                        on:click={() => goto("/file/details/" + id)}
                        on:keypress={() => goto("/file/details/" + id)}
                >
                  <MoreVertical class="h-4 w-4" />
                </button>
              {:else}
                {#if status === uploadStatus.PENDING || status === uploadStatus.UPLOADING}
                  <button class="btn btn-neutral btn-sm" on:click={() => setStatus(id, uploadStatus.DELETED)}>
                    <XCircle class="h-4 w-4" />Cancel
                  </button>
                {:else if status === uploadStatus.FAILED}
                  <button class="btn btn-sm btn-error" on:click={() => removeFile(id)}>
                    <XCircle class="h-4 w-4" />Delete
                  </button>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </StackedListItem>
    {/each}
  {:else}
    <StackedListItem>
      <p class="mt-1">Use the <kbd class="kbd">+</kbd> button on the bottom right to upload a file</p>
    </StackedListItem>
  {/if}
</ul>

<Action bind:dialogAction={modalOrderBy}>
  <span slot="title">Sort by</span>

  <div slot="buttons" class="flex flex-col w-full justify-start items-stretch gap-y-1.5">
    <div class="form-control" tabindex="-1">
      <label class="label cursor-pointer">
        <span class="label-text">Name</span>
        <input
          type="radio" value="name" class="radio ml-2 checked:bg-primary"
          bind:group={orderBy} on:click={() => { orderByDesc = !orderByDesc; modalOrderBy.close(); }} checked />
      </label>
    </div>
    <div class="form-control" tabindex="-1">
      <label class="label cursor-pointer">
        <span class="label-text">Uploaded</span>
        <input
          type="radio" value="created" class="radio ml-2 checked:bg-primary"
          bind:group={orderBy} on:click={() => { orderByDesc = !orderByDesc; modalOrderBy.close(); }} checked />
      </label>
    </div>
  </div>
</Action>
