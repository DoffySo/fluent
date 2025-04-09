<script>
	import TheHeader from '$lib/components/TheHeader.svelte';
	import { onMount } from 'svelte';
	import TheFooter from '$lib/components/TheFooter.svelte';
	import FirstSlide from '$lib/components/index/slider/FirstSlide.svelte';
	import SecondSlide from '$lib/components/index/slider/SecondSlide.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages'

	let lastSlide;


	const handleMoveToDown = () => {
		if (lastSlide) {
			lastSlide.scrollIntoView({ behavior: 'smooth' });
		}
	};

	onMount(() => {
		lastSlide = document.querySelector('#last-slide');
	});
</script>

<main class="h-screen overflow-y-scroll scroll-smooth snap-mandatory sm:snap-proximity snap-y">
	<!-- First slide -->
	<FirstSlide />
	<!-- Second slide -->
	<SecondSlide />


	<!-- Third Slide -->
	<div class="snap-start text-black z-30" id="last-slide">
		<TheHeader />
		<main class="h-screen">

			<div class="flex">
				<div class="flex flex-col px-2">
					<h5 class="text-sm text-gray-600">Encryption test</h5>
					<h1 class="text-2xl font-bold">So, how to check how the encryption is working?</h1>
					<span class="mt-1 text-md">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti aspernatur hic maxime reprehenderit nisi vel? Eaque voluptas ad illo consectetur nostrum modi aperiam voluptatibus eius harum doloremque, unde ipsum quibusdam.
					</span>
					<div class="flex mt-2">
						<a href="/encryption">
							<Button size="sm" class="bg-black text-white text-sm">Go to encryption tests</Button>
						</a>
					</div>
				</div>
			</div>

		</main>
	</div>
	<div class="snap-start h-96 bg-neutral-100 py-2">
		<TheFooter />
	</div>
</main>

<style>
    main {
        scroll-behavior: smooth;
    }
</style>
