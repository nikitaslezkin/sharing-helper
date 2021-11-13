<template>

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

                    <v-btn>
                        Выгрузить данные
                    </v-btn>

                </v-col>

                <v-spacer></v-spacer>
            </v-row>

</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
    name: "Partners",


    data: () => ({

        page: 1,


        dates: ['2019-09-10', '2019-09-20'],


        computed: {
            dateRangeText() {
                return this.dates.join(' ~ ')
            },
        },

    }),

    methods: {

        getBetween(dates) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(dates[0]);
            const secondDate = new Date(dates[1]);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
            return diffDays
        }
    }
}
</script>



