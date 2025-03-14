<script setup lang="ts">
import AuthModal from "~/components/modals/AuthModal.vue";
import WideBurger from "~/components/dropdowns/WideBurger.vue";
import UnderConstruction from "~/components/header/UnderConstruction.vue";
import MobileBurger from "~/components/dropdowns/MobileBurger.vue";

const viewport = useViewport()
watch(viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint)
})


const links = [
  {
    text: "FAQ",
    href: "/faq",
  },
  {
    text: "Applications",
    href: "/apps",
  },
  {
    text: "API",
    href: "/docs",
  },
  {
    text: "Feedbacks",
    href: "/feedbacks",
  }
]
</script>

<template>
  <header class="header flex flex-col w-full fixed z-50">
    <div class="header-container h-12 flex items-center bg-white dark:bg-neutral-950 border-b border-gray-300 dark:border-neutral-700 px-4 justify-between">
      <div class="left flex items-center h-full gap-2">
        <div class="logo">
          <LazyNuxtLink class="font-black text-xl text-black dark:text-white" href="/">
            FLUENT
          </LazyNuxtLink>
        </div>
        <div v-if="viewport.isGreaterThan('mobileWide')" class="links items-center gap-3 flex">
          <LazyNuxtLink v-for="(link, id) in links" :key="id" class="text-sm text-neutral-800 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 duration-100" :href="link.href">
            {{ link.text }}
          </LazyNuxtLink>
        </div>
      </div>
      <div v-if="viewport.isGreaterThan('mobileWide')" class="right flex items-center h-full gap-2">
        <WideBurger />
        <AuthModal />
      </div>
      <div v-else class="right flex items-center h-full gap-2">
        <MobileBurger :header-links="links" />
      </div>
    </div>
  <UnderConstruction />
  </header>
</template>

<style scoped>

</style>