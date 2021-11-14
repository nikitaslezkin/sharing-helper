<script>

import { Doughnut, mixins } from "vue-chartjs";
import {mapGetters, mapMutations} from "vuex";

export default {
    extends: Doughnut,
    props: ["days", "case"],
    mounted() {
        console.log(this.days);


        this.case1 = {
            label: "Data One",
                backgroundColor: ["#724c32", "#b4d66b", "#FE4C00", "#91cfd5"],
                data: [(Math.floor(Math.random() * 5)+10)*this.days,
                    (Math.floor(Math.random() * 5)+8)*this.days,
                    (Math.floor(Math.random() * 5)+5)*this.days,
                    (Math.floor(Math.random() * 5)+7)*this.days]
        }

        this.case2 = {
            label: "Data One",
                backgroundColor: ["#724c32", "#b4d66b", "#FE4C00", "#91cfd5",
                "#faa90b"],
                data: [(Math.floor(Math.random() * 5)+10)*this.days,
                    (Math.floor(Math.random() * 5)+4)*this.days,
                    (Math.floor(Math.random() * 5)+14)*this.days,
                    (Math.floor(Math.random() * 5)+5)*this.days,
                    (Math.floor(Math.random() * 5)+8)*this.days]
        }
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart({
            hoverBackgroundColor: "red",
            hoverBorderWidth: 10,
            labels: (this.case === 1 ? this.labels1 : this.labels2),
            datasets: [
                (this.case === 1 ? this.case1 : this.case2),
            ]
        }, {
            borderWidth: "10px",
            hoverBackgroundColor: "red",
            hoverBorderWidth: "10px"
        });
    },

    data: () => ({
        labels1: ["хлеб", "фрукты", "мясо", "молочные продукты"],

        case1: {
            label: "Data One",
            backgroundColor: ["#724c32", "#b4d66b", "#FE4C00", "#91cfd5"],
            data: [Math.floor(Math.random() * 5), 8, 5, 7]
        },

        labels2: ["супермаркет", "магазин \"У дома\"", "пекарни", "кафе/рестораны", "столовые"],

        case2: {
            label: "Data One",
            backgroundColor: ["#724c32", "#b4d66b", "#FE4C00", "#91cfd5",
                "#faa90b"],
            data: [10, 4, 14, 5, 8]
        },
    }),

    computed: {
        ...mapGetters(['lol']),


    },

    watch: {
        lol: function () {
            console.log(this.lol)
            this.case1 =  {
                label: "Data One",
                    backgroundColor: ["#724c32", "#b4d66b", "#FE4C00", "#91cfd5"],
                    data: [this.lol, 8, 5, 7]
            }
        }
    },

    methods: {
        ...mapMutations(['setLol']),
    }
};

</script>

<style>
</style>



