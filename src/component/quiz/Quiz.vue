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
                            src="https://www.youtube.com/embed/UqlbxV1SXCo"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>

                    </iframe>
                </v-row>

                <br/>

                <v-row justify="center" class="mt-15" style="margin-top: 10px; margin-bottom: 10px">
                    Прочитайте &nbsp;
                    <a href="https://foodsharing.ru/rules/">правила</a>
                    &nbsp; и убедитесь, что они понятны и подходят вам.
                </v-row>

                <br/>

                <div>
                    <QuizCard :items="[
                        'Да, если у него трудная жизненная ситуация.',
                        'Почему бы и нет.',
                        'Нет, это противоречит правилам фудшеринга.',
                        'Может обменивать полученные продукты на услуги.'
                        ]" :label="'Может ли участник продавать полученные в фудшеринге продукты?'"/>
                    <QuizCard :items="[
                        'Опоздания неудобны сотрудникам организаций и задерживают других членов команды. Поэтому за опоздание фудсейверу выносится предупреждение.',
                        'Если он записан не один, то опоздание в пределах 15 минут не является критичным.',
                        'Можно приезжать в любое время, когда магазин или кафе открыты.'
                        ]" :label="'Может ли участник прибыть на вывоз позже назначенного времени?'"/>
                    <QuizCard :items="[
                        'Сложу их и возьму с собой, чтобы выбросить в ближайший мусорный бак.',
                        'Оставлю коробки у входа в магазин.',
                        'Моя задача – спасение еды, мусором занимаются другие организации. Оставлю все на месте.'
                        ]" :label="'Во время одного из вывозов вам вынесли продукты в больших картонных коробках. Вместе с другими участниками вы разложили еду по сумкам. Как вы поступите с коробками?'"/>
                    <QuizCard :items="[
                        'Нужно встретиться до вывоза неподалеку от магазина и заходить внутрь слаженной командой. Нужно быть приветливыми, здороваться с сотрудниками, не ссориться из-за еды, не шуметь и не задерживать сотрудников.',
                        'Спасенные продукты нельзя делить и распределять на глазах у покупателей.',
                        'При вывозе каждый должен взять ровно столько продуктов, сколько ему нужно, а остальное оставить на месте.',
                        'Если кто-то из участников опаздывает и не выходит на связь, нужно дождаться его, прежде чем заходить'
                        ]" :label="'Что нужно учитывать, забирая продукты из магазина? Отметьте верные пункты.'"/>
                    <QuizCard :items="[
                        'Я пытаюсь понять, о каком магазине шла речь в рассылке, чтобы пойти туда и узнать, каким образом они сотрудничают с фудшерингом и по каким дням отдают фудсейверам продукты.',
                        'Я пишу организаторам личное сообщение, чтобы узнать о вывозах.',
                        'Я пытаюсь выяснить, кто ещё из участников фудшеринга записан в команду этого магазина, чтобы узнать у них, происходят ли вывозы в настоящий момент.'
                        ]" :label="'Вы получили приглашение в команду магазина недалеко от вашего дома и откликнулись на него в соответствии с инструкцией в рассылке. Прошло несколько дней, а вам никто не сообщил, как записаться на вывоз. Каковы ваши действия?'"/>

                </div>

                <br/>

                <v-row style="margin-top: 10px; margin-bottom: 60px">
                    <v-spacer></v-spacer>
                    <v-btn
                            color="#B5D66B"
                            dark
                            @click="showDialog"
                    >
                        Отправить тест
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>


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
            this.$router.push({path: '/v_active'});
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
