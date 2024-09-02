<template>
  <div class="bg-white min-h-dvh flex justify-center">
    <div class="flex flex-col w-[50%] bg-gray-200 items-center">
      <div
        class="w-full min-h-10 border-gray-400 items-center flex border-[1px] text-2xl justify-center border-b-0"
      >
        All posts
      </div>
      <div
        class="w-full min-h-10 border-black items-center flex border-[1px] text-2xl justify-between px-4"
      >
        <div
          class="w-[10%] flex items-center cursor-pointer"
          @click="orderById"
        >
          id
          <Icon
            name="oi:caret-bottom"
            class="ml-2 w-4 transition"
            :class="{ activeIcon: orderingById }"
          />
        </div>
        <div class="flex" v-if="postsLen && postsLen > 10">
          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1 hover:bg-slate-300"
            :class="{ activePage: getCurrentPage == 1 }"
            @click="changePage(1)"
          >
            1</button
          ><button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1"
            v-if="getCurrentPage > 2"
          >
            ...
          </button>
          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1 hover:bg-slate-300"
            v-if="getCurrentPage > 2 && getCurrentPage != 1"
            @click="changePage(getCurrentPage - 1)"
          >
            {{ getCurrentPage - 1 }}
          </button>
          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1"
            v-if="getCurrentPage != postsLen - 1 && getCurrentPage != 1"
            :class="{ activePage: getCurrentPage }"
          >
            {{ getCurrentPage }}
          </button>

          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1 hover:bg-slate-300"
            v-if="
              Math.ceil(postsLen / 10) - 1 != getCurrentPage &&
              getCurrentPage < Math.ceil(postsLen / 10)
            "
            @click="changePage(getCurrentPage + 1)"
          >
            {{ getCurrentPage + 1 }}
          </button>
          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1"
            v-if="
              Math.ceil(postsLen / 10) > 2 &&
              getCurrentPage < Math.ceil(postsLen / 10) - 2
            "
          >
            ...
          </button>

          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1 hover:bg-slate-300"
            v-if="Math.ceil(postsLen / 10) != getCurrentPage"
            @click="changePage(Math.ceil(postsLen / 10))"
          >
            {{ Math.ceil(postsLen / 10) }}
          </button>
        </div>
      </div>
      <div
        class="w-full flex flex-1 px-4 min-h-[100px] items-center border-[1px] first-of-type:bg-black border-t-0 border-black"
        v-for="item in postsList"
        :key="item.id"
      >
        <div class="w-[10%] flex items-center text-2xl">
          {{ item.id }}
        </div>
        <div class="w-[90%] h-[70%] flex flex-col justify-between">
          <div class="text-sm font-bold">{{ item.title }}</div>
          <div class="text-xs">{{ item.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlaceholderStore } from "#imports";

const placeholderStore = usePlaceholderStore();

const loading = computed(() => placeholderStore.loadingData);
const filterById = useRoute().query.filter;
const page = useRoute().query.page;
const router = useRouter();

let orderingById = filterById == "byId" ? ref(true) : ref(false);
let getCurrentPage = page ? ref(Number(page)) : ref(1);

const postsLen = computed(() => placeholderStore.postList?.length);

const postsList = computed(() => {
  if (orderingById.value == false) {
    return placeholderStore.postList?.slice(
      getCurrentPage.value * 10 - 10,
      getCurrentPage.value * 10
    );
  } else {
    return placeholderStore.reversedPostList?.slice(
      getCurrentPage.value * 10 - 10,
      getCurrentPage.value * 10
    );
  }
});

function changePage(page: number) {
  if (getCurrentPage.value) {
    getCurrentPage.value = page;
    router.push({ query: { page: getCurrentPage.value } });
  } else {
    router.push({ query: { page: 1 } });
  }
}

function orderById() {
  getCurrentPage.value = 1;
  if (orderingById.value) {
    router.push({ query: { filter: null } });
  } else {
    router.push({ query: { filter: orderingById ? "byId" : null } });
  }
  orderingById.value = !orderingById.value;
}

onMounted(() => {
  placeholderStore.getAllPosts();
});
</script>

<style lang="scss" scoped>
.activeIcon {
  transform: rotate(180deg);
}
.activePage {
  background: #94a3b8;
}
</style>
