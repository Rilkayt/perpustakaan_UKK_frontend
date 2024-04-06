<template>
  <basePage :titleName="'Buku'" :footerRight="true">
    <template v-slot:content>
      <div class="mt-7" style="display: flex; justify-content: flex-end">
        <div class="border border-[#7B7B7B] rounded-lg m-5 w-[max-content]">
          <input
            type="text"
            name=""
            id=""
            class="px-3 bg-transparent rounded-lg focus:border-none"
          />
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="pe-3" />
        </div>
      </div>
      <template v-if="role === 'USER'">
        <p
          v-if="bookList.length < 1"
          class="font-gunjarati text-center flex items-center justify-center h-dvh"
        >
          Buku di perpustakaan ini belum tersedia
        </p>

        <!-- <loadData /> -->

        <template v-if="bookList.length > 0">
          <div
            class="p-9 grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-3 gap-4"
          >
            <template v-for="bookRandomList in bookList">
              <cardBook
                :cover="bookRandomList.Gambar"
                :penulis="bookRandomList.Penulis"
                :title="bookRandomList.Judul"
              />
            </template>
          </div>
        </template>
      </template>
      <template v-if="role === 'ADMIN' || role === 'EMPLOYEE'">
        <div
          class="mobile:overflow-auto desktop:overflow-hidden shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] p-2"
        >
          <table class="w-full mx-1 mt-">
            <thead class="bg-[#40475A] border-b-[10px]">
              <tr class="text-white">
                <th
                  class="w-3 px-4 font-gunjarati font-semibold rounded-tl-2xl tracking-wide text-sm"
                >
                  No
                </th>
                <th
                  class="w-3 p-2 font-gunjarati font-semibold tracking-wide text-sm"
                >
                  Gambar
                </th>
                <th
                  class="p-3 font-gunjarati font-semibold text-start tracking-wide text-sm"
                >
                  Judul
                </th>
                <th
                  class="w-9 p-2 font-gunjarati tracking-wide font-semibold text-sm"
                >
                  Persediaan
                </th>
                <th
                  class="w-9 p-2 font-gunjarati rounded-tr-2xl tracking-wide font-semibold text-sm"
                >
                  <span>Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody class="">
              <template v-for="(bookRandomList, index) in bookList">
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
                        :src="`../../../..${bookRandomList.Gambar}`"
                        alt=""
                        width="35"
                      />
                    </div>
                  </td>
                  <td
                    class="font-gunjarati text-sm text-start p-3 font-semibold whitespace-nowrap"
                  >
                    {{ bookRandomList.Judul }}
                  </td>
                  <td
                    class="font-gunjarati text-sm p-2 font-semibold whitespace-nowrap"
                  >
                    320/500
                  </td>
                  <td class="whitespace-nowrap rounded-tr-lg rounded-br-lg">
                    <div class="flex gap-0 justify-center p-2">
                      <button
                        class="p-1 text-sm font-gunjarati border-2 border-[#CF0606] rounded-tl-lg rounded-bl-lg px-4 font-bold hover:bg-[#CF0606] hover:text-white hover:duration-300"
                        @click="
                          openDeleteData(
                            bookRandomList.BukuID,
                            bookRandomList.Judul
                          )
                        "
                      >
                        Hapus
                      </button>
                      <button
                        class="p-1 text-sm font-gunjarati border-2 border-[#1859D4] rounded-tr-lg rounded-br-lg px-5 font-bold hover:bg-[#1859D4] hover:text-white hover:duration-300"
                      >
                        Ubah
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
      <button class="bg-[#E8C13C] py-2 px-4 w-28 rounded-2xl m-3">
        <font-awesome-icon :icon="['fas', 'plus']" />
        Tambah
      </button>
    </template>

    <template v-slot:modal>
      <baseModal
        :title="'Hapus Buku'"
        :actived="checkModal"
        @close="closeModal"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-justify py-3">
              Ingin menghapus buku
              <span class="text-[#3e50b7d8] font-semibold">{{ nameBook }}</span>
              ?
            </p>
            <div class="w-full pb-3">
              <button
                class="bg-[#fd3737] w-full rounded-md font-gunjarati text-white font-semibold items-center flex justify-center py-2"
                @click="deleteData"
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
import { defineComponent, ref, onMounted } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import { jwtDecode } from "jwt-decode";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
// import loadData from "../../../components/loadData.vue";

export default defineComponent({
  name: "listBooks",
  components: {
    basePage,
    cardBook,
    baseModal,
    // loadData,
  },
  setup() {
    const store = useStore();

    let role = ref("");
    const toast = useToast();

    let bookList = ref([]);

    const checkModal = ref(false);
    const openModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };
    const closeModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };

    let uuidBookSelected = ref("");
    let nameBook = ref("");
    const openDeleteData = (uuidBook, judul) => {
      checkModal.value = !checkModal.value;
      uuidBookSelected.value = uuidBook;
      nameBook.value = judul;
    };
    const deleteData = async () => {
      await store
        .dispatch("Books/deleteBookStart", uuidBookSelected.value)
        .then(async (res) => {
          console.log(res);
          if (res.status == 200) {
            toast.success("Buku Berhasil Di Hapus");
            closeModal();
            await store.dispatch("Books/getListBook").then((res) => {
              if (res.status == 200) {
                bookList.value = [];
                bookList.value = bookList.value.concat(
                  res.data[1].data.daftarBuku
                );
              }
            });
          }
        });
    };

    onMounted(async () => {
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;

      await store.dispatch("Books/getListBook").then((res) => {
        if (res.status == 200) {
          bookList.value = bookList.value.concat(res.data[1].data.daftarBuku);
        }
      });
    });

    return {
      role,
      bookList,
      openModal,
      checkModal,
      closeModal,
      openDeleteData,
      uuidBookSelected,
      nameBook,
      deleteData,
    };
  },
});
</script>
