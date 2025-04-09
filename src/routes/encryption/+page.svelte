<script lang="ts">
	import * as m from '$lib/paraglide/messages'
	import ChevronLeft from '~icons/lucide/chevron-left'

</script>


<div class="flex h-screen w-screen">
		<div class="flex flex-col w-10/12 mt-12 mx-auto my-auto">
			<div class="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
				<div class="flex flex-col">
					<h1 class="text-3xl md:text-4xl font-bold">{m.encryption_test_title()}</h1>
					<h5 class="text-sm md:text-md text-gray-600">{m.encryption_test_desc()}</h5>
				</div>
				<a class="text-md text-black md:text-gray-700 hover:text-black hover:underline underline-offset-1 flex items-center gap-px" href="/">
					<ChevronLeft class="text-sm" />
					<span>{m.err_btn()}</span>
				</a>
			</div>
		</div>
</div>