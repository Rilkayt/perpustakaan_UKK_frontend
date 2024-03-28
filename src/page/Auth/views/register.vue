<template>
  <div
    class="background py-20 flex justify-center bg-cover bg-center w-[100vw] h-[100vh] bg-[#E7E9EE] overflow-x-hidden"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px]"
    >
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">Daftar</h3>
      <div class="flex flex-col pb-[20px]">
        <label for="username" class="font-medium pb-[3px] font-gunjarati"
          >Username</label
        >
        <input
          type="text"
          id="username"
          :placeholder="'Masukan Username'"
          class="border-2 h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="namaLengkap" class="font-medium pb-[px] font-gunjarati"
          >Nama Lengkap</label
        >

        <input
          type="text"
          id="namaLengkap"
          :placeholder="'Masukan Nama Anda'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="email" class="font-medium pb-[3px] font-gunjarati"
          >Email</label
        >

        <input
          type="email"
          id="email"
          :placeholder="'Masukan Email Anda'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="noTelepon" class="font-medium pb-[3px] font-gunjarati"
          >No Telepon</label
        >

        <input
          type="number"
          id="noTelepon"
          :placeholder="'Masukan nomer telepon Anda'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="Alamat" class="font-medium pb-[3px] font-gunjarati"
          >Alamat</label
        >

        <input
          type="text"
          id="noTelepon"
          :placeholder="'masukan alamat anda'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="asalSekolah" class="font-medium pb-[3px] font-gunjarati"
          >Asal Sekolah</label
        >
        <div class="bg-[#40475A] rounded-[6px]">
          <select
            id="asalSekolah"
            name="country"
            class="h-[48px] bg-transparent border-0 bg-none py-0 pl-4 pr-9 rounded-[6px] text-gray-400 focus:ring-2 focus:ring-inset w-[100%] sm:text-sm"
          >
            <option>Pilih Tipe</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="password" class="font-medium pb-[3px] font-gunjarati"
          >Kata Sandi</label
        >

        <input
          type="password"
          id="password"
          :placeholder="'masukan kata sandi'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex flex-col pb-[25px]">
        <label for="confirmPassword" class="font-medium pb-[3px] font-gunjarati"
          >Konfirmasi Kata Sandi</label
        >

        <input
          type="password"
          id="confirmPassword"
          :placeholder="'konfirmasi kata sandi'"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-white"
        />
      </div>

      <div class="flex items-center pb-[25px]">
        <div
          class="h-[48px] bg-[#C8CACF] w-[100%] flex justify-center items-center rounded-tl-lg rounded-bl-lg"
        >
          <p class="text-center font-gunjarati font-light">Tipe</p>
        </div>
        <div class="h-[48px] bg-[#40475A] w-[100%] rounded-tr-lg rounded-br-lg">
          <select
            id="country"
            name="country"
            class="h-full border-0 bg-transparent bg-none py-0 pl-4 pr-9 rounded-tr-lg rounded-br-lg text-gray-400 focus:ring-2 focus:ring-inset w-[100%] sm:text-sm"
          >
            <option>Pilih Tipe</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col pb-[20px]">
        <label for="codeSchool" class="font-medium pb-[3px] font-gunjarati"
          >Kode Sekolah</label
        >

        <input
          type="text"
          id="codeSchool"
          class="h-[48px] text-[15px] px-[10px] bg-[#40475A] rounded-[6px] text-black bg-transparent border-dotted border-2 border-slate-600"
        />
      </div>

      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
      >
        Selanjutnnya
      </button>
      <p class="pt-[3rem] pb-[20px] text-center font-semibold">
        Sudah Punya Akun ?
        <span class="text-[#1459DF]"><a href="/masuk">Masuk</a></span>
      </p>
      <div class="flex justify-center">
        <hr
          class="text-center border-t-2 border-1 m-0 p-0 border-[#3F3C3C] w-[50%]"
        />
      </div>
      <p class="pt-[20px] pb-[20px] text-center font-semibold m-0">
        Sekolah Belum Terdaftar ? <br />
        <span class="text-[#1459DF]"><a href="">Hubungi Kami</a></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  setup() {
    console.log("halo");
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
  position: sticky;
  height: max-content;
}
</style>
