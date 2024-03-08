import Vue from 'vue';
const EventBus = new Vue();

let EventBusPlugin = {
    install: function (vue) {
        vue.prototype.$eventBus = EventBus;
    }
};

export {EventBus, EventBusPlugin};
