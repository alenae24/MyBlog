<template>
    <div class="signin">
        <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
        </div>

        <!-- Register -->
        <form @submit.prevent="register">
            <h1>Регистрация</h1>
            <div>
                <label for="avatar">Изображение профиля</label>
                <input type="text" id="avatar" v-model="avatar" placeholder="Введите url изображения">
            </div>

            <div class="input">
                <label for="name">Имя</label>
                <input type="text" required id="name" v-model="name" placeholder="Введите имя">
            </div>

            <div class="input">
                <label for="surname">Фамилия</label>
                <input type="text" required id="surname" v-model="surname" placeholder="Введите фамилию">
            </div>

            <div class="input">
                <label for="nickname">Никнейм</label>
                <input type="text" required id="nickname" v-model="nickname" placeholder="Введите никнейм">
            </div>
            <div class="input">
                <label for="description">Описание</label>
                <input type="text" id="description" v-model="description" placeholder="Введите описание">
            </div>
            <div class="input">
                <label for="email">Email</label>
                <input type="text" required id="email" v-model="email" placeholder="Введите email">
            </div>

            <div class="input">
                <label for="password">Пароль</label>
                <input type="password" required id="password" v-model="password" placeholder="Введите пароль">
            </div>

            <div class="input">
                <label for="confirmPassword">Подтвердите пароль</label>
                <input type="password" required id="confirmPassword" v-model="confirmPassword" placeholder="Повторите пароль">
            </div>

            <button type="submit">СОЗДАТЬ БЛОГ</button>
        </form>
        <router-link :to="{ name: 'Login' }">
            Уже есть аккаунт?
        </router-link>
    </div>
</template>
<script>

import { ref } from 'vue'
import { supabase } from '../supabase/supabase.js'
import { useRouter } from 'vue-router'

export default {
    name: 'Register',
    setup() {

        const router = useRouter();

        // const userId = uuid.v4();
        // console.log(userId);
        const name = ref(null);
        const surname = ref(null);
        const nickname = ref(null);
        const email = ref(null);
        const password = ref(null);
        const avatar = ref(null);
        const confirmPassword = ref(null);
        const description =ref(null);
        const errorMsg = ref(null);
        

        const register = async () => {
            if (password.value === confirmPassword.value) {
                try {
                    // 1 step. SignUp
                    // 2 step. get current auth user => supabase.auth.getUser(); Email, User UID
                    // 3 step. Insert into users table data to getUser with metadata => password, nickname, surname,name,
                    // avatar, created_at (new Date())
                    // email, id => getUser.user_uid;

                    

                    // Для постов
                    // чтобы связывать пользователя при создании поста, необходимо выдавать не из таблицы users, а из supabase.auth.getUser().id


                    // Для личного кабинета, чтобы выводить никнейм необходимо => сделать select * from users where id = supabase.auth.getUser().id;


                    const { data, error } = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value
                    });

                    if (data) {
                        const user = data.user;
                        
                        const { insertData, error } = await supabase.from("users").insert({
                            id: user.id,
                            email: user.email,
                            name: name.value,
                            surname: surname.value,
                            nickname: nickname.value,
                            avatar: avatar.value,
                            password: password.value,
                            description: description.value
                        });

                        if (insertData) {
                            router.push({ name: "Login" })       
                        }

                        if (error) {
                            throw error;
                        }
                    
                    }
                }
                catch (error) {
                    errorMsg.value = error.message;
                    setTimeout(() => {
                        errorMsg.value = null;
                    }, 5000)
                }
                return;
            }
            errorMsg = "Error: Пароли не совпадают";
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000)
        };

        return {
        description, avatar, email, password, nickname, surname, name, confirmPassword, errorMsg, register
        }
    }
}
</script>