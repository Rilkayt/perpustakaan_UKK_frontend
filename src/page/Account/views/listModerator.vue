<template>
  <basePage :titleName="'Daftar Moderator'" :footer-right="true">
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
                  openModalModerator(
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
        @click="openModalAddModerator"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Tambah
      </button>
    </template>
    <template v-slot:modal>
      <baseModal
        :id="'modalAddModerator'"
        :title="'Tambah Moderator'"
        :actived="checkModalAddModerator"
        @close="closeModalAddModerator"
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
              :placeholder="'Nama Moderator'"
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
              :placeholder="'Email Moderator'"
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
              :placeholder="'Kata Sandi Moderator'"
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
              @click="addModeratorStart"
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
        :id="'modalModeratorDetail'"
        :title="'Moderator'"
        :actived="checkModalModerator"
        @close="closeModalModerator"
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
              :placeholder="'Nama Moderator'"
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
              :placeholder="'Email Moderator'"
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
              :placeholder="'Kata Sandi Moderator'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />

            <div class="flex gap-3">
              <button
                class="w-full border-[1px] border-[#fd5353] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#fd5353] hover:text-white hover:duration-300"
                @click="deleteModeratorStart"
                :disabled="btnLoadingDeleteModerator"
              >
                <svg
                  v-if="btnLoadingDeleteModerator"
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
                {{ !btnLoadingDeleteModerator ? "Hapus" : "Memuat" }}
              </button>
              <button
                class="w-full border-[1px] border-[#E8C13C] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#E8C13C] hover:text-white hover:duration-300"
                @click="updateModeratorStart"
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
  name: "listModerator",
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
      await store.dispatch("Account/getModerator").then((res) => {
        if (res.status === 200) {
          listUser.value = listUser.value.concat(res.data[1].data);
          isLoading.value = false;
        }
        isLoading.value = false;
      });
    });

    const checkModalAddModerator = ref(false);
    const openModalAddModerator = () => {
      checkModalAddModerator.value = !checkModalAddModerator.value;
    };
    const closeModalAddModerator = () => {
      checkModalAddModerator.value = !checkModalAddModerator.value;
    };

    const inputName = ref("");
    const inputEmail = ref("");
    const inputPass = ref("");
    const inputPassConfirm = ref("");

    const buttonLoading = ref(false);
    const addModeratorStart = async () => {
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
                  .dispatch("Account/addModerator", data)
                  .then(async (res) => {
                    if (res.status == 200) {
                      toast.success(res.data[0].message);
                      closeModalAddModerator();
                      buttonLoading.value = false;
                      listUser.value = [];
                      await store
                        .dispatch("Account/getModerator")
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
    const checkModalModerator = ref(false);
    const openModalModerator = (id, name, email, password) => {
      checkModalModerator.value = !checkModalModerator.value;
      idUser.value = id;
      inputName.value = name;
      inputEmail.value = email;
      inputPass.value = password;
    };
    const closeModalModerator = () => {
      checkModalModerator.value = !checkModalModerator.value;
      idUser.value = "";
      inputName.value = "";
      inputEmail.value = "";
      inputPass.value = "";
    };

    const updateModeratorStart = async () => {
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
                  .dispatch("Account/updateModerator", data)
                  .then(async (res) => {
                    if (res.status == 200) {
                      toast.success(res.data[0].message);
                      closeModalModerator();
                      buttonLoading.value = false;
                      listUser.value = [];
                      await store
                        .dispatch("Account/getModerator")
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

    const btnLoadingDeleteModerator = ref(false);
    const deleteModeratorStart = async () => {
      btnLoadingDeleteModerator.value = true;
      await store
        .dispatch("Account/deleteModerator", idUser.value)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data[0].message);
            closeModalModerator();
            btnLoadingDeleteModerator.value = false;
            listUser.value = [];
            await store.dispatch("Account/getModerator").then((res) => {
              if (res.status === 200) {
                listUser.value = listUser.value.concat(res.data[1].data);
              }
            });
          } else {
            toast.error(res.response.data[0].message);
          }
        });
      btnLoadingDeleteModerator.value = false;
    };

    return {
      checkModalAddModerator,
      openModalAddModerator,
      closeModalAddModerator,
      inputName,
      inputEmail,
      inputPass,
      inputPassConfirm,
      addModeratorStart,
      buttonLoading,
      isLoading,
      listUser,
      checkModalModerator,
      openModalModerator,
      closeModalModerator,
      updateModeratorStart,
      idUser,
      deleteModeratorStart,
      btnLoadingDeleteModerator,
    };
  },
};
</script>
