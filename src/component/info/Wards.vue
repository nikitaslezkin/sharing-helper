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
    name: "Wards",

    components: { YaMap, MapTable },

    data: () => ({

        page: 1,

        headers: [
            {text: "№", value: 'id'},
            {text: "ФИО", value: 'fio'},
            {text: "Адрес", value: 'address'},
        ],

        items:[
            {
                id: 1,
                fio: 'Петров А.В',
                address: 'ул. Донская, 27 корпус 1, кв. 5',
                coords: "55.721071,37.606336",
                name: "emp", time: "emp"
            },
            {
                id: 2,
                fio: 'Соколова К.А',
                address: 'ул. Донская, 8, кв. 17',
                coords: "55.723869,37.607108",
                name: "emp", time: "emp"
            },
            {
                id: 3,
                fio: 'Иванова В.В',
                address: 'Мытная ул., 44, кв. 134',
                coords: "55.721070,37.615823",
                name: "emp", time: "emp"
            },
            {
                id: 4,
                fio: 'Смирнов А.М',
                address: 'ул. Донская, 43 строение 13, кв. 80',
                coords: "55.716740,37.606677",
                name: "emp", time: "emp"
            },
            {
                id: 5,
                fio: 'Чистякова Н.Л',
                address: 'Ленинский пр-т., 15А, кв. 34',
                coords: "55.720967,37.600739",
                name: "emp", time: "emp"
            },
            {
                id: 6,
                fio: 'Соловьев М.М',
                address: 'ул. Шаболовка, 26 строение 14, кв. 102',
                coords: "55.719914,37.608793",
                name: "emp", time: "emp"
            },
        ]
    }),
}
</script>

<style scoped>

.blur{
    color: transparent;
    text-shadow: rgba(0, 0, 0, 0.95) 0px 0px 10px;
}
</style>
