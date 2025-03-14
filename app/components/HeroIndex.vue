<script setup lang="ts">

import AuthModal from "~/components/modals/AuthModal.vue";
const viewport = useViewport()
</script>

<template>
  <div class="hero min-h-120 md:min-h-160 w-full bg-linear-to-b from-white dark:from-zinc-950 from-16% via-sky-500 via-77% to-neutral-200 dark:to-white rounded-xl flex md:flex-col lg:flex-row p-8 md:p-[2rem] lg:p-[5.5rem] justify-center md:justify-between items-center gap-2">
    <div class="hero-content h-fit flex flex-col gap-3 p-[1rem]">
      <div class="content break-words max-w-120 lg:max-w-155">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl uppercase akony tracking-normal break-words text-black dark:text-white">
          Encrypted Messenger In
          <span class="text-transparent font-bold uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl" style="-webkit-text-stroke: 1.5px #fff;">
                The Browser
              </span>
        </h1>
        <p class="text-black dark:text-white text-sm sm:text-md md:text-lg">
          Fluent is a fast and private web messenger with strong encryption, built for secure communication.
        </p>
      </div>
      <div class="buttons flex gap-2">
        <AuthModal :force-desktop="true" />
        <UButton class="text-black dark:text-white hover:cursor-pointer" variant="ghost" color="neutral" size="md">Learn More</UButton>
      </div>
    </div>
    <div v-if="viewport.isGreaterThan('tablet')" class="hero-image w-24 h-24"></div>
  </div>
</template>

<style scoped>

</style>