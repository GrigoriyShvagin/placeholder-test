<template>
  <form
    class="fixed top-0 left-0 w-dvw h-dvh bg-black bg-opacity-80 flex justify-center items-center"
  >
    <div class="w-[49%] h-[520px] bg-white p-10 relative rounded-xl">
      <Icon
        name="carbon:close-outline"
        class="absolute top-10 w-7 h-7 right-10 cursor-pointer"
        @click="close"
      />
      <div class="text-black text-2xl font-bold text-center">Создать пост</div>
      <div class="w-full flex flex-col items-center">
        <div class="w-full flex flex-col">
          <p class="mt-5 text-lg">Заголовок</p>
          <input
            type="text"
            v-model="title"
            required
            class="rounded-xl w-full border border-black mt-2 py-1 px-5 outline-none"
          />
        </div>
        <div class="w-full flex flex-col mt-5">
          <p class="mt-5 text-lg">Содержимое поста</p>
          <textarea
            type="text"
            v-model="body"
            required
            class="rounded-xl w-full border border-black mt-2 py-1 px-5 outline-none h-48"
          />
        </div>
        <button
          type="submit"
          @click.prevent="upload"
          class="px-5 py-3 bg-slate-400 w-[30%] mt-5 rounded-lg text-white text-xl transition duration-300 hover:bg-slate-500"
        >
          Опубликовать
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits();
import { usePlaceholderStore } from "#imports";

const placeholderStore = usePlaceholderStore();

let title = ref("");
let body = ref("");

function close() {
  emit("closed");
}
function upload() {
  placeholderStore
    .createPost({
      title: title.value,
      body: body.value,
      userId: 1,
    })
    .then(emit("closed"));
}
</script>
