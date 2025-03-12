<template>
  <div class="header-construction consruction">
    <div class="construction-container w-full min-h-10 h-fit bg-neutral-200 dark:bg-zinc-900 flex items-center justify-center text-center">
      <div class="flex flex-col sm:flex-row items-center gap-2">
        <div class="font-bold flex items-center gap-1 text-sm">
          <Icon name="lucide:triangle-alert" />
          Under construction
        </div>
        <div class="text-xs">
          Give us feedback on the new website in this <UButton class="p-0 hover:underline hover:cursor-pointer underline-offset-1" size="xs" variant="link">Form</UButton>.
        </div>
        <div>
          <UButton class="hover:cursor-pointer" icon="i-lucide-x" variant="ghost" size="sm" color="neutral" />
        </div>
      </div>
    </div>
  </div>
</template>