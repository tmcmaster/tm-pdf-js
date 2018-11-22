import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// import {} from '@polymer/polymer/lib/elements/dom-repeat.js';

// import './node_modules/@telecomsante/pdf-viewer/pdf-viewer.js ';

/**
 * @customElement
 * @polymer
 */
class TMViewPDF extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                  display: inline-block;
                  box-sizing: border-box;
                }
                iframe {
                    display: inline-block;
                    width:500px;
                    height: 600px;
                    box-sizing: border-box;
                    border: solid lightgray 1px;
                }
            </style>
            <template is="dom-if" if="[[readyToLoad]]">
                <iframe src="/web/viewer.html?file=[[file]]"></iframe>
            </template>
            <!--<iframe src="/web/viewer.html?file=[[file]]"></iframe>-->
        `;
    }

    static get properties() {
        return {
            file: {
                type: String
            },
            page: {
                type: Number,
                value: 1
            },
            pages: {
                type: Number,
                value: 3
            },
            readyToLoad: {
                type: Boolean,
                computed: '_checkReadyToLoad(file)'
            }
        };
    }

    _checkReadyToLoad(file) {
        return (file !== undefined);
    }
    ready() {
        super.ready();
    }
}

window.customElements.define('tm-view-pdf', TMViewPDF);
