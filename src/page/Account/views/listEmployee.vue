<template>
  <basePage :titleName="'Daftar Petugas'" :footer-right="true">
    <template v-slot:content>
      <template v-for="listUserAll in listUser">
        <div class="px-3 pt-4">
          <div
            class="flex justify-between p-4 items-center bg-slate-500 rounded-lg"
          >
            <div>
              <p class="font-gunjarati font-semibold text-white">
                {{ listUserAll.NamaLengkap }}
              </p>
              <p class="font-gunjarati font-normal text-sm text-white">
                {{ listUserAll.Email }}
              </p>
            </div>
            <div>
              <button
                class="font-gunjarati font-semibold text-[#ffd900e3]"
                @click="
                  openModalEmployee(
                    listUserAll.UserID,
                    listUserAll.NamaLengkap,
                    listUserAll.Email,
                    listUserAll.Password
                  )
                "
              >
                Lihat
              </button>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-slot:footer>
      <button
        class="bg-[#E8C13C] py-2 px-4 w-28 rounded-2xl m-3"
        @click="openModalAddEmployee"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Tambah
      </button>
    </template>
    <template v-slot:modal>
      <baseModal
        :id="'modalAddEmployee'"
        :title="'Tambah Petugas'"
        :actived="checkModalAddEmployee"
        @close="closeModalAddEmployee"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <label for="inputName" class="font-gunjarati text-sm font-semibold"
              >Nama Lengkap</label
            >
            <input
              type="text"
              name=""
              id="inputName"
              v-model="inputName"
              :placeholder="'Nama Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />
            <label for="inputEmail" class="font-gunjarati text-sm font-semibold"
              >Email</label
            >
            <input
              type="email"
              name=""
              id="inputEmail"
              v-model="inputEmail"
              :placeholder="'Email Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />
            <label for="inputPass" class="font-gunjarati text-sm font-semibold"
              >Password</label
            >
            <input
              type="password"
              name=""
              id="inputPass"
              v-model="inputPass"
              :placeholder="'Kata Sandi Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />
            <label
              for="inputPassConfirm"
              class="font-gunjarati text-sm font-semibold"
              >Konfirmasi Kata sandi</label
            >
            <input
              type="password"
              name=""
              id="inputPassConfirm"
              v-model="inputPassConfirm"
              :placeholder="'konfirmasi kata sandi'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />

            <button
              class="w-full border-[1px] border-[#E8C13C] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#E8C13C] hover:text-white hover:duration-300"
              @click="addEmployeeStart"
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
              {{ !buttonLoading ? "Tambah" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>

      <baseModal
        :id="'modalEmployeeDetail'"
        :title="'Petugas'"
        :actived="checkModalEmployee"
        @close="closeModalEmployee"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <label for="inputName" class="font-gunjarati text-sm font-semibold"
              >Nama Lengkap</label
            >
            <input
              type="text"
              name=""
              id="inputName"
              v-model="inputName"
              :placeholder="'Nama Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />
            <label for="inputEmail" class="font-gunjarati text-sm font-semibold"
              >Email</label
            >
            <input
              type="email"
              name=""
              id="inputEmail"
              v-model="inputEmail"
              :placeholder="'Email Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />
            <label for="inputPass" class="font-gunjarati text-sm font-semibold"
              >Password</label
            >
            <input
              type="text"
              name=""
              id="inputPass"
              v-model="inputPass"
              :placeholder="'Kata Sandi Petugas'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />

            <div class="">
              <button
                class="w-full border-[1px] border-[#E8C13C] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#E8C13C] hover:text-white hover:duration-300"
                @click="updateEmployeeStart"
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
                {{ !buttonLoading ? "Ubah" : "Memuat" }}
              </button>
            </div>
          </div>
        </template>
      </baseModal>
    </template>
  </basePage>
</template>

<script>
import basePage from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
  name: "listEmployee",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const store = useStore();
    const toast = useToast();

    const listUser = ref([]);
    const isLoading = ref(false);
    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch("Account/getEmployee").then((res) => {
        if (res.status === 200) {
          listUser.value = listUser.value.concat(res.data[1].data);
          isLoading.value = false;
        }
        isLoading.value = false;
      });
    });

    const checkModalAddEmployee = ref(false);
    const openModalAddEmployee = () => {
      checkModalAddEmployee.value = !checkModalAddEmployee.value;
    };
    const closeModalAddEmployee = () => {
      checkModalAddEmployee.value = !checkModalAddEmployee.value;
    };

    const inputName = ref("");
    const inputEmail = ref("");
    const inputPass = ref("");
    const inputPassConfirm = ref("");

    const buttonLoading = ref(false);
    const addEmployeeStart = async () => {
      buttonLoading.value = true;
      if (inputPass.value === inputPassConfirm.value) {
        if (
          inputName.value !== "" &&
          inputEmail.value !== "" &&
          inputPassConfirm.value !== ""
        ) {
          let data = {
            namaLengkap: inputName.value,
            email: inputEmail.value,
            password: inputPassConfirm.value,
          };
          await store
            .dispatch("Account/checkEmail", inputEmail.value)
            .then(async (res) => {
              if (res.status == 200) {
                await store
                  .dispatch("Account/addEmployee", data)
                  .then(async (res) => {
                    if (res.status == 200) {
                      toast.success(res.data[0].message);
                      closeModalAddEmployee();
                      buttonLoading.value = false;
                      listUser.value = [];
                      await store
                        .dispatch("Account/getEmployee")
                        .then((res) => {
                          if (res.status === 200) {
                            listUser.value = listUser.value.concat(
                              res.data[1].data
                            );
                          }
                        });
                    } else {
                      toast.error(res.response.data[0].message);
                      buttonLoading.value = false;
                    }
                  });
              } else {
                toast.error(res.response.data[0].message);
                buttonLoading.value = false;
              }
            });
          buttonLoading.value = false;
        } else {
          toast.error("terdapat isian yang kosong");
          buttonLoading.value = false;
        }
      } else {
        toast.error("Kata Sandi Tidak Sama");
        buttonLoading.value = false;
      }
    };

    const idUser = ref("");
    const checkModalEmployee = ref(false);
    const openModalEmployee = (id, name, email, password) => {
      checkModalEmployee.value = !checkModalEmployee.value;
      idUser.value = id;
      inputName.value = name;
      inputEmail.value = email;
      inputPass.value = password;
    };
    const closeModalEmployee = () => {
      checkModalEmployee.value = !checkModalEmployee.value;
      idUser.value = "";
      inputName.value = "";
      inputEmail.value = "";
      inputPass.value = "";
    };

    const updateEmployeeStart = async () => {
      buttonLoading.value = true;
      if (inputPass.value !== "") {
        if (
          inputName.value != "" &&
          inputEmail.value != "" &&
          inputPass.value != ""
        ) {
          let data = {
            namaLengkap: inputName.value,
            email: inputEmail.value,
            password: inputPass.value,
            idUser: idUser.value,
          };
          await store
            .dispatch("Account/checkEmail", inputEmail.value)
            .then(async (res) => {
              if (res.status == 200) {
                await store
                  .dispatch("Account/updateEmployee", data)
                  .then(async (res) => {
                    if (res.status == 200) {
                      toast.success(res.data[0].message);
                      closeModalEmployee();
                      buttonLoading.value = false;
                      listUser.value = [];
                      await store
                        .dispatch("Account/getEmployee")
                        .then((res) => {
                          if (res.status === 200) {
                            listUser.value = listUser.value.concat(
                              res.data[1].data
                            );
                          }
                        });
                    } else {
                      toast.error(res.response.data[0].message);
                      buttonLoading.value = false;
                    }
                  });
              } else {
                toast.error(res.response.data[0].message);
                buttonLoading.value = false;
              }
            });
          buttonLoading.value = false;
        } else {
          toast.error("terdapat isian yang kosong");
          buttonLoading.value = false;
        }
      } else {
        toast.error("Kata Sandi Tidak Boleh Kosong");
        buttonLoading.value = false;
      }
    };

    return {
      checkModalAddEmployee,
      openModalAddEmployee,
      closeModalAddEmployee,
      inputName,
      inputEmail,
      inputPass,
      inputPassConfirm,
      addEmployeeStart,
      buttonLoading,
      isLoading,
      listUser,
      checkModalEmployee,
      openModalEmployee,
      closeModalEmployee,
      updateEmployeeStart,
      idUser,
    };
  },
};
</script>
