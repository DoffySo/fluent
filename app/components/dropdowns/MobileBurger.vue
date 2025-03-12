<script setup lang="ts">
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
      mode="hover"
      :close-delay="300"
  >
    <UButton color="neutral" icon="i-lucide-menu" variant="link" size="md" />

    <template #content>
      <div class="flex flex-col p-1 gap-1">
        <div class="theme flex items-center rounded px-1 hover:bg-neutral-300/10">
          <ThemeButton>
            <div class="flex gap-2 items-center">
              <Icon v-if="colorMode.value == 'dark'" name="lucide:sun" />
              <Icon v-else name="lucide:moon" />
              Toggle Theme
            </div>
          </ThemeButton>
        </div>
        <USeparator />
        <div class="policy flex items-center rounded px-1 hover:bg-neutral-300/10">
          <UButton
              color="neutral"
              variant="link"
              size="xs">
            <div class="flex gap-2 items-center">
              <Icon name="lucide:lock" />
              Privacy Policy
            </div>
          </UButton>
        </div>
        <div class="tos flex items-center rounded px-1 hover:bg-neutral-300/10">
          <UButton
              color="neutral"
              variant="link"
              size="xs">
            <div class="flex gap-2 items-center">
              <Icon name="lucide:file-text" />
              Terms of Service
            </div>
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>
<script setup lang="ts">
</script>