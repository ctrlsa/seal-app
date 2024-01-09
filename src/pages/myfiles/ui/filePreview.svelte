<script>
  import File from "svelte-tabler/File.svelte";
  import FileTypePdf from "svelte-tabler/FileTypePdf.svelte";

  import { IMAGE_PREVIEW_SIZE } from "$lib/lib/constants";

  export let mimeType = "";
  export let url = "";
  export let alt = "";
  export let previewClass = "w-24 h-24 object-cover rounded-xl";
  export let iconWrapperClass = "w-24 h-24 bg-base-300 flex rounded-xl justify-center items-center";
  export let iconClass = "w-20 h-20 shrink-0";
</script>

{#if mimeType.startsWith("image/gif")}
  <img class={previewClass} src={url} alt={alt}>
{:else if mimeType.startsWith("image/") && !url.startsWith("blob:")}
  <img class={previewClass} src="{url}?h={IMAGE_PREVIEW_SIZE}&w={IMAGE_PREVIEW_SIZE}" alt={alt}>
{:else if mimeType.startsWith("image/") && url.startsWith("blob:")}
  <img class={previewClass} src={url} alt="{alt}">
{:else if mimeType.startsWith("application/pdf")}
  <div class={iconWrapperClass}>
    <FileTypePdf size={48} strokeWidth={1.5} class="{iconClass} text-error" />
  </div>
{:else}
  <div class={iconWrapperClass}>
    <File size={48} strokeWidth={1.5} class={iconClass} />
  </div>
{/if}