<template>
  <basePage :titleName="'Detail Buku'">
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
              <button
                class="font-gunjarati p-2 border-2 border-[#7B7B7B] hover:bg-[#7B7B7B] hover:duration-300 hover:text-white rounded-lg font-semibold mt-3 mb-3 w-full shadow-[1px_5px_4px_0px_rgba(0,0,0,0.3)]"
                @click="
                  dataBook.koleksiUser != null
                    ? deleteCollection()
                    : addCollection()
                "
                v-if="role == 'USER'"
              >
                {{
                  dataBook.koleksiUser != null
                    ? "Hapus Koleksi"
                    : "Tambah Koleksi"
                }}
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
                  <p class="font-gunjarati">
                    {{ dataBook.buku[0].TahunTerbit }}
                  </p>
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
              <template
                v-if="
                  dataBook.telahDiPinjamUser > 0 && dataBook.ulasanUser == null
                "
              >
                <button
                  class="hover:bg-[#3c839ab1] hover:text-[#f3e9e9eb] hover:duration-300 border-[1px] border-[#3c839ab1] px-2 py-1 font-gunjarati w-full rounded-md mb-2 text-black font-semibold"
                  @click="openModalUlasan"
                >
                  Tambah Ulasan
                </button>
              </template>
              <template
                v-if="
                  dataBook.telahDiPinjamUser > 0 && dataBook.ulasanUser != null
                "
              >
                <div
                  class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4 mb-3"
                >
                  <p class="font-gunjarati font-semibold text-md">
                    Komentar Anda
                    <span class="text-sm text-end"
                      >{{ dataBook.ulasanUser.rating }}
                      <font-awesome-icon
                        :icon="['fas', 'star']"
                        style="color: #e8c13c"
                    /></span>
                  </p>
                  <p class="font-gunjarati text-sm">
                    {{ dataBook.ulasanUser.pesan }}
                  </p>
                </div>
              </template>
              <div
                class="border border-[#7B7B7B] rounded-[1rem] desktop:w-full h-[max-content] p-4"
              >
                <p class="text-center font-bold">
                  {{ dataBook.rating === null ? 0 : dataBook.rating }}/5
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    style="color: #e8c13c"
                  />
                </p>

                <p class="font-gunjarati font-bold pt-2">Ulasan</p>
                <template v-if="dataBook.ulasan.length < 1">
                  <p class="font-gunjarati text-sm text-center mt-2">
                    Belum Ada Ulasan
                  </p>
                </template>
                <div>
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
          </div>
        </template>
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
                {{ !buttonLoading ? "Simpan" : "Memuat" }}
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
                {{ !buttonLoading ? "Simpan" : "Memuat" }}
              </button>
            </div>
          </div>
        </template>
      </baseModal>
      <baseModal
        :id="'modalAddUlasan'"
        :title="'Berikan Ulasan'"
        :actived="checkModalUlasan"
        @close="closeModalUlasan"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <div class="flex justify-center w-full">
              <vue3-star-ratings
                v-model="rating"
                :numberOfStars="5"
                :starSize="32"
              />
            </div>
            <textarea
              type="text"
              name=""
              id=""
              v-model="inputPesanUlasan"
              maxlength="500"
              :placeholder="'Tulis Pesan... [maksimal 500 karakter]'"
              class="w-full mb-6 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] mt-5"
            ></textarea>
            <button
              class="w-full border-[1px] border-[#1859D4] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#1859D4] hover:text-white hover:duration-300"
              @click="startPostUlasan"
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
              {{ !buttonLoading ? "Kirim" : "Memuat" }}
            </button>
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

    const buttonLoading = ref(false);
    const jumlah = ref(0);

    const rating = ref(0);
    const inputPesanUlasan = ref("");

    const isLoading = ref(false);
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

      rating.value = Math.ceil(rating.value);
    });

    let dataBook = ref(null);
    const role = ref("");
    onMounted(async () => {
      isLoading.value = true;
      window.scrollTo(0, 0);
      let dataUser = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataUser.token);
      role.value = dataUserReady.Tipe;
      console.log("🚀 ~ onMounted ~ role.value:", role.value);

      await store
        .dispatch("Books/getBookById", route.params.idBuku)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dataBook.value = res.data[1].data;
            console.log(dataBook.value);
            isLoading.value = false;
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
      buttonLoading.value = true;
      let data = {
        idBook: route.params.idBuku,
        file: imageSelect.value,
      };
      await store.dispatch("Books/addOrUpdateCover", data).then(async (res) => {
        if (res.status === 200) {
          toast.success(res.data[0].message);
          closeModal();
          setTimeout(async () => {
            window.location.reload();
          }, 3000);
          buttonLoading.value = false;
        } else {
          console.log(res.status);
          buttonLoading.value = false;
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
      buttonLoading.value = true;
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
          .then(async (res) => {
            console.log(res);
            if (res.status == 200) {
              toast.success(res.data[0].message);
              dataBook.value = null;
              await store
                .dispatch("Books/getBookById", route.params.idBuku)
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    dataBook.value = res.data[1].data;
                    console.log(dataBook.value);
                    closeModalData();
                  }
                });
              buttonLoading.value = false;
            }
            buttonLoading.value = false;
          });
      } else {
        toast.error(
          "persediaan tidak boleh lebih kecil dari buku yang sedang dipinjam"
        );
        buttonLoading.value = false;
      }
    };

    const startBorrow = async () => {
      if (
        selectedDateStart.value != "" &&
        selectedDateEnd.value != "" &&
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
              buttonLoading.value = false;
            }
          });
      } else {
        toast.error(
          "Jumlah/Tanggal Peminjaman/Tanggal Pengembalian ada yang kosong"
        );
      }
    };

    const addCollection = async () => {
      await store
        .dispatch("Books/addCollection", route.params.idBuku)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data[0].message);
            dataBook.value = null;
            await store
              .dispatch("Books/getBookById", route.params.idBuku)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  dataBook.value = res.data[1].data;
                  console.log(dataBook.value);
                }
              });
          }
        });
    };

    const deleteCollection = async () => {
      await store
        .dispatch("Books/deleteCollection", route.params.idBuku)
        .then(async (res) => {
          if (res.status === 200) {
            toast.success(res.data[0].message);
            dataBook.value = null;
            await store
              .dispatch("Books/getBookById", route.params.idBuku)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  dataBook.value = res.data[1].data;
                  console.log(dataBook.value);
                }
              });
          }
        });
    };

    const checkModalUlasan = ref(false);
    const openModalUlasan = () => {
      checkModalUlasan.value = !checkModalUlasan.value;
    };
    const closeModalUlasan = () => {
      checkModalUlasan.value = !checkModalUlasan.value;
    };

    const startPostUlasan = async () => {
      buttonLoading.value = true;
      let data = {
        idBook: route.params.idBuku,
        message: inputPesanUlasan.value,
        rating: rating.value,
      };
      await store.dispatch("Books/addUlasan", data).then(async (res) => {
        if (res.status === 200) {
          toast.success(res.data[0].message);
          closeModalUlasan();

          toast.success(res.data[0].message);
          dataBook.value = null;
          await store
            .dispatch("Books/getBookById", route.params.idBuku)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                dataBook.value = res.data[1].data;
                console.log(dataBook.value);
              }
            });
          buttonLoading.value = false;
        }
      });
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
      addCollection,
      deleteCollection,
      checkModalUlasan,
      openModalUlasan,
      closeModalUlasan,
      rating,
      inputPesanUlasan,
      startPostUlasan,
      buttonLoading,
      isLoading,
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
