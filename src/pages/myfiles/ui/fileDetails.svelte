<script>
  import { twMerge } from "tailwind-merge";

  export let fileDetails;
  const defaultClass = "modal modal-bottom";
</script>

<dialog bind:this={fileDetails} class={twMerge(defaultClass, $$props.class)} {...$$restProps} on:close>
  <div class="modal-box p-3">
    <slot/>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
