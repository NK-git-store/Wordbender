import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { pinia } from './pinia'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import App from './App.vue'
import './style.css'
import Tooltip from 'primevue/tooltip';

const primeVueSettings = {
  theme: {
    preset: Aura,
  },
}

const app = createApp(App)
app.use(PrimeVue, primeVueSettings).use(pinia).
  component('Button', Button).
  component('Dialog', Dialog).
  component('InputText', InputText).
  component('DataTable', DataTable).
  component('Column', Column).
  directive('tooltip', Tooltip).
  mount('#app')
