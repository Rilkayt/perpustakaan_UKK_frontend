<template>
  <basePageTemp :titleName="'Beranda'">
    <template v-slot:content> oaskdokaso </template>
  </basePageTemp>
</template>

<script>
import { defineComponent } from "vue";
import basePageTemp from "../../../components/basePageTemp.vue";
import titleTemp from "../../../components/titleTemp.vue";
export default defineComponent({
  name: "dashboardPage",
  components: {
    basePageTemp,
    titleTemp,
  },
  setup() {},
});
</script>
