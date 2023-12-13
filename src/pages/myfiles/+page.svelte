<script>
  import { onMount } from "svelte";
  import { copy } from "svelte-copy";
  import { liveQuery } from "dexie";
  import { inview } from "svelte-inview";
  import { upload } from "@lighthouse-web3/sdk";
  import toast, { Toaster } from "svelte-french-toast";
  import InfiniteLoading from "svelte-infinite-loading";

  /** Icons */
  import ArrowDownWideNarrow from "svelte-lucide/ArrowDownWideNarrow.svelte";
  import Info from "svelte-lucide/Info.svelte";
  import Plus from "svelte-lucide/Plus.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import XCircle from "svelte-lucide/XCircle.svelte";
  import File from "svelte-tabler/File.svelte";
  import FileTypePdf from "svelte-tabler/FileTypePdf.svelte";

  import { db } from "$shared/lib/db";
  import { nanoid } from "$shared/lib/nanoid";
  import { ITEMS_PER_PAGE } from "$lib/lib/constants";
  import { storageProvider } from "$shared/lib/stores";
  import { UploadStatus } from "$shared/lib/enums/uploadStatus";
  import { getUploadsCount, syncUploads } from "$lib/lib/storageProvider/syncUploads";

  import StackedList from "$lib/ui/list/stacked.svelte";
  import StackedListItem from "$lib/ui/list/stackedItem.svelte";
  import UploadButton from "$lib/ui/button/upload.svelte";
  import ModalConfirm from "$lib/ui/modal/modal.svelte";


  // Storage provider main data
  const storageProviderName = $storageProvider.name;
  const storageProviderProtocol = $storageProvider.protocol;
  const storageProviderGatewayUrl = $storageProvider.gatewayUrl;
  const storageProviderApiKey = $storageProvider.apiKey;

  let files;

  // Pagination:
  let page = 1;

  // Query parameters:
  let searchQuery = "";
  let orderBy = "created";

  // Single file upload progress
  let uploadProgress = 0;

  // SortBy dropdown list open/close state
  let dropdownSortOpen = false;

  // File list element binding, vertical scroll position, scroll direction
  let fileListElement;
  let fileListElementY = 0;
  let fileListElementScrollDirection;

  // InView options to set the root element
  let inViewOptions = {
    root: fileListElement
  };

  // Upload button visible/hidden state
  $: uploadButtonVisible = fileListElementY < 100 || fileListElementScrollDirection === "down";
  // Items offset for the files table query of a IndexedDB
  $: offset = ITEMS_PER_PAGE * (page-1);


  onMount(() => {
    db.files.count().then(async function (results) {
      //console.log(results);

      if (results === 0) {
        const uploadsCount = await getUploadsCount(storageProviderApiKey);
        //console.log(uploadsCount);

        if (uploadsCount > 0) {
          const sfPromise = syncUploads(storageProviderApiKey);

          await toast.promise(sfPromise, {
            loading: "Syncing file list",
            success: "File list was synchronized",
            error: "Could not synchronize file list"
          });
        }
      }
    });
  });

  const handleFileInputChange = async (event) => {
    let filesToUpload = [];

    //console.log(event.target.files);

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
        status: UploadStatus.PENDING,
        encryption: false,
        created: dateNow,
        updated: dateNow,
        protocol: storageProviderProtocol,
        storageProvider: storageProviderName,
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
          "status": UploadStatus.UPLOADING
        });

        const uploadResponse = await uploadFile([event.target.files.item(i)], storageProviderApiKey);

        try {
          await db.files.update(filesToUpload[i].id, {
            cid: uploadResponse.Hash,
            size: uploadResponse.Size,
            status: UploadStatus.QUEUED,
            updated: Date.now(),
            url: storageProviderGatewayUrl + uploadResponse.Hash
          });
        } catch (e) {
          await db.files.update(filesToUpload[i].id, {
            "status": UploadStatus.FAILED
          });

          console.error(e);
        }
      } catch (e) {
        await db.files.update(filesToUpload[i].id, {
          "status": UploadStatus.FAILED
        });

        console.error(e);
      }
    }
  };

  const progressCallback = (progressData) => {
    uploadProgress = ((100 * progressData?.uploaded) / progressData?.total)?.toFixed(0);
    console.log(uploadProgress);
  };

  async function uploadFile(file, apiKey) {
    console.log("Upload started...");

    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await upload(file, apiKey, false, null, progressCallback);

    uploadProgress = 0;
    //console.log(output.data);

    if (output.data && output.data.Hash) {
      return output.data;
    }

    return output;
  }

  const deleteFile = async (id) => {
    //confirmDelete.showModal();

    try {
      await db.files.delete(id);
      toast.success("File deleted");
    } catch (e) {
      console.error(e);
    }
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

  $: files = liveQuery(async () => {
    let filter;

    if (searchQuery.length !== 46) {
      filter = file => file.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    } else {
      filter = file => file.cid.startsWith(searchQuery);
    }

    // Get filtered files collection
    let collection =
      db.files
        .orderBy(orderBy)
        .reverse()
        .filter(filter);

    // Get all files
    let allFiles = await db.files.toArray();

    for (const file of allFiles) {
      if (file.status === UploadStatus.DELETED) {
        await deleteFile(file.id);
      }
    }

    // Return a paged result
    return await collection
      .offset(offset)
      .limit(ITEMS_PER_PAGE)
      .toArray();
  });
</script>

<div class="px-2 sticky top-16 z-10">
  <div class="navbar bg-base-300 rounded-box">
    <div class="flex-1 pl-2">
      <input type="text" placeholder="Search" bind:value={searchQuery} class="input input-bordered input-sm w-full"/>
    </div>
    <div class="flex justify-end">
      <div class="flex items-stretch">
        <details class="dropdown dropdown-end" open={dropdownSortOpen}>
          <summary
            tabindex="0" role="button" class="btn btn-ghost"
            on:click|preventDefault={() => {dropdownSortOpen = !dropdownSortOpen}}
            on:keyup|preventDefault={() => {dropdownSortOpen = !dropdownSortOpen}}
          >
            <ArrowDownWideNarrow class="h-6 w-6" />
          </summary>
          <div tabindex="-1" id="dropdownSort" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box mt-4">
            <div tabindex="-1" class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Name</span>
                <input
                  type="radio" value="name" class="radio ml-2 checked:bg-primary"
                  bind:group={orderBy} on:click={() => {dropdownSortOpen = false}} checked />
              </label>
            </div>
            <div tabindex="-1" class="form-control" on:focusout={() => {dropdownSortOpen = false}}>
              <label class="label cursor-pointer">
                <span class="label-text">Uploaded</span>
                <input
                  type="radio" bind:group={orderBy} on:click={() => {dropdownSortOpen = false}} value="created" class="radio ml-2 checked:bg-primary" checked />
              </label>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>

<main class="flex-1 overflow-y-scroll px-3"
      bind:this={fileListElement}
>
  <StackedList>
    {#if $files}
      {#each $files as currentFile (currentFile.id)}
        {@const { id, cid, pid, name, size, mimeType, status, encryption, created, updated, protocol, storageProvider, txHash, publicKey, url } = currentFile }

        <StackedListItem>
          <div class="flex w-full gap-x-3">
            <div class="flex-none w-24 h-24 shrink-0 grow-0">
              {#if mimeType.startsWith("image/gif")}
                <img class="object-cover w-24 h-24 rounded-xl" src="{url}" alt="{name}">
              {:else if mimeType.startsWith("image/")}
                <img class="object-cover w-24 h-24 rounded-xl" src="{url}?h=256&w=256" alt="{name}">
              {:else if mimeType.startsWith("application/pdf")}
                <div class="flex w-24 h-24 rounded-xl bg-base-300 justify-center items-center">
                  <FileTypePdf size={48} strokeWidth={1.5} class="w-20 h-20 shrink-0 text-error" />
                </div>
              {:else}
                <div class="flex w-24 h-24 rounded-xl bg-base-300 justify-center items-center">
                  <File size={48} strokeWidth={1.5} class="w-20 h-20 shrink-0" />
                </div>
              {/if}
            </div>

            <div class="flex flex-1 flex-col w-16">
              <div class="flex w-full"
                   use:inview={inViewOptions}
                   on:inview_change={(event) => {
                     const { inView, entry, scrollDirection, observer, node} = event.detail;
                      fileListElementY = fileListElement.scrollTop;
                      fileListElementScrollDirection = scrollDirection.vertical;
              }}>
                <p
                  class="truncate text-ellipsis overflow-hidden text-base whitespace-nowrap font-semibold"
                  use:copy={url} on:svelte-copy="{() => toast.success(`File URL copied`)}">
                  {name}
                </p>
              </div>

              <div class="flex flex-1 w-full h-5">
                {#if status === UploadStatus.PENDING}
                  <span class="loading loading-ring loading-sm"></span>
                {:else if status === UploadStatus.UPLOADING}
                  <progress class="progress w-full" value="{uploadProgress}" max="100"></progress>
                {:else if status === UploadStatus.FAILED}
                  <div class="badge badge-error badge-outline mt-1">Upload error</div>
                {:else if status === UploadStatus.QUEUED || status === UploadStatus.STORED}
                  <p
                    class="truncate text-ellipsis overflow-hidden text-xs text-gray-500 whitespace-nowrap leading-5 mt-1"
                    use:copy={cid} on:svelte-copy="{() => toast.success("CID copied")}"
                  >
                    CID: {cid}
                  </p>
                {/if}
              </div>

              <div class="flex w-full grow justify-end items-end gap-x-2">
                {#if status === UploadStatus.QUEUED || status === UploadStatus.STORED}
                  <button class="btn btn-sm btn-ghost">
                    <Info class="h-4 w-4" />
                  </button>
                  <button
                    class="btn btn-sm btn-neutral"
                    use:copy={url} on:svelte-copy="{() => toast.success(`File URL copied`)}">
                    <Share2 class="h-4 w-4" />Share
                  </button>
                  <button class="btn btn-sm btn-error" on:click={deleteFile(id)}>
                    <XCircle class="h-4 w-4" />
                  </button>
                {:else}
                  {#if status === UploadStatus.PENDING || status === UploadStatus.UPLOADING}
                    <button class="btn btn-neutral btn-sm" on:click={setStatus(id, UploadStatus.DELETED)}><XCircle class="h-4 w-4" />Cancel</button>
                  {:else if status === UploadStatus.FAILED}
                    <button class="btn btn-sm btn-error" on:click={deleteFile(id)}>
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
  </StackedList>

  {#if uploadButtonVisible}
    <UploadButton on:change={handleFileInputChange}>
      <Plus class="h-8 w-8 text-white" />
    </UploadButton>
  {/if}

  <ModalConfirm id="confirmDelete">
    <h3 class="font-bold text-lg" slot="header">Delete file?</h3>
    <p>Confirm the file deletion</p>
    <div slot="footer">
      <button class="btn btn-error" on:click={() => confirmDelete.close(1)}>Delete</button>
      <button class="btn" on:click={() => confirmDelete.close()}>Cancel</button>
    </div>
  </ModalConfirm>
</main>
