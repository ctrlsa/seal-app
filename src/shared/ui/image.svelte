<script>
  import { twMerge } from "tailwind-merge";

  import ImgLoadingFailed from "$lib/assets/images/img-loading-failed.svg";


  export let src;
  export let alt;
  export let baseClass = "";

  let loaded = false;
  let loading = false;
  let failed = false;

  $: {
    //console.info("Fetching: " + alt);
    const img = new Image();

    loading = true;
    loaded = false;

    img.src = src;

    img.onload = () => {
      //console.log("Loaded: " + alt);
      loaded = true;
      loading = false;
      failed = false;
    };
    img.onerror = () => {
      failed = true;
      loading = false;
      loaded = false;
    };
  }
</script>

{#if loaded}
  <img src={src} alt={alt} class={twMerge(baseClass, $$props.class)} />
{:else if loading}
  <div class="skeleton h-48 {baseClass}"></div>
{:else if failed}
  <div class="flex bg-base-300 bg-no-repeat bg-origin-content justify-center items-end h-48 {baseClass}"
       style="background-size: 50% 50%; background-position: center 30%; background-image: url({ImgLoadingFailed});">
    <p class="mb-8">Failed to load image</p>
  </div>
{/if}
