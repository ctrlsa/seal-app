<script>
  import File from "svelte-tabler/File.svelte";
  import FileTypePdf from "svelte-tabler/FileTypePdf.svelte";

  export let mimeType = "";
  export let url = "";
  export let alt = "";
</script>

{#if mimeType.startsWith("image/gif")}
  <img class="object-cover w-24 h-24 rounded-xl" src="{url}" alt="{alt}">
{:else if mimeType.startsWith("image/")}
  <img class="object-cover w-24 h-24 rounded-xl" src="{url}?h=192&w=192" alt="{alt}">
{:else if mimeType.startsWith("application/pdf")}
  <div class="flex w-24 h-24 rounded-xl bg-base-300 justify-center items-center">
    <FileTypePdf size={48} strokeWidth={1.5} class="w-20 h-20 shrink-0 text-error" />
  </div>
{:else}
  <div class="flex w-24 h-24 rounded-xl bg-base-300 justify-center items-center">
    <File size={48} strokeWidth={1.5} class="w-20 h-20 shrink-0" />
  </div>
{/if}