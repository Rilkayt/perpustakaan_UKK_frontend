<template>
  <basePage :titleName="'Belum Dikembalikan'" :footerRight="true">
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
        <div class="mt-2" style="display: flex; justify-content: flex-end">
          <div class="border border-[#7B7B7B] rounded-lg m-5 w-[max-content]">
            <input
              type="text"
              name=""
              id=""
              class="px-2 py-1 bg-transparent rounded-lg outline-none text-sm"
              v-model="inputSearch"
            />
            <button @click="!checkButtonSearch ? searchStart() : closeSearch()">
              <font-awesome-icon
                v-if="!checkButtonSearch"
                :icon="['fas', 'magnifying-glass']"
                class="pe-3"
              />

              <font-awesome-icon
                :icon="['fas', 'circle-xmark']"
                v-if="checkButtonSearch"
                class="pe-3"
              />
            </button>
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
                  Buku
                </th>
                <th class="w-3 p-3 font-gunjarati font-semibold text-sm">
                  Pengguna
                </th>
                <th class="w-3 p-3 font-gunjarati font-semibold text-sm">
                  Jumlah
                </th>
                <th class="w-3 p-3 font-gunjarati font-semibold text-sm">
                  Pengembalian
                </th>
                <th
                  class="w-7 px-5 py-2 font-gunjarati rounded-tr-2xl font-semibold text-sm"
                >
                  <span>Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody class="text-start">
              <tr class="border-b-[10px]" v-if="listData.length < 1">
                <td class="font-gunjarati text-center p-5" colspan="6">
                  Belum ada yang pinjam
                </td>
              </tr>

              <template
                v-for="(listBorrowAll, index) in listData"
                v-if="listData.length > 0"
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
                    class="font-gunjarati text-sm p-3 font-semibold whitespace-nowrap"
                  >
                    {{ listBorrowAll.buku[0].Judul }}
                  </td>
                  <td
                    class="font-gunjarati text-center text-sm p-2 font-semibold whitespace-nowrap"
                  >
                    {{ listBorrowAll.user.Username }}
                  </td>
                  <td
                    class="font-gunjarati text-center text-sm p-2 font-semibold whitespace-nowrap"
                  >
                    {{ listBorrowAll.dataPinjam.jumlah }}
                  </td>
                  <td
                    class="font-gunjarati text-sm p-2 font-semibold whitespace-nowrap"
                  >
                    {{
                      momentTanggalPengembalian(
                        listBorrowAll.dataPinjam.tanggalPengembalian
                      )
                    }}
                  </td>
                  <td class="whitespace-nowrap rounded-tr-lg rounded-br-lg">
                    <div class="flex gap-0 justify-center p-2">
                      <button
                        class="p-1 text-sm font-gunjarati border-[1px] border-[#05B016] rounded-tl-lg rounded-bl-lg px-4 font-bold hover:bg-[#05B016] hover:text-white hover:duration-300"
                        @click="openCall(listBorrowAll.user.NoTelp)"
                      >
                        Hubungi
                      </button>
                      <button
                        class="p-1 text-sm font-gunjarati border-[1px] border-[#1859D4] rounded-tr-lg rounded-br-lg px-5 font-bold hover:bg-[#1859D4] hover:text-white hover:duration-300"
                        @click="
                          openModal(
                            listBorrowAll.dataPinjam.idPeminjaman,
                            listBorrowAll.buku[0].Judul
                          )
                        "
                      >
                        Dikembalikan
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
              <loadData
                :id="'load-data'"
                @nextAction="takeAgainData"
                v-if="dataDinamic >= take"
              ></loadData>
            </tbody>
          </table>
        </div>
      </template>
    </template>

    <template v-slot:footer> </template>
    <template v-slot:modal>
      <baseModal :title="'Diambil'" :actived="checkModal" @close="closeModal">
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-justify py-3">
              Buku <span class="font-semibold">{{ buku }}</span> Sudah
              Dikembalikan ?
              <span class="text-[#3e50b7d8] font-semibold">{{ nameBook }}</span>
            </p>
            <div class="w-full pb-3">
              <button
                class="bg-[#1859D4] w-full rounded-md font-gunjarati text-white font-semibold items-center flex justify-center py-2"
                @click="changeThree"
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
                {{ !buttonLoading ? "Sudah" : "Memuat" }}
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
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
import moment from "moment";
import loadData from "../../../components/loadData.vue";

