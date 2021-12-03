//vue-router 는 npm 패키지로 설치함
//npm i vue-router@next
import {createRouter, createWebHistory} from 'vue-router'

//viwes 폴더에 생성한 vue파일들을 연결함
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
//main.js에서 import해줌