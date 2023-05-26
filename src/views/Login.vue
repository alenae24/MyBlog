<template>
    <div class="signin">
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Register -->
        <form @submit.prevent="login">
            <h1>Вход</h1>

            <div class="input">
                <label for="email">Email</label>
                <input type="text" required id="email" v-model="email" placeholder="Введите email">
            </div>

            <div class="input">
                <label for="password">Пароль</label>
                <input type="password" required id="password" v-model="password" placeholder="Введите пароль">
            </div>

            <button type="submit">Войти</button>

        </form>
        <router-link :to="{ name: 'Register' }">
            Нет аккаунта?
        </router-link>

    </div>
</template>
<script>
import { ref } from 'vue'
import { supabase } from '../supabase/supabase.js'
import { useRouter } from 'vue-router'


export default {
    name: 'Login',
    setup() {

        const router = useRouter();
        const email = ref(null);
        const password = ref(null);
        const errorMsg = ref(null);

        const login = async () => {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email.value,
                    password: password.value
                })
                if (error) throw error;
                router.push({ name: 'Home' });
            }
            catch (error) {
                errorMsg.value = `Error: ${error.message}`;
                setTimeout(() => {
                    errorMsg.value = null;
                }, 5000)
            }
        }

        return {
            email, password, errorMsg, login
        }
    }
}
</script>