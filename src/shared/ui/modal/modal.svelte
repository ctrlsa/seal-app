<script>
  import { twMerge } from "tailwind-merge";

  export let id = "modal";
  export let defaultClass = "modal modal-bottom sm:modal-middle";
</script>

<dialog id="{id}" class={twMerge(defaultClass, $$props.class)} {...$$restProps}>
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
