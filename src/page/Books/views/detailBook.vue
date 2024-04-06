<template>
  <basePage :titleName="'Detail Buku'">
    <template v-slot:content>
      <div class="grid tablet:grid-cols-4">
        <div class="p-3 col-span-1">
          <div
            class="border border-[#7B7B7B] rounded-xl desktop:w-[max-content] h-[max-content] p-4 flex justify-center col-span-1"
          >
            <img
              src="../../../../imageFile/booksCover/clul5eyic000110et4v94cisg.jpeg"
              alt=""
              width="200"
            />
          </div>
          <button
            class="font-gunjarati p-2 border-2 border-[#7B7B7B] hover:bg-[#7B7B7B] hover:duration-300 hover:text-white rounded-lg font-semibold mt-3 mb-3 w-full shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)]"
            @click="openModal"
          >
            Ubah Gambar
          </button>
        </div>
        <div class="p-3 col-span-2">
          <div
            class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
          >
            <div class="mb-2">
              <div class="flex justify-between">
                <div>
                  <p class="font-gunjarati text-[#888080] font-normal text-xs">
                    Judul
                  </p>
                  <p class="font-gunjarati">Naruto Bind Up Edition 02</p>
                </div>
                <div>
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </div>
              </div>
            </div>
            <div class="mb-2">
              <p class="font-gunjarati text-[#888080] font-normal text-xs">
                Penulis
              </p>
              <p class="font-gunjarati">Mashashi Kishimoto</p>
            </div>
            <div class="mb-2">
              <p class="font-gunjarati text-[#888080] font-normal text-xs">
                Penerbit
              </p>
              <p class="font-gunjarati">rilkayt Groub</p>
            </div>
            <div class="mb-2">
              <p class="font-gunjarati text-[#888080] font-normal text-xs">
                Tahun Terbit
              </p>
              <p class="font-gunjarati">2001</p>
            </div>
            <div class="mb-2">
              <p class="font-gunjarati text-[#888080] font-normal text-xs">
                Persediaan
              </p>
              <p class="font-gunjarati">200</p>
            </div>
            <div class="mb-2">
              <p class="font-gunjarati text-[#888080] font-normal text-xs">
                Sinopsis
              </p>
              <p class="font-gunjarati text-sm text-justify">
                Si manusia iblis, Zabuza, yang seharusnya telah dikalahkan oleh
                Sharingan Kakashi, ternyata masih hidup! Kelompok Naruto, yang
                telah tiba di negara Nami untuk mengawal Pak Tazuna, dilanda
                keraguan. Tapi, ini bukan saatnya untuk takut! Di bawah
                bimbingan Guru Kakashi, Naruto dan yang lain memulai aksi
                mereka! Namun, Sasuke gugur saat melindungi Naruto! Saat itu,
                terjadi keanehan pada diri Naruto! Haku yang terkena pukulan
                kemarahan pun menyadari hal tersebut. Sementara itu, pertarungan
                antara Zabuza vs Kakashi semakin sengit, siapakah yang menang!?
                Inilah babak akhir dari pergolakan di Negara Nami!! Boruto:
                Naruto Next Generations adalah sebuah seri manga Jepang
              </p>
            </div>
          </div>
        </div>
        <div class="p-3 col-span-1">
          <div
            class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
          >
            <p class="text-center font-bold">
              5/5
              <font-awesome-icon
                :icon="['fas', 'star']"
                style="color: #e8c13c"
              />
            </p>

            <p class="font-gunjarati font-bold pt-2">Ulasan</p>
            <div class="pt-2 flex gap-2">
              <img
                src="../../../../imageFile/avatarProfile/default-profile.jpeg"
                alt=""
                class="rounded-full"
                style="max-height: 20px; max-width: 20px"
              />
              <div>
                <div class="flex gap-2">
                  <p class="font-gunjarati text-xs font-semibold">Rilkayt</p>
                  <p class="font-bold text-xs font-gunjarati">
                    5
                    <font-awesome-icon
                      :icon="['fas', 'star']"
                      style="color: #e8c13c"
                    />
                  </p>
                </div>
                <p class="font-gunjarati text-sm">
                  Buku nya bangut banget , aduhay... jasdjsid jikak asodoakdo
                </p>
              </div>
            </div>
            <div class="pt-2 flex gap-2">
              <img
                src="../../../../imageFile/avatarProfile/default-profile.jpeg"
                alt=""
                class="rounded-full"
                style="max-height: 20px; max-width: 20px"
              />
              <div>
                <div class="flex gap-2">
                  <p class="font-gunjarati text-xs font-semibold">Rilkayt</p>
                  <p class="font-bold text-xs font-gunjarati">
                    5
                    <font-awesome-icon
                      :icon="['fas', 'star']"
                      style="color: #e8c13c"
                    />
                  </p>
                </div>
                <p class="font-gunjarati text-sm">
                  Buku nya bangut banget , aduhay... jasdjsid jikak asodoakdo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <baseModal
        :title="'Ubah Gambar'"
        :actived="checkModal"
        @close="closeModal"
      >
        <template v-slot:content> sajdisajdijasijd </template>
      </baseModal>
    </template>
  </basePage>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import { useStore } from "vuex";
import { jwtDecode } from "jwt-decode";

export default defineComponent({
  name: "detailBook",
  components: {
    basePage,
    baseModal,
  },
  setup() {
    const checkModal = ref(false);
    const openModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };
    const closeModal = () => {
      checkModal.value = !checkModal.value;
      console.log(checkModal.value);
    };

    return {
      openModal,
      checkModal,
      closeModal,
    };
  },
});
</script>
