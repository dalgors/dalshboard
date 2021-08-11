import { createApp } from 'vue';
import moment from 'moment/min/moment-with-locales';
import App from './App.vue';
import store from './store/store';

moment.locale('ko');

const app = createApp(App);
app.use(store);
app.mount('#app');
