<template>
    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
            <v-tabs fixed-tabs color="black" slider-color="grey">
                <v-tab>Карта</v-tab>
                <v-tab>Таблица</v-tab>

                <v-tab-item>
                    <br/>
                    <YaMap :items="items"/>
                </v-tab-item>

                <v-tab-item>
                    <br/>
                    <MapTable :items="items" :headers="headers"/>
                </v-tab-item>
            </v-tabs>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";
import YaMap from "@/component/common/YaMap";
import MapTable from "@/component/info/MapTable";

export default {
    name: "Partners",

    components: {YaMap, MapTable},

    data: () => ({

        page: 1,

        headers: [
            {text: "№", value: 'id'},
            {text: "Название магазина", value: 'name'},
            {text: "Адрес", value: 'address'},
            {text: "Время выдачи", value: 'time'},
        ],

        items: [
            {
                id: "1",
                name: "ООО \"Пятерочка\"",
                address: 'ул. Шаболовка, 19',
                time: '21:00-23:00',
                coords: "55.723595,37.611370",
                fio: "emp"
            },
            {
                id: "2",
                name: "АО \"Дикси\"",
                address: 'ул. Шаболовка, 37 строение 5',
                time: '22:00-23:00',
                coords: "55.717751,37.610292",
                fio: "emp"
            },
            {
                id: "3",
                name: "ООО \"Лента\"",
                address: 'Ленинский пр-т., 30',
                time: '22:00-00:00',
                coords: "55.720216,37.599956",
                fio: "emp"
            },
            {
                id: "4",
                name: "АО \"Перекресток\"",
                address: 'Мытная ул., 46-2',
                time: '23:00-00:00',
                coords: "55.720343,37.616702",
                fio: "emp"
            },
        ]
    }),
}
</script>

<style scoped>

.blur {
    color: transparent;
    text-shadow: rgba(0, 0, 0, 0.95) 0px 0px 10px;
}
</style>
