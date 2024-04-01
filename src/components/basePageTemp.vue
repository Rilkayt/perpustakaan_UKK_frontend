<template>
  <sideBar />
  <div class="mobile:ml-64">
    <slot name="title"></slot>

    <div class="overflow-hidden min-h-dvh">
      <slot name="content"></slot>
    </div>
    <div class="sticky bottom-0">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import sideBar from "./sideBar.vue";

export default {
  name: "basePageTemp",
  components: {
    sideBar,
  },
};
</script>
