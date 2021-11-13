<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    lg="12"
                    md="7"
                    sm="12"
            >
                <!--                <BarChart style="height: 300px; width: 300px; position:relative;"/>-->

                <v-row class="justify-center align-center pt-15">
                    <iframe
                            width="800"
                            height="450"
                            src="https://www.youtube.com/embed/PGA76HzbPHA"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>

                    </iframe>
                </v-row>

                <br/>

                <v-row justify="center" class="mt-15" style="margin-top: 10px; margin-bottom: 10px">
                    Материалы для обучения доступны по 	&nbsp;
                    <a href="https://digital.gov.ru/uploaded/files/12-mansurov-tsifrovoyproryv25042.pdf">ссылке</a>
                </v-row>

                <br/>

                <div>
                    <QuizCard :items="['Вариант1','Вариант2', 'еще варимнт']" :label="'Вопрооооос 1:'"/>
                    <QuizCard :items="['Вариант1','Вариант2', 'еще варимнт', 'четвертый даже вариант']" :label="'Вопрооооос 2:'"/>
                    <QuizCard :items="['Вариант1','Вариант2', 'еще варимнт', 'четвертый даже вариант', 'ок, еще и 5й']" :label="'Вопрооооос 3:'"/>
                </div>

                <br/>

                <v-btn
                        color="red lighten-2"
                        dark
                        @click="showDialog"
                >
                    Отправить тест
                </v-btn>


                        <v-dialog
                                v-model="dialog"
                                width="500"
                        >
                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    Изменения успешно загружены
                                </v-card-title>

                                <v-card-text>
                                    Ваши баллы: 9/10.
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            text
                                            @click="sendtest"
                                    >
                                        Продолжить
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>


import {mapActions, mapGetters, mapMutations} from "vuex";
import BarChart from "@/component/charts/BarChart";
import QuizCard from "@/component/quiz/QuizCard";

export default {
    name: "Quiz",

    data: () => ({
        inn: null,
        dialog: false,
    }),

    components : {
        QuizCard,
    },

    computed: {
        ...mapGetters(['islearn']),
    },

    methods: {

        ...mapActions(['resetSteps', 'login']),
        ...mapMutations(['setStep', 'setFinish', 'setIslearn']),

        showDialog() {
            this.dialog = true;

        },

        sendtest() {
            this.dialog = false;
            this.setIslearn(false);
            this.$router.push({path: '/'});
        }
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
