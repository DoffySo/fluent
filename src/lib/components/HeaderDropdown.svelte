<script>
import Home from '~icons/lucide/home';
import CircleUser from '~icons/lucide/circle-user';
import ShowOnMobile from '$lib/components/ShowOnMobile.svelte';
import Menu from '~icons/lucide/menu';
import LockKeyhole from '~icons/lucide/lock-keyhole';
import { Button } from '$lib/components/ui/button/index.js';
import SunMoon from '~icons/lucide/sun-moon';
import Icon from '@iconify/svelte';
import { Switch } from '$lib/components/ui/switch/index.js';
import FileText from '~icons/lucide/file-text';
import * as Popover from "$lib/components/ui/popover";
import * as m from '$lib/paraglide/messages'
import { getLocale } from '$lib/paraglide/runtime.js';


let themeSwitch = false

let {
	links
} = $props();
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} class="text-lg md:text-xl text-gray-800 hover:cursor-pointer hover:bg-neutral-200/20 duration-100" variant="link" size="icon">
			<Menu />
		</Button>
		<Popover.Content class="border-gray-100 bg-white w-fit h-fit shadow-none px-0 py-0">
			<div class="flex flex-col px-1 py-1">
				<ShowOnMobile>
					<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-px" role="button">
						<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
							<CircleUser />
						</div>
						<li class="flex w-full justify-between items-center text-black hover:text-black active:text-black duration-200">
							<a class="font-medium text-md" href="/">
								{m.signin()}
							</a>
						</li>
					</div>
					<hr class="text-gray-200">
				</ShowOnMobile>
				{#if false}
					<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-1 md:my-px" role="button">
						<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
							<SunMoon />
						</div>
						<div class="flex w-full justify-between items-center">
							<span class="font-medium text-md">Theme</span>
							<div>
								<Switch bind:cheked={themeSwitch} />
							</div>
						</div>
					</div>
					<hr class="text-gray-200">
				{/if}
				<ShowOnMobile>
					<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-px" role="button">
						<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
							<Home />
						</div>
						<li class="flex w-full justify-between items-center text-black hover:text-black active:text-black duration-200">
							<a class="font-medium text-md" href="/">{m.link_home()}</a>
						</li>
					</div>
					{#each links as link}
						<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-1 md:my-px" role="button">
							{#if link.icon}
								<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
									<Icon class="w-5 h-5" icon={link.icon}/>
								</div>
							{/if}
							<li class="flex w-full justify-between items-center text-black hover:text-black active:text-black duration-200">
								<a class="font-medium text-md" target={link.blank ? "_blank" : "_self"} href="{link.linkHref}">
									{#if getLocale() === 'ru'}
										{link.ru?.linkText || link.linkText}
									{:else}
										{link.en?.linkText || link.linkText}
									{/if}
								</a>
							</li>
						</div>
					{/each}
					<hr class="text-gray-200">
				</ShowOnMobile>
				<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-1 md:my-px" role="button">
					<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
						<LockKeyhole />
					</div>
					<div class="flex w-full justify-between items-center">
						<span class="font-medium text-md">{m.privacy_policy()}</span>
					</div>
				</div>
				<div class="flex items-center gap-px hover:cursor-pointer hover:bg-neutral-300/30 px-2 rounded my-1 md:my-px" role="button">
					<div class="icon w-8 h-8 text-md md:text-lg flex items-center justify-start">
						<FileText />
					</div>
					<div class="flex w-full justify-between items-center">
						<span class="font-medium text-md">{m.tos()}</span>
					</div>
				</div>
			</div>
		</Popover.Content>
	</Popover.Trigger>
</Popover.Root>