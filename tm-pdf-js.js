import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `tm-pdf-js`
 * Polymer Web Component to use Mozilla pdf.js as a PDF viewer.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TmPdfJs extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'tm-pdf-js',
      },
    };
  }
}

window.customElements.define('tm-pdf-js', TmPdfJs);
