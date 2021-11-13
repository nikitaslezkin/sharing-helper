<template>
    <div>
        <ScheduleBody/>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ScheduleBody from "@/component/schedule/component/ScheduleBody";

export default {
    name: "Schedule",

    components: {
        ScheduleBody,
    },

    data: () => ({

    }),

    methods: {

    },

    computed: {
        ...mapGetters(['username', 'usertype']),
    },
}
</script>

<style scoped>

</style>