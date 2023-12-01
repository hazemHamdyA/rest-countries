<template>
  <router-link
    v-for="country in newCountries"
    :key="country.flag"
    class="cursor-pointer"
    v-auto-animate
    :to="{
      name: 'county',
      params: {
        name: country.name.common,
      },
    }"
  >
    <div>
      <img
        class="h-[12rem] w-[15rem]"
        :src="country.flags.png"
        alt="county flag"
      />
    </div>
    <div class="county">
      <h3>{{ country.name.common }}</h3>
      <div class="">
        <p>Population: {{ country.population }}</p>
        <p>Region: {{ country.region }}</p>
        <p>Capital: {{ country.capital?.[0] }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate";
defineProps(["newCountries"]);
</script>

<style scoped>
.county {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: #0f283094;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 15rem;
}
</style>
