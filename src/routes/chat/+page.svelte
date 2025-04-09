<script lang="ts">
	import Picker from '$lib/components/picker/Picker.svelte';

	let message = '';
	let emoji: string | null = null;

	$: {
		if (emoji) {
			message += emoji;
			emoji = null;
		}
	}
</script>

<div>
	{message}
	<textarea class="text-md" cols="50" rows="4" type="text" bind:value={message} placeholder="Message"></textarea>
	<Picker bind:emoji={emoji} />
</div>
