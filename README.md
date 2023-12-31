# Seal
Telegram WebApp

## Getting Started
`ℹ️ NOTE: Tested only on Debian`

You'll need to have the following environment to work with this project

- Node.js 20+ 
- pnpm
- Python 3+
- pip
- git

You can find more detailed version-constrains for Node.js and pnpm in [package.json](package.json).

### Domain name
`production only`

You need a domain name to deploy a Telegram WebApp.
Create a subdomain on one of your existing domain names (e.g. botapi.example.com)
or register a new one. Delegate the domain name to your server.

### Telegram bot
`production only`

Create a new Telegram bot using [BotFather](https://t.me/BotFather) and obtain an API token.

### SSL certificate
`production only`

Issue a new Let's Encrypt SSL certificate for the domain name using [Certbot](https://certbot.eff.org/)
Make sure that 80 port is available before running the Certbot.

```bash
sudo certbot certonly --standalone -d botapi.example.com
```

Make sure auto update is enabled and working properly.

### Nginx
`production only`

Seal app uses Nginx as a reverse proxy. You need to install and configure Nginx to make it work.

Copy `config` file to `/etc/nginx/sites-available`

Edit `config` and set proper values:
1. `server_name` (e.g. `botapi.example.com`)
2. `ssl_certificate` and `ssl_certificate_key` paths (e.g. `/etc/letsencrypt/live/botapi.example.com/fullchain.pem`)
3. `root` path under `location /` (e.g. `/home/botapi.example.com/public`)

Create a symbolic link to this config file in the `/etc/nginx/sites-enabled` directory

Restart Nginx:

```bash
service nginx restart
```

### Install dependencies

```bash
pip3 install -r requirements.txt

# or
pip install -r requirements.txt
```

### Configure app

Edit `config.py` and set proper values:
1. `BOT_TOKEN` (obtained form BotFather)
2. `WEBHOOK_HOST` - a valid URL (host + optional port, e.g. `https://botapi.example.com:8080`)

### Run app

```bash
python3 app.py &

# or
python app.py &
```

## Licensing

Seal is licensed under the [MIT License](LICENSE)
