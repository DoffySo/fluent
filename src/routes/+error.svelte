<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as m from '$lib/paraglide/messages'

	function goBack() {
		goto("/")
		// history.length > 1 ? window.history.back() : goto('/');
	}

</script>

<div class="flex h-screen w-screen">
	<div class="flex w-10/12 lg:w-1/2 h-10/12 lg:h-1/2 mx-auto my-auto justify-center items-center">
		<div class="flex flex-col">
			<h5 class="text-gray-600 font-medium text-sm lg:text-md">{page.status} {page.error.message}</h5>
			<h1 class="font-bold text-2xl lg:text-4xl">{m.err_msg()}</h1>
			<Button class="bg-black text-white mt-4 flex hover:bg-neutral-800 active:bg-neutral-700" on:click={() => {goBack()}}>{m.err_btn()}</Button>
		</div>
	</div>
</div>