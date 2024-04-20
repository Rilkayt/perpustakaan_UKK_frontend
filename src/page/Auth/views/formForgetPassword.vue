<template>
  <div
    class="background flex justify-center items-center bg-cover bg-center w-screen h-screen overflow-hidden bg-[#E7E9EE]"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px],"
    >
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">
        Ubah Kata Sandi
      </h3>

      <div class="pb-[15px]">
        <label for="password" class="font-medium pb-[3px] font-gunjarati"
          >Kata Sandi Baru</label
        >

        <div class="relative">
          <input
            :type="buttonEye ? 'text' : 'password'"
            id="password"
            :placeholder="'Masukan Kata Sandi'"
            required
            class="border-2 h-[52px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white w-[100%] tablet:pe-[8%] mobile:pe-[20%]"
            v-model="password"
          />
          <button
            class="absolute h-[max-content] top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none active:outline-none"
            @click="buttonEyeAction"
          >
            <span class="flex-shrink-0 text-gray-400" v-if="!buttonEye"
              ><font-awesome-icon :icon="['far', 'eye']"
            /></span>
            <span class="flex-shrink-0 text-gray-400" v-if="buttonEye"
              ><font-awesome-icon icon="fa-regular fa-eye-slash"
            /></span>
          </button>
        </div>
      </div>
      <div class="pb-[15px]">
        <label for="passwordConfirm" class="font-medium pb-[3px] font-gunjarati"
          >Konfirmasi Kata Sandi Baru</label
        >

        <div class="relative">
          <input
            :type="buttonEyeConfirm ? 'text' : 'password'"
            id="passwordConfirm"
            :placeholder="'Masukan konfirmasi Kata Sandi'"
            required
            class="border-2 h-[52px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white w-[100%] tablet:pe-[8%] mobile:pe-[20%]"
            v-model="passwordConfirm"
          />
          <button
            class="absolute h-[max-content] top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none active:outline-none"
            @click="buttonEyeActionConfirm"
          >
            <span class="flex-shrink-0 text-gray-400" v-if="!buttonEyeConfirm"
              ><font-awesome-icon :icon="['far', 'eye']"
            /></span>
            <span class="flex-shrink-0 text-gray-400" v-if="buttonEyeConfirm"
              ><font-awesome-icon icon="fa-regular fa-eye-slash"
            /></span>
          </button>
        </div>
      </div>

      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0] disabled:bg-[#d4b452e0]"
        @click="changePasswordStart"
        :disabled="buttonLoading"
        type="button"
      >
        <svg
          v-if="buttonLoading"
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 me-3 text-[#2e2d2d] animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        {{ !buttonLoading ? "Simpan" : "Loading" }}
      </button>
      <p class="pt-[3rem] pb-[20px] text-center font-semibold">
        Ingat Akun ?
        <span class="text-[#1459DF]"><a href="/masuk">Masuk</a></span>
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "formForgetPassword",
  setup() {
    const store = useStore();
    const router = useRouter();

    const toast = useToast();
    const password = ref("");
    const passwordConfirm = ref("");

    const buttonLoading = ref(false);
    const buttonEye = ref(false);
    const buttonEyeConfirm = ref(false);

    const buttonEyeAction = () => {
      buttonEye.value = !buttonEye.value;
    };
    const buttonEyeActionConfirm = () => {
      buttonEyeConfirm.value = !buttonEyeConfirm.value;
    };

    const changePasswordStart = async () => {
      if (password.value != "" && passwordConfirm.value != "") {
        buttonLoading.value = true;
        if (password.value === passwordConfirm.value) {
          let data = {
            email: store.state.Auth.emailUser,
            password: password.value,
            otp: store.state.Auth.otpForget,
          };

          await store.dispatch("Auth/changePasswordStart", data).then((res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Berhasil Mengubah Kata Sandi", {
                hideProgressBar: true,
                closeButton: false,
              });
              router.push({ name: "login" });
              buttonLoading.value = false;
            } else if (res.code === "ERR_NETWORK") {
              toast.error("terdapat masalah pada server", {
                hideProgressBar: true,
                closeButton: false,
              });
              buttonLoading.value = false;
            } else {
              toast.error(res.response.data[0].message, {
                hideProgressBar: true,
                closeButton: false,
              });
              buttonLoading.value = false;
            }
          });
        } else {
          toast.error("Kata Sandi Tidak Sama", {
            hideProgressBar: true,
            closeButton: false,
          });
          buttonLoading.value = false;
        }
      } else {
        toast.warning("kata sandi wajib diisi", {
          hideProgressBar: true,
          closeButton: false,
        });
      }
    };

    onMounted(() => {
      if (
        store.state.Auth.emailUser === "" &&
        store.state.Auth.otpForget === ""
      ) {
        window.location.href = "/lupa-kata-sandi";
      }
    });

    return {
      password,
      passwordConfirm,
      buttonLoading,
      buttonEye,
      buttonEyeConfirm,
      buttonEyeAction,
      buttonEyeActionConfirm,
      changePasswordStart,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
}
</style>
