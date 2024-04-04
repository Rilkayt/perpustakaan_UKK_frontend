<template>
  <basePage :titleName="'Buku'">
    <template v-slot:content>
      <template v-if="role === 'USER'">
        <p
          v-if="bookList.length < 1"
          class="font-gunjarati text-center flex items-center justify-center h-dvh"
        >
          Buku di perpustakaan ini belum tersedia
        </p>

        <loadData />

        <template v-if="bookList.length > 0">
          <div
            class="grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-3 gap-4"
          >
            <template v-for="bookRandomList in bookList">
              <cardBook />
            </template>
          </div>
        </template>
      </template>
    </template>
  </basePage>
</template>

<script>
import { defineComponent, ref } from "vue";
import basePage from "../../../components/basePageTemp.vue";
import cardBook from "../components/cardBook.vue";
import loadData from "../../../components/loadData.vue";

export default defineComponent({
  name: "listBooks",
  components: {
    basePage,
    cardBook,
    loadData,
  },
  setup() {
    let role = ref("");

    role.value = "USER";

    let bookList = ref([]);

    return {
      role,
      bookList,
    };
  },
});
</script>
