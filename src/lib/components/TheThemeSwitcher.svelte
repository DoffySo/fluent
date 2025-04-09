<script lang="ts">
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { Button } from "$lib/components/ui/button/index.js";
	import Sun from "~icons/lucide/sun"
	import Moon from "~icons/lucide/moon"

	let currentMode = $mode
	setMode(currentMode || 'light');
	console.log(currentMode)
	const handleToggleMode = () => {
		toggleMode()
		currentMode = $mode
		console.log(currentMode)
	}

</script>

<Button on:click={handleToggleMode} variant="link" size="icon">
		{#if currentMode === "dark"}
	<Sun
		class=""
	/>
		{:else}
	<Moon
		class=""
	/>
		{/if}
	<span class="sr-only">Toggle theme</span>
</Button>