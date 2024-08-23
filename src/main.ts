import { createApp } from 'vue';
import './assets/styles/index.scss';
import App from './App.vue';
import PokeInput from './components/common/Input.vue';
import PokeText from './components/common/Text.vue';
import PokeButton from './components/common/Button.vue';
import router from './router';

const app = createApp(App);

app.component('PokeInput', PokeInput);
app.component('PokeText', PokeText);
app.component('PokeButton', PokeButton);

app.use(router);

app.mount('#app');
