<template>
  <basePage :titleName="'Kategori'" :footerRight="true">
    <template v-slot:content>
      <template v-if="isLoading">
        <div class="h-dvh flex items-center justify-center">
          <p
            class="animate-pulse duration-700 font-gunjarati text-lg text-center"
          >
            Memuat...
          </p>
        </div>
      </template>
      <template v-if="!isLoading">
        <div class="mt-1" style="display: flex; justify-content: flex-end">
          <div class="border border-[#7B7B7B] rounded-lg m-5 w-[max-content]">
            <input
              type="text"
              name=""
              id=""
              class="px-3 bg-transparent rounded-lg outline-none"
            />
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="pe-3"
            />
          </div>
        </div>

        <div
          class="mobile:overflow-auto desktop:overflow-hidden shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] p-2"
        >
          <table class="w-full mx-1">
            <thead class="bg-[#40475A] border-b-[10px]">
              <tr class="text-white text-start">
                <th
                  class="w-3 p-3 font-gunjarati font-semibold rounded-tl-2xl text-sm"
                >
                  No
                </th>
                <th class="p-3 font-gunjarati font-semibold text-start text-sm">
                  Nama
                </th>
                <th
                  class="w-3 p-3 font-gunjarati font-semibold text-sm rounded-tr-2xl"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="text-start">
              <tr class="border-b-[10px]" v-if="listCategory.length < 1">
                <td class="font-gunjarati text-center p-5" colspan="3">
                  Belum Ada Kategori
                </td>
              </tr>

              <template
                v-for="(listCategoryAll, index) in listCategory"
                v-if="listCategory.length > 0"
              >
                <tr
                  :class="`${
                    index % 2 == 0 ? 'bg-[#a4a7afac]' : 'bg-[#9b9ca0da]'
                  } border-b-[10px]`"
                >
                  <td class="p-3 rounded-tl-lg rounded-bl-lg text-center">
                    <span
                      class="font-gunjarati text-sm font-bold whitespace-nowrap text-center"
                      >{{ index + 1 }}</span
                    >
                  </td>

                  <td
                    class="font-gunjarati text-sm p-3 font-bold whitespace-nowrap"
                  >
                    {{ listCategoryAll.nama }}
                  </td>

                  <td class="whitespace-nowrap rounded-tr-lg rounded-br-lg">
                    <div class="flex gap-0 justify-center p-2">
                      <button
                        class="p-1 text-sm font-gunjarati border-[1px] border-[#CF0606] rounded-tl-lg rounded-bl-lg px-4 font-bold hover:bg-[#CF0606] hover:text-white hover:duration-300"
                        @click="
                          openModaldelete(
                            listCategoryAll.idKategori,
                            listCategoryAll.nama
                          )
                        "
                      >
                        Hapus
                      </button>
                      <button
                        class="p-1 text-sm font-gunjarati border-[1px] border-[#1859D4] rounded-tr-lg rounded-br-lg px-5 font-bold hover:bg-[#1859D4] hover:text-white hover:duration-300"
                        @click="
                          toCategory(
                            listCategoryAll.idKategori,
                            listCategoryAll.nama
                          )
                        "
                      >
                        Lihat
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
    </template>
    <template v-slot:footer>
      <button
        class="bg-[#E8C13C] py-2 px-4 rounded-2xl m-3 font-gunjarati font-bold w-[max-content]"
        @click="openModal"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        Tambah
      </button>
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Tambah Kategori'"
        :actived="checkModal"
        @close="closeModal"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-justify pt-3">Nama Kategori</p>

            <input
              type="text"
              name=""
              id=""
              class="w-full mb-3 p-2 outline-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a]"
              v-model="categoryInput"
            />
            <div class="w-full pb-3">
              <button
                class="bg-[#E8C13C] w-full rounded-md font-gunjarati text-black font-bold items-center flex justify-center py-2"
                @click="addCategoryStart"
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
                {{ !buttonLoading ? "Simpan" : "Memuat" }}
              </button>
            </div>
          </div>
        </template>
      </baseModal>

      <baseModal
        :title="'Hapus Kategori'"
        :actived="checkModalDelete"
        @close="closeModalDelete"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-start py-3 tex-sm">
              Yakin Ingin Menghapus Kategori
              <span class="font-bold">{{ categoryChoice }}</span>
            </p>

            <div class="w-full pb-3">
              <button
                class="bg-[#CF0606] w-full rounded-md font-gunjarati text-white font-bold items-center flex justify-center py-2"
                @click="deleteCategory"
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
                {{ !buttonLoading ? "Yakin" : "Memuat" }}
              </button>
            </div>
          </div>
        </template>
      </baseModal>
    </template>
  </basePage>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import loadData from "../../../components/loadData.vue";

export default {
  name: "seeCategory",
  components: {
    basePage,
    baseModal,
    loadData,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const isLoading = ref(false);
    const buttonLoading = ref(false);
    const listCategory = ref([]);
    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch("Category/getCategory").then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listCategory.value = listCategory.value.concat(res.data[1].data);
      });
      isLoading.value = false;
    });

    const checkModal = ref(false);
    const openModal = () => {
      checkModal.value = !checkModal.value;
    };
    const closeModal = () => {
      checkModal.value = !checkModal.value;
    };

    const categoryInput = ref("");

    const addCategoryStart = async () => {
      buttonLoading.value = true;
      let data = {
        nameCategory: categoryInput.value,
      };
      await store.dispatch("Category/addCategory", data).then(async (res) => {
        if (res.status == 200) {
          toast.success(res.data[0].message);
          closeModal();
          listCategory.value = [];
          await store.dispatch("Category/getCategory").then((res) => {
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            listCategory.value = listCategory.value.concat(res.data[1].data);
          });
          buttonLoading.value = false;
        } else {
          toast.error(res.response.data[0].message);
        }
      });
      buttonLoading.value = false;
    };

    const checkModalDelete = ref(false);
    const categoryChoice = ref("");
    const idCategoryChoice = ref("");
    const openModaldelete = (idCategory, nameCategory) => {
      checkModalDelete.value = !checkModalDelete.value;
      categoryChoice.value = nameCategory;
      idCategoryChoice.value = idCategory;
    };

    const closeModalDelete = () => {
      checkModalDelete.value = !checkModalDelete.value;
      categoryChoice.value = "";
      idCategoryChoice.value = "";
    };

    const deleteCategory = async () => {
      buttonLoading.value = true;
      await store
        .dispatch("Category/deleteCategory", idCategoryChoice.value)
        .then(async (res) => {
          console.log("🚀 ~ .then ~ res:", res);
          if (res.status === 200) {
            toast.success(res.data[0].message);
            closeModalDelete();
            listCategory.value = [];
            await store.dispatch("Category/getCategory").then((res) => {
              console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
              listCategory.value = listCategory.value.concat(res.data[1].data);
            });
            buttonLoading.value = false;
          }
        });
      buttonLoading.value = false;
    };

    const toCategory = (idCategory, nameCategory) => {
      router.push({
        name: "bookCategory",
        params: { id: idCategory, name: nameCategory },
      });
    };

    return {
      listCategory,
      checkModal,
      openModal,
      closeModal,
      categoryInput,
      addCategoryStart,
      openModaldelete,
      closeModalDelete,
      deleteCategory,
      categoryChoice,
      idCategoryChoice,
      checkModalDelete,
      toCategory,
      buttonLoading,
      isLoading,
    };
  },
};
</script>
