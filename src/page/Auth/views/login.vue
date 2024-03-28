<template>
  <div
    class="background flex justify-center items-center bg-cover bg-center w-screen h-screen overflow-hidden bg-[#E7E9EE]"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px],"
    >
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">Masuk</h3>
      <div class="flex flex-col pb-[20px]">
        <label for="usernameEmail" class="font-medium pb-[3px] font-gunjarati"
          >Username / Email</label
        >
        <input
          type="text"
          id="usernameEmail"
          :placeholder="'Masukan Username atau Email'"
          class="border-2 h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
          v-model="usernameEmail"
        />
      </div>

      <div class="flex flex-col pb-[7px]">
        <label for="KataSandi" class="font-medium pb-[3px] font-gunjarati"
          >Kata Sandi</label
        >

        <input
          type="password"
          id="KataSandi"
          :placeholder="'Masukan Kata Sandi'"
          class="h-[48px] text-[15px] ps-[10px] tablet:pe-[9%] mobile:pe-[17%] bg-[#40475A] rounded-[6px] text-white"
          v-model="password"
        />
        <span class="relative tablet:left-[93%] bottom-[35px] mobile:left-[87%]"
          ><font-awesome-icon :icon="['far', 'eye']"
        /></span>
      </div>

      <p
        class="relative bottom-[20px] pb-6 font-semibold text-[#1459DF] desktop:text-[12px]"
      >
        <a href=""> Lupa Kata Sandi ? </a>
      </p>
      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
        @click="loginStart"
      >
        Masuk
      </button>
      <p class="pt-[3rem] pb-[20px] text-center font-semibold">
        Belum Punya Akun ?
        <span class="text-[#1459DF]"><a href="/daftar">Daftar</a></span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  name: "login",
  setup() {
    const store = useStore();

    const toast = useToast();
    const usernameEmail = ref("");
    const password = ref("");

    const postLoginReady = async (payload) => {
      let response = await store.dispatch("Auth/loginStart", payload);
      return response;
    };

    const loginStart = async () => {
      if (usernameEmail.value != "" && password.value != "") {
        let data = {
          user: usernameEmail.value,
          password: password.value,
        };

        await postLoginReady(data).then((res) => {
          toast.success("sukses", { dismissible: true, position: "top-right" });
        });
      }
    };

    return {
      usernameEmail,
      password,
      loginStart,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
}
</style>
