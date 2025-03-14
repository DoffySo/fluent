<script setup lang="ts">

</script>

<template>
  <footer class="footer flex mt-16 w-full h-27 py-2 px-1">
    <div class="footer-container w-full flex flex-col gap-2">
      <div class="flex w-full h-12 justify-between items-center">
        <div class="left">
        </div>
        <div class="right links">
          <LazyNuxtLink href="https://github.com/DoffySo/fluent">
            <Icon name="mdi:github" size="32" />
          </LazyNuxtLink>
        </div>
      </div>
      <USeparator />
      <div class="flex w-full justify-center items-start gap-3 md:gap-2 h-10 boston">
        <p class="text-xs md:text-sm text-center gap-1 flex flex-wrap">Fluent Messenger. <span>© {{ new Date().getFullYear() }}</span></p>
        <div class="links flex items-center gap-4 md:gap-3">
          <LazyNuxtLink class="text-blue-400 text-xs md:text-sm hover:underline underline-offset-2" href="#">Privacy Policy</LazyNuxtLink>
          <LazyNuxtLink class="text-blue-400 text-xs md:text-sm hover:underline underline-offset-2" href="#">Terms of Service</LazyNuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>