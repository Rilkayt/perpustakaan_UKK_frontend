<template>
  <div
    class="bg-[#EDECEC] p-4 shadow-[0px_5px_8px_1px_rgba(0,0,0,0.3)] w-full rounded-xl flex flex-col justify-between"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex justify-center items-center">
        <img
          :src="`../../../..${cover}`"
          alt="gambar"
          class="tablet:w-24 laptop:w-30 rounded-md"
        />
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between py-2">
          <p class="font-gunjaranti font-semibold text-black text-[0.3cm]">
            {{ penulis }}
          </p>
        </div>
        <p class="font-gunjaranti font-semibold">
          {{ title }}
        </p>
      </div>
      <div class="flex pt-3 gap-2">
        <button
          class="w-20 bg-[#d9d9d9c8] p-3 rounded-xl shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)]"
          @click="goToDetail"
        >
          <font-awesome-icon
            :icon="['fas', 'file']"
            size="xl"
            style="color: #2b3964"
          />
        </button>
        <button
          class="w-full bg-[#e8c03c] font-bold p-3 rounded-xl font-gunjarati shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)]"
          @click="openModalPinjam"
        >
          Pinjam
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardBook",
  props: {
    cover: "",
    penulis: "",
    title: "",
    bookId: "",
  },
  setup(props, { emit }) {
    const goToDetail = () => {
      window.location.href = `/buku/detail-buku/${props.bookId}`;
    };
    const openModalPinjam = () => {
      emit("openModal");
    };

    return {
      goToDetail,
      openModalPinjam,
    };
  },
};
</script>
