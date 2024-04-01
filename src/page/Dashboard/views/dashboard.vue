<template>
  <basePageTemp>
    <template v-slot:title>
      <titleTemp :titleName="'Beranda'" />
    </template>
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
});
</script>
