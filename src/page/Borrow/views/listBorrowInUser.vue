<template>
  <basePage :titleName="'Peminjaman'">
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
        <div class="mt-1 flex p-3">
          <div class="flex pt-4 gap-2">
            <font-awesome-icon :icon="['fas', 'filter']" size="lg" />
            <select
              name="filter"
              id="filter"
              class="outline-none appearance-none bg-transparent text-base font-gunjarati font-semibold"
              v-model="filterInput"
              @change="filterChange"
            >
              <option value="">Semua</option>
              <option value="1">Belum Diambil</option>
              <option value="2">Belum Dikembalikan</option>
              <option value="3">Sudah Dikembalikan</option>
              <option value="4">Dibatalkan</option>
            </select>
          </div>
        </div>
        <template v-if="listPeminjamanRiwayat.length > 0">
          <div class="laptop:grid laptop:grid-cols-3 gap-2">
            <template v-for="listRiwayatAll in listPeminjamanRiwayat">
              <div class="px-3 mt-3">
                <div
                  id="card"
                  class="flex flex-row w-full bg-[#b6bbb943] p-3 rounded-xl items-center shadow-[3px_4px_4px_0px_rgba(0,0,0,0.3)]"
                >
                  <div>
                    <img
                      :src="`../../../..${listRiwayatAll.dataBook.Gambar}`"
                      alt=""
                      class="w-20"
                    />
                  </div>
                  <div class="px-2 w-full">
                    <div class="flex justify-end">
                      <template v-if="listRiwayatAll.dataPinjam.status === 1">
                        <p
                          class="font-gunjarati text-end text-[0.5rem] bg-[#ff8c198c] w-[max-content] px-1 py-[0.1rem] rounded-[5px] font-semibold"
                        >
                          Belum Diambil
                        </p>
                      </template>
                      <template v-if="listRiwayatAll.dataPinjam.status === 2">
                        <p
                          class="font-gunjarati text-end text-[0.5rem] bg-[#bd1e1eee] w-[max-content] px-1 py-[0.1rem] rounded-[5px] font-semibold text-white"
                        >
                          Belum Dikembalikan
                        </p>
                      </template>
                      <template v-if="listRiwayatAll.dataPinjam.status === 3">
                        <p
                          class="font-gunjarati text-end text-[0.5rem] bg-[#12e057b2] w-[max-content] px-1 py-[0.1rem] rounded-[5px] font-semibold"
                        >
                          Sudah Dikembalikan
                        </p>
                      </template>
                      <template v-if="listRiwayatAll.dataPinjam.status === 4">
                        <p
                          class="font-gunjarati text-end text-[0.5rem] bg-[#ffa216c4] w-[max-content] px-1 py-[0.1rem] rounded-[5px] font-semibold"
                        >
                          Dibatalkan
                        </p>
                      </template>
                    </div>
                    <p
                      class="font-gunjarati text-start text-sm font-semibold pb-2 pt-3"
                    >
                      {{ listRiwayatAll.dataBook.Judul }}
                    </p>
                    <div class="mobile:flex mobile:gap-5 justify-around">
                      <div>
                        <p class="font-gunjarati text-[10px]">Tanggal Pinjam</p>
                        <p class="font-gunjarati text-[10px] text-center">
                          {{
                            momentTanggal(
                              listRiwayatAll.dataPinjam.tanggalPeminjaman
                            )
                          }}
                        </p>
                      </div>
                      <div>
                        <p class="font-gunjarati text-[10px]">
                          Tanggal Kembali
                        </p>
                        <p class="font-gunjarati text-[10px] text-center">
                          {{
                            momentTanggal(
                              listRiwayatAll.dataPinjam.tanggalPengembalian
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="w-full text-end">
                      <a
                        class="font-gunjarati text-end font-bold text-[#1A7DB5] text-sm pt-3"
                        :href="`/buku/detail-buku/${listRiwayatAll.dataPinjam.idBuku}`"
                      >
                        Lihat Buku
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <loadData
          :id="'load-data'"
          @nextAction="takeAgainData"
          v-if="dataDinamic >= take"
        ></loadData>
      </template>
    </template>
  </basePage>
</template>

<script>
import { ref, onMounted } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import moment from "moment";
import loadData from "../../../components/loadData.vue";

export default {
  name: "listBorrowInUser",
  components: {
    basePage,
    loadData,
  },
  setup() {
    const store = useStore();
    const listPeminjamanRiwayat = ref([]);
    const toast = useToast();
    const isLoading = ref(false);
    const skip = ref(0);
    const take = ref(0);
    take.value = 20;

    const dataDinamic = ref(0);

    onMounted(async () => {
      isLoading.value = true;
      dataDinamic.value = 0;
      let data = {
        take: take.value,
        skip: skip.value,
      };
      await store.dispatch("Borrow/getListRiwayatPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listPeminjamanRiwayat.value = listPeminjamanRiwayat.value.concat(
          res.data[1].data
        );
        dataDinamic.value += res.data[1].data.length;
        skip.value += take.value;
        isLoading.value = false;
      });
      isLoading.value = false;
    });

    const takeAgainData = async () => {
      dataDinamic.value = 0;
      let data = {
        take: take.value,
        skip: skip.value,
      };
      await store.dispatch("Borrow/getListRiwayatPinjam", data).then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        listPeminjamanRiwayat.value = listPeminjamanRiwayat.value.concat(
          res.data[1].data
        );
        dataDinamic.value += res.data[1].data.length;
        skip.value += take.value;
      });
    };

    const momentTanggal = (dateParam) => {
      return moment(new Date(parseInt(dateParam)).getTime()).format(
        "DD MMMM YYYY"
      );
    };

    const filterInput = ref("");
    const filterChange = async () => {
      console.log(filterInput.value);
      if (filterInput.value != "") {
        isLoading.value = true;
        await store
          .dispatch("Borrow/filterPinjam", filterInput.value)
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              dataDinamic.value = 0;
              listPeminjamanRiwayat.value = [];
              listPeminjamanRiwayat.value = listPeminjamanRiwayat.value.concat(
                res.data[1].data
              );
            }
            console.log(res);
          });
        isLoading.value = false;
      } else {
        isLoading.value = true;
        take.value = 20;
        skip.value = 0;
        dataDinamic.value = 0;
        let data = {
          take: take.value,
          skip: skip.value,
        };
        listPeminjamanRiwayat.value = [];
        await store
          .dispatch("Borrow/getListRiwayatPinjam", data)
          .then((res) => {
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            listPeminjamanRiwayat.value = listPeminjamanRiwayat.value.concat(
              res.data[1].data
            );
            dataDinamic.value += res.data[1].data.length;
            skip.value += take.value;
            isLoading.value = false;
          });
        isLoading.value = false;
      }
    };
    return {
      listPeminjamanRiwayat,
      momentTanggal,
      skip,
      take,
      dataDinamic,
      takeAgainData,
      isLoading,
      filterInput,
      filterChange,
    };
  },
};
</script>
