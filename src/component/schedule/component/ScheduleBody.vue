<template>
    <div>
        <v-row class="fill-height" style="margin-top: 10px">
            <v-spacer></v-spacer>
            <v-col cols="8">
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn
                                outlined
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                        >
                            Сегодня
                        </v-btn>
                        <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                        >
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="next"
                        >
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                                class="mr-4"
                                outlined
                                color="#B5D66B"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-menu
                                bottom
                                right
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        outlined
                                        color="grey darken-2"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right>
                                        mdi-menu-down
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>День</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Неделя</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Месяц</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = '4day'">
                                    <v-list-item-title>4 дня</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>

                <v-sheet height="650">
                    <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :type="type"
                            :events="events"
                            :event-color="getEventColor"
                            :event-ripple="false"
                            @change="getEvents"
                            @mousedown:event="startDrag"
                            @mousedown:time="startTime"
                            @mousemove:time="mouseMove"
                            @mouseup:time="endDrag"
                            @mouseleave.native="cancelDrag"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @click:date="viewDay"
                    >
                        <template v-slot:event="{ event, timed, eventSummary }">
                            <div
                                    class="v-event-draggable"
                                    v-html="eventSummary()"
                            ></div>
                            <div
                                    v-if="timed"
                                    class="v-event-drag-bottom"
                                    @mousedown.stop="extendBottom(event)"
                            ></div>
                        </template>
                    </v-calendar>
                    <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                            min-width="350px"
                            max-width="500px"
                    >
                        <v-card
                                color="grey lighten-4"
                                min-width="350px"
                                max-width="500px"
                                flat
                        >
                            <v-toolbar
                                    :color="selectedEvent.color"
                                    dark
                            >
                                <v-btn icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="selectedEvent.volunteer"></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-card-text>
                                <p style="text-align: left">
                                    <b>Статус: </b>
                                    <v-chip>
                                        {{ selectedEvent.status }}
                                    </v-chip>
                                </p>
                                <p style="text-align: left">
                                    <b>Партнер:</b> {{ selectedEvent.partner }}
                                </p>
                                <p style="text-align: left">
                                    <b>Адрес:</b> {{ selectedEvent.address }}
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        color="secondary"
                                        @click="selectedOpen = false"
                                >
                                    Закрыть
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "ScheduleBody",

    data: () => ({
        events: [],
        dragEvent: null,
        dragStart: null,
        extendOriginal: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,

        focus: '',
        type: 'week',
        typeToLabel: {
            month: 'Месяц',
            week: 'Неделя',
            day: 'День',
            '4day': '4 дня',
        },
    }),

    mounted() {
        this.$refs.calendar.checkChange();
    },

    methods: {
        viewDay({date}) {
            this.focus = date;
            this.type = 'day';
        },

        setToday() {
            this.focus = '';
        },

        prev() {
            this.$refs.calendar.prev();
        },

        next() {
            this.$refs.calendar.next();
        },

        showEvent({nativeEvent, event}) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },

        startDrag({event, timed}) {
            if (this.usertype !== 'Волонтер') {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            }
        },

        startTime(tms) {
            const mouse = this.toTime(tms)

            if (this.dragEvent && this.dragTime === null) {
                const start = this.dragEvent.start

                this.dragTime = mouse - start
            }
        },

        extendBottom(event) {
            this.extendOriginal = event.end
        },

        mouseMove(tms) {
            const mouse = this.toTime(tms)

            if (this.dragEvent && this.dragTime !== null) {
                const start = this.dragEvent.start
                const end = this.dragEvent.end
                const duration = end - start
                const newStartTime = mouse - this.dragTime
                const newStart = this.roundTime(newStartTime)
                const newEnd = newStart + duration

                this.dragEvent.start = newStart
                this.dragEvent.end = newEnd
            }
        },

        endDrag() {
            this.dragTime = null
            this.dragEvent = null
            this.extendOriginal = null
        },

        cancelDrag() {
            this.dragTime = null
            this.dragEvent = null
        },

        roundTime(time, down = true) {
            const roundTo = 30 // minutes
            const roundDownTime = roundTo * 60 * 1000

            return down
                ? time - time % roundDownTime
                : time + (roundDownTime - (time % roundDownTime))
        },

        toTime(tms) {
            return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
        },

        getEventColor(event) {
            const rgb = parseInt(event.color.substring(1), 16)
            const r = (rgb >> 16) & 0xFF
            const g = (rgb >> 8) & 0xFF
            const b = (rgb >> 0) & 0xFF

            return `rgba(${r}, ${g}, ${b}, 0.7)`;
        },

        getEvents({start, end}) {
            const events = []

            let startDate;

            startDate = new Date(`${start.date}T08:30:00`).getTime();
            events.push({
                name: "Петров А.В",
                volunteer: "Петров А.В",
                partner: "ООО \"Пятерочка\"",
                address: 'ул. Шаболовка, 19',
                status: 'Выдает',
                color: "#E72C20",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T11:00:00`).getTime();
            events.push({
                name: "Соколова К.А",
                volunteer: "Соколова К.А",
                partner: "ООО \"Лента\"",
                address: 'Ленинский пр-т., 30',
                status: 'Забирает',
                color: "#111F90",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T07:00:00`).getTime() + 24 * 3600000;
            events.push({
                name: "Иванов М.М",
                volunteer: "Иванов М.М",
                partner: "АО \"Дикси\"",
                address: 'ул. Шаболовка, 37 строение 5',
                status: 'Ожидает',
                color: "#FF6A00",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T20:30:00`).getTime() + 24 * 3600000;
            events.push({
                name: "Смирнов В.М",
                volunteer: "Смирнов В.М",
                partner: "АО \"Перекресток\"",
                address: 'Мытная ул., 46-2',
                status: 'Ожидает',
                color: "#005523",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T19:00:00`).getTime() + 2 * 24 * 3600000;
            events.push({
                name: "Захарова А.А",
                volunteer: "Захарова А.А",
                partner: "АО \"Дикси\"",
                address: 'ул. Шаболовка, 37 строение 5',
                status: 'Ожидает',
                color: "#FF6A00",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T12:00:00`).getTime() + 3 * 24 * 3600000;
            events.push({
                name: "Петров А.В",
                volunteer: "Петров А.В",
                partner: "АО \"Перекресток\"",
                address: 'Мытная ул., 46-2',
                status: 'Ожидает',
                color: "#005523",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T16:00:00`).getTime() + 4 * 24 * 3600000;
            events.push({
                name: "Смирнов В.М",
                volunteer: "Смирнов В.М",
                partner: "ООО \"Пятерочка\"",
                address: 'ул. Шаболовка, 19',
                status: 'Ожидает',
                color: "#E72C20",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            startDate = new Date(`${start.date}T18:00:00`).getTime() + 4 * 24 * 3600000;
            events.push({
                name: "Иванов М.М",
                volunteer: "Иванов М.М",
                partner: "ООО \"Лента\"",
                address: 'Ленинский пр-т., 30',
                status: 'Ожидает',
                color: "#111F90",
                start: startDate,
                end: startDate + 2 * 3600000,
                timed: true,
            });

            this.events = events;
        },
    },

    computed: {
        ...mapGetters(['username', 'usertype']),
    },
}
</script>

<style>
.v-event-draggable {
    padding-left: 6px;
}

.v-event-timed {
    user-select: none;
    -webkit-user-select: none;
}

.v-event-drag-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    height: 4px;
    cursor: ns-resize;
}

.v-event-drag-bottom::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
}

.v-event-drag-bottom:hover::after {
    display: block;
}

</style>