<template>
    <section v-if="posts.length === 0" class="join_us">
        <h1>Публикаций еще нет...</h1>
        <router-link :to="'/create'"><button>СОЗДАТЬ ПОСТ</button></router-link>
    </section>
    <section v-else class="join_us">
        <h1>Новости</h1>
        <Swiper />
        <hr>
        <section class="checkbox">
            <button v-for="(tag) in data" value="" @click="">{{ tag.name }}</button>
        </section>
        <section class="posts">
            <PostCard 
            v-for="(post) in posts" 
            :id="post.id" 
            :title="post.title" 
            :description="post.description" 
            :img="post.img" />
        </section>
    </section>
</template>

<script>
import { supabase } from '../supabase/supabase';
import { ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import Swiper from '../components/Swiper.vue';
import store from '../store'

export default {
    name: 'News',
    components: {Swiper, PostCard},
    setup() {
        const posts = ref([]);
        const data = ref([]);
        const dataLoaded = ref(null);

        // tags
        const getTags = async () => {
            try {
                const { data: tags, error } = await supabase.from('tags').select('id, name');
                if (error) throw error;
                data.value = tags;
                dataLoaded.value = true;
                // проверка
                // console.log(data.value)
            }
            catch (error) {
                console.warn(error.message)
            }
        }

        getTags();

        // posts
        async function getPosts() {
        const { data } = await supabase.from('posts').select('id, title, description, img')
        dataLoaded.value = true;
        posts.value = data;
        store.posts = data;
        // console.log(store.posts)
        }

        getPosts();

        return {
            data, posts, dataLoaded
        }
    }
}

</script>