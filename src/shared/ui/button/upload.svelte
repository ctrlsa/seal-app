<script>
  import { twMerge } from "tailwind-merge";
  import { fly } from 'svelte/transition';


  export let value = "";
  export let files;
  export let defaultClass = "btn btn-primary btn-square text-center fixed rounded-[12px] shadow-md right-3 bottom-6 w-14 h-14 z-9";

  let fileInput;


  function keydown(event) {
    if ([" ", "Enter"].includes(event.key)) {
      fileInput.click(event);
    }
  }
  function handleClick(event) {
    //event.preventDefault();

    fileInput.click(event);
  }
</script>

<button tabindex="0" class={twMerge(defaultClass, $$props.class)} on:keydown={keydown} on:click={handleClick} on:focus on:blur on:mouseenter on:mouseleave on:mouseover type="button" {...$$restProps} in:fly={{ y: 150, duration: 390 }} out:fly={{ y: 150, duration: 390 }}>
  <slot />
  <form enctype="multipart/form-data" name="uploadfile" class="contents">
    <input bind:value bind:files bind:this={fileInput} on:change on:input on:dragenter on:dragleave on:dragover on:drop type="file" class="hidden" />
  </form>
</button>
