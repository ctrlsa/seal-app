<script>
  import { isEmpty } from "moderndash";
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { state } from "$lib/lib/stores/state";



  if (!isEmpty(state.wallet)) {
    toast("User account already exists", { icon: '😨' });
    goto("/myfiles", { replaceState: true });
  }
</script>

<div class="flex flex-col h-screen">
  <slot />
</div>