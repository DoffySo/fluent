<script setup lang="ts">

const {isMacOS, isApple, isWindows} = useDevice()

</script>

<template>
  <div class="download mx-auto text-center max-w-[45rem] flex flex-col gap-2">
    <h2 class="akony text-2xl sm:text-3xl md:text-4xl">Download</h2>
    <p class="text-xs md:text-sm text-gray-500">Start your journey with
      powerful features that enhance your chatting experience. Download the official Fluent
      application or use it in a browser.</p>
    <div class="buttons flex flex-col md:flex-row gap-2 items-center justify-center">
      <!-- Use web -->
      <LazyUButton class="hover:cursor-pointer" label="Continue in browser" variant="solid" color="neutral" size="sm" leading-icon="mdi:web" trailing-icon="lucide:arrow-right" />
      <!-- Web Extensions -->
      <LazyUPopover
          :content="{
                  align: 'center',
                  side: 'bottom',
                  sideOffset: 6
                }"
      >
        <UButton class="hover:cursor-pointer" label="Web Extension" color="neutral" variant="soft" leading-icon="i-mdi-extension" trailing-icon="i-lucide-chevron-down" size="sm" />

        <template #content>
          <div class="w-fit h-fit p-px flex flex-col gap-1">
            <UButtonGroup orientation="vertical" class="gap-1">
              <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                <div class="w-5 flex items-center">
                  <Icon name="lucide:git-branch" />
                </div>
                <span class="text-xs w-24">
                        Stable Release
                      </span>
                <div class="ms-1 w-4 flex items-center">
                  <Icon name="lucide:external-link" />
                </div>
              </div>
              <div class="flex items-center h-8 px-2 gap-1 hover:bg-sky-600/20 dark:hover:bg-sky-400/20 font-semibold rounded-md hover:cursor-pointer group">
                <div class="w-5 flex items-center text-sky-400">
                  <Icon name="lucide:git-fork" />
                </div>
                <span class="text-xs w-24">
                        Nightly Release
                      </span>
                <div class="ms-1 w-4 flex items-center">
                  <Icon name="lucide:external-link" />
                </div>
              </div>
            </UButtonGroup>

          </div>
        </template>
      </LazyUPopover>
      <!-- Applications -->
      <LazyUPopover
          :content="{
                  align: 'center',
                  side: 'bottom',
                  sideOffset: 6
                }">
        <LazyUButton class="hover:cursor-pointer" label="Applications" size="sm" color="neutral" variant="soft" leading-icon="i-proicons-apps" trailing-icon="i-lucide-chevron-down" />

        <template #content>
          <div class="w-fit h-fit p-px flex flex-col gap-1">
            <LazyUButtonGroup orientation="vertical" class="gap-1">
              <!-- Windows -->
              <template v-if="isWindows">
                <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                  <div class="w-5 flex items-center">
                    <Icon name="tabler:brand-windows-filled" />
                  </div>
                  <span class="text-xs w-24">
                      Windows
                    </span>
                  <div class="ms-1 w-4 flex items-center">
                    <Icon name="lucide:external-link" />
                  </div>
                </div>
              </template>
              <!-- MacOS -->
              <template v-else-if="isApple || isMacOS">
                <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                  <div class="w-5 flex items-center">
                    <Icon name="gravity-ui:logo-macos" />
                  </div>
                  <span class="text-xs w-24">
                      MacOS
                    </span>
                  <div class="ms-1 w-4 flex items-center">
                    <Icon name="lucide:external-link" />
                  </div>
                </div>
              </template>
              <!-- Linux -->
              <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                <div class="w-5 flex items-center">
                  <Icon name="uil:linux" />
                </div>
                <span class="text-xs w-24">
                      Linux
                    </span>
                <div class="ms-1 w-4 flex items-center">
                  <Icon name="lucide:external-link" />
                </div>
              </div>
              <LazyUSeparator />
              <template v-if="!isApple">
                <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                  <div class="w-5 flex items-center">
                    <Icon name="f7:logo-android" />
                  </div>
                  <span class="text-xs w-24">
                      Android
                    </span>
                  <div class="ms-1 w-4 flex items-center">
                    <Icon name="lucide:external-link" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center h-8 px-2 gap-1 hover:bg-neutral-600/20 dark:hover:bg-neutral-400/20 font-semibold rounded-md hover:cursor-pointer group">
                  <div class="w-5 flex items-center">
                    <Icon name="uil:apple" />
                  </div>
                  <span class="text-xs w-24">
                    iOS
                  </span>
                  <div class="ms-1 w-4 flex items-center">
                    <Icon name="lucide:external-link" />
                  </div>
                </div>
            </template>
            </LazyUButtonGroup>
          </div>
        </template>
      </LazyUPopover>
    </div>
  </div>
</template>

<style scoped>

</style>