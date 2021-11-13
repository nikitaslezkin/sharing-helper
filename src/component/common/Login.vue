<template>
    <div>
        <v-row style="margin-top: 10px; margin-right: 10px">
            <v-spacer></v-spacer>
            <div class="login-dialog" v-if="this.isUsernameExist()">
            </div>

            <div v-else>
                <v-card-text>
                    <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-width="200"
                            offset-x
                            right
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar width="80px" height="80px"
                                      v-bind="attrs"
                                      v-on="on">
                                <img
                                        v-if="!isVolunteer"
                                        src="../../assets/volunteer.png"
                                        alt="Волонтер"
                                >
                                <img
                                        v-if="isVolunteer"
                                        src="../../assets/volunteer2.png"
                                        alt="Волонтер"
                                >
                            </v-avatar>
                        </template>

                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title>
                                        <b>{{ this.usertype }}</b>
                                        <div v-if="!isVolunteer">
                                        Иванова И.И.
                                        </div>
                                        <div v-if="isVolunteer">
                                            Петров А.В.
                                        </div>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-card-actions>
                                <v-btn color="#B5D66B"
                                       v-if="isVolunteer && this.islearn"
                                       dark
                                       @click="quizredirect">
                                    <v-icon>mdi-bell-outline</v-icon>
                                    Обучение
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn
                                        color="red"
                                        text
                                        @click="resetUsername"
                                >
                                    Выйти
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-card-text>
            </div>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, max} from 'vee-validate/dist/rules';

export default {

    name: 'Login',

    components: {},

    data: () => ({
        menu: false,
    }),

    methods: {
        ...mapMutations(['setUsername', 'setUsertype', 'setIslearn']),

        quizredirect() {
            this.menu = false;
            this.$router.push({path: '/quiz'});
        },

        resetUsername() {
            this.menu = false;
            this.setUsername("");
            this.setUsertype(null);
            this.$router.push({path: '/'});
        },

        isUsernameExist() {
            return (this.username === null || this.username === "");
        },
    },

    computed: {
        ...mapGetters(['username', 'usertype', 'islearn']),

        isVolunteer() {
            return this.usertype === "Волонтер";
        }
    },
}
</script>

<style>

</style>