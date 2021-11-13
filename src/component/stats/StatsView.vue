<template>

    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
<!--            Выберите диапазон-->

            <v-row>
                <v-spacer></v-spacer>
                <v-date-picker
                        v-model="dates"
                        range
                        color="#424942"
                ></v-date-picker>

                <v-col>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <h3>
                        Узнать статистику за период
                    </h3>
                    <!--                    Статистика за {{getBetween(dates)}} дней-->

                    <h3>
                        с {{ dates[0] }} по {{ dates[1] }}
                    </h3>

                    <v-btn
                            class="mt-3"
                            color="#b4d66b"
                            @click="forceRerender">
                        Показать
                    </v-btn>

                    <v-btn
                            class="mt-3"
                            color="#b4d66b"
                            @click="$refs.file.click()">
                        Выгрузить данные
                    </v-btn>


                </v-col>

                <v-spacer></v-spacer>
            </v-row>



            <v-row>
                <v-spacer></v-spacer>
                <PieChart v-if="renderComponent" :days="this.lol" :case="1"/>

                <PieChart v-if="renderComponent" :days="this.lol" :case="2"/>

                <v-spacer></v-spacer>
            </v-row>
            <v-row> &nbsp;</v-row>
            <v-row> &nbsp;</v-row>
            <v-row> &nbsp;</v-row>
            <v-row> &nbsp;</v-row>
        </v-col>

        <v-spacer></v-spacer>
    </v-row>

</template>

<script>



import BarChart from "@/component/charts/BarChart";
import PieChart from "@/component/charts/PieChart";
import RangeCalendar from "@/component/charts/RangeCalendar";
import {mapGetters, mapMutations} from "vuex";
export default {
    name: "StatsView",
    components: {
        BarChart,
        PieChart
    },


    data: () => ({

        page: 1,


        dates: ['2019-09-10', '2019-09-20'],

        computed: {
            dateRangeText() {
                return this.dates.join(' ~ ')
            },
        },

        between: 1,

        renderComponent: true,


    }),

    computed: {
        ...mapGetters(['lol']),


    },

    watch: {
        dates: function () {
            this.setLol(this.getB())

        }
    },


    methods: {
        ...mapMutations(['setLol']),

        getB: function() {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(this.dates[0]);
            const secondDate = new Date(this.dates[1]);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
            this.setLol(diffDays + 1)
            return  diffDays + 1
        },

        forceRerender() {
            // Сначала скроем компонент
            this.renderComponent = false;

            this.$nextTick(() => {
                // А потом покажем снова
                this.renderComponent = true;
            });
        }
    }
}
</script>

<style scoped>

</style>
