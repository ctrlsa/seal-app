<script>
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import toast from "svelte-french-toast";

  import { goto } from "$app/navigation";
  import { wallet } from "$lib/lib/stores/stores";


  if (!isEmpty(get(wallet))) {
    toast("User account already exists", { icon: '😨' });
    goto("/myfiles", { replaceState: true });
  }
</script>

<div class="flex flex-col h-screen">
  <slot />
</div>