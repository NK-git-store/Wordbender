import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.mount('#app')
