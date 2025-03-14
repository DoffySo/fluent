<script setup lang="ts">
const props = defineProps({
  headerLinks: { type: Object, default: () => [] },
})

import AuthModal from "~/components/modals/AuthModal.vue";
const colorMode = useColorMode()

</script>

<template>
  <UPopover
      :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 4
    }"
      class="hover:cursor-pointer"
      :close-delay="300"
  >
    <UButton color="neutral" icon="i-lucide-menu" variant="link" size="xl" />

    <template #content>
      <UButtonGroup class="flex flex-col p-1 gap-px px-1">
        <div class="flex items-center gap-px hover:bg-neutral-700/20 rounded-sm hover:cursor-pointer">
          <AuthModal leading-icon="lucide:circle-user" size="md" />
        </div>
        <LazyUSeparator />
        <div v-for="link in props.headerLinks" :key="link" class="flex items-center gap-px hover:bg-neutral-700/20 rounded-sm hover:cursor-pointer group">
          <LazyNuxtLink :href="link.href || '#'" class="group-hover:cursor-pointer w-full h-full text-sm">
            <UButton class="group-hover:cursor-pointer w-full h-full" label="Privacy Policy" variant="link" color="neutral" size="sm">{{link.text}}</UButton>
          </LazyNuxtLink>
        </div>
        <LazyUSeparator />
        <div class="flex items-center gap-px hover:bg-neutral-700/20 rounded-sm hover:cursor-pointer group">
          <UButton class="group-hover:cursor-pointer w-full h-full" leading-icon="lucide:lock" label="Privacy Policy" variant="link" color="neutral" size="sm" />
        </div>
        <div class="flex items-center gap-px hover:bg-neutral-700/20 rounded-sm hover:cursor-pointer group">
          <UButton class="group-hover:cursor-pointer w-full h-full" leading-icon="lucide:file-text" label="Terms of Service" variant="link" color="neutral" size="sm" />
        </div>
        <div class="flex items-center gap-px hover:bg-neutral-700/20 rounded-sm hover:cursor-pointer">
          <!--          <Icon v-if="colorMode.value == 'dark'" name="lucide:sun" />-->
          <ThemeButton v-if="colorMode.value == 'dark'" leading-icon="lucide:sun">Theme</ThemeButton>
          <ThemeButton v-else leading-icon="lucide:moon">Theme</ThemeButton>
        </div>
      </UButtonGroup>
    </template>
  </UPopover>
</template>
<script setup lang="ts">
</script>