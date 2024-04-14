<template>
  <basePage :titleName="'Tambah Buku'">
    <template v-slot:content>
      <div class="p-4">
        <div>
          <select
            name=""
            id=""
            class="w-full p-2 rounded-lg border-none active:border-none focus:border-none shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] appearance-none outline-none"
            v-model="typeInput"
            @change="refreshModel"
          >
            <option value="" class="border-none">Pilih Tipe Unggahan</option>
            <option value="importFileCSV">Impor data CSV</option>
            <option value="manualAdd">Manual</option>
          </select>
        </div>
      </div>

      <div class="tablet:grid tablet:grid-cols-2">
        <template v-if="typeInput == 'importFileCSV'">
          <div class="px-4 col-span-1">
            <div
              class="bg-white p-3 tablet:col-span-1 rounded-xl shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] h-[200px] flex-col w-full"
            >
              <input
                type="file"
                name=""
                accept=".csv"
                id="inputFile"
                @change="addFile"
                ref="inputFile"
                hidden
              />
              <div
                class="w-full h-full flex justify-center items-center rounded-lg border-2 border-dashed border-[#1859D4] font-medium gap-2"
                ref="inputFileCsv"
                @dragover.prevent
                @click="openExplore"
                @drop="drophandle"
              >
                <p class="p-4 text-center">
                  {{ nameFile == "" ? "Unggah Berkas" : nameFile }}
                </p>
              </div>
            </div>
            <button
              class="font-gunjarati p-4 border-2 border-[#1859D4] hover:bg-[#1859D4] hover:duration-300 hover:text-white rounded-lg font-semibold mt-3 w-full shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] mb-3 tablet:col-span-1"
              @click="uploadFileCSV"
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
              {{ !buttonLoading ? "Tambah Buku" : "Memuat" }}
            </button>
          </div>
          <div class="px-4 mb-3">
            <div
              class="bg-white p-4 rounded-xl shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)]"
            >
              <p class="font-gunjarati font-bold">Cara Mengunggah Buku</p>
              <ul start="1" class="px-4" style="list-style-type: decimal">
                <li class="mt-1 font-gunjarati">
                  Siapkan berkas data buku dengan format .csv
                </li>
                <li class="mt-1 font-gunjarati">
                  <div>
                    Pada Berkas data buku berisikan kolom
                    <table class="bg-[#D9D9D9] w-full">
                      <tr>
                        <td class="font-bold font-gunjarati text-xs">Judul</td>
                        <td class="font-bold font-gunjarati text-xs">
                          Penulis
                        </td>
                        <td class="font-bold font-gunjarati text-xs">
                          Penerbit
                        </td>
                        <td class="font-bold font-gunjarati text-xs">
                          Sinopsis
                        </td>
                        <td class="font-bold font-gunjarati text-xs">
                          Tahun Terbit
                        </td>
                        <td class="font-bold font-gunjarati text-xs">Jumlah</td>
                      </tr>
                    </table>
                  </div>
                </li>
                <li class="mt-2 font-gunjarati">
                  Usahakan data antar berkas sudah beda
                </li>
                <li class="mt-1 font-gunjarati font-gunjarati">
                  Tidak perlu menggunakan sheet yang berbeda, cukup dengan 1
                  berkas 1 data
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-if="typeInput == 'manualAdd'">
          <div class="w-full px-4">
            <div
              class="bg-white p-4 rounded-xl shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] h-[200px] flex justify-center items-center flex-col"
            >
              <input
                type="file"
                name=""
                accept=".jpeg,.jpg,.png"
                id="inputImage"
                @change="addImage"
                ref="inputImage"
                hidden
              />
              <div
                class="w-full h-full flex justify-center items-center rounded-lg border-2 border-dashed border-[#1859D4] font-medium gap-2"
                ref="inputImageCover"
                @dragover.prevent
                @click="openExploreImage"
                @drop="drophandleImage"
              >
                <p class="p-4 text-center">
                  {{ nameImage == "" ? "Unggah Gambar" : nameImage }}
                </p>
              </div>
            </div>
            <div
              class="p-4 bg-white mt-2 rounded-xl shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] flex justify-center"
              v-if="imagePreview !== ''"
            >
              <img
                :src="imagePreview"
                width="200"
                alt=""
                v-if="imagePreview !== ''"
              />
            </div>
          </div>
          <div class="px-4 mobile:mt-2 tablet:mt-0">
            <div
              class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
            >
              <div class="mb-2">
                <label for="Judul" class="font-gunjarati text-sm mb-2"
                  >Judul</label
                ><br />
                <input
                  type="text"
                  name="Judul"
                  id="Judul"
                  class="w-full h-[36px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="judulBookInput"
                />
              </div>
              <div class="mb-2">
                <label for="Penulis" class="font-gunjarati text-sm mb-2"
                  >Penulis</label
                ><br />
                <input
                  type="text"
                  name="Penulis"
                  id="Penulis"
                  class="w-full h-[36px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="penulisBookInput"
                />
              </div>
              <div class="mb-2">
                <label for="Penerbit" class="font-gunjarati text-sm mb-2"
                  >Penerbit</label
                ><br />
                <input
                  type="text"
                  name="Penerbit"
                  id="Penerbit"
                  class="w-full h-[36px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="penerbitBookInput"
                />
              </div>
              <div class="mb-2">
                <label for="Sinopsis" class="font-gunjarati text-sm mb-2"
                  >Sinopsis</label
                ><br />
                <textarea
                  type="text"
                  name="Sinopsis"
                  id="Sinopsis"
                  class="w-full h-[72px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="sinopsisBookInput"
                ></textarea>
              </div>
              <div class="mb-2">
                <label for="tahunTerbit" class="font-gunjarati text-sm mb-2"
                  >Tahun Terbit</label
                ><br />
                <input
                  type="number"
                  name="tahunTerbit"
                  id="tahunTerbit"
                  class="w-full h-[36px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="tahunTerbitBookInput"
                />
              </div>
              <div class="mb-2">
                <label for="jumlah" class="font-gunjarati text-sm mb-2"
                  >Jumlah</label
                ><br />
                <input
                  type="number"
                  name="jumlah"
                  id="jumlah"
                  class="w-full h-[36px] rounded-lg outline-none px-3 font-gunjarati shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)] bg-[#F3F3F3]"
                  v-model="jumlahBookInput"
                />
              </div>
            </div>
          </div>
          <div class="px-3 w-full col-span-2">
            <button
              class="font-gunjarati p-4 border-2 border-[#1859D4] hover:bg-[#1859D4] hover:duration-300 hover:text-white rounded-lg font-semibold mt-3 mb-3 w-full shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)]"
              @click="addBookStart"
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
              {{ !buttonLoading ? "Tambah Buku" : "Memuat" }}
            </button>
          </div>
        </template>
      </div>
    </template>
  </basePage>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  watchEffect,
  toDisplayString,
} from "vue";
import basePage from "../../../components/basePageTemp.vue";
import { useStore } from "vuex";
import { jwtDecode } from "jwt-decode";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "addBook",
  components: {
    basePage,
  },
  setup() {
    const store = useStore();
    const toast = useToast();

    let role = ref("");

    let bookList = ref([]);
    const typeInput = ref("");

    const inputFileCsv = ref(null);
    const inputFile = ref(null);

    const inputImageCover = ref(null);
    const inputImage = ref(null);

    let nameFile = ref("");
    let nameImage = ref("");

    let imagePreview = ref("");

    const openExplore = () => {
      inputFile.value.click();
    };

    const openExploreImage = () => {
      inputImage.value.click();
    };

    const refreshModel = () => {
      nameFile.value = "";
    };

    const selectedFile = ref(null);

    const addFile = (e) => {
      //   let file = URL.createObjectURL(inputFile.value);
      //   inputFileCsv.value = `url(${ file})`;
      console.log(e.target.files);
      selectedFile.value = e.target.files[0];
      nameFile.value = e.target.files[0].name;
    };

    const drophandle = (e) => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      selectedFile.value = e.dataTransfer.files[0];
      nameFile.value = e.dataTransfer.files[0].name;
    };

    const buttonLoading = ref(false);
    const uploadFileCSV = async () => {
      buttonLoading.value = true;
      if (selectedFile.value != null) {
        await store
          .dispatch("Books/uploadCsv", selectedFile.value)
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.data[0].message);
              selectedFile.value = null;
              nameFile.value = "";
              buttonLoading.value = false;
            }
          });
      } else {
        toast.error("Belum Memilih Berkas");
        buttonLoading.value = false;
      }
    };

    const judulBookInput = ref("");
    const penulisBookInput = ref("");
    const penerbitBookInput = ref("");
    const sinopsisBookInput = ref("");
    const tahunTerbitBookInput = ref(0);
    const jumlahBookInput = ref(0);

    const selectedBookCover = ref(null);
    const addImage = (e) => {
      //   let file = URL.createObjectURL(inputFile.value);
      //   inputFileCsv.value = `url(${ file})`;
      console.log(e.target.files[0]);
      let files = e.target.files[0];
      if (files) {
        let readerFile = new FileReader();
        readerFile.onload = (e) => {
          console.log(e);
          imagePreview.value = e.target.result;
        };
        readerFile.readAsDataURL(files);
      }

      console.log(imagePreview.value);
      selectedBookCover.value = e.target.files[0];
      nameImage.value = e.target.files[0].name;
    };

    const drophandleImage = (e) => {
      e.preventDefault();
      console.log(e.dataTransfer.files);
      selectedBookCover.value = e.dataTransfer.files[0];
      nameImage.value = e.dataTransfer.files[0].name;
    };

    const addBookStart = async () => {
      buttonLoading.value = true;
      console.log(jumlahBookInput.value);
      let data = {
        Judul: judulBookInput.value,
        Penulis: penulisBookInput.value,
        Penerbit: penerbitBookInput.value,
        Sinopsis: sinopsisBookInput.value,
        TahunTerbit: tahunTerbitBookInput.value,
        Jumlah: jumlahBookInput.value,
      };
      if (judulBookInput.value != "" && jumlahBookInput.value > 0) {
        await store.dispatch("Books/addBook", data).then(async (res) => {
          if (res.status == 200) {
            buttonLoading.value = false;
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            toast.success("Berhasil Menambah Buku");
            judulBookInput.value = "";
            penulisBookInput.value = "";
            penerbitBookInput.value = "";
            sinopsisBookInput.value = "";
            tahunTerbitBookInput.value = 0;
            jumlahBookInput.value = 0;
            if (selectedBookCover.value != null) {
              let dataBook = {
                idBook: res.data[1].data[0].BukuID,
                file: selectedBookCover.value,
              };
              await store.dispatch("Books/addOrUpdateCover", dataBook);
            }
            buttonLoading.value = false;
          } else {
            toast.error(res.response.data[0].message);
            buttonLoading.value = false;
          }
          buttonLoading.value = false;
        });
      } else {
        toast.error("Judul dan Jumlah buku wajib diisi");
        buttonLoading.value = false;
      }
    };

    onMounted(async () => {
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;
    });

    return {
      role,
      inputFileCsv,
      inputFile,
      addFile,
      openExplore,
      nameFile,
      drophandle,
      typeInput,
      refreshModel,
      addImage,
      drophandleImage,
      inputImage,
      inputImageCover,
      openExploreImage,
      imagePreview,
      nameImage,
      uploadFileCSV,
      addBookStart,
      judulBookInput,
      penulisBookInput,
      penerbitBookInput,
      sinopsisBookInput,
      tahunTerbitBookInput,
      jumlahBookInput,
      buttonLoading,
    };
  },
});
</script>
