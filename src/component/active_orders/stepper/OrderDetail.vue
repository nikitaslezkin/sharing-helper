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
                            Информация
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
                            Позиции (партнер)
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            color="success"
                            :complete="order.step > 4"
                            step="4">
                        <label>
                            Документы
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            color="success"
                            :complete="order.step > 5"
                            step="5">
                        <label>
                            Позиции
                        </label>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="6" color="success">
                        <label>
                            Завершение
                        </label>
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-row class="next-step-row flex justify-end">
                            <v-card-text>
                                <p align="center">Информация о партнере</p>
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

                                <br/>

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
                                        @click="order.step = 2">
                                    Далее
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-row class="next-step-row flex justify-end">
                            <v-col class="form fixed">
                                <v-card-text>
                                    <div class="file-input-container">
                                        <v-col>
                                            <v-row style="margin-top: 10px;">
                                                <v-spacer></v-spacer>
                                                <v-img :src="require('../../../assets/upload-file.png')"
                                                       max-width="75px" max-height="100px">
                                                </v-img>
                                                <v-spacer></v-spacer>
                                            </v-row>
                                            <br>
                                            <v-row justify="center" align="center"
                                                   style="width: 100%; margin-top: 10px; margin-bottom: 10px">
                                                <p class="ml-2">
                                                    <a class="file-container">
                                                        Загрузите акт с компьютера
                                                        <input type="file"
                                                               multiple
                                                               @change="addFiles"
                                                        >
                                                    </a>
                                                </p>
                                            </v-row>
                                            <br>
                                            <v-row justify="center" align="center" style="width: 100%">
                                                <p v-if="files.length > 0">
                                                    Файлов: {{ files.length }} (всего {{ filesSize }} MB)
                                                </p>
                                                <p v-if="files.length > 0">
                                                    &nbsp;<v-icon color="success">mdi-check</v-icon>
                                                </p>
                                            </v-row>
                                        </v-col>
                                    </div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                        <v-row class="next-step-row flex justify-end">
                            <v-card-actions>
                                <v-btn
                                        :disabled="!(files.length > 0)"
                                        class="mt-3"
                                        color="success"
                                        @click="order.step = 3">
                                    Далее
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-row class="next-step-row flex justify-end">
                            <v-card-text>
                                <v-data-table
                                        :items="items"
                                        :headers="headers"
                                        caption="Список позиций, полученных от партнера"
                                        hide-default-footer
                                >
                                    <template v-slot:body.append>
                                        <tr>
                                            <td colspan="3">
                                                <v-spacer></v-spacer>
                                                <v-dialog
                                                        v-model="dialog"
                                                        max-width="500px"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                                width="100%"
                                                                outlined
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                color="#B5D66B">
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-card>
                                                        <v-card-title>
                                                            <span class="text-h5">Добавить позицию</span>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-col>
                                                                        <v-text-field
                                                                                v-model="editedItem.name"
                                                                                label="Название"
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                    <v-col>
                                                                        <v-text-field
                                                                                v-model="editedItem.count"
                                                                                label="Количество"
                                                                        ></v-text-field>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                    color="blue darken-1"
                                                                    text
                                                                    @click="close"
                                                            >
                                                                Закрыть
                                                            </v-btn>
                                                            <v-btn
                                                                    color="blue darken-1"
                                                                    text
                                                                    @click="addItem"
                                                            >
                                                                Добавить
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-spacer></v-spacer>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        class="mt-3"
                                        color="success"
                                        @click="order.step = 4">
                                    Понятно
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-tabs fixed-tabs color="black" slider-color="grey">
                            <v-tab>Соколова К.А</v-tab>
                            <v-tab>Иванова В.В</v-tab>

                            <v-tab-item>
                                <br/>
                                <v-row class="next-step-row flex justify-end">
                                    <v-col class="form fixed">
                                        <v-card-text>
                                            <div class="file-input-container">
                                                <v-col>
                                                    <v-row style="margin-top: 10px;">
                                                        <v-spacer></v-spacer>
                                                        <v-img :src="require('../../../assets/upload-file.png')"
                                                               max-width="75px" max-height="100px">
                                                        </v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <br>
                                                    <v-row justify="center" align="center"
                                                           style="width: 100%; margin-top: 10px; margin-bottom: 10px">
                                                        <p class="ml-2">
                                                            <a class="file-container">
                                                                Загрузите акт с компьютера
                                                                <input type="file"
                                                                       multiple
                                                                       @change="addFilesFirstWard"
                                                                >
                                                            </a>
                                                        </p>
                                                    </v-row>
                                                    <br>
                                                    <v-row justify="center" align="center" style="width: 100%">
                                                        <p v-if="filesFirstWard.length > 0">
                                                            Файлов: {{ filesFirstWard.length }} (всего
                                                            {{ filesSizeFirstWard }} MB)
                                                        </p>
                                                        <p v-if="filesFirstWard.length > 0">
                                                            &nbsp;<v-icon color="success">mdi-check</v-icon>
                                                        </p>
                                                    </v-row>
                                                </v-col>
                                            </div>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-tab-item>

                            <v-tab-item>
                                <br/>
                                <v-row class="next-step-row flex justify-end">
                                    <v-col class="form fixed">
                                        <v-card-text>
                                            <div class="file-input-container">
                                                <v-col>
                                                    <v-row style="margin-top: 10px;">
                                                        <v-spacer></v-spacer>
                                                        <v-img :src="require('../../../assets/upload-file.png')"
                                                               max-width="75px" max-height="100px">
                                                        </v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <br>
                                                    <v-row justify="center" align="center"
                                                           style="width: 100%; margin-top: 10px; margin-bottom: 10px">
                                                        <p class="ml-2">
                                                            <a class="file-container">
                                                                Загрузите акт с компьютера
                                                                <input type="file"
                                                                       multiple
                                                                       @change="addFilesSecondWard"
                                                                >
                                                            </a>
                                                        </p>
                                                    </v-row>
                                                    <br>
                                                    <v-row justify="center" align="center" style="width: 100%">
                                                        <p v-if="filesSecondWard.length > 0">
                                                            Файлов: {{ filesSecondWard.length }} (всего
                                                            {{ filesSizeSecondWard }} MB)
                                                        </p>
                                                        <p v-if="filesSecondWard.length > 0">
                                                            &nbsp;<v-icon color="success">mdi-check</v-icon>
                                                        </p>
                                                    </v-row>
                                                </v-col>
                                            </div>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs>
                        <v-row class="next-step-row flex justify-end">
                            <v-card-actions>
                                <v-btn
                                        :disabled="!(filesFirstWard.length > 0 || filesSecondWard.length > 0)"
                                        class="mt-3"
                                        color="success"
                                        @click="order.step = 5">
                                    Далее
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="5">
                        <v-tabs fixed-tabs color="black" slider-color="grey">
                            <v-tab>Соколова К.А</v-tab>
                            <v-tab>Иванова В.В</v-tab>

                            <v-tab-item>
                                <br/>
                                <v-row class="next-step-row flex justify-end">
                                    <v-card-text>
                                        <v-data-table
                                                :items="itemsFirstWard"
                                                :headers="headers"
                                                caption="Список позиций, отданных подопечному"
                                                hide-default-footer
                                        >
                                            <template v-slot:body.append>
                                                <tr>
                                                    <td colspan="3">
                                                        <v-spacer></v-spacer>
                                                        <v-dialog
                                                                v-model="dialogFirstWard"
                                                                max-width="500px"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn
                                                                        width="100%"
                                                                        outlined
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        color="#B5D66B">
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <v-card-title>
                                                                    <span class="text-h5">Добавить позицию</span>
                                                                </v-card-title>

                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col>
                                                                                <v-text-field
                                                                                        v-model="editedItem.name"
                                                                                        label="Название"
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col>
                                                                                <v-text-field
                                                                                        v-model="editedItem.count"
                                                                                        label="Количество"
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card-text>

                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn
                                                                            color="blue darken-1"
                                                                            text
                                                                            @click="close"
                                                                    >
                                                                        Закрыть
                                                                    </v-btn>
                                                                    <v-btn
                                                                            color="blue darken-1"
                                                                            text
                                                                            @click="addItemFirstWard"
                                                                    >
                                                                        Добавить
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                        <v-spacer></v-spacer>
                                                    </td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-row>
                            </v-tab-item>

                            <v-tab-item>
                                <br/>
                                <v-row class="next-step-row flex justify-end">
                                    <v-card-text>
                                        <v-data-table
                                                :items="itemsSecondWard"
                                                :headers="headers"
                                                caption="Список позиций, отданных подопечному"
                                                hide-default-footer
                                        >
                                            <template v-slot:body.append>
                                                <tr>
                                                    <td colspan="3">
                                                        <v-spacer></v-spacer>
                                                        <v-dialog
                                                                v-model="dialogSecondWard"
                                                                max-width="500px"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn
                                                                        width="100%"
                                                                        outlined
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        color="#B5D66B">
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <v-card-title>
                                                                    <span class="text-h5">Добавить позицию</span>
                                                                </v-card-title>

                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col>
                                                                                <v-text-field
                                                                                        v-model="editedItem.name"
                                                                                        label="Название"
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                            <v-col>
                                                                                <v-text-field
                                                                                        v-model="editedItem.count"
                                                                                        label="Количество"
                                                                                ></v-text-field>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card-text>

                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn
                                                                            color="blue darken-1"
                                                                            text
                                                                            @click="close"
                                                                    >
                                                                        Закрыть
                                                                    </v-btn>
                                                                    <v-btn
                                                                            color="blue darken-1"
                                                                            text
                                                                            @click="addItemSecondWard"
                                                                    >
                                                                        Добавить
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                        <v-spacer></v-spacer>
                                                    </td>
                                                </tr>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-row>
                            </v-tab-item>
                        </v-tabs>
                        <v-row class="next-step-row flex justify-end">
                            <v-card-actions>
                                <v-btn
                                        class="mt-3"
                                        color="success"
                                        @click="order.step = 6">
                                    Далее
                                </v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-stepper-content>

                    <v-stepper-content step="6">
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

        files: [],
        filesFirstWard: [],
        filesSecondWard: [],

        headers: [
            {text: "Наименование позиции", value: 'name'},
            {text: "Количество", value: 'count'},
        ],

        items: [],
        itemsFirstWard: [],
        itemsSecondWard: [],
        editedItem: {},
        dialog: false,
        dialogFirstWard: false,
        dialogSecondWard: false,
    }),

    computed: {
        ...mapGetters(['order']),

        filesSize() {
            if (this.files.length > 0) {
                let size = 0;

                this.files.forEach(file => {
                    size += file.size;
                })

                return parseFloat(size / 1024 / 1024).toFixed(2);
            } else {
                return 0;
            }
        },

        filesSizeFirstWard() {
            if (this.filesFirstWard.length > 0) {
                let size = 0;

                this.filesFirstWard.forEach(file => {
                    size += file.size;
                })

                return parseFloat(size / 1024 / 1024).toFixed(2);
            } else {
                return 0;
            }
        },

        filesSizeSecondWard() {
            if (this.filesSecondWard.length > 0) {
                let size = 0;

                this.filesSecondWard.forEach(file => {
                    size += file.size;
                })

                return parseFloat(size / 1024 / 1024).toFixed(2);
            } else {
                return 0;
            }
        }
    },

    methods: {

        ...mapMutations(['setOrder']),

        addItem() {
            this.items.push(this.editedItem);
            this.dialog = false;
            this.editedItem = {};
        },

        addItemFirstWard() {
            this.itemsFirstWard.push(this.editedItem);
            this.dialogFirstWard = false;
            this.editedItem = {};
        },

        addItemSecondWard() {
            this.itemsSecondWard.push(this.editedItem);
            this.dialogSecondWard = false;
            this.editedItem = {};
        },

        addFiles(e) {
            let files = e.target.files;
            if (files.length >= 1) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    this.files.push(file);
                }
            }
        },

        addFilesFirstWard(e) {
            let files = e.target.files;
            if (files.length >= 1) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    this.filesFirstWard.push(file);
                }
            }
        },

        addFilesSecondWard(e) {
            let files = e.target.files;
            if (files.length >= 1) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    this.filesSecondWard.push(file);
                }
            }
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

.file-input-container {
    width: 100%;
    min-width: 100%;
}

.file-input-container:hover {
    border-radius: 10px;
    background-color: rgba(232, 232, 232, 0.35);
}

a.file-container {
    overflow: hidden;
    cursor: pointer;
}

a.file-container > input[type=file] {
    cursor: inherit;
    filter: alpha(opacity=0);
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    text-align: right;
    width: 100%;
    height: 100%;
}

</style>