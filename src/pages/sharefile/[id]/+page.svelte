<script>
  import QR from '@svelte-put/qr/svg/QR.svelte';
  import { copyText } from "svelte-copy";
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { shareLink } from "$lib/lib/utils.js";

  /** Icons & Assets */
  import Copy from "svelte-lucide/Copy.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import Telegram from "svelte-simples/Telegram.svelte";
  import Cube from "$lib/assets/images/cube-blue.svg";


  export let data;


  /** Copy now and go away */
  const copySonic = async (text, toastText) => {
    copyText(text).then(async () => {
      await goto("/myfiles");
      toast.success(toastText);
    });
  }
</script>

<main class="flex-1 px-3 items-center text-center mt-4">
  <h1 class="font-bold text-xl break-all px-1">{data.name}</h1>

  <div class="flex flex-col mb-8 mt-4 items-center">
    <QR
      data={data.url}
      logo={Cube}
      logoRatio={1.1}
      shape="circle"
      let:attributes
      let:innerHTML
    >
      <svg {...attributes} class="w-64 w-64 neutral-content dark:text-white">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html innerHTML}
      </svg>
    </QR>
  </div>

  <div class="flex flex-col w-full justify-start items-end gap-y-2 px-2">
    <button class="btn btn-info btn-block" on:click={() => shareLink(data.url, `SEALED FILE: ` + data.name)}>
      <Telegram class="h-6 w-6" /> Share in Telegram
    </button>
    <button class="btn btn-neutral btn-block"><Share2 class="h-5 w-5" />Share in other app</button>
    <button class="btn btn-block" on:click={() => copySonic(data.url, `File URL copied`)}>
      <Copy class="h-5 w-5" />Copy file link (URL)
    </button>

  </div>
</main>
