<script>
  import { twMerge } from "tailwind-merge";

  export let dialog;
  export let defaultClass = "modal modal-bottom sm:modal-middle";
</script>

<dialog bind:this={dialog} class={twMerge(defaultClass, $$props.class)} {...$$restProps}>
  <div class="modal-box">
    <slot name="header" />

    <div class="py-4">
      <slot/>
    </div>

    <div class="modal-action">
      <slot name="footer" />
    </div>
  </div>
</dialog>
