<template>
  <basePageTemp :titleName="'Rincian Laporan'">
    <template v-slot:content>
      <div class="flex justify-between px-5 pt-6 items-center">
        <p class="font-gunjarati font-semibold text-base">
          Rekap {{ dateParam }}
        </p>
        <button
          class="hover:bg-[#3aca6a] hover:duration-300 duration-300 px-6 py-1 rounded-md font-gunjarati font-semibold border-[1px] border-[#3aca6a]"
          @click="downloadCsvStart"
        >
          Unduh
        </button>
      </div>
      <div class="w-full pt-2 px-4 duration-300">
        <template v-if="listData.length > 0">
          <div
            class="mobile:w-full p-3 border-[1px] border-[#979494] rounded-lg mb-3"
          >
            <p class="font-bold font-gunjarati text-base">
              Total Buku Dipinjam
            </p>
            <p class="font-bold font-gunjarati text-2xl text-end">
              {{ listData.length > 0 ? listData[0].totalBukuDipinjam : "0" }}
            </p>
          </div>
          <div
            class="mobile:w-full p-3 border-[1px] border-[#979494] rounded-lg tablet:mt-3"
          >
            <p class="font-bold font-gunjarati text-base">Buku Yang Dipinjam</p>
            <template
              v-for="(listBuku, index) in listData[0].detailJumlahBukuDipinjam"
            >
              <div
                class="bg-[#afacacc0] p-3 rounded-md mt-2 flex justify-between items-center"
              >
                <p class="font-bold font-gunjarati text-sm text-black">
                  {{ index + 1 }}
                </p>
                <p
                  class="font-semibold font-gunjarati text-sm text-black w-full px-2"
                >
                  {{ listBuku.Judul }}
                </p>
                <p class="font-semibold font-gunjarati text-sm text-black">
                  {{ listBuku.totalPinjam }}x
                </p>
              </div>
            </template>
          </div>
          <div
            class="mobile:w-full p-3 border-[1px] border-[#979494] rounded-lg mt-3"
          >
            <p class="font-bold font-gunjarati text-base">
              Buku Yang Belum Kembali
            </p>
            <template
              v-for="(listPinjam, index) in listData[0].dataBelumKembali"
            >
              <div
                class="bg-[#afacacc0] p-3 rounded-md mt-2 flex flex-col justify-center"
              >
                <div>
                  <p class="font-gunjarati font-semibold">
                    {{ listPinjam.buku.Judul }}
                  </p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="font-gunjarati font-semibold text-sm">
                    {{ listPinjam.dataUser.NamaLengkap }}
                  </p>
                  <p class="font-gunjarati font-semibold">
                    {{ listPinjam.jumlah }}x
                  </p>
                </div>
              </div>
            </template>
          </div>
          <div
            class="mobile:w-full p-3 border-[1px] border-[#979494] rounded-lg mt-3 mb-3"
          >
            <p class="font-bold font-gunjarati text-base">
              Buku Yang Terlambat Pengembalian
            </p>

            <template
              v-for="(listDataAll, index) in listData[0]
                .dataTerlambatPengembalian"
            >
              <div
                class="bg-[#afacacc0] p-3 rounded-md mt-2 flex flex-col justify-center"
              >
                <p class="font-bold font-gunjarati">
                  {{ listDataAll.book.Judul }}
                </p>
                <div class="flex justify-between">
                  <p class="font-gunjaranti font-semibold">Nama Lengkap</p>
                  <p class="font-gunjaranti">
                    {{ listDataAll.dataUser.NamaLengkap }}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-gunjaranti font-semibold">Jumlah</p>
                  <p class="font-gunjaranti">{{ listDataAll.jumlah }}x</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-gunjaranti font-semibold">Terlambat</p>
                  <p class="font-gunjaranti">
                    {{ listDataAll.terlambat }} Hari
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="font-gunjaranti font-semibold">Denda</p>
                  <p class="font-gunjaranti">Rp{{ listDataAll.denda }}</p>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
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
import { useRoute } from "vue-router";
export default defineComponent({
  name: "detailReport",
  components: {
    basePageTemp,
    titleTemp,
    cardBook,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const dateParam = ref(new Date());
    dateParam.value = moment(route.params.dateStart).format("MMMM YYYY");

    const listData = ref([]);
    onMounted(async () => {
      let data = {
        start: route.params.dateStart,
        end: route.params.dateEnd,
      };
      await store.dispatch("Report/getDetail", data).then((res) => {
        listData.value.push(res.data[1].data);
        console.log(
          "🚀 ~ awaitstore.dispatch ~ listData.value:",
          listData.value
        );
      });
    });

    const downloadCsvStart = async () => {
      let data = {
        start: route.params.dateStart,
        end: route.params.dateEnd,
      };
      await store.dispatch("Report/downloadCsv", data).then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        console.log(url);
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `dataLaporan-${data.start}-${data.end}.zip`
        );
        document.body.appendChild(link);
        link.click();
      });
    };

    return {
      listData,
      dateParam,
      downloadCsvStart,
    };
  },
});
</script>
