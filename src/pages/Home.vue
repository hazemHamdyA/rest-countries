<template>
  <div>
    <MainContent />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["ready"]);
emits("ready");
</script>

<style scoped></style>
