<template>
  <basePage :titleName="'Buku'" :footerRight="true">
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
        <div class="mt-3 flex justify-between p-5">
          <div class="flex gap-2">
            <font-awesome-icon :icon="['fas', 'filter']" size="lg" />
            <select
              name="filter"
              id="filter"
              class="outline-none appearance-none bg-transparent text-base font-gunjarati font-semibold"
              v-model="categoryInput"
              @change="categoryChange"
            >
              <option value="">Semua</option>
              <template v-for="listCategoryAll in listCategory">
                <option :value="listCategoryAll.idKategori">
                  {{ listCategoryAll.nama }}
                </option>
              </template>
            </select>
          </div>
          <div class="border border-[#7B7B7B] rounded-lg w-[max-content]">
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
              class="p-9 grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 mobile:gap-4"
            >
              <template
                v-for="(bookRandomList, index) in bookList"
                :key="index"
              >
                <cardBook
                  :cover="bookRandomList.Gambar"
                  :penulis="bookRandomList.Penulis"
                  :title="bookRandomList.Judul"
                  :idBook="bookRandomList.BukuID"
                  @openModal="
                    openModalPinjam(
                      bookRandomList.BukuID,
                      bookRandomList.Jumlah,
                      bookRandomList.Judul
                    )
                  "
                />
              </template>
              <loadData
                :id="'load-data'"
                @nextAction="takeAgainData"
                v-if="dataDinamic >= take"
              ></loadData>
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
                <tr v-if="bookList.length < 1">
                  <td colspan="5">
                    <p
                      v-if="bookList.length < 1"
                      class="font-gunjarati text-center p-6"
                    >
                      Buku di perpustakaan ini tidak ditemukan
                    </p>
                  </td>
                </tr>
                <template
                  v-for="(bookRandomList, index) in bookList"
                  :key="index"
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
                      {{ bookRandomList.Jumlah }}/{{
                        bookRandomList.Jumlah +
                        bookRandomList.bukuSedangDipinjam
                      }}
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
                          @click="seeDetail(bookRandomList.BukuID)"
                        >
                          Ubah
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
    </template>
    <template v-slot:footer v-if="role === 'ADMIN' || role === 'EMPLOYEE'">
      <button
        class="bg-[#E8C13C] py-2 px-4 w-28 rounded-2xl m-3"
        @click="goToAdd"
      >
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
              <span class="text-[#3e50b7d8] font-semibold">{{ nameBook }}</span
              >?<br />
              <span class="font-gunjarati font-semibold text-red-700 text-sm"
                >*Peminjaman , Kategori, Koleksi, Ulasan pada buku ini akan
                dihapus</span
              >
            </p>
            <div class="w-full pb-3">
              <button
                class="bg-[#fd3737] w-full rounded-md font-gunjarati text-white font-semibold items-center flex justify-center py-2"
                @click="deleteData"
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

      <baseModal
        :title="'Pinjam Buku'"
        :actived="checkModalPinjam"
        @close="closeModalPinjam"
      >
        <template v-slot:content>
          <div
            class="bg-[#DEDDDD] rounded-tr-2xl rounded-tl-2xl"
            v-if="role === 'USER'"
          >
            <p class="font-gunjarati text-sm pt-4 px-3 font-semibold">
              {{ judulBukuSelect }}
            </p>
            <div class="flex items-center gap-6 justify-end py-2 px-7">
              <div @click="removeJumlah">
                <font-awesome-icon :icon="['fas', 'circle-minus']" />
              </div>
              <p>{{ jumlah }}</p>
              <div @click="addJumlah">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
              </div>
            </div>
            <div class="flex justify-between gap-4 px-7">
              <div class="w-full">
                <p class="font-gunjarati text-sm text-black">
                  Tanggal Peminjaman
                </p>
                <VDatePicker
                  v-model="selectedDateStart"
                  :disabled-dates="disableDateStart"
                  :min-date="new Date().getTime()"
                  :max-date="new Date().getTime() + 7 * 24 * 60 * 60 * 1000"
                >
                  <template #default="{ togglePopover }">
                    <button
                      class="w-full rounded-md border-[1px] border-[#3A3737] text-end px-3 py-1"
                      @click="() => togglePopover()"
                    >
                      {{ selectedDateStart }}
                      <font-awesome-icon :icon="['fas', 'calendar-days']" />
                    </button>
                  </template>
                </VDatePicker>
              </div>
              <div class="w-full">
                <p class="font-gunjarati text-sm text-black">
                  Tanggal Pengembalian
                </p>
                <VDatePicker
                  v-model="selectedDateEnd"
                  :min-date="selectedDateStart"
                  :max-date="
                    new Date(selectedDateStart).getTime() +
                    7 * 24 * 60 * 60 * 1000
                  "
                >
                  <template #default="{ togglePopover }">
                    <button
                      :disabled="selectedDateStart != null ? false : true"
                      class="w-full rounded-md border-[1px] border-[#3A3737] text-end px-3 py-1"
                      @click="() => togglePopover()"
                    >
                      {{ selectedDateEnd }}
                      <font-awesome-icon :icon="['fas', 'calendar-days']" />
                    </button>
                  </template>
                </VDatePicker>
              </div>
            </div>
            <div class="px-6 py-2">
              <button
                class="w-full bg-[#E8C13C] px-2 py-1 rounded-lg font-semibold"
                @click="startBorrow"
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
                {{ !buttonLoading ? "Pinjam" : "Memuat" }}
              </button>
            </div>
          </div>
        </template>
      </baseModal>
    </template>
  </basePage>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";
