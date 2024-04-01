<template>
  <sideBar />
</template>

<script>
import { defineComponent } from "vue";
import sideBar from "../../../components/sideBar.vue";
export default defineComponent({
  name: "dashboardPage",
  components: {
    sideBar,
  },
});
</script>
