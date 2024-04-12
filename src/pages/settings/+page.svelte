<script>
  import Brush from "svelte-lucide/Brush.svelte";
  import ChevronRight from "svelte-lucide/ChevronRight.svelte";
  import CloudCog from "svelte-lucide/CloudCog.svelte";
  import Folders from "svelte-lucide/Folders.svelte";
  import Globe from "svelte-lucide/Globe.svelte";
  import Info from "svelte-lucide/Info.svelte";
  import Mail from "svelte-lucide/Mail.svelte";
  import Share2 from "svelte-lucide/Share2.svelte";
  import ShieldCheck from "svelte-lucide/ShieldCheck.svelte";
  import Wallet from "svelte-lucide/Wallet.svelte";

  import Navbar from "$widgets/navbar.svelte";
</script>


<Navbar>Settings</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-6">
    <div class="join join-vertical w-full">
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/account/manage">
        <Wallet class="h-6 w-6 mr-1" /> Manage Accounts
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/storage">
        <CloudCog class="h-6 w-6 mr-1" /> Storage Settings
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/backup">
        <Folders class="h-6 w-6 mr-1" /> Backup Manager
      </a>
    </div>
  </div>

  <div class="mb-6">
    <div class="join join-vertical w-full">
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/security">
        <ShieldCheck class="h-7 w-7 mr-1" />
        <p class="grow text-left">Security and Privacy</p>
        <ChevronRight class="h-6 w-6 -mr-2" />
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/appearance">
        <Brush class="h-6 w-6 mr-1" />
        <p class="grow text-left">Appearance</p>
        <ChevronRight class="h-6 w-6 -mr-2" />
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item flex"
         href="/settings/i18n">
        <Globe class="h-6 w-6 mr-1 shrink" />
        <p class="grow text-left">Language</p>
        <ChevronRight class="h-6 w-6 -mr-2" />
      </a>
    </div>
  </div>

  <div class="mb-6">
    <div class="join join-vertical w-full">
      <a class="btn btn-block btn-lg btn-neutral join-item border-b-2 border-b-base-100 justify-start"
         href="/settings/contact">
        <Mail class="h-6 w-6 mr-1" /> Contact Us
      </a>
      <a class="btn btn-block btn-lg btn-neutral join-item justify-start"
         href="/settings/tellfriends">
        <Share2 class="h-6 w-6 mr-1" /> Tell Friends
      </a>
    </div>
  </div>

  <div class="mb-8">
    <a class="btn btn-block btn-lg btn-neutral justify-start"
       href="/about">
      <Info class="h-6 w-6 mr-1" /> About App
    </a>
  </div>

  <div class="flex flex-col mb-8 items-center justify-center">
    <p class="text-center"><b>SEAL</b> v.0.2.1</p>
  </div>
</main>
