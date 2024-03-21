# Seal
Decentralized permanent storage on IPFS/Filecoin. Censorship-resistant, Privacy-first, Open-source.
Built as a Telegram WebApp.

## Getting Started

You'll need to have the following environment to run this project

- Node.js 20+ 
- pnpm
- Python 3+
- pip
- git

You can find more detailed version-constrains for Node.js and pnpm in [package.json](package.json).

## Development

Follow these steps to start developing.

1. Clone this repository

```bash
git clone https://github.com/ctrlsa/seal-app.git
```

2. `cd` to the cloned directory. Then - install app dependencies

```bash
pnpm i
```

3. To start development server run

```bash
pnpm run dev
```

To build the app run

```bash
pnpm run build
```

## Production (deploy)

We are not using Docker containers or any virtualization yet.
The following describes the steps that will allow you to deploy the app on the VPS or a cloud instance.

`ℹ️ NOTE: Tested only on Debian`

### Domain name

You need a domain name to deploy a Telegram WebApp.\
Create a subdomain on one of your existing domain names (e.g. botapi.example.com) or register a new one. Delegate the domain name to your server (VPS or cloud).

### Telegram bot

Create a new Telegram bot using [BotFather](https://t.me/BotFather) and obtain an API token.

### SSL certificate

The app will only work over the HTTPS protocol. You have to use an SSL certificate for Telegram Web Apps.

You can use free [Let's Encrypt](https://letsencrypt.org/) certificate (recommended) or buy a certificate from one of many authorities/sellers.

Follow the steps below to issue a free SSL certificate via [Certbot](https://certbot.eff.org/)

`⚠️ There is NO need to follow official instructions from Certbot website`

1. Install Certbot:
```bash
sudo apt install certbot
```
2. Make sure that port 80 is available
```bash
sudo netstat -tnlp | grep :80
```
`If you see that some service is using port 80, stop it for a while to obtain a certificate`

4. Issue a new SSL certificate for your domain name:
```bash
sudo certbot certonly --standalone -d botapi.example.com
```
5. Make sure auto update of your certificate is enabled and working properly

### Nginx

Seal app uses Nginx as a reverse proxy.

Install Nginx on your server if it is not installed:
```bash
sudo apt install nginx
```
Once Nginx has been installed, you need to configure it. We will also use the SSL certificate we generated earlier.

The repository already has a ready-made config that you just need to copy and make the necessary changes:

Copy `config` file from `nginx` foder to `/etc/nginx/sites-available` on your server.

Rename the config file from `/etc/nginx/sites-available/config` to, for example `/etc/nginx/sites-available/botapi.example.com`

Edit config and set proper values:

```bash
sudo nano /etc/nginx/sites-available/botapi.example.com
```

Edit this `config` file and set proper values:
1. `server_name` (e.g. `botapi.example.com`)
2. `ssl_certificate` and `ssl_certificate_key` paths (e.g. `/etc/letsencrypt/live/botapi.example.com/fullchain.pem`)
3. `root` path under `location /` (e.g. `/home/botapi.example.com/public`)

Create a symbolic link to enable our coinfig:

```bash
sudo ln -s /etc/nginx/sites-available/botapi.example.com /etc/nginx/sites-enabled/botapi.example.com
```
Restart Nginx:

```bash
sudo service nginx restart
```

### Build the app
To build the app, run

```bash
pnpm run build
```

Copy static app files to `public` directory

### Setup backend

#### Install dependencies

```bash
pip3 install -r requirements.txt

# or
pip install -r requirements.txt
```

#### Configure app backend

Edit `config.py` and set proper values:
1. `BOT_TOKEN` (obtained form BotFather)
2. `WEBHOOK_HOST` - a valid URL (host + optional port, e.g. `https://botapi.example.com:8080`)

#### Run app backend

```bash
python3 app.py &

# or
python app.py &
```

## Licensing

Seal is licensed under the [MIT License](LICENSE)
