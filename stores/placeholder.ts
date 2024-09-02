import { defineStore } from "pinia";
import axios from "axios";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

interface State {
  loadingData: boolean;
  postsListState: Post[] | null;
  reversedPostsListSate: Post[] | null;
}

export const usePlaceholderStore = defineStore("placeholder", {
  state: (): State => {
    return {
      postsListState: null,
      loadingData: false,
      reversedPostsListSate: null,
    };
  },
  getters: {
    postList: (state) => state.postsListState,
    reversedPostList: (state) => state.reversedPostsListSate,
  },
  actions: {
    async getAllPosts(): Promise<Post[]> {
      this.loadingData = true;
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      this.postsListState = result.data;
      this.reversedPostsListSate = Array.from(result.data);
      this.reversedPostsListSate?.sort((a, b) => b.id - a.id);

      this.loadingData = false;
      return result.data;
    },
  },
});
