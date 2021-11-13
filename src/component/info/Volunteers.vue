<template>

    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
            <v-data-table
                    :items="items"
                    :headers="headers"
                    hide-default-footer
            >
                <template v-slot:item.buttons="{item}">
                    <v-btn
                            v-if="item.status2==='-'"
                            icon
                            color="success"
                            @click="processAction(item)">
                        <v-icon>mdi-bookmark-check</v-icon>
                    </v-btn>
                    <v-btn
                            v-if="item.status2==='+'"
                            icon
                            color="red"
                            @click="processAction(item)">
                        <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                </template>

                <template v-slot:item.status={item}>

                    <v-chip
                            :color="getModeColor(item.status)"
                            text-color="white"
                    >
                        {{ item.status }}
                    </v-chip>
                </template>
            </v-data-table>

            <div class="text-center mt-10 mb-4">
                <v-pagination
                        v-model="page"
                        :length="3"
                        color="black"
                ></v-pagination>
            </div>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
    name: "Volunteers",

    data: () => ({

        page: 1,
        headers: [
            {text: "№", value: 'number'},
            {text: "ФИО", value: 'fio'},
            {text: "Статус", value: 'status'},
            {text: "Количество активных заказов", value: 'active'},
            {text: "Действия", value: 'buttons'},
        ],

        items: [
            {
                number: 1,
                id: '0x1bbe067bb0fc732188f5bc487a195a3b7d94e743fb0011834a73a38d662f581f',
                fio: 'Петров А.В',
                status: 'Активен',
                status2: '+',
                active: '8'
            },
            {
                number: 2,
                id: '0x1bbe067bb0fc732188f5bc487a195a3b7d94e743fb0011834a73a38d662f581d',
                fio: 'Соколова К.А',
                status: 'Активен',
                status2: '+',
                active: '4'
            },
            {
                number: 3,
                id: '0x1bbe067bb0fc732188f5bc487a195a3b7d94e743fb0011834a73a38d662f582f',
                fio: 'Иванов М.М',
                status: 'Недоступен',
                status2: '+',
                active: '0'
            },
            {
                number: 4,
                id: '0x1bbe067bb0fc732188f5bc487a195a3b7d94e743fb0011834a73a38d662f583f',
                fio: 'Смирнов В.М',
                status: 'На обучении',
                status2: '',
                active: '0'
            },
            {
                number: 5,
                id: '0x1bbe067bb0fc732188f5bc487a195a3b7d94e743fb0011834a73a38d662f583f',
                fio: 'Захарова А.А',
                status: 'Заблокирован',
                status2: '-',
                active: '0'
            },
        ]
    }),

    methods: {

        getModeColor(mode) {
            switch (mode) {
                case 'Активен':
                    return 'green';
                case 'Заблокирован':
                    return 'red';
                case 'На обучении':
                    return 'grey';
                case 'Недоступен':
                    return 'blue';
            }
        },

        processAction(item) {
            if (item.status === 'Активен') {
                item.status = 'Заблокирован'
            } else if (item.status === 'Заблокирован') {
                item.status = 'Активен'
            }
            if (item.status2 === '+') {
                item.status2 = '-'
            } else if (item.status2 === '-') {
                item.status2 = '+'
            }
        }
    }
}
</script>

<style scoped>

.blur {
    color: transparent;
    text-shadow: rgba(0, 0, 0, 0.95) 0px 0px 10px;
}
</style>
