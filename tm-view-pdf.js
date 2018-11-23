import {html, PolymerElement} from '/node_modules/@polymer/polymer/polymer-element.js';
import {} from '/node_modules/@polymer/polymer/lib/elements/dom-if.js';

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
                
                canvas {
                  box-sizing: border-box;
                  margin: 2%;
                  width: 96%;
                  border: solid lightgray 2px;
                }
            </style>

            <div id="viewer"></div>
        `;
    }

    static get properties() {
        return {
            page: {
                type: Number,
                value: 1
            },
            pages: {
                type: Number,
                value: 3
            },
            testMode: {
                type: Boolean,
                value: false
            },
            url: {
                type: String,
                observer: '_renderPDF'
            }
        };
    }

    _renderPDF(url) {
        if (this.PDF !== undefined) {
            this.rebuild();
        }
    }
    ready() {
        super.ready();

        this.loadScript('lib/pdf.js', () => {
            this.PDF = pdfjsLib;
            this.build();
        });
    }

    loadScript(script, success) {
        const s = document.createElement('script');
        s.setAttribute('src', script);
        s.addEventListener('load', () => {
            success();
        });
        document.head.appendChild(s);
    }

    rebuild() {
        this.pdf = undefined;
        this.build();
    }

    build() {
        if (this.pdf !== undefined || this.url === undefined) return;

        this.scale = 1;

        this.PDF.getDocument(this.url).promise.then((pdf) => {
            this.pdf = pdf;
            let viewer = this.$.viewer;
            let canvas;
            for(let page = 1; page <= pdf.numPages; page++) {
                canvas = document.createElement("canvas");
                viewer.appendChild(canvas);
                this.renderPage(page, canvas);
            }
        });
    }

    renderPage(pageNumber, canvas) {
        this.pdf.getPage(pageNumber).then((page) => {
            let viewport = page.getViewport(this.scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
        });
    }
}

window.customElements.define('tm-view-pdf', TMViewPDF);
