<template>
  <div
    :class="`bg-[#a6a3a3bf] fixed flex h-screen justify-center left-0 top-0 w-screen ${
      actived ? 'z-50 opacity-100 duration-300' : 'opacity-0 -z-10 duration-500'
    }`"
  >
    <div
      :class="`flex flex-col h-full justify-end mobile:w-[18rem] tablet:w-[35rem] desktop:w-[50rem] z-50 ${
        actived ? 'translate-y-0 duration-500' : 'translate-y-full duration-500'
      } `"
    >
      <div class="judul">
        <div
          class="bg-[#F6F6F6] flex h-[max-content] justify-between px-5 py-3 w-full items-center rounded-tl-xl rounded-tr-xl"
        >
          <div class="h-2 w-2"></div>
          <span class="font-gunjarati font-semibold">{{ title }}</span>
          <div @click="closeModalXmark">
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              size="xl"
              style="color: red"
            />
          </div>
        </div>
      </div>

      <div class="bg-[#F6F6F6] h-[max-content] px-5 py-2">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, watch, ref } from "vue";
export default defineComponent({
  name: "baseModal",
  props: {
    title: String,
    actived: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    watchEffect(() => {
      emit("input", false);
    });
    const closeModalXmark = () => {
      emit("close");
    };
    const closeModal = () => {
      emit("close");
    };

    return {
      closeModal,
      closeModalXmark,
    };
  },
});
</script>
