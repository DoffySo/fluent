<script lang="ts">
	import { onMount } from 'svelte';
	import data from '@emoji-mart/data';
	import * as emojiMart from 'emoji-mart'
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from "$lib/components/ui/tooltip";
	import Search from '~icons/lucide/search'


	const categorySettings = {
		'frequent': {
			alternative: 'Recently Used',
			icon: 'lucide:clock',
		},
		'people': {
			alternative: 'Emoji & People',
			icon: 'lucide:smile',
		},
		'nature': {
			alternative: 'Animals and Nature',
			icon: 'lucide:cat',
		},
		'foods': {
			alternative: 'Food and drink',
			icon: 'lucide:pizza',
		},
		'activity': {
			alternative: 'Activity',
			icon: 'lucide:volleyball',
		},
		'places': {
			alternative: 'Travel and places',
			icon: 'lucide:car-front',
		},
		'objects': {
			alternative: 'Objects',
			icon: 'lucide:lightbulb',
		},
		'symbols': {
			alternative: 'Symbols',
			icon: 'fluent:symbols-24-regular'
		},
		'flags': {
			alternative: 'Flags',
			icon: 'fluent:flag-24-regular',
		}
	}

	let emojiList = [];
	let categoryList = [];
	let emojiListRef: HTMLDivElement;
	let searchQuery: string;
	let searchResults: string | null = null;
	export let selectedEmoji: string;
	$: if (searchQuery) {
		updateSearchResults(searchQuery);
	} else {
		searchResults = null;
	}

	const getEmojis = async () => {
		const emojiData = data;
		const { categories } = emojiData;

		let newEmojiList = [];
		let newCategoryList = [];

		categories.forEach((category) => {
			newCategoryList.push(category.id);

			category.emojis.forEach(emoji => {
				newEmojiList.push({
					category: category.id,
					emoji: emoji,
				});
			});
		});

		categoryList = newCategoryList;
		emojiList = newEmojiList;
	};

	const getEmojiListByCategory = (categoryName) => {
		return emojiList.filter(emoji => emoji.category === categoryName);
	};

	const getNativeEmojiByName = (name) => {
		const emojiData = data;
		const { emojis } = emojiData;

		if (emojis[name]) return emojis[name].skins[0].native;
		else return name + ' ';
	};

	const getAlternativeCategoryName = (categoryName) => {
		if (categorySettings[categoryName]?.alternative) return categorySettings[categoryName].alternative;
		else return categoryName;
	};

	const scrollToCategory = (category: string) => {
		const el = document.getElementById(category);
		if (el && emojiListRef) {
			const top = el.offsetTop - emojiListRef.offsetTop;
			emojiListRef.scrollTo({ top, behavior: 'smooth' });
		}
	};

	async function updateSearchResults(value: string) {
		try {
			const { emojis } = data;

			const searchTerms = value.trim().toLowerCase().split(/\s+/);

			const results = Object.keys(emojis).filter(key => {
				const emoji = emojis[key];

				return searchTerms.every(term => {
					return emoji.keywords && emoji.keywords.some(keyword => keyword.toLowerCase().includes(term));
				});
			}).map(key => {
				const emoji = emojis[key];
				return {
					category: emoji.category,
					emoji: emoji.skins[0].native
				};
			});

			if (results.length === 0) {
				searchResults = [];
			} else {
				searchResults = results;
			}
		} catch (e) {
			searchResults = [];
		}
	}

	const selectEmoji = (emoji) => {
		const { emojis } = data;

		selectedEmoji = emojis[emoji.emoji].skins[0].native;
	}
	onMount(async () => {
		await getEmojis();
	});
</script>

<style>
    @font-face {
        font-family: 'Apple Color Emoji';
        src: url('/fonts/emoji/apple/AppleColorEmoji.ttf') format('truetype');
    }
</style>

<div class="flex min-w-92 w-fit rounded-sm bg-white/30 backdrop-blur-[3px] overflow-hidden py-1">
	<div class="flex flex-col h-80 w-full gap-px">
		<header class="picker-header h-11 md:h-8 w-full bg-neutral-100 sticky z-20 top-0 border-b border-gray-200">
			<div class="category-selector">
				<div class="category-selectory__container">
					<div class="default-categories flex gap-px items-center w-fit">
						{#each categoryList as category, index (index)}
							<Tooltip.Root>
								<Tooltip.Trigger let:builder>
									<button
										builders={[builder]}
										class="w-11 md:w-8 h-11 md:h-8 flex items-center justify-center"
										on:click={() => scrollToCategory(category)}
										tabindex={index}
										type="button"
									>
										<Icon class="w-1/2 h-1/2" icon={categorySettings[category]?.icon || 'lucide:question'} />
									</button>

								</Tooltip.Trigger>
								<Tooltip.Content class="bg-neutral-100 py-1 px-2 rounded-sm border border-gray-300">
									<span>{categorySettings[category]?.alternative || category}</span>
								</Tooltip.Content>
							</Tooltip.Root>
						{/each}
					</div>
				</div>
			</div>
		</header>

		<div class="emoji-list overflow-y-scroll px-1" bind:this={emojiListRef}>
			<div class="search">
				<div class="search-container bg-neutral-100 h-11 md:h-8 flex items-center border border-gray-300 rounded relative">
					<input bind:value={searchQuery} type="text" class="text-black text-md md:text-sm ps-1 md:ps-8 pe-1 py-1 outline-none h-full w-full" placeholder="Search" />
					<Button size="icon" class="px-1 bg-neutral-50 hover:bg-neutral-200 border border-gray-200 shadow-none h-10 w-10 md:left-1 md:h-6 md:w-6 md:absolute">
						<Search />
					</Button>
				</div>
			</div>

			{#if !searchQuery}
				{#each categoryList as category, index (index)}
					<div class="flex flex-col category gap-2 mt-4 mb-5" id="{category}">
						<span class="name text-gray-600 text-sm">{getAlternativeCategoryName(category)}</span>
						<div class="emojis grid grid-cols-9 md:grid-cols-8 gap-3">
							{#each getEmojiListByCategory(category) as emoji, i (i)}
						<span class="emoji text-2xl cursor-default" role="button" on:click={() => selectEmoji(emoji)}>
							{getNativeEmojiByName(emoji.emoji)}
						</span>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				{#if !searchResults}
					<p class="text-center text-sm text-gray-500 py-4">No results found.</p>
				{:else}
					<div class="flex flex-col category gap-2 mt-4 mb-5">
						<div class="emojis grid grid-cols-9 md:grid-cols-8 gap-3">
							{#each searchResults as result, index (index)}
										<span class="emoji text-2xl cursor-default" role="button">
											{result.emoji}
										</span>
							{/each}
						</div>
					</div>
				{/if}
			{/if}
		</div>

	</div>
</div>
