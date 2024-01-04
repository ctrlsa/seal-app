<script>
  import { twMerge } from "tailwind-merge";

  export let dialogAction;
  let defaultClass = "modal modal-bottom";
</script>

<dialog bind:this={dialogAction} class={twMerge(defaultClass, $$props.class)} {...$$restProps}>
  <div class="modal-box p-4">
    <div class="mb-5 mt-2">
      <p class="align-middle break-all font-bold text-xl inline-block">
        <slot name="title">Title</slot>
      </p>
    </div>

    <slot name="buttons" />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
