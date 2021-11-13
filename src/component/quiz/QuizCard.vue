<template>
        <v-row>
            <v-spacer></v-spacer>
            <v-card width="800px" rounded style="margin-top: 10px">
                {{label}}
                <v-container v-model="radioGroup">
                    <v-checkbox
                            v-for="n in items.length"
                            :key="n"
                            :label="items[n - 1]"
                            :value="n"
                    ></v-checkbox>
                </v-container>
            </v-card>
            <v-spacer></v-spacer>
        </v-row>
</template>

<script>


import {mapActions, mapMutations} from "vuex";
import BarChart from "@/component/charts/BarChart";

export default {
    name: "QuizCard",

    props: {
        label: String,
        items: Array,
    },

    data: () => ({
        inn: null,
    }),

    computed: {},

    methods: {

        ...mapActions(['resetSteps', 'login']),
        ...mapMutations(['setStep', 'setFinish']),
    }
}
</script>

<style scoped>


.form {
    background-color: #F4F5F9;
    border-radius: 8px;
}

.btn-get {
    width: 100%;
}

</style>
