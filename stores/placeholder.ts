import { defineStore } from "pinia";
import axios from "axios";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

interface State {
  loadingData: boolean;
  postsListState: Post[] | null;
}

export const usePlaceholderStore = defineStore("placeholder", {
  state: (): State => {
    return { postsListState: null, loadingData: false };
  },
  getters: {
    postList: (state) => state.postsListState,
  },
  actions: {
    async getAllPosts(): Promise<Post[]> {
      this.loadingData = true;
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      this.postsListState = result.data;
      return result.data;
    },
  },
});
