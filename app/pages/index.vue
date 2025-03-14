<template>
  <div class="pt-24">
    <div class="flex flex-col px-4 w-full gap-[10rem]">
      <HeroIndex />
      <DownloadIndex />
      <SourceIndex />
    </div>
  </div>
</template>


<script setup lang="ts">
import HeroIndex from "~/components/HeroIndex.vue";
import DownloadIndex from "~/components/DownloadIndex.vue";
import SourceIndex from "~/components/SourceIndex.vue";

const viewport = useViewport()
const route = useRoute()
const reason = route.query.reason
</script>