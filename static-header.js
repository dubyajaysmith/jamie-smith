// jshint asi: true, esversion: 6, laxcomma: true 
'use strict()'

const template = document.createElement('template')
template.innerHTML = /* html */`
<style>
    :host {
        user-select: none;
    }

    :host header {
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px -4px 10px 0px rgba(0, 0, 0, 0.2);
        width: -webkit-fill-available;
        color: #EEE;
        /*
        padding-top: .5rem;
        padding-left: 0.5px;
        */
        font-size: .96rem;
        background-color: #3D3D3D;
        height: 4rem;
    }
    :host h2 {
        font-size: 2vw;
    }
    :host img {
        width: auto;
        /*padding: 1px;*/
        height: inherit;
        position: absolute;
        background: #03A9F4;
        transition: all 1s ease;
        -webkit-transition: all 500ms ease;
        animation: spin 1000ms linear 3, moveLeftToRight 3000ms linear;
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px -4px 10px 0px rgba(0, 0, 0, 0.2);
    }

    /* Spinning the sphere using key frames */
    @-ms-keyframes spin {
    from { -ms-transform: rotate(0deg); }
    to { -ms-transform: rotate(-360deg); }
    }
    @-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(-360deg); }
    }
    @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
    }
    @-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(-360deg); }
    }

    /* Move sphere from left to right */
    @-moz-keyframes moveLeftToRight {
    0%   {  left: 100%; }
    100% { left:  0px; }
    }
    @-ms-keyframes moveLeftToRight {
    0%   {  left: 100%; }
    100% { left:  0px; }
    }
    @-webkit-keyframes moveLeftToRight {
    0%   {  left: 100%; }
    100% { left:  0px; }
    }
    @keyframes moveLeftToRight {
    0%   {  left: 100%; border-radius: 50%; }
    90%  { border-radius: 50%; }
    100% { left:  0px; border-radius: 0px; }
    }
</style>

<header><img /></header>`


export class StaticHeader extends HTMLElement {

    constructor() {
        super()
        //console.log('hi from constructor')
        this.attachShadow({mode: 'open'})
    }
    static get is() {
        return 'static-header'
    }

    static get observedAttributes() {
        return ['title', 'icon']
    }

    connectedCallback() {

        this.shadowRoot.appendChild(template.content.cloneNode(true))        
        this.registerElements(this.shadowRoot)
    }
    registerElements(doc){

        this.dom = {
            header: doc.querySelector('header')
            //,text: doc.querySelector('h2')<h2></h2>
            ,icon: doc.querySelector('img')
        }
    }
    attributeChangedCallback(n, ov, nv) {

        console.dir(n)
        console.dir(ov)
        console.dir(nv)
        switch (n) {
            case 'title': {
                if(!nv){return}
                //this.dom.text.textContent = nv
                this.dom.icon.title = nv
                break
            }
            case 'icon': {
                if(!nv){return}
                this.dom.icon.src = nv
                break                
            }
        }
    }

}
customElements.define(StaticHeader.is, StaticHeader);