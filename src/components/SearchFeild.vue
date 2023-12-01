<template>
  <div class="relative">
    <input
      type="search"
      placeholder="Search for a country..."
      class="py-2 px-12 rounded-xl"
      v-model="searchInput"
      @keyup.capture="sendName"
    />
    <Icon icon="material-symbols:search" class="icon" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const emits = defineEmits(["search-value"]);
const searchInput = ref(null);
const sendName = function () {
  emits("search-value", searchInput.value);
};
</script>

<style scoped>
.icon {
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 1.3rem;
}
</style>
