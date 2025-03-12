<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UModal v-model:open="open">
    <UButton class="hover:cursor-pointer" label="Sign in" color="neutral" variant="solid" size="sm" />

    <template #header>
      <div class="flex flex-col mx-auto items-center gap-1 w-full">
        <h2 class="text-2xl md:text-3xl font-bold">Sign In to Fluent</h2>
        <p class="text-xs md:text-sm text-gray-400">Sign in or create an account to continue</p>
      </div>
    </template>

    <template #body>
      <div class="flex flex-col w-full items-center gap-1">
          <UButton label="Submit" color="neutral" size="lg" />
      </div>
    </template>

    <template #footer>
      <p class="text-xs mx-auto text-gray-400 dark:text-gray-300">
        By signing in, you agree to our <NuxtLink class="text-black dark:text-white hover:underline underline-offset-2" href="#">Terms of Service</NuxtLink> and <NuxtLink class="text-black dark:text-white hover:underline underline-offset-2" href="#">Privacy Policy</NuxtLink>.
      </p>
    </template>
  </UModal>
</template>