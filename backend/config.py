from environs import Env

env = Env()
env.read_env()

BOT_TOKEN = "" # Add your token from Telegram's BotFather
WEBAPP_HOST = "0.0.0.0"
WEBAPP_PORT = 10773
WEBHOOK_HOST = "https://SERVER_NAME:8080"
WEBHOOK_PATH = "/"
WEBHOOK_URL = f"{WEBHOOK_HOST}{WEBHOOK_PATH}"
PUBLIC_DIR = "public"
SPA_FILENAME = "index.html"