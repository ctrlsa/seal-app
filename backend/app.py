import asyncio
import aiohttp_jinja2
import jinja2
import logging

from aiogram import Bot, Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher.filters import CommandStart
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, Message, WebAppInfo
from aiogram.utils import executor
from aiogram.utils.exceptions import ChatNotFound

from aiohttp import web
from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from web_app import safe_parse_webapp_init_data
from datetime import datetime, timedelta

# Import constants from config
from config import BOT_TOKEN, WEBAPP_HOST, WEBAPP_PORT, WEBHOOK_URL, PUBLIC_DIR, SPA_FILENAME

bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(bot=bot, storage=storage)

logging.basicConfig(level=logging.ERROR)

TEMPLATE_PATH = f"./{PUBLIC_DIR}"
SEND_MESSAGE_DELTA = {}  # Prevent flood by `Send Message Function`

# Web App template render
async def web_start(request):
    return await aiohttp_jinja2.render_template_async(SPA_FILENAME, request, {})

app = web.Application()
app.add_routes([web.get('/', web_start)])

aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader(TEMPLATE_PATH), enable_async=True)


async def on_startup(dps: Dispatcher):
    loop = asyncio.get_event_loop()
    loop.create_task(web._run_app(app, host=WEBAPP_HOST, port=WEBAPP_PORT))


async def on_shutdown(dps: Dispatcher):
    await dps.storage.close()
    await dps.storage.wait_closed()


@dp.message_handler(CommandStart())
@dp.throttled(rate=2)

async def cmd_start(msg: Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Open Seal App", web_app=WebAppInfo(url=WEBHOOK_URL))]
    ])

    await bot.send_message(msg.from_user.id, "Press button bellow to open the App", reply_markup=keyboard)
    #await msg.reply()


def main():
    executor.start_polling(dp, on_startup=on_startup, on_shutdown=on_shutdown)


if __name__ == "__main__":
    main()
