import { LitElement, html, css } from "lit-element";

class ServiceComponent extends LitElement {
  static get styles() {
    return css``;
  }
  static get properties() {
    return {
      url: {
        type: String,
      },
    };
  }
  constructor() {
    super();
    this.url = "";
  }

  render() {
    return html``;
  }

  updated(changedProperties) {
    this.getData(this.url);
  }

  getData(url) {
    if (url !== "") {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.dispatchEvent(
            new CustomEvent("response-api-event", {
              detail: { json },
              bubbles: true,
              composed: true,
            })
          );
        });
    }
  }
}

customElements.define("service-component", ServiceComponent);
