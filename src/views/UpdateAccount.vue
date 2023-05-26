<template>
    <section class="join_us">
        <h1>Настройки личного кабинета</h1>
        <section class="join_us">
            <div style="display:flex; justify-content: center;">
                <section class="account_img">
                    <img style="border-radius: 10px; border: 2px solid black; width: 600px; height: 500px;" :src="avatar">
                    <button>Изменить изображение профиля</button>
                </section>

                <form @submit.prevent="updateProfile()" style="text-align: left;">
                    <div>
                        <label>Никнейм</label>
                        <input type="text" v-model="nickname">
                    </div>

                    <div>
                        <label>Фамилия</label>
                        <input type="text" v-model="surname">
                    </div>

                    <div>
                        <label>Имя</label>
                        <input type="text" v-model="name">
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="text"  disabled :value="email">
                    </div>

                    <div>
                        <label>Пароль</label>
                        <input type="password" disabled :value="password">
                    </div>

                    <div>
                        <label>Описание</label>
                        <input type="text" v-model="description">
                    </div>

                    <button type="submit">Сохранить</button>
                </form>


            </div>
        </section>
    </section>
</template>

<script setup>
import store from '../store';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase/supabase';
import { useRouter } from 'vue-router'


const router = useRouter();

const data = ref([]);
const dataLoaded = ref(null);

const loading = ref(true)
const name = ref('')
const nickname = ref('')
const surname = ref('')
const avatar = ref('')
const description = ref('')
const email = ref('');
const password = ref('')

const getProfile = async () => {
    try {
        const user = store.state.user;
        const userId = user.id;

        const { data: users, error } = await supabase
            .from('users')
            .select('name, nickname, email, surname, description, avatar, password')
            .eq('id', userId)
            .single()
            ;

        if (data) {
            data.value = users;
            nickname.value = users.nickname
            email.value = users.email
            name.value = users.name
            surname.value = users.surname
            description.value = users.description
            avatar.value = users.avatar
            password.value = users.password
            dataLoaded.value = true;
        }
        if (error) throw error;
        // проверка
        // console.log(data.value)
    }
    catch (error) {
        console.warn(error.message)
    }
}

const updateProfile = async () => {
    try {
        loading.value = true
        const user = store.state.user
        const userId = user.id;

        let { error } = await supabase.from('users').upsert({
            id: userId,
            email: email.value,
            nickname: nickname.value,
            surname: surname.value,
            name: name.value,
            avatar: avatar.value,
            description: description.value,
            password: password.value,
            created_at: new Date(),
        })

        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
        router.push({ name: "Account" })
    }
}

onMounted(() => {
    getProfile();
})

</script>