import loadData from "../../../components/loadData.vue";
import moment from "moment";

export default defineComponent({
  name: "listBooks",
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
    let bookListUser = ref([]);

    const isLoading = ref(false);

    const skip = ref(0);
    const take = ref(0);

    const selectedDateStart = ref(null);
    const selectedDateEnd = ref(null);

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
      buttonLoading.value = true;
      await store
        .dispatch("Books/deleteBookStart", uuidBookSelected.value)
        .then(async (res) => {
          console.log(res);
          if (res.status == 200) {
            toast.success("Buku Berhasil Di Hapus");
            buttonLoading.value = false;
            closeModal();

            let data = {
              skip: 0,
              take: take.value,
            };
            await store.dispatch("Books/getListBook", data).then((res) => {
              if (res.status == 200) {
                bookList.value = [];
                bookList.value = bookList.value.concat(
                  res.data[1].data.daftarBuku
                );
                buttonLoading.value = false;
              }
            });
          }
        });
    };

    const dataDinamic = ref(0);
    const listCategory = ref([]);
    onMounted(async () => {
      isLoading.value = true;
      take.value = 20;
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;

      let data = {
        skip: skip.value,
        take: take.value,
      };

      await store.dispatch("Category/getCategory").then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listCategory.value = listCategory.value.concat(res.data[1].data);
      });

      await store.dispatch("Books/getListBook", data).then((res) => {
        console.log(res);
        if (res.status == 200) {
          bookList.value = bookList.value.concat(res.data[1].data.daftarBuku);
          dataDinamic.value += res.data[1].data.count;
          isLoading.value = false;
          skip.value += take.value;
        }
      });
    });

    watchEffect(() => {
      if (selectedDateStart.value != null)
        selectedDateStart.value = moment(selectedDateStart.value).format(
          "DD MMMM YYYY"
        );

      if (selectedDateEnd.value != null) {
        if (
          new Date(selectedDateEnd.value).getTime() >=
          new Date(selectedDateStart.value).getTime()
        ) {
          selectedDateEnd.value = moment(selectedDateEnd.value).format(
            "DD MMMM YYYY"
          );
        } else {
          selectedDateEnd.value = null;
        }
      }
    });

    const seeDetail = (idBook) => {
      router.push({ name: "detailBook", params: { idBuku: idBook } });
    };

    const goToAdd = () => {
      router.push({ name: "addBook" });
    };

    const takeAgainData = async () => {
      let data = {
        skip: skip.value,
        take: take.value,
      };

      dataDinamic.value = 0;

      await store.dispatch("Books/getListBook", data).then((res) => {
        console.log(res);
        if (res.status == 200) {
          let data = [];
          data = data.concat(res.data[1].data.daftarBuku);
          bookList.value = bookList.value.concat(data);
          dataDinamic.value += res.data[1].data.count;
          skip.value += take.value;
        }
      });
    };

    const idBukuSelect = ref("");
    const jumlahBukuSelect = ref(0);

    const judulBukuSelect = ref("");
    const checkModalPinjam = ref(false);

    const openModalPinjam = (idBuku, jumlahBuku, nameBook) => {
      checkModalPinjam.value = !checkModalPinjam.value;
      console.log(jumlahBuku);
      idBukuSelect.value = idBuku;
      jumlahBukuSelect.value = jumlahBuku;
      judulBukuSelect.value = nameBook;
    };
    const closeModalPinjam = () => {
      checkModalPinjam.value = !checkModalPinjam.value;
    };

    const jumlah = ref(0);
    const addJumlah = () => {
      console.log(jumlahBukuSelect.value);
      if (jumlah.value < jumlahBukuSelect.value) jumlah.value++;
    };
    const removeJumlah = () => {
      if (jumlah.value > 0) jumlah.value--;
    };

    const buttonLoading = ref(false);

    const startBorrow = async () => {
      if (
        selectedDateStart.value != null &&
        selectedDateEnd.value != null &&
        jumlah.value > 0
      ) {
        buttonLoading.value = true;
        let dataPinjam = {
          tanggal_peminjaman: moment(selectedDateStart.value).format(
            "YYYY-MM-DD"
          ),
          tanggal_pengembalian: moment(selectedDateEnd.value).format(
            "YYYY-MM-DD"
          ),
          jumlah: jumlah.value,
        };
        console.log("🚀 ~ startBorrow ~ dataPinjam:", dataPinjam);
        await store
          .dispatch("Books/borrowBook", {
            idBook: idBukuSelect.value,
            data: dataPinjam,
          })
          .then((res) => {
            console.log("🚀 ~ startBorrow ~ res:", res);
            if (res.status == 200) {
              toast.success(
                "Berhasil Melakukan Peminjaman, Jangan Lupa Dikembalikan ya !"
              );
              selectedDateStart.value = null;
              selectedDateEnd.value = null;
              jumlah.value = 0;
              buttonLoading.value = false;
              closeModalPinjam();
            }
          });
      } else {
        toast.error(
          "Jumlah/Tanggal Peminjaman/Tanggal Pengembalian ada yang kosong"
        );
        buttonLoading.value = false;
      }
    };

    const checkButtonSearch = ref(false);
    const inputSearch = ref("");
    const searchStart = async () => {
      if (inputSearch.value != "") {
        categoryInput.value = "";
        await store
          .dispatch("Books/searchBook", inputSearch.value)
          .then((res) => {
            if (res.status == 200) {
              checkButtonSearch.value = !checkButtonSearch.value;
              bookList.value = [];
              bookList.value = bookList.value.concat(
                res.data[1].data.daftarBuku
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
      bookList.value = [];
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;

      let data = {
        skip: skip.value,
        take: take.value,
      };

      await store.dispatch("Books/getListBook", data).then((res) => {
        console.log(res);
        if (res.status == 200) {
          bookList.value = bookList.value.concat(res.data[1].data.daftarBuku);
          dataDinamic.value += res.data[1].data.count;
          isLoading.value = false;
          skip.value += take.value;
        }
      });
    };

    const categoryInput = ref("");
    const categoryChange = async () => {
      console.log(categoryInput.value);
      if (categoryInput.value != "") {
        isLoading.value = true;
        await store
          .dispatch("Books/filterBook", categoryInput.value)
          .then((res) => {
            if (res.status == 200) {
              bookList.value = [];
              bookList.value = bookList.value.concat(
                res.data[1].data.daftarBuku
              );
              dataDinamic.value = 0;
            }
            console.log(res);
          });
        isLoading.value = false;
      } else {
        isLoading.value = true;
        inputSearch.value = "";
        take.value = 20;
        skip.value = 0;
        bookList.value = [];
        let dataUser = JSON.parse(localStorage.getItem("token"));
        let dataUserReady = jwtDecode(dataUser.token);
        role.value = dataUserReady.Tipe;

        let data = {
          skip: skip.value,
          take: take.value,
        };

        await store.dispatch("Books/getListBook", data).then((res) => {
          console.log(res);
          if (res.status == 200) {
            bookList.value = bookList.value.concat(res.data[1].data.daftarBuku);
            dataDinamic.value += res.data[1].data.count;
            isLoading.value = false;
            skip.value += take.value;
          }
        });
      }
    };

    return {
      role,
      bookList,
      bookListUser,
      openModal,
      checkModal,
      closeModal,
      openDeleteData,
      uuidBookSelected,
      nameBook,
      deleteData,
      seeDetail,
      goToAdd,
      isLoading,
      skip,
      take,
      dataDinamic,
      takeAgainData,
      checkModalPinjam,
      openModalPinjam,
      closeModalPinjam,
      jumlah,
      addJumlah,
      removeJumlah,
      selectedDateStart,
      selectedDateEnd,
      idBukuSelect,
      jumlahBukuSelect,
      startBorrow,
      judulBukuSelect,
      buttonLoading,
      inputSearch,
      searchStart,
      checkButtonSearch,
      closeSearch,
      listCategory,
      categoryInput,
      categoryChange,
    };
  },
});
</script>
