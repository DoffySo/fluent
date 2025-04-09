<script lang="ts">
	import Github from '~icons/mdi/github'
	import OutlineDiscord from '~icons/ic/outline-discord'
	import * as m from '$lib/paraglide/messages'

</script>

<footer class="footer flex">
	<div class="footer-container flex flex-col w-11/12 h-fit mx-auto gap-1">
		<div class="flex justify-between">
			<div class="logo text-2xl">
				<a href="/" class="petit-font">Fluent</a>
			</div>
			<div class="socials flex items-center gap-4">
				<a href="https://github.com/DoffySo/fluent" target="_blank" class="text-2xl">
					<Github />
				</a>
				<a href="/" class="text-2xl">
					<OutlineDiscord />
				</a>
			</div>
		</div>
		<hr class="text-gray-400">
		<div class="links flex justify-center gap-3 font-medium text-sm items-center flex-wrap">
			<p class="">Fluent Messenger. <span>© { new Date().getFullYear() }</span></p>
			<a class="text-blue-500 hover:underline active:underline underline-offset-1" href="/privacy">{m.privacy_policy()}</a>
			<a class="text-blue-500 hover:underline active:underline underline-offset-1" href="/privacy">{m.tos()}</a>
		</div>
	</div>
</footer>