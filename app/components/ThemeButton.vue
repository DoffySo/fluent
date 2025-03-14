<script setup>
const props = defineProps({
  leadingIcon: { type: String },
})
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>
<!-- :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" -->
<template>
    <UButton
        color="neutral"
        variant="link"
        size="sm"
        :leading-icon="props.leadingIcon"
        @click="isDark = !isDark"
    >
      <slot />
    </UButton>
</template>
