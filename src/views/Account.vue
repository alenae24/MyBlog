<template>
    <section class="join_us">
        <h1>Личный кабинет</h1>
        <section class="account">
            <div style="display:flex; margin-left: 100px;" v-for="(user, id) in data" :key="id">
                <img  style="margin-right: 25px; border-radius: 10px; border: 2px solid black; width: 600px; height: 500px;"
                    :src="user.avatar">
                <div style="text-align: left;">
                    <p> {{ user.nickname }}</p>
                    <p> {{ user.surname }} {{ user.name }}</p>
                    <p> {{ user.description }}</p>
                    <router-link to="/update"><button>Редактировать</button></router-link>
                </div>
            </div>  
        </section>
        <hr style="">
        <section v-if="posts.length === 0" class="join_us">
        <h1>Публикаций еще нет...</h1>
        <router-link :to="'/create'"><button>СОЗДАТЬ ПОСТ</button></router-link>
        </section>
        <section v-else class="posts" 
            >
            <PostCard 
            v-for="(post) in posts" 
            :id="post.id" 
            :title="post.title" 
            :description="post.description" 
            :img="post.img"/>
        </section>
    </section>
</template>

<script>
import store from '../store';
import { ref } from 'vue';
import { supabase } from '../supabase/supabase';
import PostCard from '../components/PostCard.vue';

export default {
    name: 'Account',
    components: { PostCard },
    setup() {
        const posts = ref([]);
        const data = ref([]);
        const dataLoaded = ref(null);

        const getData = async () => {
            try {
                const user = store.state.user;
                const  userId = user.id;
                const { data: users, error } = await supabase.from('users').select('*').eq('id', userId);
                if (error) throw error;
                data.value = users;
                dataLoaded.value = true;
                // проверка
                // console.log(data.value)
            }
            catch (error) {
                console.warn(error.message)
            }
        }

        getData();

        const getPost = async () => {
            const user = store.state.user;
            const  userId = user.id;
            const { data } = await supabase.from('posts').select().eq('user_id', userId);
            posts.value = data;
            store.posts = data;
            console.log(posts.value)
    }
    getPost()


return {
    data, dataLoaded, posts
}
}
}
</script>