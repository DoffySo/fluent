<script setup lang="ts">

</script>

<template>
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
</template>

<style scoped>

</style>