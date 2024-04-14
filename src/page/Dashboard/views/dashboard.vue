<template>
  <basePageTemp :titleName="'Beranda'">
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
        <div class="flex justify-between pt-6 px-6">
          <p class="font-semibold font-gunjarati text-start">{{ school }}</p>
          <p class="font-semibold font-gunjarati text-end">
            {{ date }}
          </p>
        </div>

        <!-- admin -->
        <template v-if="role === 'ADMIN' || role === 'EMPLOYEE'">
          <div
            class="border border-[#7B7B7B] rounded-[1rem] m-5 tablet:flex tablet:justify-between"
          >
            <!-- total user -->
            <div
              class="bg-gradient-to-r from-[#40475A] from-20% to-[#127828] to-1% m-3 rounded-md p-4 tablet:w-full"
            >
              <div class="flex justify-between">
                <p class="font-gunjarati text-[#DEDFE1] font-semibold">
                  Total User
                </p>
                <div @click="openModalUser">
                  <font-awesome-icon
                    :icon="['fas', 'circle-info']"
                    size="sm"
                    style="color: #dedfe1"
                  />
                </div>
              </div>
              <p
                class="text-end text-[#DCD4C8] text-[3rem] font-bold font-gunjaranti"
              >
                {{ totalUser }}
              </p>
            </div>

            <!-- total petugas -->
            <div
              class="bg-gradient-to-r from-[#40475A] from-20% to-[#148160] to-1% m-3 rounded-md p-4 tablet:w-full"
            >
              <div class="flex justify-between">
                <p class="font-gunjarati text-[#DEDFE1] font-semibold">
                  Total Petugas
                </p>
                <div @click="openModalPetugas">
                  <font-awesome-icon
                    :icon="['fas', 'circle-info']"
                    size="sm"
                    style="color: #dedfe1"
                  />
                </div>
              </div>
              <p
                class="text-end text-[#DCD4C8] text-[3rem] font-bold font-gunjaranti"
              >
                {{ totalEmployee }}
              </p>
            </div>

            <!-- total buku berjalan -->
            <div
              class="bg-gradient-to-r from-[#3E4E5D] from-20% to-[#921212] to-1% m-3 rounded-md p-4 tablet:w-full"
            >
              <div class="flex justify-between">
                <p class="font-gunjarati text-[#DEDFE1] font-semibold">
                  Buku Berjalan
                </p>
                <a
                  href="/daftar-pinjam/belum-dikembalikan"
                  class="font-gunjaranti font-semibold text-[12px] text-[#DCD4C8]"
                  >Lihat Semua</a
                >
              </div>
              <p
                class="text-end text-[#DCD4C8] text-[3rem] font-bold font-gunjaranti"
              >
                {{ activeBorrow }}
              </p>
            </div>
          </div>

          <div class="border border-[#7B7B7B] rounded-[1rem] m-5">
            <p class="font-gunjarati font-bold pt-5 px-5 text-[0.5cm]">
              Buku Populer
            </p>
            <template v-if="bookPopuler.length < 1">
              <p class="font-gunjarati text-center py-4">
                Buku Populer Belum Tersedia
              </p>
            </template>
            <template
              v-if="bookPopuler.length > 0"
              v-for="(allBook, index) in bookPopuler"
            >
              <div
                class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
              >
                <div class="flex gap-3 items-center">
                  <p class="font-gunjaranti font-bold">{{ index + 1 }}</p>
                  <p class="font-gunjaranti font-bold">
                    {{ allBook.buku.Judul }}
                  </p>
                </div>
                <div class="flex gap-7 items-center">
                  <p class="font-gunjaranti font-bold">
                    {{ allBook.jumlahPinjam }}x
                  </p>
                  <a
                    :href="`/buku/detail-buku/${allBook.buku.BukuID}`"
                    class="font-gunjaranti text-[#1A7DB5] font-bold"
                    >Lihat Buku</a
                  >
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-if="role === 'USER'">
          <template v-if="borrow.length > 0">
            <div
              class="flex p-3 justify-between items-center mx-6 mt-3 bg-[#DB1010] rounded-lg"
            >
              <p class="font-gunjaranti font-semibold text-white">
                {{ borrow[0].buku[0].Judul }}
              </p>

              <div class="flex gap-4 items-center">
                <p class="font-gunjaranti font-semibold text-white">
                  Tenggat, {{ dateTenggat }}
                </p>
              </div>
            </div>
          </template>

          <div class="laptop:flex laptop:flex-row-reverse">
            <!-- koleksi -->
            <div
              class="border border-[#7B7B7B] rounded-[1rem] m-5 desktop:w-full h-[max-content]"
            >
              <p class="font-gunjarati font-bold pt-5 px-5 text-[0.5cm]">
                Koleksi
              </p>
              <p
                class="font-gunjarati text-center py-4"
                v-if="koleksi.length < 1"
              >
                Belum Punya Koleksi Buku
              </p>
              <template
                v-if="koleksi.length > 0"
                v-for="(koleksiAll, index) in koleksi"
              >
                <div
                  class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
                >
                  <p class="font-gunjaranti font-bold">
                    {{ koleksiAll.Judul }}
                  </p>
                  <a
                    :href="`/buku/detail-buku/${koleksiAll.BukuID}`"
                    class="font-gunjaranti text-[#1A7DB5] font-bold"
                    >Detail</a
                  >
                </div>
              </template>
              <div class="text-center pb-6" v-if="koleksi.length > 0">
                <a
                  href="/koleksi"
                  class="font-gunjaranti text-[#1A7DB5] font-bold text-center"
                  >Lihat Semua</a
                >
              </div>
            </div>

            <div
              class="border border-[#7B7B7B] rounded-[1rem] m-5 p-7 desktop:w-full h-[max-content] col-span-3"
            >
              <p
                v-if="bookRandom.length < 1"
                class="font-gunjarati text-center py-4"
              >
                Buku di perpustakaan ini belum tersedia
              </p>

              <template v-if="bookRandom.length > 0">
                <div
                  class="mobile:grid mobile:grid-cols-1 laptop:grid-cols-2 gap-3"
                >
                  <template v-for="(bookRandomList, index) in bookRandom">
                    <cardBook
                      :title="bookRandomList.Judul"
                      :cover="bookRandomList.Gambar"
                      :penulis="bookRandomList.Penulis"
                      :bookId="bookRandomList.BukuID"
                      @openModal="
                        openModalPinjam(
                          bookRandomList.BukuID,
                          bookRandomList.Jumlah,
                          bookRandomList.Judul
                        )
                      "
                    />
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Total User'"
        :actived="checkModalUser"
        @close="closeModalUser"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-start py-3 tex-sm">
              User yang terdaftar sebanyak {{ totalUser }}
            </p>
          </div>
        </template>
      </baseModal>
      <baseModal
        :title="'Total Petugas'"
        :actived="checkModalPetugas"
        @close="closeModalPetugas"
      >
        <template v-slot:content>
          <div>
            <p class="font-gunjarati text-start py-3 tex-sm">
              Petugas yang terdaftar sebanyak {{ totalEmployee }}
            </p>
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
  </basePageTemp>
