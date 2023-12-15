<script>
  import WebApp from "@twa-dev/sdk";

  export function popup(title, message, buttons, callback) {
    const params = {
      title,
      message,
      buttons
    };

    WebApp.showPopup(params, callback);
  }
</script>