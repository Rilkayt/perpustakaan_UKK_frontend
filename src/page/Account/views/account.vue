<template>
  <basePageTemp :titleName="'Akun'">
    <template v-slot:content>
      <div class="tablet:grid tablet:grid-cols-3">
        <div>
          <div class="w-full flex justify-center pt-4 px-4">
            <div
              class="mobile:h-60 mobile:w-[max-content] tablet:w-[max-content] tablet:h-80 p-3 border-[1px] border-[#979494] rounded-lg"
            >
              <img
                :src="`../../../..${image}`"
                alt=""
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div class="w-full text-center p-3">
            <button
              class="hover:bg-[#757575] hover:text-white hover:duration-300 border-[1px] border-[#757575] px-2 py-2 w-full rounded-lg font-gunjarati"
              @click="openModalImage"
            >
              Ubah Profil
            </button>
          </div>
        </div>
        <div
          class="w-full flex flex-col h-full justify-start gap-3 pt-4 px-4 col-span-2"
        >
          <div
            class="mobile:h-[max-content] mobile:w-30 w-full p-3 border-[1px] border-[#979494] rounded-lg"
          >
            <div class="dataUser">
              <div class="mt-1 flex justify-between">
                <div class="">
                  <p
                    class="font-gunjarati font-semibold text-xs text-[#888080]"
                  >
                    Nama Pengguna
                  </p>
                  <p class="font-gunjarati font-medium text-sm">
                    {{ username }}
                  </p>
                </div>
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </div>
              <div class="mt-2">
                <p class="font-gunjarati font-semibold text-xs text-[#888080]">
                  Nama Lengkap
                </p>
                <p class="font-gunjarati font-medium text-sm">
                  {{ nameFull }}
                </p>
              </div>
              <div class="mt-2">
                <p class="font-gunjarati font-semibold text-xs text-[#888080]">
                  Alamat
                </p>
                <p class="font-gunjarati font-medium text-sm">
                  {{ address != "" ? address : "-" }}
                </p>
              </div>
              <div class="mt-2">
                <p class="font-gunjarati font-semibold text-xs text-[#888080]">
                  Sekolah
                </p>
                <p class="font-gunjarati font-medium text-sm">
                  {{ school }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="mobile:h-[max-content] mobile:w-30 w-full p-3 border-[1px] border-[#979494] rounded-lg"
          >
            <div class="mt-2">
              <p class="font-gunjarati font-semibold text-xs text-[#888080]">
                E-mail
              </p>
              <p class="font-gunjarati font-medium text-sm">
                {{ email }}
              </p>
            </div>
            <div class="mt-2">
              <p class="font-gunjarati font-semibold text-xs text-[#888080]">
                No. Telepon
              </p>
              <p class="font-gunjarati font-medium text-sm">{{ noTelp }}</p>
            </div>
          </div>
          <div
            class="mobile:h-[max-content] mobile:w-30 w-full p-3 border-[1px] border-[#979494] rounded-lg mb-3"
          >
            <div class="dataUser">
              <div class="mt-1">
                <button
                  class="w-full font-gunjarati bg-[#E8C13C] px-2 py-2 rounded-md hover:shadow-[2px_4px_4px_0px_rgba(0,0,0,0.3)] hover:duration-500 hover:opacity-100 duration-500 shadow-[2px_4px_4px_0px_rgba(0,0,0,0)]"
                >
                  Ubah E-mail
                </button>
              </div>
              <div class="mt-2">
                <button
                  class="w-full font-gunjarati bg-[#E8C13C] px-2 py-2 rounded-md hover:shadow-[2px_4px_4px_0px_rgba(0,0,0,0.3)] hover:duration-500 hover:opacity-100 duration-500 shadow-[2px_4px_4px_0px_rgba(0,0,0,0)]"
                >
                  Ubah No. Telepon
                </button>
              </div>
              <div class="mt-2">
                <button
                  class="w-full font-gunjarati bg-[#E8C13C] px-2 py-2 rounded-md hover:shadow-[2px_4px_4px_0px_rgba(0,0,0,0.3)] hover:duration-500 hover:opacity-100 duration-500 shadow-[2px_4px_4px_0px_rgba(0,0,0,0)]"
                >
                  Ubah Kata Sandi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <baseModal
        :id="'modalImage'"
        :title="'Ubah Gambar'"
        :actived="checkModalImage"
        @close="closeModalImage"
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
                @click="updateImageStart"
              >
                Simpan
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
import { defineComponent, onMounted, ref } from "vue";
import basePageTemp from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import titleTemp from "../../../components/titleTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "account",
  components: {
    basePageTemp,
    titleTemp,
    cardBook,
    baseModal,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    let role = ref("");

    const username = ref("");
    const nameFull = ref("");
    const address = ref("");
    const school = ref("");
    const email = ref("");
    const noTelp = ref("");
    const image = ref("");

    onMounted(async () => {
      await store.dispatch("Account/getAccount").then((res) => {
        console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
        username.value = res.data[1].data.Username;
        nameFull.value = res.data[1].data.NamaLengkap;
        address.value = res.data[1].data.Alamat;
        school.value = res.data[1].data.Sekolah;
        email.value = res.data[1].data.Email;
        noTelp.value = res.data[1].data.NoTelp;
        image.value = res.data[1].data.ProfilAkun;
      });
    });

    const checkModalImage = ref(false);
    const openModalImage = () => {
      checkModalImage.value = !checkModalImage.value;
    };

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

    const updateImageStart = async () => {
      await store
        .dispatch("Account/updateImage", imageSelect.value)
        .then((res) => {
          if (res.status === 200) {
            closeModalImage();
            toast.success(res.data[0].message);

            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            console.log(res.status);
          }
        });
    };

    const closeModalImage = () => {
      checkModalImage.value = !checkModalImage.value;
      imageSelect.value = null;
    };

    return {
      role,
      username,
      nameFull,
      address,
      school,
      email,
      noTelp,
      image,
      checkModalImage,
      openModalImage,
      inputImage,
      imagePreview,
      openExploreImage,
      addImage,
      updateImageStart,
      closeModalImage,
    };
  },
});
</script>
