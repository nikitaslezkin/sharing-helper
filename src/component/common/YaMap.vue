<template>
    <div class="hello">
        <yandex-map
                zoom="15"
                style="width: 100%; max-width: 100%; height: 70vh;"
                :coords="coords"
        >
            <ymap-marker
                    v-for="(billboard, index) in items"
                    marker-type="placemark"
                    :balloon-template="mapBalloon(billboard, index)"
                    :coords="billboard.coords.split(',')"
                    :marker-id="index"
                    :icon="{ content: billboard.id }"
                    :key="index"
            ></ymap-marker>
        </yandex-map>
    </div>
</template>

<script>
import {yandexMap, ymapMarker} from "vue-yandex-maps";

export default {

    name: "YaMap",

    components: {yandexMap, ymapMarker},

    props: {
        items: Array,
    },

    data() {
        return {
            coords: [55.719868, 37.607390],
            options: {
                layout: "default#image",
                imageSize: [20, 30],
                contentOffset: [0, 0],
            },
            selectedSurfaces: this.$selectedSurfaces,
            layout:
                "<div>{{ properties.balloonContentHeader }}</div><div>{{ properties.balloonContentBody }}</div><div>{{ properties.balloonContentFooter }}</div>",

        };
    },
    mounted() {
        console.log(this.$selectedSurfaces[0]);
    },
    watch: {
        selectedSurfaces() {
            this.makeSurfaceSelected(
                this.selectedSurfaces[this.selectedSurfaces.length - 1].SURFACEID
            );
        }
    },
    methods: {
        selectedBillboard(billboard) {
            let data = {
                SURFACEID: billboard.surface_id,
                NETWORKID: billboard.networkid
            };
            return data;
        },

        makeSurfaceSelected: function (surface_id) {
            this.items.forEach(surface => {
                if (surface.surface_id === surface_id) {
                    surface.selected = true;
                }
            });
        },

        mapBalloon: function (billboard, index) {
            return `
      <div><h1>${billboard.id}</h1></br>
      <p style="display: ${billboard.name === 'emp' ? 'none' : ''}"><strong>Магазин</strong>: ${billboard.name}</p>
      <p style="display: ${billboard.fio === 'emp' ? 'none' : ''}"><strong>Имя</strong>: ${billboard.fio}</p>
      <p style="display: ${billboard.address === 'emp' ? 'none' : ''}"><strong>Адрес</strong>: ${billboard.address}</p>
      <p style="display: ${billboard.time === 'emp' ? 'none' : ''}"><strong>Время выдачи</strong>: ${billboard.time}</p>
      </div>
      `;
        }
    }
};
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0;
}

a {
    color: #42b983;
}
</style>
