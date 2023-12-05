<script>
  import toast from "svelte-french-toast";
  import { isEmpty } from "moderndash";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";

  import { wallet } from "$lib/lib/stores.js";


  if (!isEmpty(get(wallet))) {
    toast("User account already exists", { icon: '😨' });
    goto("/myfiles", { replaceState: true });
  }
</script>

<slot />
