import { LitElement, html, css } from "lit-element";
import "../service-component/service-component.js";

class ScreenImageComponent extends LitElement {
  static get styles() {
    return css`
      .grid {
        display: grid;
        grid-template-columns: 50% auto;
        grid-template-rows: 15% 25% auto;
        grid-template-areas:
          "header header"
          "img-front img-back"
          "info info";
      }

      .header {
        grid-area: header;
      }

      .img-front {
        grid-area: img-front;
      }

      .img-back {
        grid-area: img-back;
      }

      .info {
        display: grid;
        grid-area: info;
        grid-template-columns: 50% auto;
      }

      .info .type {
        margin: 0;
      }
    `;
  }
  static get properties() {
    return {
      actualPokemon: {
        type: String,
      },
      detailActualPokemon: {
        type: Object,
      },
      responseReceived: {
        type: Boolean,
      },
    };
  }
  constructor() {
    super();
    this.actualPokemon = "";
    this.responseReceived = false;
    this.detailActualPokemon = {
      name: "",
      spritesFront: "",
      spritesBack: "",
    };
  }

  render() {
    return html`
      <service-component
        .url="${this.actualPokemon}"
        @response-api-event="${this.getResponseApi}"
      ></service-component>
      ${this.responseReceived
        ? html`<div class="grid">
          <p class="header">${this.detailActualPokemon.name}</p>
          <img class="img-front" src="${
            this.detailActualPokemon.spritesFront
          }"></img>
          <img class="img-back" src="${
            this.detailActualPokemon.spritesBack
          }"></img>
          <div class="info">
            ${this.detailActualPokemon.type.map(
              (item) => html` <p class="type">${item.type.name}</p> `
            )}
          </div>
        </div>`
        : html`<div>
          <img src="https://media.giphy.com/media/jtcChrl9ER2dC2rL7b/giphy.gif"></img>
        </div>`}
    `;
  }
  getResponseApi(event) {
    this.responseReceived = true;
    this.detailActualPokemon = {
      name: event.detail.json.name,
      type: event.detail.json.types,
      spritesFront: event.detail.json.sprites.front_default,
      spritesBack: event.detail.json.sprites.back_default,
    };
  }
}

customElements.define("screen-image-component", ScreenImageComponent);
