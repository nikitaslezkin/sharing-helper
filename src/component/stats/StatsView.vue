<template>
    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
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
                            @click="saveFile">
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

        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>

import PieChart from "@/component/charts/PieChart";
import {mapGetters, mapMutations} from "vuex";

export default {
    name: "StatsView",
    components: {
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

        getB: function () {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(this.dates[0]);
            const secondDate = new Date(this.dates[1]);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
            this.setLol(diffDays + 1)
            return diffDays + 1
        },

        forceRerender() {
            // Сначала скроем компонент
            this.renderComponent = false;

            this.$nextTick(() => {
                // А потом покажем снова
                this.renderComponent = true;
            });
        },

        saveFile() {
            const data = JSON.stringify(this.arr)
            const blob = new Blob([data], {type: 'text/plain'})
            const e = document.createEvent('MouseEvents'),
                a = document.createElement('a');
            a.download = "Статистка_" + this.dates[0] + "_" + this.dates[1] + ".xlsx";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    }
}
</script>

<style scoped>

</style>
