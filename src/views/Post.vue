<template>
    <section class="postik" >
        <router-link class="back_news_btn" to="/news">Назад</router-link>
        <section class="post_page">
            <section style="text-align: center; background-color: rgba(231, 237, 246, 0.676); border-radius: 10px; width: 1000px; padding-bottom: 20px;">
                <h1>{{ post.title }}</h1>    
                <img v-if="post.img" :src="post.img" style="margin: 15px 0px; width: 60%; height: 70%; border-radius:10px;">
                <p> {{ post.description }}</p>
                <button @click="delPost(this.$route.params.id)" v-if="user.id === post.user_id">Удалить пост</button>
            </section>
    </section>
    </section>
    
    
</template>

<script>
import { reactive } from 'vue'
import { ref } from 'vue';
import { computed } from "vue";
import { supabase } from '../supabase/supabase';
import { useRoute,  useRouter} from 'vue-router'
import store from '../store'


export default{
    setup() {
        const loading = ref(true)
        const route = useRoute()
        const router = useRouter()
        const user = computed(() => store.state.user);
        let post = reactive({})

        // Достаем 1 пост по id
        const getPost = async (id) => {
        let { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        Object.assign(post, data)
        }
    
        getPost(route.params.id);

        // Удаление поста по клику из базы данных 

        const delPost = async (id) => {
            loading.value = true
            let { data } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)
            .single();
            router.push({ name: 'News' });
        }
        
    return{
        post, user, delPost
    }
    }

    
}
</script>
