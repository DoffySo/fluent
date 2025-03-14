<template>
  <div class="pt-24">
    <div class="flex flex-col px-4 w-full gap-[10rem]">
      <div class="hero min-h-120 md:min-h-160 w-full bg-linear-to-b from-white dark:from-zinc-950 from-16% via-sky-500 via-77% to-neutral-200 dark:to-white rounded-xl flex md:flex-col lg:flex-row p-8 md:p-[2rem] lg:p-[5.5rem] justify-center md:justify-between items-center gap-2">
          <div class="hero-content h-fit flex flex-col gap-3">
            <div class="content break-words max-w-130 lg:max-w-160">
              <h1 class="text-xl sm:text-[2rem] lg:text-[2.5rem] uppercase akony tracking-normal break-words text-black dark:text-white">
                Your Encrypted Messenger In
                <span class="text-transparent font-bold uppercase tracking-wide text-xl sm:text-[2rem] lg:text-[2.5rem]" style="-webkit-text-stroke: 1.5px #fff;">
                A Browser
              </span>
              </h1>
              <p class="text-black dark:text-white text-xs sm:text-sm md:text-md">
                Fluent is a fast and private web messenger with strong encryption, built for secure communication.
              </p>
            </div>
            <div class="buttons flex gap-2">
              <AuthModal />
              <UButton class="text-black dark:text-white hover:cursor-pointer" variant="ghost" color="neutral" size="md">Learn More</UButton>
            </div>
          </div>
          <div v-if="viewport.isGreaterThan('tablet')" class="hero-image w-24 h-24"></div>
      </div>
      <div class="download mx-auto text-center max-w-[45rem] flex flex-col gap-2">
        <h2 class="akony text-2xl md:text-4xl">Download</h2>
        <p class="text-xs md:text-sm text-gray-500">Start your journey with
          powerful features that enhance your chatting experience. Download the official Fluent
          application or use it in a browser.</p>
        <div class="buttons">
            <UPopover
                :content="{
                  align: 'center',
                  side: 'bottom',
                  sideOffset: 6
                }"
            >
              <UButton class="hover:cursor-pointer" label="Web Extension" color="neutral" variant="solid" leading-icon="i-lucide-layout-panel-top" trailing-icon="i-lucide-chevron-down" size="sm" />

              <template #content>
                <div class="w-fit h-fit p-px flex flex-col gap-1">
                  <UButtonGroup orientation="vertical">
                    <UButton class="hover:cursor-pointer" label="Stable Release" color="success" variant="ghost" leading-icon="i-lucide-git-branch" trailing-icon="i-lucide-external-link" size="sm" />
                    <UButton class="hover:cursor-pointer" label="Nighlty Release" color="warning" variant="ghost" leading-icon="i-lucide-git-fork" trailing-icon="i-lucide-external-link" size="sm" />
                  </UButtonGroup>

                </div>
              </template>
            </UPopover>
        </div>
      </div>
      <div class="source mx-auto text-center items-center max-w-[35rem] flex flex-col gap-4">
        <Icon name="mdi:github" size="48" />
        <h1 class="text-4xl font-bold">
          Source-Available
        </h1>
        <p class="text-sm">
          Our entire codebase is available on GitHub with a source-available license. Anyone can
          view and contribute.
        </p>
        <LazyNuxtLink href="https://github.com/DoffySo/fluent">
          <UButton class="hover:cursor-pointer" color="neutral">Contribute</UButton>
        </LazyNuxtLink>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import AuthModal from "~/components/modals/AuthModal.vue";

const viewport = useViewport()
const route = useRoute()
const reason = route.query.reason
import ThemeButton from "~/components/ThemeButton.vue";
</script>