</template>

<script>
import moment from "moment";
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import basePageTemp from "../../../components/basePageTemp.vue";
import titleTemp from "../../../components/titleTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import baseModal from "../../../components/baseModal.vue";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "dashboardPage",
  components: {
    basePageTemp,
    titleTemp,
    cardBook,
    baseModal,
  },
  setup() {
    const store = useStore();
    const toast = useToast();

    const isLoading = ref(false);
    let role = ref("");

    let school = ref("");
    let date = ref("");
    let borrow = ref([]);
    let koleksi = ref([]);
    let bookRandom = ref([]);
    let bookCover = ref("");

    let totalUser = ref(0);
    let totalEmployee = ref(0);
    let activeBorrow = ref(0);

    let bookPopuler = ref([]);

    const selectedDateStart = ref(null);
    const selectedDateEnd = ref(null);

    const dateTenggat = ref("");
    onMounted(async () => {
      isLoading.value = true;
      await store.dispatch("Dashboard/getDashboard").then((res) => {
        console.log(res);
        if (res.data[1].data.user.Tipe === "USER") {
          role.value = res.data[1].data.user.Tipe;
          date.value = moment(new Date()).format("DD MMMM YYYY, HH:mm");
          if (res.data[1].data.peminjaman.length > 0) {
            dateTenggat.value = moment(
              res.data[1].data.peminjaman[0].tanggalPengembalian
            ).format("DD MMMM YYYY");
            borrow.value = borrow.value.concat(res.data[1].data.peminjaman);
          }

          koleksi.value = koleksi.value.concat(res.data[1].data.koleksiBuku);
          bookRandom.value = bookRandom.value.concat(res.data[1].data.buku);
          bookCover.value = res.data[1].data.buku;
          school.value = res.data[1].data.user.Sekolah;
          isLoading.value = false;
        } else if (
          res.data[1].data.user.Tipe === "ADMIN" ||
          res.data[1].data.user.Tipe === "EMPLOYEE"
        ) {
          role.value = res.data[1].data.user.Tipe;
          date.value = moment(new Date()).format("DD MMMM YYYY, HH:mm");
          totalUser.value = res.data[1].data.TotalAkunUser;
          totalEmployee.value = res.data[1].data.TotalAkunPetugas;
          activeBorrow.value = res.data[1].data.TotalBukuMasihDipinjam;
          school.value = res.data[1].data.user.Sekolah;
          bookPopuler.value = bookPopuler.value.concat(
            res.data[1].data.BukuPopuler
          );
          isLoading.value = false;
        }
      });
    });

    const checkModalUser = ref(false);
    const openModalUser = () => {
      checkModalUser.value = !checkModalUser.value;
    };
    const closeModalUser = () => {
      checkModalUser.value = !checkModalUser.value;
    };

    const checkModalPetugas = ref(false);
    const openModalPetugas = () => {
      checkModalPetugas.value = !checkModalPetugas.value;
    };
    const closeModalPetugas = () => {
      checkModalPetugas.value = !checkModalPetugas.value;
    };

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
      role,
      date,
      borrow,
      koleksi,
      bookRandom,
      totalUser,
      totalEmployee,
      activeBorrow,
      school,
      bookPopuler,
      isLoading,
      checkModalUser,
      openModalUser,
      closeModalUser,
      checkModalPetugas,
      openModalPetugas,
      closeModalPetugas,
      dateTenggat,
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
    };
  },
});
</script>
