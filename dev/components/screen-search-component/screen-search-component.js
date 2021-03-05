import { LitElement, html, css } from "lit-element";

class ScreenSearchComponent extends LitElement {
  static get styles() {
    return css`
      .grid {
        display: grid;
        grid-template-columns: 50% auto;
        grid-template-rows: repeat(10, 10%);
        background-color: #33a5ff;
        color: white;
      }

      .item {
        text-align: center;
        border: solid 1px;
      }

      .item:hover {
        background-color: pink;
      }
    `;
  }

  static get properties() {
    return {
      elements: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.elements = [];
  }

  render() {
    return html`
      <div class="grid">
        ${this.elements.map(
          (item) =>
            html`<div
              id="${item.name}"
              class="item"
              @click="${this.selectItem}"
            >
              ${item.name}
            </div>`
        )}
      </div>
    `;
  }

  selectItem(event) {
    this.dispatchEvent(
      new CustomEvent("item-selected", {
        bubbles: true,
        composed: true,
        detail: event.target.id,
      })
    );
  }
}

customElements.define("screen-search-component", ScreenSearchComponent);
