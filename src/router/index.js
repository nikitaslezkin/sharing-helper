import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [

    {
        path: '/',
        name: 'MainView',
        component: () => import('../component/main/MainView.vue'),
    },

    {
        path: '/order-detail/:id',
        name: 'OrderDetail',
        component: () => import('../component/active_orders/stepper/OrderDetail.vue'),
    },

    {
        path: '/stats',
        name: 'Stats',
        component: () => import('../component/stats/StatsView.vue'),
    },

    {
        path: '/c_schedule',
        name: 'CSchedule',
        component: () => import('../component/schedule/Schedule.vue'),
    },

    {
        path: '/v_schedule',
        name: 'VSchedule',
        component: () => import('../component/schedule/Schedule.vue'),
    },

    {
        path: '/c_volunteers',
        name: 'Volunteers',
        component: () => import('../component/info/Volunteers.vue'),
    },

    {
        path: '/v_wards',
        name: 'Wards',
        component: () => import('../component/info/Wards.vue'),
    },

    {
        path: '/v_active',
        name: 'ActiveOrders',
        component: () => import('../component/active_orders/ActiveOrders.vue'),
    },

    {
        path: '/c_partners',
        name: 'Partners',
        component: () => import('../component/info/Partners.vue'),
    },

    {
        path: '/quiz',
        name: 'Quiz',
        component: () => import('../component/quiz/Quiz.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


export default router;
