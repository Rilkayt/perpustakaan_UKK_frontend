<template>
  <div
    class="background flex justify-center items-center bg-cover bg-center w-screen h-screen overflow-hidden bg-[#E7E9EE]"
  >
    <div
      class="bg-[#E7E9EE] rounded-[20px] shadow-[0px_10px_17px_1px_rgba(255,255,255,0.3)] desktop:w-[50%] p-[50px] laptop:w-[75%] laptop:p-[50px] tablet:w-[80%] tablet:p-[40px] mobile:p-[20px],"
    >
      <h3 class="font-bold text-[30px] text-center font-gunjarati py-4">
        Perpustakaan App
      </h3>

      <p class="font-gunjarati text-base font-semibold">
        Selamat Datang di Aplikasi Perpustakaan
      </p>
      <p class="font-gunjarati text-base text-justify">
        Ayo bangun komunitas perpustakaan di sekolah mu jadi lebih berwarna dan
        mudah, semudah untuk mengolah, semudah untuk meminjam, semudah untuk
        memberi kesan.
      </p>
      <div class="w-full text-center pt-4">
        <p class="font-gunjarati text-base text-center w-full">
          <span class="font-bold">Olah</span> Perpustakaannya -
          <span class="font-bold">Pinjam</span> Bukunya - Berikan
          <span class="font-bold">Kesan</span>nya
        </p>
      </div>

      <button
        class="bg-[#E8C13C] w-[100%] h-[48px] rounded-[6px] font-bold font-gunjarati hover:bg-[#e8c03ce0] mt-4 shadow-[0px_5px_8px_1px_rgba(0,0,0,0.3)]"
        @click="goToMasuk"
      >
        Mulai
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  setup() {
    const goToMasuk = () => {
      window.location.href = "/masuk";
    };

    return {
      goToMasuk,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/blob.svg");
}
</style>
