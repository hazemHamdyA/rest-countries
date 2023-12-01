<template>
  <div>
    <input
      list="region"
      placeholder="Filter by Region"
      class="py-2 px-6 rounded-xl"
      v-model="filterName"
      @keyup.capture="sendDate"
    />
    <datalist id="region">
      <option value="Africa"></option>
      <option value="Americas"></option>
      <option value="Asia"></option>
      <option value="Europe"></option>
      <option value="Oceania"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(["filter-region"]);
const filterName = ref("");
const sendDate = function () {
  emits("filter-region", filterName.value);
};
</script>

<style scoped></style>
