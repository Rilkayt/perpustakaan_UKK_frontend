<template>
  <div
    class="background py-20 flex justify-center bg-cover bg-center w-[100vw] h-[100vh] bg-[#E7E9EE] overflow-x-hidden"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px]"
    >
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">Daftar</h3>
      <form @submit.prevent="registerReady">
        <div class="flex flex-col pb-[20px]">
          <label for="username" class="font-medium pb-[3px] font-gunjarati"
            >Username
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>
          <input
            type="text"
            id="username"
            :placeholder="'maksimal 10 karakter'"
            maxlength="10"
            class="border-2 h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            required
            v-model="username"
          />
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="namaLengkap" class="font-medium pb-[px] font-gunjarati"
            >Nama Lengkap
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>

          <input
            type="text"
            id="namaLengkap"
            :placeholder="'Masukan Nama Anda'"
            class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            required
            v-model="nameUser"
          />
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="email" class="font-medium pb-[3px] font-gunjarati"
            >Email
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>

          <input
            type="email"
            id="email"
            :placeholder="'Masukan Email Anda'"
            class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            required
            v-model="emailUser"
          />
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="noTelepon" class="font-medium pb-[3px] font-gunjarati"
            >No Telepon
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>

          <input
            type="text"
            id="noTelepon"
            :placeholder="'contoh : 85159722546'"
            class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            pattern="[0-9]{12}"
            maxlength="12"
            required
            v-model="noTelp"
            @input="validateInputTelp"
          />
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="Alamat" class="font-medium pb-[3px] font-gunjarati"
            >Alamat</label
          >

          <textarea
            id="alamat"
            :placeholder="'masukan alamat anda'"
            class="h-[57px] pt-2 text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            v-model="addressUser"
          ></textarea>
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="asalSekolah" class="font-medium pb-[3px] font-gunjarati"
            >Asal Sekolah
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>
          <div class="bg-[#40475A] rounded-[6px]">
            <select
              id="asalSekolah"
              name="asalSekolah"
              class="h-[48px] bg-transparent border-0 bg-none py-0 pl-4 pr-9 rounded-[6px] text-gray-400 focus:ring-2 focus:ring-inset w-[100%] mobile:text-sm"
              required
              v-model="schoolUser"
              @change="changeSchoolUser(schoolUser)"
            >
              <option value="" class="text-black">Pilih Sekolah</option>
              <option
                v-for="dataSchoolAll in dataSchool"
                :value="dataSchoolAll.Kode"
                class="text-black"
              >
                {{ dataSchoolAll.Sekolah }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-col pb-[20px]">
          <label for="password" class="font-medium pb-[3px] font-gunjarati"
            >Kata Sandi
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>

          <input
            type="password"
            id="password"
            :placeholder="'masukan kata sandi'"
            class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            required
            v-model="passwordUser"
          />
        </div>

        <div class="flex flex-col pb-[25px]">
          <label
            for="confirmPassword"
            class="font-medium pb-[3px] font-gunjarati"
            >Konfirmasi Kata Sandi
            <sup
              ><font-awesome-icon
                :icon="['fas', 'star-of-life']"
                flip="vertical"
                size="2xs"
                style="color: #40475a" /></sup
          ></label>

          <input
            type="password"
            id="confirmPassword"
            :placeholder="'konfirmasi kata sandi'"
            class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
            v-model="passwordUserConfirm"
            required
          />
        </div>

        <div class="flex items-center pb-[25px]">
          <div
            class="h-[48px] bg-[#C8CACF] w-[100%] flex justify-center items-center rounded-tl-lg rounded-bl-lg"
          >
            <p class="text-center font-gunjarati font-light">Tipe</p>
          </div>
          <div
            class="h-[48px] bg-[#40475A] w-[100%] rounded-tr-lg rounded-br-lg"
          >
            <select
              id="typeUser"
              name="typeUser"
              class="h-full border-0 bg-transparent bg-none py-0 pl-4 pr-9 rounded-tr-lg rounded-br-lg text-gray-400 focus:ring-2 focus:ring-inset w-[100%] mobile:text-sm"
              v-model="typeUser"
              @change="changeTypeUser(typeUser)"
              required
            >
              <option value="" class="text-black">Pilih Tipe</option>
              <option value="USER" class="text-black">USER</option>
              <option value="ADMIN" class="text-black">ADMIN</option>
            </select>
          </div>
        </div>

        <Transition
          leave-active-class="duration-300 ease-in"
          leave-to-class="opacity-0"
        >
          <div class="flex flex-col pb-[20px]" v-if="typeUser === 'ADMIN'">
            <label for="codeSchool" class="font-medium pb-[3px] font-gunjarati"
              >Kode Sekolah
              <sup
                ><font-awesome-icon
                  :icon="['fas', 'star-of-life']"
                  flip="vertical"
                  size="2xs"
                  style="color: #40475a"
              /></sup>
            </label>

            <input
              type="text"
              id="codeSchool"
              class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-black bg-transparent border-dotted border-2 border-slate-600"
              v-model="codeSchool"
              required
            />
          </div>
        </Transition>

        <button
          class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
          @click="registerReady"
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
          {{ !buttonLoading ? "Selanjutnnya" : "Loading" }}
        </button>
      </form>
      <p class="pt-[3rem] pb-[20px] text-center font-semibold">
        Sudah Punya Akun ?
        <span class="text-[#1459DF]"><a href="/masuk">Masuk</a></span>
      </p>
      <div class="flex justify-center">
        <hr
          class="text-center border-t-2 border-1 m-0 p-0 border-[#3F3C3C] w-[50%]"
        />
      </div>
      <p class="pt-[20px] pb-[20px] text-center font-semibold m-0">
        Sekolah Belum Terdaftar ? <br />
        <span class="text-[#1459DF]"
          ><a href="http://wa.me/6285159722546" target="__blank"
            >Hubungi Developer</a
          ></span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

export default {
  name: "register",
  data() {
    return {
      dataSchool: [],
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const username = ref("");
    const nameUser = ref("");
    const emailUser = ref("");
    const noTelp = ref("");
    const addressUser = ref("");
    const schoolUser = ref("");
    const passwordUser = ref("");
    const passwordUserConfirm = ref("");
    const typeUser = ref("");
    const codeSchool = ref("");

    let buttonLoading = ref(false);

    let dataSchool = ref([]);

    onMounted(async () => {
      await getSchoolMenu().then((res) => {
        console.log(res);
        dataSchool.value = dataSchool.value.concat(res.data[1].data);
        console.log(dataSchool);
      });
    });

    const getSchoolMenu = async () => {
      let response = await store.dispatch("Auth/getSchool");
      return response;
    };
    const changeTypeUser = (typeUserParam) => {
      typeUser.value = typeUserParam;
    };

    const changeSchoolUser = (schoolUserParam) => {
      schoolUser.value = schoolUserParam;
    };

    const regexInputTelp = /^(?!0|62|[a-z]|[`;:{}/.<>,!@#$%^&*()_=|])\d+$/;

    const validateInputTelp = () => {
      if (regexInputTelp.test(noTelp.value) == false) {
        noTelp.value = "";
        console.log(regexInputTelp.test(noTelp.value));
      }
    };

    let registerReadyConfirm = false;
    const registerReady = async () => {
      buttonLoading.value = true;
      if (registerReadyConfirm) {
        registerReadyConfirm = false;
        return;
      }
      registerReadyConfirm = true;
      if (
        username.value != "" &&
        nameUser.value != "" &&
        emailUser.value != "" &&
        noTelp.value != "" &&
        passwordUser.value != "" &&
        passwordUserConfirm != ""
      ) {
        if (typeUser.value != "") {
          if (typeUser.value == "ADMIN" && codeSchool.value == "") {
            toast.error("kode admin wajib diisi", {
              hideProgressBar: true,
              closeButton: false,
            });
            buttonLoading.value = false;
          } else {
            if (schoolUser.value != "") {
              if (passwordUser.value === passwordUserConfirm.value) {
                const data = {
                  namaLengkap: nameUser.value,
                  username: username.value,
                  notelp: parseInt("62" + noTelp.value),
                  email: emailUser.value,
                  alamat: addressUser.value,
                  password: passwordUser.value,
                  sekolah: schoolUser.value,
                  tipe: typeUser.value,
                  kode_admin: codeSchool.value,
                };
                await store
                  .dispatch("Auth/checkUserRegister", data)
                  .then(async (res) => {
                    console.log(res);
                    if (res.status === 200) {
                      store.commit("Auth/addDataRegister", data);
                      await store
                        .dispatch("Auth/sendOtp", { email: data.email })
                        .then((res) => {
                          console.log(res);
                          if (res.status == 200) {
                            toast.success("OTP Telah Terkirim, cek email!", {
                              hideProgressBar: true,
                              closeButton: false,
                            });
                            router.push({ name: "otpRegister" });
                            buttonLoading.value = false;
                          }
                          buttonLoading.value = false;
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
                toast.error("kata sandi tidak sama", {
                  hideProgressBar: true,
                  closeButton: false,
                });
                buttonLoading.value = false;
              }
            } else {
              toast.error("asal sekolah wajib diisi", {
                hideProgressBar: true,
                closeButton: false,
              });
              buttonLoading.value = false;
            }
          }
        } else {
          toast.error("Wajib memilih tipe user", {
            hideProgressBar: true,
            closeButton: false,
          });
          buttonLoading.value = false;
        }
      } else {
        toast.error("terdapat kolom yang masih kosong", {
          hideProgressBar: true,
          closeButton: false,
        });
        buttonLoading.value = false;
      }

      // toast.info("halo", { hideProgressBar: true, closeButton: false });
    };
    return {
      username,
      nameUser,
      emailUser,
      noTelp,
      addressUser,
      schoolUser,
      changeSchoolUser,
      passwordUser,
      passwordUserConfirm,
      typeUser,
      changeTypeUser,
      codeSchool,
      registerReady,
      regexInputTelp,
      validateInputTelp,
      dataSchool,
      buttonLoading,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
  position: sticky;
  height: max-content;
}
</style>
