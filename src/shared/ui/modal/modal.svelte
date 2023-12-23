<script>
  import { twMerge } from "tailwind-merge";

  export let dialog;
  export let defaultClass = "modal modal-bottom";
</script>

<dialog bind:this={dialog} class={twMerge(defaultClass, $$props.class)} {...$$restProps}>
  <div class="modal-box">
    <slot/>
  </div>
</dialog>
