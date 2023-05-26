<template>
  <header>
    <nav>
      <ul>
      <router-link v-if="!user" class='link' to="/">MyBlog</router-link>
      <router-link v-if="user" class='link' to="/">MyBlog</router-link>
      <router-link v-if="user" class='link' to="/news">Новости</router-link>
      <router-link v-if="user" class='link' to="/design">Шаблоны дизайна</router-link>
      <router-link v-if="user" class='link' to="/account">Личный кабинет</router-link>
      <router-link v-if="user" class='link' to="/create"><button style="background-color: rgba(47, 128, 237, 1);; color: white;">Создать пост</button></router-link>
      <router-link v-if="!user" class='link' to="/login">Вход</router-link>
      <!-- <router-link v-if="!user" class='link' to="/register">Регистрация</router-link> -->
      <button v-if="user" @click="logout">Выход</button>
      </ul>
      <hr>
    </nav>
  </header>
</template>

<script>
import store from "../store/index.js";
import { computed } from "vue";
import { supabase } from "../supabase/supabase.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    // Get user from store
    const user = computed(() => store.state.user);
    // Setup ref to router
    const router = useRouter();
    // Logout function
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };
    return { logout, user };
  },
};
</script>