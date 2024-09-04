<template>
  <div class="bg-white min-h-dvh flex justify-center">
    <div class="flex flex-col w-[50%] bg-gray-200 items-center">
      <div
        class="w-full min-h-10 border-gray-400 items-center flex border-[1px] text-2xl justify-center border-b-0"
      >
        All posts
      </div>
      <div class="" v-if="placeholderStore.loadingData">
        <img src="/images/throbber.gif" alt="" />
      </div>
      <div
        class="w-full min-h-10 border-black items-center flex border-[1px] text-2xl justify-between px-4"
        v-else
      >
        <div class="w-[40%] flex items-center cursor-pointer">
          <p class="flex w-max items-center" @click="orderById">
            id
            <Icon
              name="oi:caret-bottom"
              class="ml-2 mr-10 w-4 transition"
              :class="{ activeIcon: orderingById }"
            />
          </p>
          <button
            type="button"
            class="bg-slate-600 text-white px-5 py-[2px] flex items-center justify-center rounded-xl"
            @click="addModalMenu = true"
          >
            Create new
            <Icon name="simple-line-icons:plus" class="w-5 h-5 ml-4" />
          </button>
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
            v-if="getCurrentPage > 3"
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
            v-if="maxPages - 1 != getCurrentPage && getCurrentPage < maxPages"
            @click="changePage(getCurrentPage + 1)"
          >
            {{ getCurrentPage + 1 }}
          </button>
          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1"
            v-if="maxPages > 2 && getCurrentPage < maxPages - 2"
          >
            ...
          </button>

          <button
            class="w-10 h-10 flex justify-center items-center rounded-full mr-1 hover:bg-slate-300"
            v-if="maxPages != getCurrentPage"
            @click="changePage(maxPages)"
          >
            {{ Math.ceil(postsLen / 10) }}
          </button>
        </div>
      </div>
      <div
        class="w-full flex flex-1 px-4 min-h-[100px] max-h-[100px] items-center border-[1px] first-of-type:bg-black border-t-0 border-black"
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
    <AddModalMenu v-if="addModalMenu" @closed="closeAddModal" />
  </div>
</template>

<script lang="ts" setup>
import { usePlaceholderStore } from "#imports";

const placeholderStore = usePlaceholderStore();

const route = useRoute();
const { filter: filterById, page } = route.query;
const router = useRouter();

let orderingById = filterById == "byId" ? ref(true) : ref(false);
let getCurrentPage = page ? ref(Number(page)) : ref(1);
let addModalMenu = ref(false);

const postsLen = computed(() => placeholderStore.postList?.length);
const maxPages = computed(() =>
  Math.ceil(placeholderStore.postList?.length / 10)
);

const postsList = computed(() => {
  console.log();
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

function closeAddModal() {
  addModalMenu.value = false;
}

function changePage(page: number) {
  const query = {
    page: getCurrentPage.value ? getCurrentPage.value : 1,
    filter: orderingById.value ? "byId" : null,
  };
  if (getCurrentPage.value) {
    getCurrentPage.value = page;
    router.push({ query });
  } else {
    router.push({ query });
  }
}

function orderById() {
  getCurrentPage.value = 1;
  orderingById.value = !orderingById.value;
  const query = {
    page: getCurrentPage.value ? getCurrentPage.value : 1,
    filter: orderingById.value ? "byId" : null,
  };
  router.push({ query });
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
