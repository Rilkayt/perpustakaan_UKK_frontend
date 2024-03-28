<template>
  <div
    class="background flex justify-center items-center bg-cover bg-center w-screen h-screen overflow-hidden bg-[#E7E9EE]"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-md shadow-[#888585] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px],"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="xl" />
      <h3 class="font-bold text-[30px] font-gunjarati py-[20px]">OTP</h3>

      <div class="flex justify-evenly">
        <input
          type="text"
          class="tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
        />
        <input
          type="text"
          class="tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
        />
        <input
          type="text"
          class="tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
        />
        <input
          type="text"
          class="tablet:h-[60px] tablet:w-[60px] bg-[#40475A] rounded-lg tablet:text-[3rem] text-center mobile:h-[40px] mobile:w-[40px] mobile:text-[1rem] text-white"
        />
      </div>

      <p class="pt-[2rem] pb-[30px] text-center font-semibold">
        Belum Menerima OTP ?
        <span class="text-[#1459DF]"><a href="">Kirim Ulang</a></span>
      </p>

      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0]"
      >
        Daftar
      </button>

      <p class="pt-[2rem] pb-[30px] text-center font-semibold">
        Sudah Punya Akun ?
        <span class="text-[#1459DF]"><a href="">Masuk</a></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "otpRegister",
  setup() {
    console.log("halo");
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
}
</style>
