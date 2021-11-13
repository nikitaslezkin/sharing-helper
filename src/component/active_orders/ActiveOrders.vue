<template>
    <v-row class="fill-height" style="margin-top: 10px">
        <v-spacer></v-spacer>
        <v-col cols="8">
            <OrderTable/>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import OrderTable from "@/component/active_orders/OrderTable";


export default {
    name: "ActiveOrders",

    components: {OrderTable},

    data: () => ({}),

    computed: {
        ...mapGetters(['username', 'usertype']),
    },

    methods: {

    }
}
</script>

<style scoped>

</style>