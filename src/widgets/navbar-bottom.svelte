<script>
  import Folder from "svelte-lucide/Folder.svelte";
  import Settings from "svelte-lucide/Settings.svelte";

  import { page } from "$app/stores";

  const paths = [
    { name: Folder, className: "h-6 w-6", path: "/myfiles" },
    { name: Settings, className: "h-7 w-7", path: "/settings" }
  ];
</script>

<nav class="btm-nav btm-nav-sm sticky bottom-0 z-50">
  {#each paths as { name, className, path }}
    {@const active = $page.url.pathname === path ? "page" : null}
    {@const activeClass = $page.url.pathname === path ? "text-primary" : null}
    {@const activeBgClass = $page.url.pathname === path ? "bg-neutral" : null}

    <a aria-current={active} href={path} class={activeBgClass}>
      <svelte:component this={name} class="{className} {activeClass}" />
    </a>
  {/each}
</nav>
