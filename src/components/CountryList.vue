<template>
  <div>
    <div class="flex justify-between">
      <SearchFeild @search-value="getCountryName" />
      <FilterFeild @filter-region="getRegion" />
    </div>
    <div class="continer pt-10 poin">
      <CountryItem :newCountries="newCountries" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from "vue";
const emits = defineEmits(["ready"]);

let countries: any = reactive([]);
const region = ref("");
const newCountries = computed(() => {
  const tests = countries.filter((e: any) => {
    const test =
      e.region.toLowerCase() === region.value.toLowerCase() ||
      e.name.common.toLowerCase() === countryName.value.toLowerCase();
    return test;
  });
  return tests.length === 0 ? countries : tests;
});
const countryName = ref("");
const getAllCountries = async function () {
  const request = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await request.json();
  countries.push(...data);
  emits("ready");
};
const getCountryName = function (val: string) {
  countryName.value = val;
};
const getRegion = function (val: string) {
  region.value = val;
  console.log(val);
};
onMounted(getAllCountries);
</script>

<style scoped>
.continer {
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  justify-content: space-around;
}
</style>
