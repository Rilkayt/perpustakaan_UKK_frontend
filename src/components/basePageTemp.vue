<template>
  <slot name="modal"></slot>
  <div>
    <sideBar
      :showSideBar="conditionBar"
      :tipe="tipeUser"
      @close="closeSide"
      class="z-1"
    />
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
          <div>
            <div
              class="flex items-center gap-2 p-2 hover:bg-[#cccdd1] hover:rounded-md hover:duration-300 duration-300"
              @click="dropDownClicked"
            >
              <div class="w-6 h-6">
                <img
                  :src="`../..${imageUser}`"
                  class="rounded-full w-full h-full"
                  alt="imageProfil"
                />
              </div>

              <p
                class="font-gunjarati text-[14px] text-black font-normal pt-[0.2px]"
              >
                {{ username }}
              </p>
            </div>
            <div
              :class="`absolute bg-[#E7E9EE] p-2 rounded-lg border-[1px] border-[#706f6f] w-64 right-0 m-2 shadow-[0px_7px_5px_1px_rgba(0,0,0,0.3)] ${
                checkDropDown
                  ? `opacity-100 transition-opacity duration-500 ${
                      !hidden ? 'block' : ''
                    }`
                  : `opacity-0 transition-opacity duration-500 ${
                      hidden ? 'hidden' : ''
                    }`
              }`"
              v-show="checkDropDown"
            >
              <div>
                <div
                  class="font-gunjarati px-2 py-2 hover:bg-[#cccdd1] hover:rounded-md hover:duration-300 flex justify-between"
                  @click="checkDropDown ? goToAccount() : ''"
                >
                  Akun
                  <font-awesome-icon
                    :icon="['fas', 'arrow-up-right-from-square']"
                  />
                </div>
                <div
                  class="font-gunjarati px-2 py-2 hover:bg-[#cccdd1] hover:rounded-md hover:duration-300"
                  @click="checkDropDown ? logOut() : ''"
                >
                  Keluar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden min-h-dvh">
        <slot name="content"></slot>
      </div>
      <div
        :class="`sticky bottom-0 ${footerRight ? 'flex justify-end' : null}`"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "./sideBar.vue";
import baseModal from "./baseModal.vue";
import { jwtDecode } from "jwt-decode";
import { onMounted, ref, watchEffect } from "vue";
import BaseModal from "./baseModal.vue";
import { useStore } from "vuex";

export default {
  name: "basePageTemp",
  components: {
    sideBar,
    baseModal,
  },
  props: {
    titleName: String,
    footerRight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let imageUser = ref("");
    let username = ref("");

    const store = useStore();

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

    const tipeUser = ref("");
    onMounted(async () => {
      if (window.innerWidth < 768) {
        conditionButtonSideBar.value = true;
      }
      window.addEventListener("resize", checkConditionBtnSideBar);
      await store.dispatch("Account/getAccount").then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        imageUser.value = res.data[1].data.ProfilAkun;
        username.value = res.data[1].data.Username;
        tipeUser.value = res.data[1].data.Tipe;
      });
      // let dataAuth = JSON.parse(localStorage.getItem("token"));
      // let dataUserReady = jwtDecode(dataAuth.token);
      // console.log(dataUserReady);
      // let dataUserImage = dataUserReady.profilAkun;
      // let dataUserImageReady = dataUserImage.replace(/^\.+/, "");
      // console.log(dataUserImageReady);

      console.log("🚀 ~ onMounted ~ imageUser:", imageUser.value);

      console.log(window.innerWidth);
    });

    const checkDropDown = ref(false);
    const dropDownClicked = () => {
      checkDropDown.value = !checkDropDown.value;
    };

    const goToAccount = () => {
      window.location.href = "/akun";
    };
    const logOut = () => {
      localStorage.removeItem("token");
      window.location.href = "/masuk";
    };

    let hidden = ref(false);
    watchEffect(() => {
      if (checkDropDown.value) {
        setTimeout(() => {
          hidden.value = false;
        }, 3000);
      } else {
        setTimeout(() => {
          hidden.value = true;
        }, 3000);
      }
    });
    return {
      imageUser,
      username,
      conditionButtonSideBar,
      conditionBar,
      sideBarAction,
      closeSide,
      checkDropDown,
      dropDownClicked,
      goToAccount,
      logOut,
      hidden,
      tipeUser,
    };
  },
};
</script>
