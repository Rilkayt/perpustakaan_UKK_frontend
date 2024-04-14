<template>
  <basePageTemp :titleName="'Laporan'">
    <template v-slot:content>
      <div
        class="mobile:overflow-auto desktop:overflow-hidden shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] p-4 mt-7"
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
                Bulan
              </th>

              <th
                class="w-7 px-5 py-2 font-gunjarati rounded-tr-2xl font-semibold text-sm"
              >
                <span>Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr class="border-b-[10px]" v-if="listReport.length < 1">
              <td class="font-gunjarati text-center p-5" colspan="3">
                Belum Ada Report Pada Tahun Ini
              </td>
            </tr>

            <template
              v-for="(listReportAll, index) in listReport"
              v-if="listReport.length > 0"
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
                  {{ listReportAll.mounthYear }}
                </td>
                <td
                  class="font-gunjarati text-sm p-2 font-semibold text-start whitespace-nowrap"
                >
                  <button
                    class="p-1 text-sm font-gunjarati border-[1px] border-[#1859D4] rounded-lg px-4 font-bold hover:bg-[#1859D4] hover:text-white hover:duration-300 w-full"
                    @click="
                      goToDetail(listReportAll.dateStart, listReportAll.dateEnd)
                    "
                  >
                    Lihat
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
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
import { useRouter } from "vue-router";
export default defineComponent({
  name: "listReport",
  components: {
    basePageTemp,
    titleTemp,
    cardBook,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const listReport = ref([]);

    onMounted(async () => {
      await store.dispatch("Report/getListLaporan").then((res) => {
        let listReverse = listReport.value.concat(res.data[1].data).reverse();
        listReport.value = listReverse;
      });
    });

    const goToDetail = (start, end) => {
      router.push({
        name: "detailReport",
        params: { dateStart: start, dateEnd: end },
      });
    };

    return {
      listReport,
      goToDetail,
    };
  },
});
</script>
