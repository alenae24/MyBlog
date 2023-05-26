<script>
import Footer from './components/Footer.vue'
import Navigation from './components/Navigation.vue';
import { ref } from "vue";
import { supabase } from './supabase/supabase.js';
import store from './store/index.js';


export default {
  components: {
    Navigation, Footer
  },
  setup() {
    //create data/vars
    const appReady = ref(null);
    //
    const user = supabase.auth.getUser();

    if(!user){
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    })

    return { appReady };
  },
  
}
</script>

<template>
  <div v-if="appReady">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
