<template>
    <router-link class="post" :to="{ name: 'Post', params: { id } }">
        <div>
        <img 
        :src="img" 
        style="margin: 15px 0px; max-width: 75%; max-height: 75%;">
        <p>{{ title }}</p>
        <p>{{ description }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
name: 'PostCard',
components: {},
props: {
    id: Number,
    title: String,
    description: String,
    img: URL
}
}
</script>


<!-- <div v-if="dataLoaded" class="posts">
    No Data 
    <section class="post_none" v-if="data.length === 0">
        <h1>Публикаций еще нет...</h1>
        <router-link :to="'/create'"><button>СОЗДАТЬ ПОСТ</button></router-link>
    </section>
     Data 
    <div v-else class="posts">
            <router-link class="post" :to="'/post'" v-for="(post, index) in data" :key="index">
                <div class="one_post">
                    <img :src="post.img" style="margin: 15px 0px; max-width: 75%; max-height: 75%;">
                <p>
                    {{ post.title }}
                </p>
                <p class='desription'>{{ post.description }}</p>
                </div>
            </router-link>
    </div>
</div> -->