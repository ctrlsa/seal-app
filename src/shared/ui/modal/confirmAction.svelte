<script>
  import WebApp from "@twa-dev/sdk";
  import ModalConfirm from "$lib/ui/modal/modal.svelte";

  export function confirmAction(message, callback, params) {
    //WebApp.platform
    console.log(WebApp.platform);
    alert("Confirm!")
    WebApp.showConfirm(message, callback(params));
  }
</script>

<ModalConfirm id="modalDelete">
  <h3 class="font-bold text-lg" slot="header">Delete file?</h3>
  <p>Confirm the file deletion</p>
  <div slot="footer">
    <button class="btn btn-error" on:click={() => modalDelete.close(1)}>Delete</button>
    <button class="btn" on:click={() => modalDelete.close()}>Cancel</button>
  </div>
</ModalConfirm>