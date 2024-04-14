<template>
  <aside
    :class="
      showBar
        ? 'translate-x-full block duration-500'
        : 'translate-x-0 hidden duration-500'
    "
    class="bg-[#2b3964] h-dvh w-64 fixed left-0 top-0 z-40 mobile:translate-x-0"
  >
    <div class="p-5">
      <div class="flex justify-between">
        <div class="w-20 h-20 bg-white rounded-xl"></div>
        <template v-if="closeButton">
          <span @click="close"
            ><font-awesome-icon :icon="['fas', 'xmark']" class="text-white"
          /></span>
        </template>
      </div>
      <div class="height-menu">
        <a href="/beranda" class="flex gap-3 mt-5">
          <font-awesome-icon
            :icon="['fas', 'house-chimney']"
            size="lg"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
            Beranda
          </p>
        </a>

        <a href="/buku" class="flex gap-4 mt-5">
          <font-awesome-icon
            :icon="['fas', 'fa-book']"
            size="lg"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
            Buku
          </p>
        </a>
        <a
          @click="tipe === 'USER' ? goToPeminjaman() : openOrCloseDrop()"
          class="flex gap-3 mt-5"
        >
          <font-awesome-icon
            :icon="['fas', 'box-archive']"
            size="lg"
            style="color: #e7e9ee"
          />
          <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
            Peminjaman
          </p>
          <template v-if="tipe == 'ADMIN'">
            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              size="lg"
              style="color: #e7e9ee"
              :class="`pt-1 ${
                checkOpenOrClose
                  ? 'rotate-180 duration-500'
                  : 'rotate-0 duration-500'
              }`"
            />
          </template>
        </a>
        <div :class="`ps-4 ${checkOpenOrClose ? 'block' : 'hidden'}`">
          <a
            href="/daftar-pinjam/belum-diambil"
            class="flex gap-3 mt-5 text-[14px]"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-minus']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Belum Diambil
            </p>
          </a>
          <a
            href="/daftar-pinjam/belum-dikembalikan"
            class="flex gap-3 mt-5 text-[14px]"
          >
            <font-awesome-icon
              :icon="['fas', 'clock']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Belum Dikembalikan
            </p>
          </a>
          <a
            href="/daftar-pinjam/sudah-dikembalikan"
            class="flex gap-3 mt-5 text-[14px]"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Sudah Dikembalikan
            </p>
          </a>
        </div>
        <template v-if="tipe === 'ADMIN' || tipe === 'EMPLOYEE'">
          <a href="/kategori" class="flex gap-3 mt-5">
            <font-awesome-icon
              :icon="['fas', 'list']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Kategori
            </p>
          </a>
        </template>
        <template v-if="tipe === 'USER'">
          <a href="/koleksi" class="flex gap-3 mt-5">
            <font-awesome-icon
              :icon="['fas', 'boxes-stacked']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Koleksi
            </p>
          </a>
        </template>
        <template v-if="tipe === 'ADMIN'">
          <a href="/petugas" class="flex gap-[0.4rem] mt-5">
            <font-awesome-icon
              :icon="['fas', 'user-plus']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Petugas
            </p>
          </a>
        </template>
        <template v-if="tipe === 'ADMIN' || tipe === 'EMPLOYEE'">
          <a href="/laporan" class="flex gap-3 mt-5">
            <font-awesome-icon
              :icon="['fas', 'chart-line']"
              size="lg"
              style="color: #e7e9ee"
            />
            <p class="text-[#E7E9EE] text-sm font-bold font-gunjarati pt-1">
              Laporan
            </p>
          </a>
        </template>
      </div>
    </div>
    <div
      class="absolute bottom-0 text-center h-max pb-2 pt-2 w-full bg-[#2b3964]"
    >
      <p class="text-white text-xs font-gunjarati font-extralight">
        Terdapat Kendala ?
      </p>
      <a
        href="http://wa.me/6285159722546"
        target="__blank"
        class="text-white text-base font-gunjarati font-bold tracking-wider"
        >Hubungi Kami</a
      >
    </div>
  </aside>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";

export default {
  name: "sideBar",
  props: {
    showSideBar: { default: false, type: Boolean },
    tipe: String,
  },
  setup(props, { emit }) {
    let showBar = ref(null);
    let closeButton = ref(false);
    let checkConditionBtnSideBar = () => {
      if (window.innerWidth > 767) {
        showBar.value = true;
        closeButton.value = false;
      } else {
        showBar.value = props.showSideBar;
        closeButton.value = true;
      }
    };

    watchEffect(() => {
      if (window.innerWidth > 767) {
        showBar.value = true;
        closeButton.value = false;
      } else {
        showBar.value = props.showSideBar;
        closeButton.value = true;
      }

      console.log(props.showSideBar);
      console.log(showBar.value);
    });

    const close = () => {
      showBar.value = false;
      emit("close");
    };
    const goToPeminjaman = () => {
      window.location.href = "/peminjaman";
    };

    const checkOpenOrClose = ref(false);
    const openOrCloseDrop = () => {
      checkOpenOrClose.value = !checkOpenOrClose.value;
    };
    onMounted(() => {
      window.addEventListener("resize", checkConditionBtnSideBar);
      // console.log(props.showSideBar);
      // console.log((props.showSideBar = true));
      // if (window.innerWidth < 768) {
      //   props.showSideBar = false;
      // }else{
      //   props
      // }
      // window.addEventListener("resize", checkConditionBtnSideBar);
    });

    return {
      showBar,
      close,
      closeButton,
      goToPeminjaman,
      checkOpenOrClose,
      openOrCloseDrop,
    };
  },
};
</script>

<style scoped>
.height-menu {
  max-height: 70vh;
  overflow-y: auto;
}

.display-block {
  display: block;
  transform: translateX(0);
  transition: transform 9s ease;
}

.display-none {
  display: none;
}

.slide-right-enter-active {
  transition: transform 0.3s ease;
}

.slide-right-enter {
  transform: translateX(100%);
}

.side-open {
  transform: translateX(0);
  transition: transform 9s ease;
}
.side-close {
  transform: translateX(-100);
  transition: transform 9s ease;
}
</style>
