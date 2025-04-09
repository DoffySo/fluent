<script>
	import { onMount } from 'svelte';
	import * as emojiMart from 'emoji-mart';
	import data from '@emoji-mart/data/sets/13.1/native.json';

	let pickerContainer;


	const onEmojiSelect = (e) => {
		console.log(e);
		const {emoticons, name, native, shortcodes} = e
		console.log(`Selected emoji: ${native} (${name}). Shortcodes: ${shortcodes}. Emoticons: ${emoticons}`);
	}

	onMount(async () => {
		const { Picker } = emojiMart;
		new Picker({
			parent: pickerContainer,
			data: data,
			emojiButtonSize: 44,
			emojiSize: 24,
			emojiButtonColors: ['rgba(255,255,255,0)'],
			icons: 'solid',
			maxFrequentRows: 0,
			noCountryFlags: false,
			perLine: 8,
			previewPosition: 'none',
			navPosition: 'none',
			skinTonePosition: 'none',
			searchPosition: 'none',
			theme: 'light',
			onEmojiSelect: onEmojiSelect,
		});
	});
</script>

<style>
    @font-face {
        font-family: 'EmojiMart';
        src: url('/fonts/emoji/apple/AppleColorEmoji.ttf') format('truetype');
    }

    #picker {
        --background-rgb: 10, 10, 10;
        --border-radius: 12px;
        --category-icon-size: 12px;
        --color-border-over: 24, 24, 27;
        --font-size: 20px;
        --rgb-accent: 255, 105, 180;
        --rgb-background: 262, 240, 283;
        --rgb-color: 0, 0, 0;
        --rgb-input: 155, 1, 1;

        height: 200px;
        min-height: 100px;
        max-height: 200px;
    }
</style>

<!--<div bind:this={pickerContainer} id="picker"></div>-->

<pre>
	Emojis:
</pre>
