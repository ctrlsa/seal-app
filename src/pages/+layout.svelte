<script>
  import "../app.css";

  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import { onNavigate } from "$app/navigation";
  import { Toaster } from 'svelte-french-toast';
  import WebApp from "@twa-dev/sdk";
  import { wallet } from "$shared/lib/stores";
  import { ethers } from "ethers";
  import { base32 } from 'multiformats/bases/base32';
  import { Buffer } from 'buffer';

  function generateFilecoinWallet() {
    // Generate an Ethereum key pair
    const ethWallet = ethers.Wallet.createRandom();

    const filecoinAddress = ethereumToFilAddress(ethWallet.address);

    return {
      address: filecoinAddress,
      ethAddress: ethWallet.address,
      privateKey: ethWallet.privateKey,
      mnemonicPhrase: ethWallet.mnemonic.phrase
    }
  }

  function ethereumToFilAddress(ethAddress) {
    // Remove the '0x' prefix if present
    const cleanEthAddress = ethAddress.toLowerCase().replace(/^0x/, '');

    // Decode the Ethereum address from hex
    const decodedEthAddress = Buffer.from(cleanEthAddress, 'hex');

    // Add the Filecoin f4 address prefix (0x01)
    const prefixedAddress = Buffer.concat([Buffer.from([0x01]), decodedEthAddress]);

    // Encode the prefixed address using Base32 encoding (FIP-0048 standard)
    const base32Encoded = base32.encode(prefixedAddress);

    // Construct the final Filecoin f4 address
    const filAddress = `f${base32Encoded}`;

    return filAddress;
  }

  if (Object.keys(get(wallet)).length === 0) {
    const newWallet = generateFilecoinWallet();

    wallet.set(newWallet);
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  onMount(() => {
    WebApp.ready();
    WebApp.expand();
  });
</script>

<svelte:head>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
</svelte:head>

<div class="container mx-auto">
  <slot />
</div>

<Toaster />