<template>
    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
            <v-stepper v-model="order.step">
                <v-stepper-header>
                    <v-stepper-step
                            color="success"
                            :complete="order.step > 1"
                            step="1">
                        <label>
                            Информация о заказе
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            color="success"
                            :complete="order.step > 2"
                            step="2">
                        <label>
                            Документы (партнер)
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            color="success"
                            :complete="order.step > 3"
                            step="3">
                        <label>
                            Документы (подопечные)
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4" color="success">
                        <label>
                            Завершение
                        </label>
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-row class="next-step-row flex justify-end">
                            <v-card-text>
                                <v-text-field
                                        v-model="item.partner"
                                        label="Партнер"
                                        required
                                        color="black"
                                        outlined
                                        dense
                                        readonly
                                ></v-text-field>
                                <v-text-field
                                        v-model="item.address"
                                        label="Адрес"
                                        required
                                        color="black"
                                        outlined
                                        dense
                                        readonly
                                ></v-text-field>
                                <v-text-field
                                        v-model="item.time"
                                        label="Часы работы:"
                                        required
                                        color="black"
                                        outlined
                                        dense
                                        readonly
                                ></v-text-field>

                                <v-data-table
                                        :items="wardsItems"
                                        :headers="wardsHeaders"
                                        caption="Список подопечных"
                                        hide-default-footer
                                >
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        class="mt-3"
                                        color="success"
                                        @click="generateStep2">
                                    Понятно
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="2">

                        <v-row class="next-step-row flex justify-end">
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="generateStep3">
                                Далее
                            </v-btn>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-row class="next-step-row flex justify-end">
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="generateStep4">
                                Далее
                            </v-btn>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-row class="next-step-row flex justify-end">
                            <v-card-text>
                                <p class="main-title" style="text-align: center">
                                    Заказ успешно выполнен!
                                </p>
                                <p class="sub-title" style="text-align: center">
                                    Спасибо за то, что помогаете людям
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        class="mt-3"
                                        color="success"
                                        @click="endOrder">
                                    Завершить заказ
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";


export default {
    name: "OrderDetail",
    components: {},


    data: () => ({
        item: {
            number: 1,
            id: '18c7633b-daef-4cbc-92c5-a5f06a1ef43c',
            date: '14.11.2021г. (21.00-22.00)',
            volunteer: 'Петров А.В',
            partner: "ООО \"Пятерочка\"",
            address: 'ул. Шаболовка, 19',
            time: '21:00-23:00',
            wards: 'Соколова К.А, Иванова В.В',
        },

        wardsHeaders: [
            {text: "№", value: 'id'},
            {text: "ФИО", value: 'fio'},
            {text: "Адрес", value: 'address'},
        ],

        wardsItems: [
            {
                id: 1,
                fio: 'Соколова К.А',
                address: 'ул. Донская, 8, кв. 17',
                coords: "55.723869,37.607108",
                name: "emp", time: "emp"
            },
            {
                id: 2,
                fio: 'Иванова В.В',
                address: 'Мытная ул., 44, кв. 134',
                coords: "55.721070,37.615823",
                name: "emp", time: "emp"
            },
        ],
    }),

    computed: {
        ...mapGetters(['order']),
    },

    methods: {

        ...mapMutations(['setOrder']),

        generateStep2() {
            this.order.step = 2;
        },

        generateStep3() {
            this.order.step = 3;
        },

        generateStep4() {
            this.order.step = 4;
        },

        endOrder() {
            this.order.step = 1;
            this.$router.push({name: 'ActiveOrders'})
        },
    },
}
</script>

<style scoped>

.next-step-row {
    margin-bottom: 10px;
}

.main-title {
    font-size: 50px;
    line-height: 90px;
    font-weight: bold;
}

.sub-title {
    font-size: 25px;
}

</style>
