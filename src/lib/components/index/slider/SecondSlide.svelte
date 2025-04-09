<script>
	import ChevronRight from '~icons/lucide/ChevronRight';
	import * as m from '$lib/paraglide/messages'
	import { getLocale } from "$lib/paraglide/runtime.js";

	const featuresList = [
		{
			en: {
				title: 'Real-Time Sync 🕑',
				description: 'Instant updates across all devices. No delays, no refreshes—just seamless messaging.',
				linkText: 'Read more',
			},
			ru: {
				title: 'Синхронизация в реальном времени 🕑',
				description: 'Мгновенные обновления на всех устройствах. Никаких задержек, никаких обновлений - только бесперебойный обмен сообщениями.',
				linkText: 'Узнать больше',
			},
			linkHref: 'https://github.com/DoffySo/fluent',
			blank: true
		},
		{
			en: {
				title: 'End-to-End Encryption 🔐',
				description: 'Your messages, your privacy. We use cutting-edge encryption to keep your conversations secure.',
				linkText: 'Read more',
			},
			ru: {
				title: 'End-to-End Шифрование 🔐',
				description: 'Ваши сообщения, ваша конфиденциальность. Мы используем новейшее шифрование для обеспечения безопасности ваших разговоров.',
				linkText: 'Узнать больше',
			},
			linkHref: 'https://github.com/DoffySo/fluent',
			blank: true
		},
		{
			en: {
				title: 'Global Access 🌐',
				description: 'Connect with people worldwide without restrictions. Fast, reliable, and censorship-free.',
				linkText: 'Read more',
			},
			ru: {
				title: 'Глобальный Доступ 🌐',
				description: 'Общайтесь с людьми по всему миру без ограничений. Быстро, надежно и без цензуры.',
				linkText: 'Узнать больше',
			},
			linkHref: 'https://github.com/DoffySo/fluent',
			blank: true
		},
	]
</script>

<div class="snap-start min-h-screen relative text-black z-20 flex justify-center">
	<div class="flex flex-col h-full w-11/12 pt-2 gap-4">
		<div class="flex flex-col text-center gap-2">
			<h1 class="text-4xl font-bold">{m.whyus_title()}  <span>😶‍🌫</span></h1>
			<span class="text-gray-600 text-[14px]">{m.whyus_desc()}</span>
		</div>
		<div class="grid grid-cols-1 gap-4 md:w-2/3 md:mx-auto">
			{#each featuresList as feature}
				<div class="flex flex-col bg-gray-100 h-fit rounded-md px-2 py-1 gap-2">
					<h1 class="text-2xl font-bold">
						{#if getLocale() === 'ru'}
							{feature.ru.title}
						{:else}
							{feature.en.title}
						{/if}
					</h1>
					<div class="flex flex-col gap-1">
						<span>
							{#if getLocale() === 'ru'}
								{feature.ru.description}
							{:else}
								{feature.en.description}
							{/if}
						</span>
						<span class="text-sm font-medium text-blue-500 min-h-6 flex items-end">
								<span class="sr-only">Link: {feature.linkHref}</span>
								<a class="flex items-center-safe gap-0 hover:gap-1 hover:cursor-pointer duration-100" target={feature.blank ? "_blank" : "_self"} href={feature.linkHref}>
									{#if getLocale() === 'ru'}
										{feature.ru.linkText}
									{:else}
										{feature.en.linkText}
									{/if}
									<ChevronRight /></a>
							</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>