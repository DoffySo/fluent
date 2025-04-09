<script lang="ts">
	import TriangleAlert from '~icons/lucide/triangle-alert'
	import X from '~icons/lucide/x'
	import { Button } from '$lib/components/ui/button';
	import * as m from '$lib/paraglide/messages'
</script>

<div class="alert-bar min-h-10 pt-2 md:pt-0 bg-neutral-400 dark:bg-neutral-200 items-center-safe flex flex-col md:flex-row justify-center gap-1 text-sm">
		<TriangleAlert />
		<span class="font-medium">{m.header_alert_title()}</span>
		<span>
			{m.header_alert_desc()} <span class="text-blue-500 hover:cursor-pointer hover:underline underline-offset-1">{m.header_alert_link()}</span>.
		</span>
		<Button class="hover:bg-neutral-700/30 w-8 h-8 hover:cursor-pointer" variant="link" size="icon">
			<X />
		</Button>
</div>