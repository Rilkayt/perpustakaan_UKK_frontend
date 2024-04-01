<template>
  <div
    class="mobile:h-[50px] tablet:h-[60px] bg-[#D9D9D9] shadow-[0px_5px_8px_1px_rgba(0,0,0,0.3)] sticky top-0"
  >
    <div class="flex justify-between items-center h-full px-[20px]">
      <div class="h-[40px] w-[40px]"></div>
      <p class="font-gunjarati font-bold mobile:text[15px] tablet:text-[20px]">
        {{ titleName }}
      </p>
      <div class="flex items-center gap-2">
        <img src="../" class="" lt="imageProfil" width="40" height="40" />

        <p>{{ username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { onMounted, ref } from "vue";

export default {
  name: "titleTemp",
  props: {
    titleName: String,
  },
  setup() {
    let imageUser = ref("");
    let username = ref("");
    onMounted(() => {
      let dataAuth = JSON.parse(localStorage.getItem("token"));
      let dataUserReady = jwtDecode(dataAuth.token);
      console.log(dataUserReady);
      let dataUserImage = dataUserReady.profilAkun;
      let dataUserImageReady = dataUserImage.replace(/^\.+/, "");
      console.log(dataUserImageReady);
      imageUser.value = "../../imageProfile/default-profile.jpeg";

      username.value = dataUserReady.Username;
    });

    return {
      imageUser,
      username,
    };
  },
};
</script>
