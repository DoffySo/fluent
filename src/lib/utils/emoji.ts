import emojiRegex from 'emoji-regex';
import * as emojiDictionary from 'emoji-dictionary';

// Преобразует Unicode emoji в имя файла
export function emojiToFileName(emoji: string): string {
	return Array.from(emoji)
		.map((char) => char.codePointAt(0)?.toString(16).padStart(4, '0'))
		.join('-') + '.png';
}

// Получить ссылку на изображение
export function emojiToImg(emoji: string): string {
	const filename = emojiToFileName(emoji);
	const baseUrl = window.location.origin
	return `${baseUrl}/emojis/apple/${filename}`;
}

// Преобразует :shortcode: в Unicode emoji
export function replaceShortcodes(text: string): string {
	return text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, p1) => {
		const unicode = emojiDictionary.getUnicode(p1);
		return unicode || match;
	});
}

// Комбинируем всё: сначала шорткоды, потом Unicode-эмодзи в <img>
export function replaceEmojisWithImages(text: string, imgClass = 'emoji-img', size?: string): string {
	const withUnicode = replaceShortcodes(text);
	const regex = emojiRegex();

	return withUnicode.replace(regex, (emoji) => {
		const src = emojiToImg(emoji);
		const style = size ? `style="height:${size}; width:${size}"` : '';
		const escaped = emoji.replace(/"/g, '&quot;');
		return `
			<span class="emoji-wrapper w-6 h-6 flex items-center justify-center" style="display:inline-block; position:relative;">
				<span class="emoji-fallback absolute" style="visibility:hidden;">${escaped}</span>
				<img src="${src}" alt="${escaped}" class="${imgClass}" ${style} 
					onerror="this.style.display='none'; this.previousElementSibling.style.visibility='visible';" />
			</span>
		`;
	});
}

// Заменяет только завершённые :shortcodes: перед курсором
export function replaceShortcodesLive(input: HTMLInputElement | HTMLTextAreaElement) {
	const pos = input.selectionStart ?? 0;
	const before = input.value.slice(0, pos);
	const after = input.value.slice(pos);
	const replaced = before.replace(/:(\w{1,30}):(?=\s|$)/g, (match, name) => {
		const unicode = emojiDictionary.getUnicode(name);
		return unicode || match;
	});

	if (replaced !== before) {
		const diff = before.length - replaced.length;
		input.value = replaced + after;
		input.setSelectionRange(replaced.length, replaced.length); // курсор назад
	}
}
