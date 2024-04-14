<template>
  <div
    class="bg-[#EDECEC] p-4 shadow-[0px_5px_8px_1px_rgba(0,0,0,0.3)] w-full rounded-xl flex flex-col justify-between"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex justify-center">
        <div
          class="flex items-center mobile:h-[max-content] w-full justify-center"
        >
          <img
            :src="`../../../..${cover}`"
            alt="gambar"
            class="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div
        class="flex flex-col w-full h-full"
        style="display: flex; justify-content: flex-end"
      >
        <div class="flex justify-between py-3">
          <p class="font-gunjaranti font-semibold text-black text-[0.3cm]">
            {{ penulis }}
          </p>
        </div>
        <div>
          <p class="font-gunjaranti font-semibold">
            {{ title }}
          </p>
        </div>
      </div>
      <div class="flex pt-3 gap-3">
        <button
          class="w-20 bg-[#d9d9d9c8] p-3 rounded-xl shadow-[1px_4px_4px_0px_rgba(0,0,0,0.3)]"
          @click="detailBook"
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
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "cardBook",
  props: {
    cover: "",
    penulis: "",
    title: "",
    idBook: "",
  },
  setup(props, { emit }) {
    const router = useRouter();

    const detailBook = () => {
      router.push({ name: "detailBook", params: { idBuku: props.idBook } });
    };

    const openModalPinjam = () => {
      emit("openModal");
    };

    return {
      detailBook,
      openModalPinjam,
    };
  },
});
</script>
