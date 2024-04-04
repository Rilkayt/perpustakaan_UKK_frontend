<template>
  <basePageTemp :titleName="'Beranda'">
    <template v-slot:content>
      <div class="flex justify-between pt-6 px-6">
        <p class="font-semibold font-gunjarati text-start">{{ school }}</p>
        <p class="font-semibold font-gunjarati text-end">
          {{ date }}
        </p>
      </div>

      <!-- admin -->
      <template v-if="role === 'ADMIN'">
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
              <font-awesome-icon
                :icon="['fas', 'circle-info']"
                size="sm"
                style="color: #dedfe1"
              />
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
              <font-awesome-icon
                :icon="['fas', 'circle-info']"
                size="sm"
                style="color: #dedfe1"
              />
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
                href=""
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
          <template v-if="bookPopuler.length > 0">
            <div
              class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
            >
              <div class="flex gap-3 items-center">
                <p class="font-gunjaranti font-bold">1</p>
                <p class="font-gunjaranti font-bold">
                  Bahasa Indonesia Kelas 10
                </p>
              </div>
              <div class="flex gap-7 items-center">
                <p class="font-gunjaranti font-bold">10x</p>
                <a href="" class="font-gunjaranti text-[#1A7DB5] font-bold"
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
              Buku PKN Kelas 10
            </p>

            <div class="flex gap-4 items-center">
              <p class="font-gunjaranti font-semibold text-white">
                Tenggat, 25 April 2006
              </p>
              <font-awesome-icon
                :icon="['fas', 'info']"
                size="sm"
                style="color: #fff"
              />
            </div>
          </div>
        </template>

        <div class="desktop:flex desktop:flex-row-reverse">
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
            <template v-if="koleksi.length > 1">
              <div
                class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
              >
                <p class="font-gunjaranti font-bold">
                  Bahasa Indonesia Kelas 10
                </p>
                <a href="" class="font-gunjaranti text-[#1A7DB5] font-bold"
                  >Detail</a
                >
              </div>
              <div
                class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
              >
                <p class="font-gunjaranti font-bold">
                  Bahasa Indonesia Kelas 10
                </p>
                <a href="" class="font-gunjaranti text-[#1A7DB5] font-bold"
                  >Detail</a
                >
              </div>
              <div
                class="flex justify-between bg-[#D9D9D9] m-5 px-5 py-3 rounded-lg"
              >
                <p class="font-gunjaranti font-bold">
                  Bahasa Indonesia Kelas 10
                </p>
                <a href="" class="font-gunjaranti text-[#1A7DB5] font-bold"
                  >Detail</a
                >
              </div>

              <div class="text-center pb-6">
                <a
                  href=""
                  class="font-gunjaranti text-[#1A7DB5] font-bold text-center"
                  >Lihat Semua</a
                >
              </div>
            </template>
          </div>

          <div
            class="border border-[#7B7B7B] rounded-[1rem] m-5 p-7 desktop:w-full h-[max-content]"
          >
            <p
              v-if="bookRandom.length < 1"
              class="font-gunjarati text-center py-4"
            >
              Buku di perpustakaan ini belum tersedia
            </p>

            <template v-if="bookRandom.length > 0">
              <div
                class="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-3 gap-4"
              >
                <template v-for="bookRandomList in bookRandom">
                  <cardBook
                    :title="bookRandomList.Judul"
                    :cover="bookRandomList.Gambar"
                    :penulis="bookRandomList.Penulis"
                  />
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>
  </basePageTemp>
</template>

<script>
import moment from "moment";
import { defineComponent, onMounted, ref } from "vue";
import basePageTemp from "../../../components/basePageTemp.vue";
import titleTemp from "../../../components/titleTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "dashboardPage",
  components: {
    basePageTemp,
    titleTemp,
    cardBook,
  },
  setup() {
    const store = useStore();
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

    onMounted(async () => {
      await store.dispatch("Dashboard/getDashboard").then((res) => {
        console.log(res);
        if (res.data[1].data.user.Tipe === "USER") {
          role.value = res.data[1].data.user.Tipe;
          date.value = moment(new Date()).format("DD MMMM YYYY, HH:mm");
          borrow.value = borrow.value.concat(res.data[1].data.peminjaman);
          koleksi.value = koleksi.value.concat(res.data[1].data.koleksiBuku);
          bookRandom.value = bookRandom.value.concat(res.data[1].data.buku);
          bookCover.value = res.data[1].data.buku;
          school.value = res.data[1].data.user.Sekolah;
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
        }
      });
    });

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
    };
  },
});
</script>
