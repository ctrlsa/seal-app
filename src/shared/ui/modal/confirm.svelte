<script>
  import { twMerge } from "tailwind-merge";

  export let dialogConfirm;
  let defaultClass = "modal modal-bottom";
</script>

<dialog bind:this={dialogConfirm} class={twMerge(defaultClass, $$props.class)} {...$$restProps}>
  <div class="modal-box p-4">
    <div class="mb-5 mt-2">
      <slot name="message">Confirm action</slot>
    </div>

    <div class="flex flex-col w-full justify-start items-end gap-y-1.5">
      <slot name="button-cancel">
        <button class="btn btn-block btn-neutral">Cancel</button>
      </slot>
      <slot name="button-confirm">
        <button class="btn btn-block btn-primary" on:click on:keypress>Confirm</button>
      </slot>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
