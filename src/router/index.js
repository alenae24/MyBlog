import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import News from '../views/News.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Account from '../views/Account.vue';
import Create from '../views/CreatePost.vue';
import Post from '../views/Post.vue'
import UpdateAccount from '../views/UpdateAccount.vue'
import Design from '../views/Design.vue'

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    routes: [
        {
            path: '/', name: 'Home', component:Home
        },
        {
          path: '/news', name: 'News', component:News
      },
      {
        path: '/login', name: 'Login', component:Login
    },
    {
        path: '/register', name: 'Register', component:Register
    },
    {
        path: '/account', name: 'Account', component:Account
    },
    {
        path: '/create', name: 'Create', component:Create
    },
    {
        path: '/post/:id', name: 'Post', component:Post
    },
    {
        path: '/update', name: 'Update', component:UpdateAccount
    },
    {
        path: '/design', name: 'Design', component: Design
    },
    ]
})

export default router;