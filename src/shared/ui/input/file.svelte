<script>
  export let placeholder = "";
  export let disabled = "";
</script>

<input
  type="file"
  {placeholder}
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
  {disabled} />
