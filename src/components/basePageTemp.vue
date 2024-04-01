<template>
  <sideBar :showSideBar="conditionBar" @close="closeSide" />
  <div class="tablet:ml-64 bg-[#E7E9EE]">
    <div
      class="mobile:h-[50px] tablet:h-[60px] bg-[#D9D9D9] shadow-[0px_5px_8px_1px_rgba(0,0,0,0.3)] sticky top-0"
    >
      <div class="flex justify-between items-center h-full px-[20px]">
        <div v-if="!conditionButtonSideBar" class="h-[40px] w-[40px]"></div>
        <button v-if="conditionButtonSideBar" @click="sideBarAction">
          <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        </button>
        <p
          class="font-gunjarati font-bold mobile:text[15px] tablet:text-[20px]"
        >
          {{ titleName }}
        </p>
        <div class="flex items-center gap-2">
          <img
            :src="imageUser"
            class="rounded-full"
            alt="imageProfil"
            width="30"
            height="30"
          />

          <p class="font-gunjarati text-[14px] text-black font-normal">
            {{ username }}
          </p>
        </div>
      </div>
    </div>

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
import { jwtDecode } from "jwt-decode";
import { onMounted, ref } from "vue";

export default {
  name: "basePageTemp",
  components: {
    sideBar,
  },
  props: {
    titleName: String,
  },
  setup() {
    let imageUser = ref("");
    let username = ref("");

    let conditionButtonSideBar = ref(false);
    let conditionBar = ref(false);

    const closeSide = () => {
      conditionBar.value = !conditionBar.value;
    };
    const sideBarAction = () => {
      conditionBar.value = !conditionBar.value;
    };
    const checkConditionBtnSideBar = () => {
      if (window.innerWidth < 768) {
        conditionButtonSideBar.value = true;
      } else {
        conditionButtonSideBar.value = false;
        conditionBar.value = true;
      }
    };
    onMounted(() => {
      if (window.innerWidth < 768) {
        conditionButtonSideBar.value = true;
      }
      window.addEventListener("resize", checkConditionBtnSideBar);
      let dataAuth = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataAuth.token);
      console.log(dataUserReady);
      let dataUserImage = dataUserReady.profilAkun;
      // let dataUserImageReady = dataUserImage.replace(/^\.+/, "");
      // console.log(dataUserImageReady);
      imageUser.value = dataUserImage;

      username.value = dataUserReady.Username;
      console.log(window.innerWidth);
    });

    return {
      imageUser,
      username,
      conditionButtonSideBar,
      conditionBar,
      sideBarAction,
      closeSide,
    };
  },
};
</script>
