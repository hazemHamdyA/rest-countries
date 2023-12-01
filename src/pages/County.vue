<template>
  <section class="px-10 py-4 flex flex-col gap-20">
    <div class="btn">
      <button @click="$router.back()">{{ "<-" }} Back</button>
    </div>
    <div
      v-for="con in county"
      :key="con.name.comon"
      class="flex gap-32 items-center"
    >
      <img :src="con.flags.png" alt="county flag" />
      <div class="flex flex-col gap-8">
        <h1 class="text-4xl font-bold">
          {{ con.name.common }}
        </h1>
        <div class="details">
          <p>
            Native Name:
            <span>
              {{ con.name.nativeName.eng?.official ?? con.name.official }}
            </span>
          </p>
          <p>
            Population:
            <span> {{ formtNumber(con.population) }}</span>
          </p>
          <p>
            Region: <span> {{ con.region }}</span>
          </p>
          <p>
            Sub Region: <span> {{ con.subregion }}</span>
          </p>
          <p>
            Capital: <span> {{ con.capital[0] }}</span>
          </p>
          <p>
            Top Level Domain: <span> {{ con.demonyms.eng.f }} </span>
          </p>
          <p>
            Currencies:
            <span>
              {{ con.currencies[Object.keys(con.currencies)?.[0]].name }}</span
            >
          </p>
          <p>
            Languages:
            <span> {{ Object.values(con.languages).join(", ") }} </span>
          </p>
        </div>
        <div>
          <p class="flex gap-4">
            Border Countries:
            <button
              class="px-4 text-white bg-[#0f283094]"
              v-for="border in neighbours"
              :key="border"
              v-if="Array.isArray(neighbours)"
            >
              {{ border.name.common }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps(["name"]);
const emits = defineEmits(["ready"]);
const county: any = reactive([]);
let neighbours: any = reactive([]);
const formtNumber = function (number: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(number);
};

const getCountyByName = async function () {
  const requestCountry = await fetch(
    `https://restcountries.com/v3.1/name/${props.name}`
  );
  const dataCountry = (await requestCountry.json())[0];
  let borders = dataCountry.borders;
  if (borders) {
    for (const border of borders) {
      const neighboursRequest = await fetch(
        `https://restcountries.com/v3.1/alpha/${border}`
      );
      const neighbourData = await neighboursRequest.json();
      neighbours.push(...neighbourData);
    }
  } else {
    neighbours = "no neighbours found";
  }
  county.push(dataCountry);
  emits("ready");
};
getCountyByName();
</script>

<style scoped>
.btn {
  @apply text-white mr-auto bg-[#0f283094];
  display: inline-block;
  padding: 0.2rem 2rem;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 600;
}
img {
  height: 18rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 18px;
  grid-column-gap: 8.5rem;

  & p {
    font-weight: 500;

    & span {
      font-weight: 300;
    }
  }
}
</style>
