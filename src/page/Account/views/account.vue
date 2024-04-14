<template>
  <basePageTemp :titleName="'Akun'">
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
                  <div @click="openModalDataUser">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </div>
                </div>
                <div class="mt-2">
                  <p
                    class="font-gunjarati font-semibold text-xs text-[#888080]"
                  >
                    Nama Lengkap
                  </p>
                  <p class="font-gunjarati font-medium text-sm">
                    {{ nameFull }}
                  </p>
                </div>
                <div class="mt-2">
                  <p
                    class="font-gunjarati font-semibold text-xs text-[#888080]"
                  >
                    Alamat
                  </p>
                  <p class="font-gunjarati font-medium text-sm">
                    {{ address != "" ? address : "-" }}
                  </p>
                </div>
                <div class="mt-2">
                  <p
                    class="font-gunjarati font-semibold text-xs text-[#888080]"
                  >
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
                    @click="openModalEmail"
                  >
                    Ubah E-mail
                  </button>
                </div>
                <div class="mt-2">
                  <button
                    class="w-full font-gunjarati bg-[#E8C13C] px-2 py-2 rounded-md hover:shadow-[2px_4px_4px_0px_rgba(0,0,0,0.3)] hover:duration-500 hover:opacity-100 duration-500 shadow-[2px_4px_4px_0px_rgba(0,0,0,0)]"
                    @click="openModalTelp"
                  >
                    Ubah No. Telepon
                  </button>
                </div>
                <div class="mt-2">
                  <button
                    class="w-full font-gunjarati bg-[#E8C13C] px-2 py-2 rounded-md hover:shadow-[2px_4px_4px_0px_rgba(0,0,0,0.3)] hover:duration-500 hover:opacity-100 duration-500 shadow-[2px_4px_4px_0px_rgba(0,0,0,0)]"
                    @click="openModalPassOld"
                  >
                    Ubah Kata Sandi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
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
        :id="'modalDataUser'"
        :title="'Ubah Data'"
        :actived="checkModalDataUser"
        @close="closeModalDataUser"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <label
              for="inputUsername"
              class="font-gunjarati text-sm font-semibold"
              >Nama Pengguna</label
            >
            <input
              type="text"
              name=""
              id="inputUsername"
              v-model="inputUsername"
              maxlength="10"
              :placeholder="'Nama Pengguna'"
              class="w-full mb-3 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] text-sm"
            />

            <label
              for="inputNameFull"
              class="font-gunjarati text-sm font-semibold"
              >Nama Lengkap</label
            >
            <input
              type="text"
              name=""
              id="inputNameFull"
              v-model="inputNameFull"
              :placeholder="'Nama Lengkap'"
              class="w-full mb-3 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] text-sm"
            />

            <label
              for="inputAdress"
              class="font-gunjarati text-sm font-semibold"
              >Alamat</label
            >
            <input
              type="text"
              name=""
              id="inputAdress"
              v-model="inputAdress"
              :placeholder="'Alamat'"
              class="w-full mb-3 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] text-sm"
            />

            <label
              for="inputSchool"
              class="font-gunjarati text-sm font-semibold"
              >Sekolah</label
            >
            <input
              type="text"
              name=""
              id="inputSchool"
              v-model="inputSchool"
              class="w-full mb-3 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] text-sm"
              disabled
            />

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
              {{ !buttonLoading ? "Ubah" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>

      <baseModal
        :id="'modalEmail'"
        :title="'Ubah Email'"
        :actived="checkModalEmail"
        @close="closeModalEmail"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <label for="inputEmail" class="font-gunjarati text-sm font-semibold"
              >Email</label
            >
            <input
              type="email"
              name=""
              id="inputEmail"
              v-model="inputEmail"
              :placeholder="'Email Anda'"
              class="border-2 h-[52px] text-[15px] px-3 bg-[#40475A] rounded-[6px] text-white w-full tablet:pe-[8%] mobile:pe-[20%] outline-none mb-3"
            />

            <button
              class="w-full border-[1px] border-[#1859D4] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#1859D4] hover:text-white hover:duration-300"
              @click="openModalOtpEmail"
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
              {{ !buttonLoading ? "Ubah" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>

      <baseModal
        :id="'modalOtpEmail'"
        :title="'Otp'"
        :actived="checkModalOtpEmail"
        @close="closeModalOtpEmail"
      >
        <template v-slot:content>
          <div class="flex justify-evenly mt-3">
            <input
              ref="input1"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPoint1"
              @keydown="checkInput"
              @input="checkFullOtp"
              @change="checkFullOtp"
              id="input1"
            />
            <input
              ref="input2"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPoint2"
              @keydown="checkInput"
              @input="checkFullOtp"
              @change="checkFullOtp"
              id="input2"
            />
            <input
              ref="input3"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPoint3"
              @keydown="checkInput"
              @input="checkFullOtp"
              @change="checkFullOtp"
              id="input3"
            />
            <input
              ref="input4"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPoint4"
              @keydown="checkInput"
              @input="checkFullOtp"
              @change="checkFullOtp"
              id="input4"
            />
          </div>
          <p class="pt-[2rem] pb-[30px] text-center font-semibold">
            Belum Menerima OTP ?
            <span class="text-[#1459DF]"
              ><button
                @click="sendAgainOtpEmail"
                :disabled="seconds == 0 ? false : true"
              >
                <template v-if="!buttonLoadingOTP">
                  {{
                    seconds == 0
                      ? "Kirim Ulang"
                      : seconds < 10
                      ? `00:0${seconds}`
                      : `00:${seconds}`
                  }}
                </template>
                <svg
                  v-if="buttonLoadingOTP"
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
                </svg></button
            ></span>
          </p>
          <button
            class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
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
            {{ !buttonLoading ? "Selanjutnnya" : "Loading" }}
          </button>
        </template>
      </baseModal>

      <baseModal
        :id="'modalTelp'"
        :title="'Ubah No. Telepon'"
        :actived="checkModalTelp"
        @close="closeModalTelp"
      >
        <template v-slot:content>
          <div class="w-full mb-3">
            <label
              for="inputUsername"
              class="font-gunjarati text-sm font-semibold"
              >No. Telepon</label
            >
            <input
              type="text"
              name=""
              id="inputTelp"
              v-model="inputTelp"
              :placeholder="'contoh 85159....'"
              class="w-full mb-3 p-2 outline-none appearance-none rounded-lg shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)] font-gunjarati bg-[#76a2c63a] text-sm"
            />

            <button
              class="w-full border-[1px] border-[#1859D4] py-2 rounded-md font-gunjarati font-semibold hover:bg-[#1859D4] hover:text-white hover:duration-300"
              @click="startUpdateTelp"
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
              {{ !buttonLoading ? "Ubah" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>

      <baseModal
        :id="'modalPassword'"
        :title="'Ubah Kata Sandi'"
        :actived="checkModalPassOld"
        @close="closeModalPassOld"
      >
        <template v-slot:content>
          <div>
            <label
              for="KataSandi"
              class="font-medium pb-[3px] font-gunjarati text-sm"
              >Kata Sandi Lama</label
            >

            <div class="relative">
              <input
                :type="buttonEye ? 'text' : 'password'"
                id="KataSandi"
                :placeholder="'Masukan Kata Sandi'"
                class="border-2 h-[52px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white w-[100%] tablet:pe-[8%] mobile:pe-[20%] outline-none"
                v-model="inputPassOld"
              />
              <button
                class="absolute h-[max-content] top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none active:outline-none"
                @click="buttonEyeAction"
              >
                <span class="flex-shrink-0 text-gray-400" v-if="!buttonEye"
                  ><font-awesome-icon :icon="['far', 'eye']"
                /></span>
                <span class="flex-shrink-0 text-gray-400" v-if="buttonEye"
                  ><font-awesome-icon icon="fa-regular fa-eye-slash"
                /></span>
              </button>
            </div>
            <button
              class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0] mt-4"
              @click="sendOtpPassChange"
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
              {{ !buttonLoading ? "Selanjutnnya" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>

      <baseModal
        :id="'modalOtpPass'"
        :title="'OTP'"
        :actived="checkModalOtpPass"
        @close="closeModalOtpPass"
      >
        <template v-slot:content>
          <div class="flex justify-evenly mt-3">
            <input
              ref="inputPass1"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPassOtp1"
              @keydown="checkInputPassOtp"
              @input="checkFullOtpPass"
              @change="checkFullOtpPass"
              id="inputPassOtp1"
            />
            <input
              ref="inputPass2"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPassOtp2"
              @keydown="checkInputPassOtp"
              @input="checkFullOtpPass"
              @change="checkFullOtpPass"
              id="inputPassOtp2"
            />
            <input
              ref="inputPass3"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPassOtp3"
              @keydown="checkInputPassOtp"
              @input="checkFullOtpPass"
              @change="checkFullOtpPass"
              id="inputPassOtp3"
            />
            <input
              ref="inputPass4"
              type="text"
              class="input tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
              maxlength="1"
              v-model="inputPassOtp4"
              @keydown="checkInputPassOtp"
              @input="checkFullOtpPass"
              @change="checkFullOtpPass"
              id="inputPassOtp4"
            />
          </div>
          <p class="pt-[2rem] pb-[30px] text-center font-semibold">
            Belum Menerima OTP ?
            <span class="text-[#1459DF]"
              ><button
                @click="sendAgainOtpEmail"
                :disabled="seconds == 0 ? false : true"
              >
                <template v-if="!buttonLoadingOTP">
                  {{
                    seconds == 0
                      ? "Kirim Ulang"
                      : seconds < 10
                      ? `00:0${seconds}`
                      : `00:${seconds}`
                  }}
                </template>
                <svg
                  v-if="buttonLoadingOTP"
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
                </svg></button
            ></span>
          </p>
          <button
            class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
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
            {{ !buttonLoading ? "Selanjutnnya" : "Memuat" }}
          </button>
        </template>
      </baseModal>

      <baseModal
        :id="'modalPassword'"
        :title="'Ubah Kata Sandi'"
        :actived="checkModalPassNew"
        @close="closeModalPassNew"
      >
        <template v-slot:content>
          <div>
            <label
              for="KataSandi"
              class="font-medium pb-[3px] font-gunjarati text-sm"
              >Kata Sandi Baru</label
            >

            <div class="relative">
              <input
                :type="buttonEye ? 'text' : 'password'"
                id="KataSandiBaru"
                :placeholder="'Masukan Kata Sandi Baru'"
                class="border-2 h-[52px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white w-[100%] tablet:pe-[8%] mobile:pe-[20%] outline-none"
                v-model="inputPassNew"
              />
              <button
                class="absolute h-[max-content] top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none active:outline-none"
                @click="buttonEyeActionNew"
              >
                <span class="flex-shrink-0 text-gray-400" v-if="!buttonEyeNew"
                  ><font-awesome-icon :icon="['far', 'eye']"
                /></span>
                <span class="flex-shrink-0 text-gray-400" v-if="buttonEyeNew"
                  ><font-awesome-icon icon="fa-regular fa-eye-slash"
                /></span>
              </button>
            </div>

            <label
              for="KataSandi"
              class="font-medium pb-[3px] font-gunjarati text-sm"
              >Konfirmasi Kata Sandi Baru</label
            >

            <div class="relative">
              <input
                :type="buttonEye ? 'text' : 'password'"
                id="Konfirmasi KataSandiBaru"
                :placeholder="'Masukan Kata Sandi Baru'"
                class="border-2 h-[52px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white w-[100%] tablet:pe-[8%] mobile:pe-[20%] outline-none"
                v-model="inputPassNewConfirm"
              />
              <button
                class="absolute h-[max-content] top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none active:outline-none"
                @click="buttonEyeActionNewConfirm"
              >
                <span
                  class="flex-shrink-0 text-gray-400"
                  v-if="!buttonEyeNewConfirm"
                  ><font-awesome-icon :icon="['far', 'eye']"
                /></span>
                <span
                  class="flex-shrink-0 text-gray-400"
                  v-if="buttonEyeNewConfirm"
                  ><font-awesome-icon icon="fa-regular fa-eye-slash"
                /></span>
              </button>
            </div>
            <button
              class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0] mt-4"
              @click="startUpdatePass"
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
              {{ !buttonLoading ? "Selanjutnnya" : "Memuat" }}
            </button>
          </div>
        </template>
      </baseModal>
    </template>
  </basePageTemp>
</template>

<script>
import moment from "moment";
import { defineComponent, onMounted, ref, nextTick, watchEffect } from "vue";
import basePageTemp from "../../../components/basePageTemp.vue";
import baseModal from "../../../components/baseModal.vue";
import titleTemp from "../../../components/titleTemp.vue";
import cardBook from "../components/cardBook.vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

let timeExpired = new Date().getTime() + 1 * 60 * 1000;
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
    const inputUsername = ref("");
    const inputNameFull = ref("");
    const inputAdress = ref("");
    const inputSchool = ref("");
    const inputEmail = ref("");

    const isLoading = ref(false);
    onMounted(async () => {
      isLoading.value = true;
      try {
        await store.dispatch("Account/getAccount").then((res) => {
          console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
          username.value = res.data[1].data.Username;
          nameFull.value = res.data[1].data.NamaLengkap;
          address.value = res.data[1].data.Alamat;
          school.value = res.data[1].data.Sekolah;
          email.value = res.data[1].data.Email;
          noTelp.value = res.data[1].data.NoTelp;
          image.value = res.data[1].data.ProfilAkun;
          inputUsername.value = username.value;
          inputNameFull.value = nameFull.value;
          inputAdress.value = address.value;
          inputSchool.value = school.value;
          inputEmail.value = email.value;
          inputTelp.value = noTelp.value;
        });
        isLoading.value = false;
      } catch (error) {
        console.log("🚀 ~ onMounted ~ error:", error);
        isLoading.value = false;
      }
      isLoading.value = false;
    });

    const checkModalImage = ref(false);
    const openModalImage = () => {
      checkModalImage.value = !checkModalImage.value;
    };

    const inputImage = ref(null);
    const imagePreview = ref("");

    const buttonLoading = ref(false);
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
      buttonLoading.value = true;
      await store
        .dispatch("Account/updateImage", imageSelect.value)
        .then((res) => {
          if (res.status === 200) {
            closeModalImage();
            toast.success(res.data[0].message);

            setTimeout(() => {
              window.location.reload();
            }, 2000);
            buttonLoading.value = false;
          } else {
            console.log(res.status);
            buttonLoading.value = false;
          }
        });
    };

    const closeModalImage = () => {
      checkModalImage.value = !checkModalImage.value;
      imageSelect.value = null;
    };

    const checkModalDataUser = ref(false);
    const openModalDataUser = () => {
      checkModalDataUser.value = !checkModalDataUser.value;
    };

    const closeModalDataUser = () => {
      checkModalDataUser.value = !checkModalDataUser.value;
      inputUsername.value = username.value;
      inputNameFull.value = nameFull.value;
      inputAdress.value = address.value;
      inputSchool.value = school.value;
    };

    const startUpdateData = async () => {
      buttonLoading.value = true;
      let data = {
        username: inputUsername.value,
        namaLengkap: inputNameFull.value,
        alamat: inputAdress.value,
      };
      await store.dispatch("Account/updateData", data).then(async (res) => {
        if (res.status === 200) {
          toast.success(res.data[0].message);
          closeModalDataUser();
          await store.dispatch("Account/getAccount").then((res) => {
            console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
            username.value = res.data[1].data.Username;
            nameFull.value = res.data[1].data.NamaLengkap;
            address.value = res.data[1].data.Alamat;
            school.value = res.data[1].data.Sekolah;
            email.value = res.data[1].data.Email;
            noTelp.value = res.data[1].data.NoTelp;
            image.value = res.data[1].data.ProfilAkun;
            inputUsername.value = username.value;
            inputNameFull.value = nameFull.value;
            inputAdress.value = address.value;
            inputSchool.value = school.value;
          });
          buttonLoading.value = false;
        }
      });
    };

    const checkModalEmail = ref(false);
    const openModalEmail = () => {
      checkModalEmail.value = !checkModalEmail.value;
    };

    const closeModalEmail = () => {
      checkModalEmail.value = !checkModalEmail.value;
      // inputEmail.value = email.value;
    };

    const checkModalOtpEmail = ref(false);
    const openModalOtpEmail = async () => {
      buttonLoading.value = true;
      inputRefs.input1 = document.getElementById("input1");
      inputRefs.input2 = document.getElementById("input2");
      inputRefs.input3 = document.getElementById("input3");
      inputRefs.input4 = document.getElementById("input4");
      let data = {
        email: inputEmail.value,
      };
      await store
        .dispatch("Account/checkEmail", inputEmail.value)
        .then(async (res) => {
          console.log("🚀 ~ .then ~ res:", res);

          if (res.status === 200) {
            await store
              .dispatch("Account/sendOtpEmail", data)
              .then(async (res) => {
                console.log(res);
                if (res.status == 200) {
                  closeModalEmail();
                  toast.success("OTP Telah Terkirim, cek email!", {
                    hideProgressBar: true,
                    closeButton: false,
                  });
                  timeExpired = new Date().getTime() + 1 * 60 * 1000;
                  countDownOtp();
                  buttonLoading.value = false;
                  checkModalOtpEmail.value = !checkModalOtpEmail.value;

                  buttonLoading.value = false;
                }
                buttonLoading.value = false;
              });
          } else {
            toast.error(res.response.data[0].message);
            buttonLoading.value = false;
          }
        });
    };

    const closeModalOtpEmail = () => {
      checkModalOtpEmail.value = !checkModalOtpEmail.value;
    };

    let inputPoint1 = ref("");
    let inputPoint2 = ref("");
    let inputPoint3 = ref("");
    let inputPoint4 = ref("");
    let seconds = ref(0);

    let otpFull = "";

    let buttonLoadingOTP = ref(false);

    const checkInput = (e) => {
      // input 1 and 2
      if (
        inputPoint1.value != "" &&
        e.key == "Backspace" &&
        inputPoint2.value == "" &&
        inputPoint4.value == ""
      ) {
        inputPoint1.value = "";
        inputRefs.input1.focus();
      }
      if (
        inputPoint1.value != "" &&
        inputPoint3.value == "" &&
        inputPoint4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint1.value = "";
          inputPoint2.value = "";
          if (inputPoint2.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input1.focus());
        }
        inputRefs.input2.focus();
      }
      // input 2 dan3
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint2.value = "";
          inputPoint3.value = "";
          if (inputPoint3.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input2.focus());
        }
        inputRefs.input3.focus();
      }
      //  input 3 and 4
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint3.value = "";
          inputPoint4.value = "";
          if (inputPoint4.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefs.input3.focus());
        }
        inputRefs.input4.focus();
      }
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != "" &&
        inputPoint4.value != ""
      ) {
        otpFull =
          inputPoint1.value +
          inputPoint2.value +
          inputPoint3.value +
          inputPoint4.value;

        console.log(otpFull);
      }
    };

    let otpDoneFunc = false;
    const checkFullOtp = async () => {
      if (
        inputPoint1.value != "" &&
        inputPoint2.value != "" &&
        inputPoint3.value != "" &&
        inputPoint4.value != ""
      ) {
        if (otpDoneFunc === true) {
          otpDoneFunc = false;
          return;
        }
        otpDoneFunc = true;
        buttonLoading.value = true;
        otpFull =
          inputPoint1.value +
          inputPoint2.value +
          inputPoint3.value +
          inputPoint4.value;

        let data = {
          email: inputEmail.value,
          otp: otpFull,
        };
        await store.dispatch("Account/updateEmail", data).then(async (res) => {
          if (res.status === 200) {
            toast.success("Berhasil Mengubah Email", {
              hideProgressBar: true,
              closeButton: false,
            });
            closeModalOtpEmail();
            buttonLoading.value = false;
            await store.dispatch("Account/getAccount").then((res) => {
              console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
              username.value = res.data[1].data.Username;
              nameFull.value = res.data[1].data.NamaLengkap;
              address.value = res.data[1].data.Alamat;
              school.value = res.data[1].data.Sekolah;
              email.value = res.data[1].data.Email;
              noTelp.value = res.data[1].data.NoTelp;
              image.value = res.data[1].data.ProfilAkun;
              inputUsername.value = username.value;
              inputNameFull.value = nameFull.value;
              inputAdress.value = address.value;
              inputSchool.value = school.value;
              inputEmail.value = email.value;
            });
          } else {
            toast.error("OTP yang dimasukan salah", {
              hideProgressBar: true,
              closeButton: false,
            });
            inputPoint1.value = "";
            inputPoint2.value = "";
            inputPoint3.value = "";
            inputPoint4.value = "";
            buttonLoading.value = false;
          }
        });
        // console.log(data);
      }
    };

    const inputRefs = {
      input1: null,
      input2: null,
      input3: null,
      input4: null,
    };

    const countDownOtp = () => {
      let a = setInterval(() => {
        let timeNow = new Date().getTime();

        let distance = timeExpired - timeNow;

        seconds.value = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds.value == 0) {
          clearInterval(a);
        }
      }, 1000);
    };

    const sendAgainOtpEmail = async () => {
      buttonLoadingOTP.value = true;
      let data = {
        email: inputEmail.value,
      };
      await store.dispatch("Account/sendOtpEmail", data).then((res) => {
        console.log(res);
        if (res.status == 200) {
          toast.success("OTP Telah Terkirim, cek email!", {
            hideProgressBar: true,
            closeButton: false,
          });
          timeExpired = new Date().getTime() + 1000 * 60 * 1;
          countDownOtp();
          buttonLoadingOTP.value = false;
        }
        buttonLoadingOTP.value = false;
      });
    };

    const regexInputTelp = /^(?!0|62|[a-z]|[`;:{}/.<>,!@#$%^&*()_=|])\d+$/;
    const inputTelp = ref("");
    const checkModalTelp = ref(false);
    const openModalTelp = () => {
      checkModalTelp.value = !checkModalTelp.value;
    };
    const closeModalTelp = () => {
      checkModalTelp.value = !checkModalTelp.value;
    };

    watchEffect(() => {
      if (regexInputTelp.test(inputTelp.value) == false) {
        inputTelp.value = "";
      }
    });

    const startUpdateTelp = async () => {
      buttonLoading.value = true;
      await store
        .dispatch("Account/checkTelp", inputTelp.value)
        .then(async (res) => {
          if (res.status == 200) {
            await store
              .dispatch("Account/updateTelp", inputTelp.value)
              .then(async (res) => {
                toast.success(res.data[0].message);
                closeModalTelp();
                await store.dispatch("Account/getAccount").then((res) => {
                  console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
                  username.value = res.data[1].data.Username;
                  nameFull.value = res.data[1].data.NamaLengkap;
                  address.value = res.data[1].data.Alamat;
                  school.value = res.data[1].data.Sekolah;
                  email.value = res.data[1].data.Email;
                  noTelp.value = res.data[1].data.NoTelp;
                  image.value = res.data[1].data.ProfilAkun;
                  inputUsername.value = username.value;
                  inputNameFull.value = nameFull.value;
                  inputAdress.value = address.value;
                  inputSchool.value = school.value;
                  inputEmail.value = email.value;
                  inputTelp.value = noTelp.value;
                  buttonLoading.value = false;
                });
                buttonLoading.value = false;
              });
          } else {
            toast.error(res.response.data[0].message);
          }
        });
    };

    const inputPassOld = ref("");
    const checkModalPassOld = ref(false);
    const openModalPassOld = () => {
      checkModalPassOld.value = !checkModalPassOld.value;
    };
    const closeModalPassOld = () => {
      checkModalPassOld.value = !checkModalPassOld.value;
    };

    const buttonEye = ref(false);
    const buttonEyeAction = () => {
      buttonEye.value = !buttonEye.value;
    };

    const sendOtpPassChange = async () => {
      buttonLoading.value = true;
      await store
        .dispatch("Account/checkPass", inputPassOld.value)
        .then(async (res) => {
          if (res.status === 200) {
            await store
              .dispatch("Account/sendOtpEmail", { email: email.value })
              .then((a) => {
                if (a.status === 200) {
                  toast.success(a.data[0].message);

                  closeModalPassOld();
                  openModalOtpPass();
                  buttonLoading.value = false;
                }
              });
          }
        });
    };

    let inputPassOtp1 = ref("");
    let inputPassOtp2 = ref("");
    let inputPassOtp3 = ref("");
    let inputPassOtp4 = ref("");

    const inputRefsPass = {
      inputPass1: null,
      inputPass2: null,
      inputPass3: null,
      inputPass4: null,
    };

    const openModalOtpPass = () => {
      inputRefsPass.inputPass1 = document.getElementById("inputPassOtp1");
      inputRefsPass.inputPass2 = document.getElementById("inputPassOtp2");
      inputRefsPass.inputPass3 = document.getElementById("inputPassOtp3");
      inputRefsPass.inputPass4 = document.getElementById("inputPassOtp4");
      checkModalOtpPass.value = !checkModalOtpPass.value;
    };
    const checkInputPassOtp = (e) => {
      // input 1 and 2
      if (
        inputPassOtp1.value != "" &&
        e.key == "Backspace" &&
        inputPassOtp2.value == "" &&
        inputPassOtp4.value == ""
      ) {
        inputPassOtp1.value = "";
        inputRefsPass.inputPass1.focus();
      }
      if (
        inputPassOtp1.value != "" &&
        inputPassOtp3.value == "" &&
        inputPassOtp4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint1.value = "";
          inputPassOtp2.value = "";
          if (inputPassOtp2.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefsPass.inputPass1.focus());
        }
        inputRefsPass.inputPass2.focus();
      }
      // input 2 dan3
      if (
        inputPassOtp1.value != "" &&
        inputPassOtp2.value != "" &&
        inputPassOtp4.value == ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint2.value = "";
          inputPassOtp3.value = "";
          if (inputPassOtp3.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefsPass.inputPass2.focus());
        }
        inputRefsPass.inputPass3.focus();
      }
      //  input 3 and 4
      if (
        inputPassOtp1.value != "" &&
        inputPassOtp2.value != "" &&
        inputPassOtp3.value != ""
      ) {
        if (e.key == "Backspace") {
          // inputPoint3.value = "";
          inputPassOtp4.value = "";
          if (inputPassOtp4.value == "") {
            e.preventDefault();
          }
          nextTick(() => inputRefsPass.inputPass3.focus());
        }
        inputRefsPass.inputPass4.focus();
      }
      if (
        inputPassOtp1.value != "" &&
        inputPassOtp2.value != "" &&
        inputPassOtp3.value != "" &&
        inputPassOtp4.value != ""
      ) {
        otpFull =
          inputPassOtp1.value +
          inputPassOtp2.value +
          inputPassOtp3.value +
          inputPassOtp4.value;

        console.log(otpFull);
      }
    };

    let checkModalPassNew = ref(false);

    const openModalPassNew = () => {
      checkModalPassNew.value = !checkModalPassNew.value;
    };
    const closeModalPassNew = () => {
      checkModalPassNew.value = !checkModalPassNew.value;
    };

    const checkModalOtpPass = ref(false);
    const closeModalOtpPass = () => {
      checkModalOtpPass.value = !checkModalOtpPass.value;
    };
    let otpDoneFuncPass = false;
    const checkFullOtpPass = async () => {
      if (
        inputPassOtp1.value != "" &&
        inputPassOtp2.value != "" &&
        inputPassOtp3.value != "" &&
        inputPassOtp4.value != ""
      ) {
        if (otpDoneFuncPass === true) {
          otpDoneFuncPass = false;
          return;
        }
        otpDoneFuncPass = true;
        buttonLoading.value = true;
        otpFull =
          inputPassOtp1.value +
          inputPassOtp2.value +
          inputPassOtp3.value +
          inputPassOtp4.value;

        await store
          .dispatch("Account/checkOtpPass", otpFull)
          .then(async (res) => {
            if (res.status === 200) {
              toast.success(res.data[0].message, {
                hideProgressBar: true,
                closeButton: false,
              });
              closeModalOtpPass();
              openModalPassNew();
              buttonLoading.value = false;
            } else {
              toast.error("OTP yang dimasukan salah", {
                hideProgressBar: true,
                closeButton: false,
              });

              buttonLoading.value = false;
            }
          });
        // console.log(data);
      }
    };

    const buttonEyeNew = ref(false);
    const buttonEyeActionNew = () => {
      buttonEyeNew.value = !buttonEyeNew.value;
    };
    const buttonEyeNewConfirm = ref(false);
    const buttonEyeActionNewConfirm = () => {
      buttonEyeNewConfirm.value = !buttonEyeNewConfirm.value;
    };

    const inputPassNew = ref("");
    const inputPassNewConfirm = ref("");

    const startUpdatePass = async () => {
      buttonLoading.value = true;
      if (inputPassNew.value === inputPassNewConfirm.value) {
        await store
          .dispatch("Account/updatePass", inputPassNewConfirm.value)
          .then(async (res) => {
            if (res.status === 200) {
              toast.success("Berhasil Mengubah Kata Sandi");
              closeModalPassNew();
              await store.dispatch("Account/getAccount").then((res) => {
                console.log("🚀 ~ awaitstore.dispatch ~ res:", res);
                username.value = res.data[1].data.Username;
                nameFull.value = res.data[1].data.NamaLengkap;
                address.value = res.data[1].data.Alamat;
                school.value = res.data[1].data.Sekolah;
                email.value = res.data[1].data.Email;
                noTelp.value = res.data[1].data.NoTelp;
                image.value = res.data[1].data.ProfilAkun;
                inputUsername.value = username.value;
                inputNameFull.value = nameFull.value;
                inputAdress.value = address.value;
                inputSchool.value = school.value;
                inputEmail.value = email.value;
                inputTelp.value = noTelp.value;
                buttonLoading.value = false;
              });
            }
          });
      } else {
        toast.error("kata sandi tidak sama");
        buttonLoading.value = false;
      }
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
      checkModalDataUser,
      openModalDataUser,
      closeModalDataUser,
      inputUsername,
      inputNameFull,
      inputAdress,
      inputSchool,
      startUpdateData,
      checkModalEmail,
      openModalEmail,
      closeModalEmail,
      inputEmail,
      checkModalOtpEmail,
      openModalOtpEmail,
      closeModalOtpEmail,
      inputPoint1,
      inputPoint2,
      inputPoint3,
      inputPoint4,
      checkInput,
      inputRefs,
      checkFullOtp,
      buttonLoading,
      seconds,
      countDownOtp,
      sendAgainOtpEmail,
      buttonLoadingOTP,
      checkModalTelp,
      openModalTelp,
      inputTelp,
      closeModalTelp,
      startUpdateTelp,
      checkModalPassOld,
      openModalPassOld,
      closeModalPassOld,
      buttonEye,
      buttonEyeAction,
      inputPassOld,
      openModalOtpPass,
      sendOtpPassChange,
      checkFullOtpPass,
      closeModalOtpPass,
      checkModalOtpPass,
      checkInputPassOtp,
      inputPassOtp1,
      inputPassOtp2,
      inputPassOtp3,
      inputPassOtp4,
      inputRefsPass,
      buttonEyeNew,
      buttonEyeActionNew,
      inputPassNew,
      inputPassNewConfirm,
      startUpdatePass,
      checkModalPassNew,
      openModalPassNew,
      closeModalPassNew,
      buttonLoading,
      isLoading,
    };
  },
});
</script>