export default defineComponent({
  name: "listNotYetBack",
  components: {
    basePage,
    cardBook,
    baseModal,
    loadData,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let role = ref("");
    const toast = useToast();

    let bookList = ref([]);

    const isLoading = ref(false);

    const buttonLoading = ref(false);
    const skip = ref(0);
    const take = ref(0);
    take.value = 20;

    const listData = ref([]);

    const dataDinamic = ref(0);

    onMounted(async () => {
      isLoading.value = true;
      let data = {
        tipe: 2,
        skip: skip.value,
        take: take.value,
      };
      await store.dispatch("Borrow/getListPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listData.value = listData.value.concat(res.data[1].data.daftarPinjam);
        dataDinamic.value += res.data[1].data.daftarPinjam.length;
        skip.value += take.value;
        isLoading.value = false;
      });
      isLoading.value = false;
    });

    const takeAgainData = async () => {
      let data = {
        tipe: 2,
        skip: skip.value,
        take: take.value,
      };

      dataDinamic.value = 0;

      await store.dispatch("Borrow/getListPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listData.value = listData.value.concat(res.data[1].data.daftarPinjam);
        dataDinamic.value += res.data[1].data.daftarPinjam.length;
        skip.value += take.value;
      });
    };

    const momentTanggalPengembalian = (tanggalPengembalian) => {
      return moment(new Date(parseInt(tanggalPengembalian))).format(
        "DD MMMM YYYY"
      );
    };

    const openCall = (noTelp) =>
      window.open("https://wa.me/" + noTelp, "_blank");

    const idPinjaman = ref("");
    const buku = ref("");

    const changeThree = async () => {
      buttonLoading.value = true;
      let data = {
        idPinjam: idPinjaman.value,
        tipe: 3,
      };
      await store.dispatch("Borrow/changeStatus", data).then(async (res) => {
        if (res.status == 200) {
          console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
          toast.success(res.data[0].message);
          closeModal();
          listData.value = [];
          skip.value = 0;
          let data = {
            tipe: 2,
            skip: skip.value,
            take: take.value,
          };

          dataDinamic.value = 0;

          await store.dispatch("Borrow/getListPinjam", data).then((res) => {
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            listData.value = listData.value.concat(
              res.data[1].data.daftarPinjam
            );
            dataDinamic.value += res.data[1].data.daftarPinjam.length;
            skip.value += take.value;
            buttonLoading.value = false;
          });
          buttonLoading.value = false;
        }
      });
      buttonLoading.value = false;
    };

    const checkModal = ref(false);
    const openModal = (idPinjam, bukuPinjam) => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
      idPinjaman.value = idPinjam;
      buku.value = bukuPinjam;
    };
    const closeModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };

    const checkButtonSearch = ref(false);
    const inputSearch = ref("");
    const searchStart = async () => {
      if (inputSearch.value != "") {
        let data = {
          kode: 2,
          input: inputSearch.value,
        };
        await store.dispatch("Borrow/searchListPinjam", data).then((res) => {
          if (res.status == 200) {
            checkButtonSearch.value = !checkButtonSearch.value;
            dataDinamic.value = 0;
            listData.value = [];
            listData.value = listData.value.concat(
              res.data[1].data.daftarPinjam
            );
          }
          console.log(res);
        });
      } else {
        toast.error("form tidak boleh kosong");
      }
    };

    const closeSearch = async () => {
      checkButtonSearch.value = !checkButtonSearch.value;
      isLoading.value = true;
      inputSearch.value = "";
      take.value = 20;
      skip.value = 0;
      listData.value = [];
      isLoading.value = true;
      let data = {
        tipe: 2,
        skip: skip.value,
        take: take.value,
      };
      await store.dispatch("Borrow/getListPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listData.value = listData.value.concat(res.data[1].data.daftarPinjam);
        dataDinamic.value += res.data[1].data.daftarPinjam.length;
        skip.value += take.value;
        isLoading.value = false;
      });
      isLoading.value = false;
    };

    return {
      role,
      bookList,
      skip,
      listData,
      openModal,
      closeModal,
      idPinjaman,
      changeThree,
      checkModal,
      buku,
      momentTanggalPengembalian,
      openCall,
      skip,
      take,
      dataDinamic,
      takeAgainData,
      isLoading,
      buttonLoading,
      inputSearch,
      searchStart,
      checkButtonSearch,
      closeSearch,
    };
  },
});
</script>
