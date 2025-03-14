<script setup lang="ts">
const props = defineProps({
  leadingIcon: { type: String },
  forceDesktop: Boolean,
})
const open = ref(false)
const viewport = useViewport()
</script>

<template>
  <UModal v-model:open="open">
    <UButton v-if="forceDesktop || viewport.isGreaterThan('mobileWide') " class="hover:cursor-pointer" label="Sign in" color="neutral" variant="solid" size="sm" />
    <UButton v-else class="hover:cursor-pointer" label="Sign in" color="neutral" variant="link" size="sm" :leading-icon="props.leadingIcon" />

    <template #header>
      <div class="flex flex-col mx-auto items-center gap-1 w-full">
        <h2 class="text-2xl md:text-3xl font-bold">Sign In to Fluent</h2>
        <p class="text-xs md:text-sm text-gray-400">Sign in or create an account to continue</p>
      </div>
    </template>

    <template #body>
          <div class="flex flex-col justify-center w-full items-center gap-px">
            <div class="via-email flex flex-col gap-2">
              <div class="flex flex-col gap-px">
                <label class="text-sm text-gray-400 dark:text-gray-300" for="email">Email</label>
                <UInput id="email" color="neutral" variant="subtle" placeholder="" />
              </div>
              <div class="flex flex-col gap-px">
                <label class="text-sm text-gray-400 dark:text-gray-300" for="password">Password</label>
                <UInput id="password" color="neutral" variant="subtle" placeholder="" type="password" />
              </div>
              <div class="flex flex-col items-center justify-center">
                <UButton class="hover:cursor-pointer" disabled icon="mdi:email-outline" label="Continue with email" size="lg" variant="soft" color="neutral" />
              </div>
            </div>
            <template v-if="false">
              <USeparator class="my-2" label="OR" />
              <div class="via-oauth gap-2 flex flex-col">
                <UButton class="hover:cursor-pointer" color="neutral" label="Continue with GitHub" icon="mdi:github" variant="subtle" size="lg" />
                <UButton class="hover:cursor-pointer" color="neutral" label="Continue with Google" icon="mdi:google" variant="subtle" size="lg" />
                <UButton class="hover:cursor-pointer" color="neutral" label="Continue with Apple" icon="mdi:apple" variant="subtle" size="lg" />
              </div>
            </template>
      </div>

    </template>

    <template #footer>
      <p class="text-xs mx-auto text-gray-400 dark:text-gray-300">
        By signing in, you agree to our <LazyNuxtLink class="text-black dark:text-white hover:underline underline-offset-2" href="/tos">Terms of Service</LazyNuxtLink> and <LazyNuxtLink class="text-black dark:text-white hover:underline underline-offset-2" href="/privacy">Privacy Policy</LazyNuxtLink>.
      </p>
    </template>
  </UModal>
</template>