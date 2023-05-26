<template>
<img src="../assets/img/Group 12.png" alt="фото">
    <section class="banner">
        <h1>MyBlog</h1>
        <p>Готовый набор инструментов, позволяющий публиковать и монетизировать ваши заметки, посты, видео, фотографии,
            подкасты и песни.</p>
    </section>
    <section>
        <TextLeftRight 
        v-for="text in texts"
            :title="text.title" 
            :text="text.text" 
            :position="text.position" 
            :id="text.id" />
    </section>
    <section class="join_us" v-if="!user">
        <h1>Присоединяйтесь к миллионам блогеров</h1>
        <p>В MyBlog можно делиться чем угодно, например о дизайне, кулинарии или интересных книгах. Зарегистрируйтесь – и вы
            узнаете, почему огромное число пользователей выбрали этот сервис.</p>
        <router-link to="/register"><button
                style="font-size: 32px;color: white; background-color: #2F80ED; width: 500px; height: 100px;">СОЗДАТЬ
                БЛОГ</button></router-link>
    </section>
</template>
<script>
import TextLeftRight from "../components/TextLeftRight.vue";
import store from "../store/index.js";
import { computed } from "vue";

export default {
    components: {
        TextLeftRight
    },
    data() {
        return {
            texts: [
                { id: 1, position: true, title: 'Дизайн блога', text: 'Ваш блог должен стать отражением вашего стиля. Просто выберите один из настраиваемых шаблонов и понравившееся фоновое изображение или придумайте собственный неповторимый дизайн.' },
                { id: 2, position: false, title: 'Сохраняйте воспоминания', text: 'Не дайте воспоминаниям потускнеть. Вы можете хранить в MyBlog тысячи записей, фотографии и многое другое.' },
            ]
        }
    },
    setup() {
        // Get user from store
        const user = computed(() => store.state.user);

        return { user };
    },
};
</script>