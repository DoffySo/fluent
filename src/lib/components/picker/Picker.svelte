<script lang="ts">
	import CustomPicker from '$lib/components/picker/emoji/CustomPicker.svelte';

	export let emoji: string;
</script>

<div class="flex absolute">
	<div class="flex flex-col relative">
		<CustomPicker bind:selectedEmoji={emoji} />
		<div class="flex z-10 sticky bottom-0 h-10 bg-neutral-100 left-0">
			<div class="flex w-full items-center justify-center gap-4 text-sm me-2">
				<span class="hover:bg-neutral-300/25 bg-neutral-400/15 px-2 py-px rounded-md cursor-default hover:cursor-pointer">Emoji</span>
				<span class="hover:bg-neutral-300/25 bg-none px-2 py-px rounded-md cursor-default hover:cursor-pointer">GIFs</span>
				<span class="hover:bg-neutral-300/25 bg-none px-2 py-px rounded-md cursor-default hover:cursor-pointer">Stickers</span>
			</div>
		</div>
	</div>
</div>