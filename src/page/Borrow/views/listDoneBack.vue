<template>
  <basePage :titleName="'Sudah Diambil'" :footerRight="true">
    <template v-slot:content>
      <div class="mt1-1" style="display: flex; justify-content: flex-end">
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
        <table class="w-full mx-1 mt-">
          <thead class="bg-[#40475A] border-b-[10px]">
            <tr class="text-white text-center">
              <th
                class="w-3 px-4 font-gunjarati font-semibold rounded-tl-2xl tracking-wide text-sm"
              >
                No
              </th>
              <th
                class="w-3 p-2 font-gunjarati font-semibold text-start tracking-wide text-sm"
              >
                Buku
              </th>
              <th class="w-3 p-3 font-gunjarati font-semibold ext-sm">
                Pengguna
              </th>
              <th class="w-3 p-2 font-gunjarati font-semibold text-sm">
                Jumlah
              </th>
              <th class="w-3 p-2 font-gunjarati font-semibold text-sm">
                Pengembalian
              </th>
              <th
                class="w-7 px-5 py-2 font-gunjarati rounded-tr-2xl font-semibold text-sm"
              >
                <span>Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr class="border-b-[10px]" v-if="listData.length < 1">
              <td class="font-gunjarati text-center p-5" colspan="5">
                Buku di perpustakaan ini belum tersedia
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
                  class="font-gunjarati text-sm p-2 font-semibold text-start whitespace-nowrap"
                >
                  {{ listBorrowAll.buku[0].Judul }}
                </td>
                <td
                  class="font-gunjarati text-sm p-2 font-semibold whitespace-nowrap text-[#4a4848]"
                >
                  {{ listBorrowAll.user.Username }}
                </td>
                <td
                  class="font-gunjarati text-sm p-2 font-semibold whitespace-nowrap"
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
                  <div class="flex gap-1 justify-center p-2">
                    <button
                      class="p-1 text-sm font-gunjarati border-[1px] border-[#1859D4] rounded-tl-lg rounded-bl-lg px-4 font-bold hover:bg-[#1859D4] hover:text-white hover:duration-300"
                      @click="
                        openModal(
                          listBorrowAll.dataPinjam.idPeminjaman,
                          listBorrowAll.buku[0].Judul,
                          listBorrowAll.user.Username
                        )
                      "
                    >
                      Ubah
                    </button>
                    <button
                      class="p-1 text-sm font-gunjarati border-[1px] border-[#05B016] rounded-tr-lg rounded-br-lg px-5 font-bold hover:bg-[#05B016] hover:text-white hover:duration-300"
                      @click="openTelp(listBorrowAll.user.NoTelp)"
                    >
                      Hubungi
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
      <baseModal :title="'Diambil'" :actived="checkModal" @close="closeModal">
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-justify py-3">
              Peminjaman Buku <span class="font-semibold">{{ buku }}</span> oleh
              <span class="font-semibold">{{ username }}</span>
              , ingin diubah ?
              <span class="text-[#3e50b7d8] font-semibold">{{ nameBook }}</span>
            </p>
            <select
              name=""
              id=""
              class="w-full mb-6 p-3 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a]"
              v-model="statusCode"
            >
              <option value="1">Belum Diambil</option>
              <option value="2">Belum Dikembalikan</option>
              <option value="3">Sudah Dikembalikan</option>
            </select>
            <div class="w-full pb-3">
              <button
                class="bg-[#1859D4] w-full rounded-md font-gunjarati text-white font-semibold items-center flex justify-center py-2"
                @click="changeStatusCode"
              >
                Ubah
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
import { ref, onMounted } from "vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
import moment from "moment";
// import loadData from "../../../components/loadData.vue";

export default {
  name: "listDoneBack",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let role = ref("");
    const toast = useToast();

    let bookList = ref([]);

    const take = 20;
    let skip = ref(0);
    const listData = ref([]);

    onMounted(async () => {
      let data = {
        tipe: 3,
        skip: skip.value,
        take: take,
      };
      await store.dispatch("Borrow/getListPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listData.value = listData.value.concat(res.data[1].data.daftarPinjam);
        statusCode.value = 3;
      });
    });

    const momentTanggalPengembalian = (tanggalPengembalian) => {
      return moment(tanggalPengembalian).format("DD MMMM YYYY");
    };

    const openCall = (noTelp) => {
      window.location.href = "http://wa.me/" + noTelp;
    };
    const idPinjaman = ref("");
    const buku = ref("");

    const changeStatusCode = async () => {
      let data = {
        idPinjam: idPinjaman.value,
        tipe: parseInt(statusCode.value),
      };
      await store.dispatch("Borrow/changeStatus", data).then(async (res) => {
        if (res.status == 200) {
          console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
          toast.success(res.data[0].message);
          closeModal();
          listData.value = [];
          let data = {
            tipe: 3,
            skip: skip.value,
            take: take,
          };
          await store.dispatch("Borrow/getListPinjam", data).then((res) => {
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            listData.value = listData.value.concat(
              res.data[1].data.daftarPinjam
            );
          });
        }
      });
    };

    const checkModal = ref(false);
    const username = ref("");
    const openModal = (idPinjam, bukuPinjam, user) => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
      idPinjaman.value = idPinjam;
      buku.value = bukuPinjam;
      username.value = user;
    };
    const closeModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
      statusCode.value = 3;
    };

    const statusCode = ref("");

    const openTelp = (noTelp) =>
      window.open("https://wa.me/" + noTelp, "_blank");

    return {
      role,
      bookList,
      skip,
      listData,
      openModal,
      closeModal,
      idPinjaman,
      changeStatusCode,
      checkModal,
      buku,
      momentTanggalPengembalian,
      openCall,
      statusCode,
      username,
      openTelp,
    };
  },
};
</script>
