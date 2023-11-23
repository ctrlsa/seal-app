<script>
  import { Folder, Settings } from "lucide-svelte";

  import { page } from "$app/stores";

  const paths = [
    { name: Folder, className: "h-6 w-6", path: "/index" },
    { name: Settings, className: "h-8 w-8", path: "/settings" }
  ];
</script>

<nav class="container btm-nav btm-nav-md mx-auto">
  {#each paths as { name, className, path }}
    {@const active = $page.url.pathname === path ? "page" : null}
    {@const activeClass = $page.url.pathname === path ? "text-primary" : null}
    {@const activeBgClass = $page.url.pathname === path ? "bg-neutral" : null}
    <a aria-current={active} href={path} class={activeBgClass}>
      <svelte:component this={name} class="{className} {activeClass}" />
    </a>
  {/each}
</nav>

<style>
</style>
