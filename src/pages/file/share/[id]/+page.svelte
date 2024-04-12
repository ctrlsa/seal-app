<script>
  import WebApp from "@twa-dev/sdk";
  import { copyText } from "svelte-copy";
  import toast from "svelte-french-toast";

  /** Assets */
  import Copy from "svelte-lucide/Copy.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import Telegram from "svelte-simples/Telegram.svelte";
  import QR from "@svelte-put/qr/svg/QR.svelte";
  import Cube from "$lib/assets/images/cube-blue.svg";

  /** Components */
  import Navbar from "$widgets/navbar.svelte";

  import { goto } from "$app/navigation";
  import { shareLink } from "$lib/lib/link";
  import { analytics } from "$lib/lib/analytics/analytics.js";


  export let data;

  const copiedMessage = "File URL copied";

  /** Copy it and go away */
  const copySonic = async (text, toastText, goBack = true) => {
    copyText(text).then(() => {
      analytics.capture("file_shared", { via: "clipboard" });

      toast.success(toastText);

      if (goBack) {
        WebApp.BackButton.hide();
        goto("/myfiles", { replaceState: true });
      }
    });
  }
</script>

<div class="flex flex-col h-screen">
  <Navbar>Share file</Navbar>

  <main class="flex-1 px-3 items-center text-center mt-4">
    <button class="font-bold text-xl break-all px-1"
            on:click={() => copySonic(data.url, copiedMessage, false)}>{data.name}</button>

    <div class="flex flex-col mb-8 mt-4 items-center">
      <div role="button" tabindex="0" class="bg-white p-2 rounded-lg"
           on:click={() => copySonic(data.url, copiedMessage, false)}
           on:keypress={() => copySonic(data.url, copiedMessage, false)}
      >
        <QR
          data={data.url}
          logo={Cube}
          logoRatio={1.1}
          shape="circle"
          let:attributes
          let:innerHTML
        >
          <svg {...attributes} class="w-52 h-52 text-black rounded-box">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html innerHTML}
          </svg>
        </QR>
      </div>
    </div>

    <div class="flex flex-col w-full justify-start items-end gap-y-2 px-2">
      <button class="btn btn-info btn-block"
              on:click={() => shareLink(data.url, `SEALED FILE: ` + data.name)}
      >
        <Telegram class="h-6 w-6" /> Share in Telegram
      </button>
      <button class="btn btn-neutral btn-block"
              on:click={() => { toast("Not yet implemented...", {icon: "🌚"}); }}
      >
        <Share2 class="h-5 w-5" />Share in other app
      </button>
      <button class="btn btn-block"
              on:click={() => copySonic(data.url, copiedMessage)}
      >
        <Copy class="h-5 w-5" />Copy file link (URL)
      </button>
    </div>
  </main>
</div>