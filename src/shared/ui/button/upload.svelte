<script>
  import { twMerge } from "tailwind-merge";
  import { fly } from 'svelte/transition';


  export let value = "";
  export let files = undefined;
  export let defaultClass = "btn btn-primary btn-square rounded-[12px] fixed z-9 right-3 bottom-6 flex flex-col shrink-0 justify-around align-middle text-center shadow-md w-14 h-14";

  let fileInput;


  function keydown(event) {
    if ([" ", "Enter"].includes(event.key)) {
      fileInput.click();
    }
  }
  function handleClick(event) {
    //event.preventDefault();
    fileInput.click();
  }
</script>

<button class={twMerge(defaultClass, $$props.class)} on:keydown={keydown} on:click={handleClick} on:focus on:blur on:mouseenter on:mouseleave on:mouseover on:dragenter on:dragleave on:dragover on:drop type="button" {...$$restProps} in:fly={{ y: 150, duration: 390 }} out:fly={{ y: 150, duration: 390 }}>
  <slot />
  <input bind:value bind:files bind:this={fileInput} on:change on:click type="file" class="hidden" multiple />
</button>
