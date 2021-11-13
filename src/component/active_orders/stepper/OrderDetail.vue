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
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="generateStep2">
                                Продолжить
                            </v-btn>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="2">

                        <v-row class="next-step-row flex justify-end">
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="generateStep3">
                                Продолжить
                            </v-btn>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-row class="next-step-row flex justify-end">
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="generateStep4">
                                Отправить
                            </v-btn>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-row class="next-step-row flex justify-end">
                            <v-btn
                                    class="mt-3"
                                    color="success"
                                    @click="endOrder">
                                Завершить заказ
                            </v-btn>
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


    data: () => ({}),

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

</style>
