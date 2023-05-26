import { reactive } from "vue";

const state = reactive({
  user: null,
  
});

const methods = {
  setUser(data) {
    state.user = data ? data.user : null;
  },
};

const store = reactive({
  posts: [],
})

export default {
  state,
  methods,
  store
};