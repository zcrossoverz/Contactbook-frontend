import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handle } from "./common/promise";
import router from "./router";

createApp(App)
  .mixin({
    methods: {
      handle,
    },
  })
  .use(router)
  .mount("#app");






