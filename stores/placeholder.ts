import { defineStore } from "pinia";
import axios from "axios";

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

interface State {
  loadingData: boolean;
  postsListState: Post[];
}

export const usePlaceholderStore = defineStore("placeholder", {
  state: (): State => ({
    postsListState: [],
    loadingData: false,
  }),
  getters: {
    postList: (state) => state.postsListState,
    reversedPostList: (state) =>
      state.postsListState.toSorted((a, b) => b.id - a.id),
  },
  actions: {
    async getAllPosts(): Promise<Post[]> {
      try {
        this.loadingData = true;
        const result = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`
        );
        this.postsListState = result.data;

        this.loadingData = false;
        return result.data;
      } catch (error) {
        throw error;
      }
    },
    async createPost(postInfo: createPost): Promise<Post> {
      try {
        const params = postInfo;
        this.loadingData = true;
        const result = await axios.post(
          `https://jsonplaceholder.typicode.com/posts`,
          params,
          { headers }
        );
        this.loadingData = false;
        return result.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
