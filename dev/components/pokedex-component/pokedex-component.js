import { LitElement, html, css } from "lit-element";
import "../service-component/service-component.js";
import "../screen-search-component/screen-search-component.js";
import "../screen-image-component/screen-image-component.js";

class PokedexComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .pokedex {
        width: 600px;
        height: 450px;
        display: grid;
        grid-template-columns: 45% 5% auto;
        grid-template-rows: 10% auto;
        grid-template-areas:
          "header . ."
          "main-screen divisor second-screen";
      }

      .header {
        grid-area: header;
        background-color: red;
        border: solid 1px;
      }

      .main-screen {
        display: grid;
        grid-template-rows: 70% auto;
        grid-area: main-screen;
        background-color: red;
        border: solid 1px;
      }

      .container-screen-image {
        display: grid;
        background-color: white;
        margin: 10px;
        border: solid 1px;
      }

      .frame-screen-image {
        display: grid;
        background-color: black;
        margin: 15px;
      }

      .screen-image {
        background-color: white;
        border-radius: 3%;
        margin: 15px;
      }

      .main-screen .container-buttons {
      }

      .divisor {
        grid-area: divisor;
        background-color: red;
        border: solid 1px;
      }

      .second-screen {
        display: grid;
        grid-template-rows: 65% auto;
        grid-area: second-screen;
        background-color: red;
        border: solid 1px;
      }

      .frame-screen-search {
        display: grid;
        background-color: black;
        margin: 15px;
      }

      .screen-search {
        border-radius: 3%;
        margin: 15px;
      }

      .second-screen .container-buttons {
        display: grid;
        grid-template-columns: 50% auto;
      }

      .second-screen .container-buttons button {
        width: 100px;
        height: 30px;
        justify-self: center;
        align-self: center;
      }
    `;
  }

  static get properties() {
    return {
      url: {
        type: String,
      },
      state: {
        type: Object,
      },
      responseReceived: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.url = "";
    this.responseReceived = false;
    this.state = {
      prev: "",
      next: "",
      pokemonsArray: [],
      actualPokemon: "",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  }

  render() {
    return html`
      <service-component
        .url="${this.url}"
        @response-api-event="${this.getResponseApi}"
      ></service-component>
      <div class="pokedex">
        <div class="header"></div>
        <div class="main-screen">
          <div class="container-screen-image">
            <div class="frame-screen-image">
              <div class="screen-image">
                <screen-image-component
                  .actualPokemon="${this.state.actualPokemon}"
                  .responseReceived=${this.responseReceived}
                ></screen-image-component>
              </div>
            </div>
          </div>
          <div class="container-buttons"></div>
        </div>
        <div class="divisor"></div>
        <div class="second-screen">
          <div class="frame-screen-search">
            <div class="screen-search">
              <screen-search-component
                .elements="${this.state.pokemonsArray}"
                @item-selected="${this.updateActualPokemon}"
              ></screen-search-component>
            </div>
          </div>
          <div class="container-buttons">
            <button id="prev-button" @click="${this.updatePagination}">
              PREV
            </button>
            <button id="next-button" @click="${this.updatePagination}">
              NEXT
            </button>
          </div>
        </div>
      </div>
    `;
  }

  updatePagination(event) {
    this.responseReceived = false;
    if (event.target.id === "prev-button") {
      if (this.state.prev !== null) {
        this.url = this.state.prev;
      }
    } else if (event.target.id === "next-button") {
      this.url = this.state.next;
    }
  }

  getResponseApi(event) {
    this.state = {
      prev: event.detail.json.previous,
      next: event.detail.json.next,
      pokemonsArray: event.detail.json.results,
      actualPokemon: event.detail.json.results[0].url,
    };
  }

  updateActualPokemon(event) {
    this.state = {
      prev: this.state.prev,
      next: this.state.next,
      pokemonsArray: this.state.pokemonsArray,
      actualPokemon: `https://pokeapi.co/api/v2/pokemon/${event.detail}`,
    };
  }
}

customElements.define("pokedex-component", PokedexComponent);
