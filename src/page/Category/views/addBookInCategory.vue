<template>
  <basePage :titleName="'Tambah Buku'">
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
        <p class="px-4 font-gunjarati pt-3">
          Kategori : <span class="font-bold">{{ nameCategory }}</span>
        </p>
        <div
          class="px-4 pt-2 tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 tablet:gap-2"
        >
          <template v-for="listBookAll in listBook">
            <div
              class="flex items-center gap-4 bg-[#6e686858] p-2 rounded-lg mt-2"
            >
              <div class="w-20">
                <img :src="`../../../..${listBookAll.Gambar}`" alt="" />
              </div>
              <div class="w-full">
                <div>
                  <p class="font-gunjarati text-sm font-semibold">
                    {{ listBookAll.Judul }}
                  </p>
                  <p class="font-gunjarati text-xs">
                    {{ listBookAll.Penulis }}
                  </p>
                </div>
                <div class="flex justify-end">
                  <button
                    class="font-gunjarati text-sm bg-[#3b87d2a1] text-white px-2 py-1 rounded-md w-[max-content]"
                    @click="addBookInCategory(listBookAll.BukuID)"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </template>
  </basePage>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

export default {
  name: "addBookInCategory",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();
    const nameCategory = ref("");
    nameCategory.value = route.params.nameCategory;
    const listBook = ref([]);

    const isLoading = ref(false);
    onMounted(async () => {
      isLoading.value = true;
      await store
        .dispatch("Category/getBookToAddCategory", route.params.idCategory)
        .then((res) => {
          console.log("🚀 ~ ).then ~ res:", res);

          if (res.status === 200) {
            listBook.value = listBook.value.concat(res.data[1].data);
            isLoading.value = false;
          }
          isLoading.value = false;
        });
      isLoading.value = false;
    });

    const addBookInCategory = async (idBookInput) => {
      let data = {
        idBook: idBookInput,
        idCategory: route.params.idCategory,
      };
      await store
        .dispatch("Category/addBookInCategory", data)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data[0].message);
            listBook.value = [];
            await store
              .dispatch(
                "Category/getBookToAddCategory",
                route.params.idCategory
              )
              .then((res) => {
                console.log("🚀 ~ ).then ~ res:", res);

                if (res.status === 200) {
                  listBook.value = listBook.value.concat(res.data[1].data);
                }
              });
          }
        });
    };

    return {
      nameCategory,
      listBook,
      addBookInCategory,
      isLoading,
    };
  },
};
</script>
