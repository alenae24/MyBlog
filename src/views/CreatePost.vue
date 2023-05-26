<template>
    <section class="create_post">
        <div v-if="statusMsg || errorMsg">
            <h1>{{ postName }}</h1>
            <p>{{ postDescription }}</p>
            <p>{{ postImage }}</p>
            <p>{{ errorMsg }}</p>
        </div>
        <div class="create_post">
            <h1>Создать пост</h1>
            <form style="margin: 20px 0px;" @submit.prevent="createPost">
                <div>
                    <label for="title">Название поста</label>
                    <input type="text" required id="title" v-model="postName">
                </div>

                <div>
                    <label for="description">Описание поста</label>
                    <textarea type="text" id="description" v-model="postDescription"></textarea>
                </div>

                <div>
                    <label for="img">Изображение</label>
                    <input type="URL" id="img" v-model="postImage">
                </div>

                <section class="checkbox">
                    <label for="img">Тэг</label>
                    <p v-for="(tag, id) in data" :key="id" value=""><input type="checkbox" :value="tag.id" style="width: 30px; cursor:pointer; border: 2px solid black;">{{ tag.name }}
                    </p>
                </section>

                <button type="submit">
                    Создать пост
                </button>
            </form>
        </div>

    </section>
</template>

<script>
import { ref } from "vue";
import store from "../store/index.js";
import { supabase } from "../supabase/supabase.js";
import { useRouter } from 'vue-router'
export default {
    name: 'create',
    setup() {
        const router = useRouter();
        const postName = ref('');
        const postDescription = ref('');
        const postImage = ref(null);
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const user = store.state.user;

        // const tags = [];
        // const getTags = async () => {
        //     try {
        //         let { data, err, status } = await supabase.from('tags').select('name');

        //         if(status > 300 || status < 200) throw new Error(err);

        //         data.forEach(el => tags.push(el));
        //     } catch (err) {
        //         throw new Error(err.message)
        //     }
        // }

        // getTags();
        const data = ref([]);
        const dataLoaded = ref(null);

        const getTags = async () => {
            try {
                const { data: tags, error } = await supabase.from('tags').select('id, name');
                if (error) throw error;
                data.value = tags;
                dataLoaded.value = true;
                // проверка
                console.log(data.value)
            }
            catch (error) {
                console.warn(error.message)
            }
        }

        getTags();


        const createPost = async () => {
            try {

                let { data, err } = await supabase.auth.getUser();

                if (data) {

                    const userId = user.id;
                    console.log(userId);

                    const { error } = await supabase.from("posts").insert([
                        {
                            user_id: userId,
                            title: postName.value,
                            description: postDescription.value,
                            img: postImage.value,
                        }
                    ]).select('id');
                    
                    if (error) throw error;
                    statusMsg.value = "Post create!";
                    postName.value = null;
                    postDescription.value = null;
                    postImage.value = null;
                    setTimeout(() => {
                        statusMsg.value = false;
                    }, 5000);
                    router.push({ name: 'News' });
                }
            } catch (error) {
                errorMsg.value = `Error: ${error.message}`;
                setTimeout(() => {
                    errorMsg.value = false;
                }, 5000);
            }
        };


        return {
            data, dataLoaded, createPost, postName, postDescription, postImage, statusMsg, errorMsg
        }

    }
}
</script>