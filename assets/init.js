import { createApp, reactive } from 'petite-vue';
import './css/main.css';


const store = reactive({
   // #TODO: add Fetcher component to fetch projects (not fetching using PHP but javascript)
})

createApp({
   $delimiters: ['[[', ']]'],
   store
}).mount();
