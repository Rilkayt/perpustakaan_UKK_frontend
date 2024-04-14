<template>
  <basePage :titleName="'Koleksi'" :footerRight="true">
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
            <template v-for="(bookRandomList, index) in bookList">
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
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Pinjam Buku'"
        :actived="checkModalPinjam"
        @close="closeModalPinjam"
      >
        <template v-slot:content>
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
        </template>
      </baseModal>
    </template>
  </basePage>
</template>

<script>
import cardBook from "../components/cardBook.vue";
import basePage from "../../../components/basePageTemp.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import loadData from "../../../components/loadData.vue";
import moment from "moment";
import baseModal from "../../../components/baseModal.vue";

export default {
  name: "collectionUser",
  components: {
    cardBook,
    basePage,
    loadData,
    baseModal,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const bookList = ref([]);

    const toast = useToast();

    let uuidBookSelected = ref("");
    let nameBook = ref("");
    const skip = ref(0);
    const take = ref(0);

    const selectedDateStart = ref(null);
    const selectedDateEnd = ref(null);

    const dataDinamic = ref(0);
    onMounted(async () => {
      isLoading.value = true;
      take.value = 20;

      let data = {
        skip: skip.value,
        take: take.value,
      };

      await store.dispatch("Books/getKoleksi", data).then((res) => {
        console.log(res);
        if (res.status == 200) {
          bookList.value = bookList.value.concat(res.data[1].data);
          dataDinamic.value += res.data[1].data.length;
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

    return {
      isLoading,
      bookList,
      take,
      skip,
      uuidBookSelected,
      nameBook,
      selectedDateStart,
      selectedDateEnd,
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
      seeDetail,
    };
  },
};
</script>
