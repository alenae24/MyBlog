<template>
    <swiper 
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange">       
        <swiper-slide 
          v-for="(post, id) in data"
            :key="id"
            v-show="post.img"
            >
            <router-link :to="{ name: 'Post', params: { id } }" >
                <img 
                :src="post.img" 
                style="max-width: 500px; max-height: 500px; border-radius: 15px; text-align: center;">
            </router-link>
        </swiper-slide>
    

    </swiper>
</template>
<script>
import { ref } from 'vue';
import { supabase } from '../supabase/supabase';
  // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        // console.log(swiper);
      };
      const onSlideChange = () => {
        // console.log('slide change');
      };


      const data = ref([]);
        const dataLoaded = ref(null);

        const getData = async () => {
            try {
                const { data: posts, error } = await supabase.from('posts').select('*');
                if (error) throw error;
                data.value = posts;
                dataLoaded.value = true;
                // проверка
                // console.log(data.value)
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
      };
    },
  };
</script>
