<template>
  <div
    class="background flex justify-center items-center bg-cover bg-center w-screen h-screen overflow-hidden bg-[#E7E9EE]"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px],"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">OTP</h3>

      <div class="flex justify-evenly">
        <input
          ref="input1"
          type="text"
          class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
          maxlength="1"
          v-model="inputPoint1"
          @keydown="checkInput"
          @input="checkFullOtp"
          id="input1"
        />
        <input
          ref="input2"
          type="text"
          class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
          maxlength="1"
          v-model="inputPoint2"
          @keydown="checkInput"
          @input="checkFullOtp"
          id="input2"
        />
        <input
          ref="input3"
          type="text"
          class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
          maxlength="1"
          v-model="inputPoint3"
          @keydown="checkInput"
          @input="checkFullOtp"
          id="input3"
        />
        <input
          ref="input4"
          type="text"
          class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
          maxlength="1"
          v-model="inputPoint4"
          @keydown="checkInput"
          @input="checkFullOtp"
          id="input4"
        />
      </div>

      <p class="pt-[2rem] pb-[30px] text-center font-semibold">
        Belum Menerima OTP ?
        <span class="text-[#1459DF]"
          ><button
            @click="postAgainOtp"
            :disabled="seconds == 0 ? false : true"
          >
            <template v-if="!buttonLoadingOTP">
              {{
                seconds == 0
                  ? "Kirim Ulang"
                  : seconds < 10
                  ? `00:0${seconds}`
                  : `00:${seconds}`
              }}
            </template>
            <svg
              v-if="buttonLoadingOTP"
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
            </svg></button
        ></span>
      </p>

      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
        :disabled="buttonLoading"
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
        {{ !buttonLoading ? "Daftar" : "Loading" }}
      </button>

      <p class="pt-[2rem] pb-[30px] text-center font-semibold">
        Sudah Punya Akun ?
        <span class="text-[#1459DF]"><a href="">Masuk</a></span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

let timeExpired = new Date().getTime() + 1000 * 60 * 1;

export default {
  name: "otpRegister",
  setup() {
    const router = useRouter();
    const store = useStore();
    const toast = useToast();

    let inputPoint1 = ref("");
    let inputPoint2 = ref("");
    let inputPoint3 = ref("");
    let inputPoint4 = ref("");
    let seconds = ref(0);

    let otpFull = "";

    let buttonLoading = ref(false);
    let buttonLoadingOTP = ref(false);

    const checkInput = (e) => {
      // input 1 and 2
      if (
        inputPoint1.value != "" &&
        e.key == "Backspace" &&
        inputPoint2.value == "" &&
        inputPoint4.value == ""
      ) {
        inputPoint1.value = "";
        inputRefs.input1.focus();
      }
      if (
        inputPoint1.value != "" &&
        inputPoint3.value == "" &&
        inputPoint4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint1.value = "";
          inputPoint2.value = "";
          if (inputPoint2.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input1.focus());
        }
        inputRefs.input2.focus();
      }
      // input 2 dan3
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint2.value = "";
          inputPoint3.value = "";
          if (inputPoint3.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input2.focus());
        }
        inputRefs.input3.focus();
      }
      //  input 3 and 4
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint3.value = "";
          inputPoint4.value = "";
          if (inputPoint4.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input3.focus());
        }
        inputRefs.input4.focus();
      }
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != "" &&
        inputPoint4.value != ""
      ) {
        otpFull =
          inputPoint1.value +
          inputPoint2.value +
          inputPoint3.value +
          inputPoint4.value;

        console.log(otpFull);
      }
    };

    const checkFullOtp = async () => {
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != "" &&
        inputPoint4.value != ""
      ) {
        buttonLoading.value = true;
        otpFull =
          inputPoint1.value +
          inputPoint2.value +
          inputPoint3.value +
          inputPoint4.value;

        let data = store.state.Auth.dataRegister;
        data.otp = otpFull;
        await store.dispatch("Auth/registerStart", data).then((res) => {
          console.log(res);
          buttonLoading.value = false;
          if (res.status == 200) {
            toast.success("Berhasil Mendaftar Akun");
            setTimeout(() => {
              window.location.href = "/masuk";
            }, 2000);
          } else if (res.response.data[0].message == "otp tidak valid") {
            //
            toast.error("otp yang di masukan salah", {
              hideProgressBar: true,
              closeButton: false,
            });
          } else {
            window.location.href = "/daftar";
          }
        });
        // console.log(data);
      }
    };

    const inputRefs = {
      input1: null,
      input2: null,
      input3: null,
      input4: null,
    };

    const countDownOtp = () => {
      let a = setInterval(() => {
        let timeNow = new Date().getTime();

        let distance = timeExpired - timeNow;

        seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds.value == 0) {
          clearInterval(a);
        }
      }, 1000);
    };

    const postAgainOtp = async () => {
      buttonLoadingOTP.value = true;
      let dataRegister = store.state.Auth.dataRegister;
      await store
        .dispatch("Auth/sendOtp", { email: dataRegister.email })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            toast.success("OTP Telah Terkirim, cek email!", {
              hideProgressBar: true,
              closeButton: false,
            });
            timeExpired = new Date().getTime() + 1000 * 60 * 1;
            countDownOtp();
            buttonLoadingOTP.value = false;
          }
          buttonLoadingOTP.value = false;
        });
    };

    let dataRegister = store.state.Auth.dataRegister;
    onMounted(async () => {
      timeExpired = new Date().getTime() + 1000 * 60 * 1;
      await countDownOtp();
      inputRefs.input1 = document.getElementById("input1");
      inputRefs.input2 = document.getElementById("input2");
      inputRefs.input3 = document.getElementById("input3");
      inputRefs.input4 = document.getElementById("input4");
      if (Object.keys(dataRegister).length == 0) {
        // router.push({ name: "register" });
        window.location.href = "/daftar";
      }
      console.log(dataRegister);
    });
    return {
      inputPoint1,
      inputPoint2,
      inputPoint3,
      inputPoint4,
      checkInput,
      inputRefs,
      checkFullOtp,
      buttonLoading,
      seconds,
      countDownOtp,
      postAgainOtp,
      buttonLoadingOTP,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
}
</style>
