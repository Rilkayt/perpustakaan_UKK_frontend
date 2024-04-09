<template>
  <basePage :titleName="'Kategori'" :footerRight="true">
    <template v-slot:content>
      <div class="mt-1" style="display: flex; justify-content: flex-end">
        <div class="border border-[#7B7B7B] rounded-lg m-5 w-[max-content]">
          <input
            type="text"
            name=""
            id=""
            class="px-3 bg-transparent rounded-lg outline-none"
          />
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="pe-3" />
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
              >
                Simpan
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
              >
                Yakin
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

export default {
  name: "seeCategory",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    const listCategory = ref([]);
    onMounted(async () => {
      await store.dispatch("Category/getCategory").then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listCategory.value = listCategory.value.concat(res.data[1].data);
      });
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
        }
      });
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
          }
        });
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
    };
  },
};
</script>
