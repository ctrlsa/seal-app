# Seal
Decentralized permanent storage on IPFS/Filecoin. Censorship-resistant, Privacy-first, Open-source.
Built as a Telegram WebApp.

## Getting Started

You'll need to have the following environment to run this project

- Node.js 20+ 
- pnpm
- git

You can find more detailed version-constrains for Node.js and pnpm in [package.json](package.json).

## Development

Follow these steps to start developing.

1. Clone this repository

```bash
git clone https://github.com/ctrlsa/seal-app.git
```

2. Install app dependencies

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

The best solution would be to set up an automatic application build process (CI/CD) using, for example, Github actions.
The following are instructions for manually building the application.

### Backend

To deploy this application you first need to deploy the backend.
Follow the instructions in the 
[Seal Backend Repository](https://github.com/ctrlsa/seal-app-backend) to do this.

### Build the app
To build the app, run

```bash
pnpm run build
```

### Copy the built app

Copy static app files from `build` directory to the `public` directory on your server

## Licensing

Seal is licensed under the [MIT License](LICENSE)
