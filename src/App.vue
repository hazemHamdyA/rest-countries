<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();
const isLoading = ref(true);

const onReady = function () {
  isLoading.value = false;
};
</script>

<template>
  <section class="flex flex-col">
    <nav class="nav">
      <h1 class="text-2xhl text-white">Where in the world?</h1>
      <transition>
        <button
          class="flex gap-2 items-center"
          @click="mode = mode === 'light' ? 'dark' : 'light'"
        >
          <Icon icon="ph:sun" class="icon" v-if="mode === 'dark'" />
          <Icon icon="mingcute:moon-line" class="icon" v-else />
          <p>Dark Mode</p>
        </button>
      </transition>
    </nav>
    <RouterView @ready="onReady" v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
    <AppSpinner v-if="isLoading" />
    <!-- <RouterView /> -->
  </section>
</template>

<style lang="scss">
.light {
  background-color: rgb(194, 191, 191);
  color: black;
}

.icon {
  font-size: 2rem;
}
.nav {
  @apply flex justify-between py-4 px-10 bg-[#0f283094];
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
