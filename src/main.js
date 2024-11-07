import { defineCustomElement } from "vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.ce.vue";

const createCustomElement = () => {

  const app = createApp({});
  const pinia = createPinia();
  app.use(pinia);

  const CustomElement = defineCustomElement(App);

  const originalConnectedCallback = CustomElement.prototype.connectedCallback;
  CustomElement.prototype.connectedCallback = function () {

    const app = createApp({});
    const pinia = createPinia();
    app.use(pinia);

    this._pinia = pinia;

    originalConnectedCallback.call(this);
  };

  return CustomElement;
};

// Define the custom element
customElements.define("pbotool-aiff-fdca", createCustomElement());
