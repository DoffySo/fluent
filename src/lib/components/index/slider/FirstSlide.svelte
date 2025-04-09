<script lang="ts">
	import TheHeader from '$lib/components/TheHeader.svelte';
	import ArrowDown from '~icons/lucide/ArrowDown';
	import { Motion } from 'svelte-motion';
	import * as m from '$lib/paraglide/messages'

</script>

<div class="snap-start h-screen relative z-10">
	<div class="h-5/12">
		<TheHeader hideLogo={true} forceHideAlert={true} />
	</div>

	<Motion
		initial={{ opacity: 0, y: 100 }}
		animate={{ opacity: 1, y: -50 }}
		transition={{ duration: 0.5, ease: 'ease-in-out' }}
		let:motion>
		<span
			class="text-[4rem] md:text-[6rem] text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 petit-font"
			use:motion>
			{m.hero_hello()}
		</span>
	</Motion>

	<div class="flex flex-col absolute min-w-32 w-fit min-h-4 h-fit bottom-1/6 left-1/2 justify-center items-center gap-3 -translate-x-1/2 -translate-y-1/2" transition:fly={{ y: 200, duration: 1000 }}>
		<span class="text-gray-600 text-[12px] font-medium flex items-center gap-1 cursor-default">
			<ArrowDown class="motion-safe:animate-bounce rotate-180" />
			Slide to move
		</span>
	</div>
</div>
