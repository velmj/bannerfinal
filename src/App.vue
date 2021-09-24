<script>

import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue'

export default {
  components: {
    Header,
    SideBar
  },
  setup() {
  },
}

</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <SideBar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <Header />

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>

</style>
