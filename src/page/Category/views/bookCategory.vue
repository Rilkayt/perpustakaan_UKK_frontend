<template>
  <basePage :titleName="'Detail Kategori'">
    <template v-slot:content>
      <div class="flex justify-between px-3 pt-2">
        <p class="p-4 font-gunjarati">
          Kategori : <span class="font-bold">{{ nameCategory }}</span>
        </p>
        <button
          class="bg-[#3fa3f48a] py-2 px-4 rounded-lg m-3 font-gunjarati font-bold w-[max-content] text-xs"
          @click="addBookToCategory"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          Tambah Buku
        </button>
      </div>
      <div
        class="mobile:overflow-auto desktop:overflow-hidden shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] p-2"
      >
        <table class="w-full mx-1 mt-">
          <thead class="bg-[#40475A] border-b-[10px]">
            <tr class="text-white">
              <th
                class="w-3 p-3 font-gunjarati font-semibold rounded-tl-2xl tracking-wide text-sm"
              >
                No
              </th>
              <th
                class="w-3 p-3 font-gunjarati font-semibold tracking-wide text-sm"
              >
                Gambar
              </th>
              <th
                class="p-3 font-gunjarati font-semibold text-start tracking-wide text-sm"
              >
                Nama
              </th>

              <th
                class="w-9 p-3 font-gunjarati rounded-tr-2xl tracking-wide font-semibold text-sm"
              >
                <span>Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="border-b-[10px]" v-if="listBookInCategory.length < 1">
              <td class="font-gunjarati text-center p-5" colspan="4">
                Belum Ada Buku di Kategori ini
              </td>
            </tr>
            <template
              v-for="(listBookAll, index) in listBookInCategory"
              v-if="listBookInCategory.length > 0"
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
                <td class="p-3 whitespace-nowrap">
                  <div class="flex justify-center">
                    <img
                      :src="`../../../..${listBookAll.dataBuku.Gambar}`"
                      alt=""
                      width="35"
                    />
                  </div>
                </td>
                <td
                  class="font-gunjarati text-sm text-start p-3 font-semibold whitespace-nowrap"
                >
                  {{ listBookAll.dataBuku.Judul }}
                </td>
                <td class="whitespace-nowrap rounded-tr-lg rounded-br-lg">
                  <div class="flex gap-0 justify-center p-2">
                    <button
                      class="p-1 text-sm font-gunjarati border-[1px] border-[#CF0606] rounded-lg px-4 font-bold hover:bg-[#CF0606] hover:text-white hover:duration-300"
                      @click="
                        openModalDelete(
                          listBookAll.dataKategori.idKategoriRelasi,
                          listBookAll.dataBuku.Judul
                        )
                      "
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Hapus Buku'"
        :actived="checkModalDelete"
        @close="closeModalDelete"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-start py-3 tex-sm">
              Yakin Ingin Menghapus buku
              <span class="font-bold">{{ bookName }}</span> dari Kategori
              <span class="font-bold">{{ nameCategory }}</span>
            </p>

            <div class="w-full pb-3">
              <button
                class="bg-[#CF0606] w-full rounded-md font-gunjarati text-white font-bold items-center flex justify-center py-2"
                @click="deleteBookStart"
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
import { useRoute, useRouter } from "vue-router";

export default {
  name: "seeCategory",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const nameCategory = ref("");
    nameCategory.value = route.params.name;

    const idCategory = ref("");
    idCategory.value = route.params.id;

    const listBookInCategory = ref([]);
    onMounted(async () => {
      await store
        .dispatch("Category/getDataByIdCategory", route.params.id)
        .then((res) => {
          console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
          listBookInCategory.value = listBookInCategory.value.concat(
            res.data[1].data
          );
        });
    });

    const checkModalDelete = ref(false);
    const bookName = ref("");
    const bookRelasi = ref("");

    const openModalDelete = (idBookRelasi, book) => {
      checkModalDelete.value = !checkModalDelete.value;
      bookName.value = book;
      bookRelasi.value = idBookRelasi;
    };

    const closeModalDelete = () => {
      checkModalDelete.value = !checkModalDelete.value;
      bookName.value = "";
      bookRelasi.value = "";
    };

    const deleteBookStart = async () => {
      await store
        .dispatch(`Category/deleteBookInCategory`, bookRelasi.value)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data[0].message);
            closeModalDelete();
            listBookInCategory.value = [];
            await store
              .dispatch("Category/getDataByIdCategory", route.params.id)
              .then((res) => {
                console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
                listBookInCategory.value = listBookInCategory.value.concat(
                  res.data[1].data
                );
              });
          }
        });
    };

    const addBookToCategory = () => {
      router.push({
        name: "addBookCategory",
        params: {
          idCategory: route.params.id,
          nameCategory: route.params.name,
        },
      });
    };

    return {
      nameCategory,
      listBookInCategory,
      openModalDelete,
      bookName,
      bookRelasi,
      checkModalDelete,
      closeModalDelete,
      deleteBookStart,
      addBookToCategory,
    };
  },
};
</script>
