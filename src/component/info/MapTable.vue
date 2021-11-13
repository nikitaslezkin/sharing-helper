<template>
    <div>
        <v-data-table
                :items="items"
                :headers="headers"
                hide-default-footer
        >
            <template v-slot:body.prepend>
                <tr>
                    <td colspan="3">
                        <v-spacer></v-spacer>
                        <v-btn
                                width="100%"
                                outlined
                                color="#B5D66B">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </td>
                </tr>
            </template>
        </v-data-table>

        <div class="text-center mt-10 mb-4">
            <v-pagination
                    v-model="page"
                    :length="2"
                    color="black"
            ></v-pagination>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
    name: "MapTable",

    props: {
        items: Array,
        headers: Array,
    },

    data: () => ({

        page: 1,

    }),

}
</script>

<style scoped>

.blur {
    color: transparent;
    text-shadow: rgba(0, 0, 0, 0.95) 0px 0px 10px;
}
</style>
