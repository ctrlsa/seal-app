<script>
  import { twMerge } from "tailwind-merge";
  import { fly } from 'svelte/transition';

  import { browser } from "$lib/lib/stores/stores";


  export let value = "";
  export let files;
  export let defaultClass = "btn btn-primary btn-square text-center fixed rounded-[12px] shadow-md right-3 bottom-6 w-14 h-14 z-9";

  let fileInput;

  const flyAnimParams = { y: 150, duration: 390 };


  const multiple = $browser.platform.type === "desktop";

  function keydown(event) {
    if ([" ", "Enter"].includes(event.key)) {
      fileInput.click(event);
    }
  }

  function handleClick(event) {
    fileInput.click(event);
  }
</script>

<button type="button" tabindex="0" class={twMerge(defaultClass, $$props.class)}
        on:keydown={keydown} on:click={handleClick} on:focus on:blur on:mouseenter on:mouseleave on:mouseover
        {...$$restProps} in:fly={flyAnimParams} out:fly={flyAnimParams}>
  <slot />
  <form enctype="multipart/form-data" name="uploadfile" class="contents">
    <input type="file" class="hidden"  bind:value bind:files bind:this={fileInput}
           on:change on:input on:dragenter on:dragleave on:dragover on:drop {multiple} />
  </form>
</button>
