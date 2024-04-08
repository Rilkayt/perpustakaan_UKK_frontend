<template>
  <basePage :titleName="'Detail Buku'">
    <template v-slot:content>
      <template v-if="dataBook != null">
        <div class="grid mobile:grid-cols-1 laptop:grid-cols-4">
          <div class="p-3 mobile:col-span-2 laptop:col-span-1">
            <div
              class="border border-[#7B7B7B] rounded-xl desktop:w-[max-content] h-[max-content] p-4 flex justify-center col-span-1"
              style="width: 100%"
            >
              <img
                :src="`../../../..${dataBook.buku[0].Gambar}`"
                alt=""
                width="200"
              />
            </div>
            <button
              class="font-gunjarati p-2 border-2 border-[#7B7B7B] hover:bg-[#7B7B7B] hover:duration-300 hover:text-white rounded-lg font-semibold mt-3 mb-3 w-full shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)]"
              @click="openModal"
              v-if="role == 'ADMIN' || role == 'EMPLOYEE'"
            >
              Ubah Gambar
            </button>
          </div>
          <div class="p-3 col-span-2">
            <div
              class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
            >
              <div class="mb-2">
                <div
                  :class="
                    role == 'ADMIN' || role == 'EMPLOYEE'
                      ? 'flex justify-between'
                      : ''
                  "
                >
                  <div>
                    <p
                      class="font-gunjarati text-[#888080] font-normal text-xs"
                    >
                      Judul
                    </p>
                    <p class="font-gunjarati">{{ dataBook.buku[0].Judul }}</p>
                  </div>
                  <div
                    @click="openModalData"
                    v-if="role == 'ADMIN' || role == 'EMPLOYEE'"
                  >
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </div>
                </div>
              </div>
              <div class="mb-2">
                <p class="font-gunjarati text-[#888080] font-normal text-xs">
                  Penulis
                </p>
                <p class="font-gunjarati">{{ dataBook.buku[0].Penulis }}</p>
              </div>
              <div class="mb-2">
                <p class="font-gunjarati text-[#888080] font-normal text-xs">
                  Penerbit
                </p>
                <p class="font-gunjarati">{{ dataBook.buku[0].Penerbit }}</p>
              </div>
              <div class="mb-2">
                <p class="font-gunjarati text-[#888080] font-normal text-xs">
                  Tahun Terbit
                </p>
                <p class="font-gunjarati">{{ dataBook.buku[0].TahunTerbit }}</p>
              </div>
              <div class="mb-2">
                <p class="font-gunjarati text-[#888080] font-normal text-xs">
                  Persediaan
                </p>
                <p class="font-gunjarati">
                  {{ dataBook.buku[0].Jumlah }}/{{
                    dataBook.buku[0].Jumlah + dataBook.sedangDipinjam
                  }}
                </p>
              </div>
              <div class="mb-2">
                <p class="font-gunjarati text-[#888080] font-normal text-xs">
                  Sinopsis
                </p>
                <p class="font-gunjarati text-sm text-justify">
                  {{ dataBook.buku[0].Sinopsis }}
                </p>
              </div>
            </div>
          </div>
          <div class="p-3 mobile:col-span-2 laptop:col-span-1">
            <div
              class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
            >
              <p class="text-center font-bold">
                {{ dataBook.rating }}/5
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  style="color: #e8c13c"
                />
              </p>

              <p class="font-gunjarati font-bold pt-2">Ulasan</p>
              <template v-for="ulasanAll in dataBook.ulasan">
                <div
                  class="pt-2 flex gap-2 break-words"
                  style="overflow-wrap: break-word"
                >
                  <img
                    :src="`../../../.${ulasanAll.userUlasan.ProfilAkun}`"
                    alt=""
                    class="rounded-full"
                    style="max-height: 20px; max-width: 20px"
                  />
                  <div>
                    <div class="flex gap-2">
                      <p class="font-gunjarati text-xs font-semibold">
                        {{ ulasanAll.userUlasan.Username }}
                      </p>
                      <p class="font-bold text-xs font-gunjarati">
                        {{ ulasanAll.ulasan.rating }}
                        <font-awesome-icon
                          :icon="['fas', 'star']"
                          style="color: #e8c13c"
                        />
                      </p>
                    </div>
                    <p class="font-gunjarati text-sm">
                      {{ ulasanAll.ulasan.pesan }}
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-slot:footer>
      <div
        class="bg-[#DEDDDD] rounded-tr-2xl rounded-tl-2xl"
        v-if="role === 'USER'"
      >
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
            <p class="font-gunjarati text-sm text-black">Tanggal Peminjaman</p>
            <VDatePicker
              v-model="selectedDateStart"
              :disabled-dates="disableDateStart"
              :min-date="new Date()"
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
                new Date(selectedDateStart).getTime() + 7 * 24 * 60 * 60 * 1000
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
          >
            Pinjam
          </button>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Ubah Gambar'"
        :actived="checkModal"
        @close="closeModal"
        :id="'modalChangeImage'"
      >
        <template v-slot:content>
          <div class="overflow-y-auto mobile:max-h-80 laptop:max-h-[100rem]">
            <img
              :src="imagePreview"
              width="200"
              alt=""
              class="pb-3 m-auto"
              v-if="imagePreview !== ''"
            />
            <div class="w-full pb-3">
              <input
                type="file"
                name=""
                accept=".jpeg,.jpg,.png"
                id="inputImage"
                @change="addImage"
                ref="inputImage"
                hidden
              />
              <button
                class="border-2 border-[#FF740F] hover:bg-[#FF740F] hover:duration-300 hover:text-white w-full rounded-md font-gunjarati text-black font-semibold items-center flex justify-center py-2"
                @click="openExploreImage"
              >
                Unggah Gambar
              </button>
            </div>
            <div class="w-full pb-3">
              <button
                class="border-2 border-[#1859D4] hover:bg-[#1859D4] hover:duration-300 text-black w-full rounded-md font-gunjarati hover:text-white font-semibold items-center flex justify-center py-2"
                @click="updateCoverStart"
              >
                Simpan
              </button>
            </div>
          </div>
        </template>
      </baseModal>
      <baseModal
        :id="'modalChangeDataBook'"
        :title="'Ubah Data'"
        :actived="checkModalData"
        @close="closeModalData"
      >
        <template v-slot:content>
          <div class="overflow-y-auto mobile:max-h-80 laptop:max-h-96">
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">Judul</p>
              <input
                type="text"
                name=""
                id=""
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="judulBuku"
              />
            </div>
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">Penulis</p>
              <input
                type="text"
                name=""
                id=""
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="penulisBuku"
              />
            </div>
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">Penerbit</p>
              <input
                type="text"
                name=""
                id=""
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="penerbitBuku"
              />
            </div>
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">
                Tahun Terbit
              </p>
              <input
                type="text"
                name=""
                id=""
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="tahunTerbitBuku"
              />
            </div>
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">
                Persediaan
              </p>
              <input
                type="number"
                name=""
                id=""
                min="0"
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="persediaanBuku"
              />
            </div>
            <div class="mb-3">
              <p class="font-gunjarati pb-1 text-sm font-semibold">Sinopsis</p>
              <textarea
                type="text"
                name=""
                id=""
                class="w-full rounded-md outline-none border-[1px] border-black py-1 px-2"
                v-model="sinopsisBuku"
              ></textarea>
            </div>
            <div class="w-full mb-3">
              <button
                class="w-full border-[1px] border-[#1859D4] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#1859D4] hover:text-white hover:duration-300"
                @click="startUpdateData"
              >
                Simpan
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
import baseModal from "../../../components/baseModal.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { useToast } from "vue-toastification";
import moment from "moment";

