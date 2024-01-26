<script>
  import "@vime/core/themes/default.css";

  import WebApp from "@twa-dev/sdk";
  import toast from "svelte-french-toast";
  import { copyText } from "svelte-copy";
  import {
    Player,
    Audio,
    Video,
    DefaultUi,
    DefaultControls
  } from "@vime/svelte";
  import { goto } from "$app/navigation";

  /** Lib imports */
  import { db } from "$lib/lib/db";
  import { openLink } from "$lib/lib/utils";
  import { uploadStatus } from "$lib/lib/enums/uploadStatus";

  /** Component imports */
  import Image from "$lib/ui/image.svelte";
  import Confirm from "$lib/ui/modal/confirm.svelte";

  /** Icons & Assets */
  import Copy from "svelte-lucide/Copy.svelte";
  import ExternalLink from "svelte-lucide/ExternalLink.svelte";
  import File from "svelte-tabler/File.svelte";
  import FileTypePdf from "svelte-tabler/FileTypePdf.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import XCircle from "svelte-lucide/XCircle.svelte";


  export let data;

  // Main
  let videoPlayer;
  let audioPlayer;
  let modalRemove;

  const IMAGE_PREVIEW_WIDTH = 960;
  const IMAGE_PREVIEW_HEIGHT = 640;
  const REDIRECT_ROUTE = "/myfiles";


  /** Copy it and go away */
  const copySonic = (text, toastText, goBack = true) => {
    copyText(text).then(() => {
      toast.success(toastText);

      if (goBack) {
        WebApp.BackButton.hide();
        goto(REDIRECT_ROUTE, { replaceState: true });
      }
    });
  }

  /** Remove file */
  const removeFile = async (id) => {
    try {
      await db.files.delete(id);
      toast.success("File removed");

      WebApp.BackButton.hide();
      goto(REDIRECT_ROUTE, { replaceState: true });
    } catch (e) {
      console.error(e);
    }
  }
</script>


<!-- File preview -->
<div class="flex-none w-full mb-2.5">
  <div class="mb-1.5">
    {#if data}
      {#if data?.mimeType.startsWith("image/gif")}
        <Image baseClass="w-full rounded-xl" class="max-h-[42vh] h-fit object-cover"
               src={data?.url} alt={data?.name} />
      {:else if data?.mimeType.startsWith("image/") && !data?.url.startsWith("blob:")}
        <Image baseClass="w-full rounded-xl" class="max-h-[42vh] h-fit" alt={data?.name}
               src="{data?.url}?h={IMAGE_PREVIEW_HEIGHT}&w={IMAGE_PREVIEW_WIDTH}" />
      {:else if data?.mimeType.startsWith("image/") && data?.url.startsWith("blob:")}
        <Image baseClass="w-full rounded-xl" class="max-h-[42vh] h-fit"
               src={data?.url} alt="" />
      {:else if data?.mimeType.startsWith("video/") && !data?.url.startsWith("blob:")}
        <Player class="w-full rounded-xl max-h-[42vh]" bind:this={videoPlayer}>
          <Video crossOrigin="" disablePictureInPicture>
            <source data-src="{data?.url}" type="{data?.mimeType}">
          </Video>

          <DefaultUi noControls noCaptions noPoster noSettings>
            <DefaultControls hideOnMouseLeave activeDuration="{1000}" />
          </DefaultUi>
        </Player>
      {:else if data?.mimeType.startsWith("audio/") && !data?.url.startsWith("blob:")}
        <Player class="w-full" bind:this={audioPlayer} controls>
          <Audio>
            <source data-src="{data?.url}" type="{data?.mimeType}">
          </Audio>
        </Player>
      {:else if data?.mimeType.startsWith("application/pdf")}
        <div class="flex w-20 h-20 rounded-xl bg-base-300 justify-center items-center">
          <FileTypePdf size={48} strokeWidth={1.5} class="w-16 h-16 shrink-0 text-error" />
        </div>
      {:else}
        <div class="flex w-20 h-20 rounded-xl bg-base-300 justify-center items-center">
          <File size={48} strokeWidth={1.5} class="w-16 h-16 shrink-0" />
        </div>
      {/if}
    {/if}
  </div>

  <div class="flex-none">
    <p class="align-middle break-all font-bold text-xl inline-block">{data.name}</p>
  </div>
</div>

<!-- File details -->
<div class="flex-1 w-full mb-5">
  <div class="divider mt-0 mb-2"></div>
  <div>
    {#if data?.status === uploadStatus.QUEUED}
      <div class="tooltip tooltip-warning tooltip-right" data-tip="File is queued for storing">
        <b>Status:</b> <span class="text-warning">Queued</span>
      </div>
    {:else if data?.status === uploadStatus.STORED}
      <div class="tooltip tooltip-success tooltip-right" data-tip="File stored">
        <b>Status:</b> <span class="text-success">Stored</span>
      </div>
    {/if}
  </div>
  <div>
    <b>Size:</b> {data.hrSize}
  </div>
  <div>
    <b>Type:</b> {data.fileType}
  </div>
  <div>
    {#if data.encryption }
      <b>Encrypted:</b> Yes
    {:else}
      <b>Encrypted:</b> No
    {/if}
  </div>
  <div>
    <b>Storage:</b> {data?.protocol}
  </div>
  <div>
    <b>Storage provider:</b> {data?.storageProvider}
  </div>
  <div>
    <b>Uploaded:</b> {data?.createdF}
  </div>
</div>

<!-- Actions -->
<div class="flex flex-col w-full justify-start items-end gap-y-1.5">
  <div class="flex flex-row gap-1.5 w-full">
    <button class="btn btn-neutral grow" on:click={() => openLink(data.url)}>
      <ExternalLink class="h-4 w-4" />Open
    </button>
    <button class="btn btn-neutral grow" on:click={() => copySonic(data.cid, `SHARE`)}>
      <Share2 class="h-4 w-4" />Share
    </button>
  </div>

  <div class="flex flex-row gap-1.5 w-full">
    <button class="btn btn-neutral grow" on:click={() => copySonic(data.cid, `CID copied`)}>
      <Copy class="h-4 w-4" />Copy CID
    </button>
    <button class="btn btn-neutral grow" on:click={() => copySonic(data.url, `File link copied`)}>
      <Copy class="h-4 w-4" />Copy Link
    </button>
  </div>

  <div class="flex flex-col w-full">
    <button class="btn btn-block btn-warning" on:click={() => { modalRemove.showModal(); }}>
      <XCircle class="h-4 w-4" />Remove File
    </button>
  </div>
</div>


<Confirm bind:dialogConfirm={modalRemove}>
  <div slot="message" class="text-lg align-middle text-center">
    <p class="font-bold text-xl mb-2">Remove file from list?</p>
    <p>Applies only to this device. It is not possible to delete the file from permanent storage</p>
  </div>
  <button slot="button-cancel" class="btn btn-block btn-neutral"
          on:click={() => { modalRemove.close(); }}> Cancel
  </button>
  <button slot="button-confirm" class="btn btn-block btn-warning"
          on:click={async () => { modalRemove.close(); await removeFile(data.id); }}> Remove
  </button>
</Confirm>
