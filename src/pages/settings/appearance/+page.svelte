<script>
  import { settings } from "$lib/lib/stores/settings";
  import { changeTheme } from "$lib/lib/theme.js";
  import { themes } from "$shared/lib/enums/themes";
  import Navbar from "$widgets/navbar.svelte";


  let theme = settings.theme
  $: settings.theme = theme;
</script>


<Navbar>Appearance</Navbar>

<main class="flex-1 overflow-y-scroll px-3 mt-2">
  <div class="mb-6">
    <div class="join join-vertical w-full">
      {#each Object.entries(themes) as [id, th] }
        <input class="join-item btn btn-block" type="radio" name="theme" aria-label="{th.name}" value="{th.id}"
               bind:group={theme} on:click={() => { changeTheme(th.id); }}
        />
      {/each}
    </div>
  </div>
</main>