export default defineComponent({
  name: "detailBook",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();

    const selectedDateStart = ref(null);
    const selectedDateEnd = ref(null);

    const jumlah = ref(0);

    const addJumlah = () => {
      if (jumlah.value < dataBook.value.buku[0].Jumlah) jumlah.value++;
    };
    const removeJumlah = () => {
      if (jumlah.value > 0) jumlah.value--;
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

    let dataBook = ref(null);
    const role = ref("");
    onMounted(async () => {
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;

      await store
        .dispatch("Books/getBookById", route.params.idBuku)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dataBook.value = res.data[1].data;
            console.log(dataBook.value);
          }
        });
    });

    const inputImage = ref(null);
    const imagePreview = ref("");

    const openExploreImage = () => {
      console.log(inputImage.value);
      inputImage.value.click();
    };

    let imageSelect = ref(null);
    const addImage = (e) => {
      //   let file = URL.createObjectURL(inputFile.value);
      //   inputFileCsv.value = `url(${ file})`;
      console.log(e.target.files[0]);
      let files = e.target.files[0];
      imageSelect.value = e.target.files[0];
      // console.log(imageSelect.value);
      if (files) {
        let readerFile = new FileReader();
        readerFile.onload = (e) => {
          console.log(e);
          imagePreview.value = e.target.result;
        };
        readerFile.readAsDataURL(files);
      }

      console.log(imagePreview.value);
    };

    let imageCover = ref("");
    const updateCoverStart = async () => {
      let data = {
        idBook: route.params.idBuku,
        file: imageSelect.value,
      };
      await store.dispatch("Books/addOrUpdateCover", data).then(async (res) => {
        if (res.status === 200) {
          closeModal();
          toast.success(res.data[0].message);
          dataBook.value = null;
          setTimeout(async () => {
            await store
              .dispatch("Books/getBookByIdAfterUpdate", route.params.idBuku)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  dataBook.value = res.data[1].data;
                  console.log(dataBook.value);
                }
              });
          }, 6000);
        } else {
          console.log(res.status);
        }
      });
    };

    const checkModal = ref(false);
    const openModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };
    const closeModal = async () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
      imagePreview.value = "";
    };

    let dataForUpdate = ref({});
    const judulBuku = ref("");
    const penulisBuku = ref("");
    const penerbitBuku = ref("");
    const persediaanBuku = ref(0);
    const sinopsisBuku = ref("");
    const checkModalData = ref(false);
    const tahunTerbitBuku = ref("");

    const openModalData = () => {
      checkModalData.value = !checkModalData.value;
      console.log(checkModalData.value);
      judulBuku.value = dataBook.value.buku[0].Judul;
      penulisBuku.value = dataBook.value.buku[0].Penulis;
      penerbitBuku.value = dataBook.value.buku[0].Penerbit;
      persediaanBuku.value = dataBook.value.buku[0].Jumlah;
      tahunTerbitBuku.value = dataBook.value.buku[0].TahunTerbit;
      sinopsisBuku.value = dataBook.value.buku[0].Sinopsis;
    };

    const closeModalData = async () => {
      checkModalData.value = !checkModalData.value;
      console.log(checkModalData.value);
    };

    const startUpdateData = async () => {
      if (persediaanBuku.value >= dataBook.value.sedangDipinjam) {
        dataForUpdate.value = {
          Judul: judulBuku.value,
          Penulis: penulisBuku.value,
          Penerbit: penerbitBuku.value,
          Sinopsis: sinopsisBuku.value,
          TahunTerbit: tahunTerbitBuku.value,
          Jumlah: persediaanBuku.value,
        };
        await store
          .dispatch("Books/updateDataBook", {
            idBook: route.params.idBuku,
            data: dataForUpdate.value,
          })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              toast.success(res.data[0].message);
            }
          });
      } else {
        toast.error(
          "persediaan tidak boleh lebih kecil dari buku yang sedang dipinjam"
        );
      }
    };

    const startBorrow = async () => {
      if (
        selectedDateStart.value != "" &&
        selectedDateEnd.value != "" &&
        jumlah.value > 0
      ) {
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
            idBook: route.params.idBuku,
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
            }
          });
      } else {
        toast.error(
          "Jumlah/Tanggal Peminjaman/Tanggal Pengembalian ada yang kosong"
        );
      }
    };

    return {
      role,
      openModal,
      checkModal,
      closeModal,
      dataBook,
      openExploreImage,
      addImage,
      inputImage,
      imagePreview,
      updateCoverStart,
      checkModalData,
      openModalData,
      closeModalData,
      judulBuku,
      penulisBuku,
      penerbitBuku,
      persediaanBuku,
      sinopsisBuku,
      tahunTerbitBuku,
      startUpdateData,
      selectedDateStart,
      selectedDateEnd,
      jumlah,
      addJumlah,
      removeJumlah,
      startBorrow,
    };
  },
});
</script>

<style scoped>
/* .max-h-modal-mobile {
  max-height: 332px;
}
.max-h-modal-laptop {
  max-height: 500px;
} */
</style>
