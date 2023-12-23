import WebApp from "@twa-dev/sdk";


/** Universal code for Telegram Web App back button */
export function initBackButton() {
  const BackButton = WebApp.BackButton;

  BackButton.onClick(function() {
    window.history.back();
    WebApp.BackButton.hide();
  });

  BackButton.show();
}
