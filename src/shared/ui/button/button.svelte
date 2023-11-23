<script>
  export let href = undefined;
  export let type = "button";
  export let tag = "button";
</script>

{#if href}
  <a
    {href}
    {...$$restProps}
    role="button"
    on:click
    on:change
    on:keydown
    on:keyup
    on:touchstart|passive
    on:touchend
    on:touchcancel
    on:mouseenter
    on:mouseleave
  >
    <slot />
  </a>
{:else if tag === "button"}
  <button
    {type}
    {...$$restProps}
    on:click
    on:change
    on:keydown
    on:keyup
    on:touchstart|passive
    on:touchend
    on:touchcancel
    on:mouseenter
    on:mouseleave
  >
    <slot />
  </button>
{:else}
  <svelte:element this={tag} {...$$restProps}>
    <slot />
  </svelte:element>
{/if}
