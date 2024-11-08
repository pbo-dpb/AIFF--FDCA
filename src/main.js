import { defineCustomElement } from "vue";
import { createPinia } from "pinia";
import App from "./App.ce.vue";


// Define the custom element
customElements.define("pbotool-aiff-fdca", defineCustomElement(App, {
  configureApp(app) {
    const pinia = createPinia();
    app.use(pinia);
  }
}));


