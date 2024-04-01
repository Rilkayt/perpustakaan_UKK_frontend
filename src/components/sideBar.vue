<template>
  <aside
    class="bg-[#2b3964] h-dvh w-64 fixed left-0 top-0 z-40 -translate-x-full mobile:translate-x-0"
  >
    <div class="p-5">
      <div class="w-20 h-20 bg-white rounded-xl"></div>
      <div class="height-menu">
        <a href="" class="flex gap-3 mt-5">
          <font-awesome-icon
            :icon="['fas', 'house-chimney']"
            size="xl"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">Beranda</p>
        </a>

        <a href="" class="flex gap-4 mt-5">
          <font-awesome-icon
            :icon="['fas', 'fa-book']"
            size="xl"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">Buku</p>
        </a>
        <a href="" class="flex gap-3 mt-5">
          <font-awesome-icon
            :icon="['fas', 'box-archive']"
            size="xl"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">Peminjaman</p>
          <font-awesome-icon
            :icon="['fas', 'angle-down']"
            size="xl"
            style="color: #e7e9ee"
            class="pt-1"
          />
        </a>
        <div class="ps-4">
          <a href="" class="flex gap-3 mt-5 text-[14px]">
            <font-awesome-icon
              :icon="['fas', 'circle-minus']"
              size="xl"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">
              Belum Diambil
            </p>
          </a>
          <a href="" class="flex gap-3 mt-5 text-[14px]">
            <font-awesome-icon
              :icon="['fas', 'clock']"
              size="xl"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">
              Belum Dikembalikan
            </p>
          </a>
          <a href="" class="flex gap-3 mt-5 text-[14px]">
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              size="xl"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">
              Sudah Dikembalikan
            </p>
          </a>
        </div>
        <a href="" class="flex gap-3 mt-5">
          <font-awesome-icon
            :icon="['fas', 'list']"
            size="xl"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">Kategori</p>
        </a>
        <a href="" class="flex gap-3 mt-5">
          <font-awesome-icon
            :icon="['fas', 'chart-line']"
            size="xl"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] font-bold font-gunjarati pt-1">Laporan</p>
        </a>
      </div>
    </div>
    <div
      class="absolute bottom-0 text-center h-max pb-2 pt-2 w-full bg-[#2b3964]"
    >
      <p class="text-white text-xs font-gunjarati font-extralight">
        Terdapat Kendala ?
      </p>
      <a
        href=""
        class="text-white text-base font-gunjarati font-bold tracking-wider"
        >Hubungi Kami</a
      >
    </div>
  </aside>
</template>

<script>
export default {
  name: "sideBar",
};
</script>

<style scoped>
.height-menu {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
