<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row style="margin-top: 200px">
            <v-col cols="1"></v-col>

            <v-col cols="8">
                <v-row class="justify-start align-start pt-15">
                    <v-row style="width: 100%">
                        <p class="main-title ml-2">Желаете начать</p>
                    </v-row>
                    <v-row style="width: 100%">
                        <p class="main-title ml-2">помогать людям?</p>
                    </v-row>
                    <v-row style="width: 100%">
                        <p class="sub-title ml-2">Присоединяйтесь к движению Фудшеринг</p>
                    </v-row>
                    <v-row style="width: 100%">
                        <p class="sub-title ml-2"></p>
                    </v-row>
                    <v-row style="width: 100%">
                        <v-btn
                                x-large
                                style="width: 20%; margin-left: 10px; color: white  "
                                color="#B5D66B"
                                @click="showDialog">
                            <b>Начать</b>

                            <v-dialog v-model="showLoginDialog" width="550" persistent>
                                <v-card>
                                    <v-card-text>
                                        <v-tabs fixed-tabs color="black" slider-color="grey">
                                            <v-tab>Войти</v-tab>
                                            <v-tab>Зарегистрироваться</v-tab>

                                            <v-tab-item>
                                                <v-card flat>
                                                    <v-card-text>
                                                        <v-select v-model="new_usertype"
                                                                  :items="user_types"
                                                                  outlined
                                                                  label="Тип"
                                                                  color="#B5D66B"
                                                                  required>
                                                        </v-select>

                                                        <validation-observer ref="observer" v-slot="{ invalid }">
                                                            <form @submit.prevent="submit">
                                                                <validation-provider v-slot="{ errors }" name="Логин" rules="required|max:10">
                                                                    <v-text-field v-model="new_username"
                                                                                  :counter="10"
                                                                                  :error-messages="errors"
                                                                                  label="Логин"
                                                                                  color="#B5D66B"
                                                                                  required>
                                                                    </v-text-field>
                                                                </validation-provider>

                                                                <validation-provider v-slot="{ errors }" name="Пароль" rules="required|max:10">
                                                                    <v-text-field v-model="lol"
                                                                                  :counter="10"
                                                                                  :error-messages="errors"
                                                                                  label="Пароль"
                                                                                  type="password"
                                                                                  color="#B5D66B"
                                                                                  required>
                                                                    </v-text-field>
                                                                </validation-provider>
                                                                <v-row style="margin-top: 10px">
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn class="mr-4"
                                                                           color="#B5D66B"
                                                                           style="color: white"
                                                                           x-large
                                                                           @click="updateUserData"
                                                                           type="submit"
                                                                           :disabled="invalid">
                                                                        Войти
                                                                    </v-btn>
                                                                    <v-spacer></v-spacer>
                                                                </v-row>
                                                            </form>
                                                        </validation-observer>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>

                                            <v-tab-item>
                                                <v-card flat>
                                                    <v-card-text>
                                                        <v-select v-model="new_usertype"
                                                                  :items="user_types"
                                                                  outlined
                                                                  label="Тип"
                                                                  color="#B5D66B"
                                                                  required>
                                                        </v-select>

                                                        <validation-observer ref="observer" v-slot="{ invalid }">
                                                            <form @submit.prevent="submit">
                                                                <validation-provider v-slot="{ errors }" name="Логин" rules="required|max:10">
                                                                    <v-text-field v-model="new_username"
                                                                                  :counter="10"
                                                                                  :error-messages="errors"
                                                                                  label="Логин"
                                                                                  color="#B5D66B"
                                                                                  required>
                                                                    </v-text-field>
                                                                </validation-provider>

                                                                <validation-provider v-slot="{ errors }" name="Пароль" rules="required|max:10">
                                                                    <v-text-field v-model="lol"
                                                                                  :counter="10"
                                                                                  :error-messages="errors"
                                                                                  label="Пароль"
                                                                                  type="password"
                                                                                  color="#B5D66B"
                                                                                  required>
                                                                    </v-text-field>
                                                                </validation-provider>
                                                                <v-row style="margin-top: 10px">
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn class="mr-4"
                                                                           color="#B5D66B"
                                                                           style="color: white"
                                                                           x-large
                                                                           @click="updateUserData"
                                                                           type="submit"
                                                                           :disabled="invalid">
                                                                        Зарегистрироваться
                                                                    </v-btn>
                                                                    <v-spacer></v-spacer>
                                                                </v-row>
                                                            </form>
                                                        </validation-observer>
                                                    </v-card-text>
                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs>
                                    </v-card-text>

                                    <v-divider></v-divider>
                                </v-card>
                            </v-dialog>
                        </v-btn>
                    </v-row>
                </v-row>
            </v-col>

            <v-col cols="3"></v-col>
        </v-row>
    </v-container>
</template>

<script>


import {mapActions, mapGetters, mapMutations} from "vuex";
import {extend, ValidationObserver, ValidationProvider} from "vee-validate";
import {max, required} from "vee-validate/dist/rules";

extend('required', {
    ...required,
    message: '{_field_} не может быть пустым',
})

extend('max', {
    ...max,
    message: '{_field_} не может быть больше чем {length} символов',
})

export default {
    name: "MainView",

    components: {
        ValidationProvider,
        ValidationObserver,
    },

    data: () => ({
        new_username: "",
        new_usertype: "Волонтер",
        vol: "Волонтер",
        user_types: [
            {text: "Администратор", disabled: true},
            {text: "Координатор"},
            {text: "Волонтер"},
        ],

        name: '',

        showLoginDialog: false,
    }),

    computed: {
        ...mapGetters(['username', 'usertype', 'islearn']),

        isVolunteer() {
            return this.usertype === "Волонтер";
        }
    },

    methods: {

        ...mapMutations(['setUsername', 'setUsertype', 'setIslearn']),

        showDialog() {
            this.showLoginDialog = true;
        },

        updateUserData() {
            this.setUsername(this.new_username);
            this.setUsertype(this.new_usertype);
            let page = this.usertype === 'Координатор' ? 'CSchedule' : 'ActiveOrders'
            this.$router.push({name: page});
            this.showLoginDialog = false;
        },

        isUsernameExist() {
            return (this.username === null || this.username === "");
        },

        submit () {
            this.$refs.observer.validate()
        },
    }
}
</script>

<style scoped>


.main-title {
    font-size: 90px;
    line-height: 90px;
    font-weight: bold;
}

.sub-title {
    font-size: 30px;
}

</style>
