<template>
    <section class="text">
        <section class="left" v-if="position === true">
            <hr>
            <article style="width: 709px;">
                <h1 class="left h1">{{ title }}</h1>
                <p class="left p">{{ text }}</p>
                <router-link v-if="!user" class='link' to="/register"><button>Подробнее</button></router-link>
                <router-link v-if="user" class='link' to="/design"><button>Подробнее</button></router-link>
            </article>
            <swiper 
            :modules="modules" 
            :slides-per-view="1" 
            :space-between="0" 
            navigation 
            :pagination="{ clickable: true }"
            @swiper="onSwiper" 
            @slideChange="onSlideChange" 
            style="width: 800px;">
                <swiper-slide 
                v-for="(design, id) in data" 
                :key="id">
                    <img :src="design.img" style="width: 800px; border-radius: 15px; text-align: center;">
                </swiper-slide>
            </swiper>
        </section>

        <section class="right" v-else="position === false">
            <img src="../assets/img/DesignBlog1.png" style="width: 880px; border-radius: 15px; text-align: center; margin: 0px 60px;">
            <article style="width: 800px;">
                <h1 class="right h1">{{ title }}</h1>
                <p class="right h1">{{ text }}</p>
                <router-link v-if="!user" class='link' to="/register"><button>Подробнее</button></router-link>
                <router-link v-if="user" class='link' to="/create"><button>Подробнее</button></router-link>
            </article>
            <hr>
        </section>
    </section>
</template>
    
<script>
import { ref } from 'vue';
import { supabase } from '../supabase/supabase';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import store from "../store/index.js";
import { computed } from "vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default {
    name: 'Text',
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        id: Number,
        position: Boolean,
        title: String,
        text: String
    },
    setup() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };


        const user = computed(() => store.state.user);

        const data = ref([]);
        const dataLoaded = ref(null);

        const getData = async () => {
            try {
                const { data: design, error } = await supabase.from('design').select('id, img');
                if (error) throw error;
                data.value = design;
                dataLoaded.value = true;
                // проверка
                console.log(data.value)
            }
            catch (error) {
                console.warn(error.message)
            }
        }

        getData();

        return {
            data,
            dataLoaded,
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],
            user
        };
    },
}
</script>
    
<style scoped>
.left {
    display: flex;
    margin: 100px 96px;
}

.right {
    display: flex;
    margin: 100px 96px;
}
</style>