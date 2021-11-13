<template>
    <div>
        <v-data-table
                :items="items"
                :headers="headers"
                @click:row="goToDetail"
                hide-default-footer
        >
            <template v-slot:item.buttons="{item}">
                <v-btn
                        icon
                        color="success"
                        @click="goToDetail(item)">
                    <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <div class="text-center mt-10 mb-4">
            <v-pagination
                    v-model="page"
                    :length="5"
                    color="black"
            ></v-pagination>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
    name: "MyRequestsTable",

    data: () => ({

        page: 1,
        headers: [
            {text: "№", value: 'number'},
            {text: "Дата", value: 'date'},
            {text: "Статус", value: 'status'},
            {text: "Исполнитель", value: 'volunteer'},
            {text: "Партнер", value: 'partner'},
            {text: "Подопечные", value: 'wards'},
            {text: "", value: 'buttons'},
        ],

        items: [
            {
                number: 1,
                id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
                date: '14.11.2021г. (21.00-22.00)',
                volunteer: 'Петров А.В',
                status: 'В процессе',
                partner: "ООО \"Пятерочка\"",
                wards: 'Чистякова Н.Л, Соловьев М.М',
            },
            {
                number: 2,
                id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
                date: '15.11.2021г. (21.00-22.00)',
                volunteer: 'Петров А.В',
                status: 'Ожидает',
                partner: "ООО \"Пятерочка\"",
                wards: 'Чистякова Н.Л, Соловьев М.М',
            },
            {
                number: 3,
                id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
                date: '16.11.2021г. (23.00-00.00)',
                volunteer: 'Петров А.В',
                status: 'Ожидает',
                partner: "АО \"Дикси\"",
                wards: 'Соколова К.А, Иванова М.М',
            },
            {
                number: 4,
                id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
                date: '18.11.2021г. (22.00-00.00)',
                volunteer: 'Петров А.В',
                status: 'Ожидает',
                partner: "АО \"Дикси\"",
                wards: 'Соколова К.А, Иванов М.М',
            },
            {
                number: 5,
                id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
                date: '19.11.2021г. (20.00-23.00)',
                volunteer: 'Петров А.В',
                status: 'Ожидает',
                partner: "ООО \"Пятерочка\"",
                wards: 'Чистякова Н.Л, Соловьев М.М',
            },
        ]
    }),


    computed: {},

    methods: {

        ...mapMutations(['setOrder']),

        goToDetail(item) {
            this.$router.push({name: 'OrderDetail', params: {id: item.id}})
        }
    }
}
</script>

<style scoped>

</style>
