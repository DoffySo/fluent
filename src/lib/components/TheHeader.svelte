<script>
	import TheHideOnMobile from '$lib/components/TheHideOnMobile.svelte';
	import TheHeaderAlertBar from '$lib/components/TheHeaderAlertBar.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/paraglide/messages'
	import HeaderDropdown from '$lib/components/HeaderDropdown.svelte';
	import { getLocale } from "$lib/paraglide/runtime.js";


	let {
		hideLogo = false,
		hideSignIn = false,
		forceHideAlert = false
	} = $props();


	const links = [
		{
			linkText: 'FAQ',
			linkHref: '/faq',
			blank: false,
			icon: 'lucide:shield-question'
		},
		{
			en: {
				linkText: 'Apps',
			},
			ru: {
				linkText: 'Приложения',
			},
			linkHref: '/apps',
			blank: false,
			icon: 'lucide:blocks'
		},
		{
			linkText: 'API',
			linkHref: '/api',
			blank: false,
			icon: 'lucide:code-xml'
		},
		{
			en: {
				linkText: 'Feedback',
			},
			ru: {
				linkText: 'Обратная связь',
			},
			linkHref: '/feedback',
			blank: false,
			icon: 'lucide:message-circle-question'
		},
	]
</script>

<header class="header contents">
	<div class="header-container flex flex-col sticky top-0 z-50">
		<nav class="flex justify-between w-full items-center h-11 bg-white text-black md:border-b border-neutral-300 px-2">
			<div class="links flex gap-4">
				{#if !hideLogo}
					<a href="/" class="petit-font text-lg">Fluent</a>
				{/if}
				<TheHideOnMobile>
					<ul class="flex gap-3 items-center font-medium text-[12px]">
						{#each links as link}
							<li class="text-neutral-600 hover:text-black active:text-black duration-200">
								<a target={link.blank ? "_blank" : "_self"} href="{link.linkHref}">
									{#if getLocale() === 'ru'}
										{link.ru?.linkText || link.linkText}
									{:else}
										{link.en?.linkText || link.linkText}
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</TheHideOnMobile>
			</div>
			<div class="user-actions flex gap-2 items-center">
				<HeaderDropdown links={links} />
				{#if !hideSignIn}
					<TheHideOnMobile>
						<Button class="bg-black text-white font-medium text-[12px] hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-700 sm:active:bg-neutral-800"
										size="sm">
							{m.signin()}
						</Button>
					</TheHideOnMobile>
				{/if}
			</div>
		</nav>
		{#if !forceHideAlert}
			<TheHeaderAlertBar></TheHeaderAlertBar>
		{/if}
	</div>
</header>