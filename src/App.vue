<template>
    <v-app id="app">
        <v-img
                class="fill-height"
                :src="(usertype && (usertype !== '')) ? imageMain : image"
                height="100vh"
                style="position: fixed !important; left: 0; top: 0;"
                width="100%">
        </v-img>

        <NavBar :items="items" :drawer="drawer"/>

        <Login/>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
        <Footer/>
    </v-app>
</template>

<script>


import Footer from "./component/common/Footer";
import NavBar from "./component/common/NavBar";
import Login from "./component/common/Login";
import {mapGetters} from "vuex";

export default {
    name: 'app',
    components: {
        Footer,
        NavBar,
        Login,
    },

    data() {
        return {
            image: require('./assets/background_white_2.jpg'),
            imageMain: require('./assets/background_main.jpg'),

            drawer: true,

            items: [
                {title: 'Расписание', icon: 'mdi-clock-outline', link: '/c_schedule', role: 'c'},
                {title: 'Волонтеры', icon: 'mdi-card-account-details-star-outline', link: '/c_volunteers', role: 'c'},
                {title: 'Партнеры', icon: 'mdi-bank-outline', link: '/c_partners', role: 'c'},
                {title: 'Статистика', icon: 'mdi-chart-box-outline', link: '/stats', role: 'c'},

                {title: 'Активные заказы', icon: 'mdi-order-bool-descending', link: '/v_active', role: 'v'},
                {title: 'Расписание', icon: 'mdi-clock-outline', link: '/v_schedule', role: 'v'},
                {title: 'Подопечные', icon: 'mdi-account-heart-outline', link: '/v_wards', role: 'v'},

            ],
        }
    },

    methods: {},

    computed: {
        ...mapGetters(['username', 'usertype']),
    },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html {
    overflow-y: auto !important;
}

#app {
    font-family: 'Montserrat', sans-serif !important;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #4B544D !important;
}
</style>
