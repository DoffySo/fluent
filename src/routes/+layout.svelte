<script lang="ts">
	import '../app.css';
	// import TheHeader from '$lib/components/TheHeader.svelte';

	let { children } = $props();
</script>

{@render children()}