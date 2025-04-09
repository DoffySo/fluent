<script lang="ts">
	export let slides: string[] = [];
</script>

<div class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
	{#each slides as content, i}
		<section
			class="h-screen snap-start flex items-center justify-center text-white text-5xl font-bold"
			class:bg-gray-900={i === 0}
			class:bg-gray-800={i === 1}
			class:bg-gray-700={i === 2}
		>
			{content}
		</section>
	{/each}

	<!-- Основной контент -->
	<section class="min-h-screen snap-start bg-white text-black p-10">
		<h2 class="text-3xl font-bold mb-4">Основной сайт</h2>
		<p>
			Здесь идёт уже обычная часть сайта — можешь вставить лендинг, секции,
			компоненты, всё что нужно.
		</p>
	</section>
</div>
