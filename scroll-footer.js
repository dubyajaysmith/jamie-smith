// jshint asi: true, esversion: 6, laxcomma: true 
'use strict()'

const template = document.createElement('template')
template.innerHTML = /* html */`
<style>
    :host {
        user-select: none;
    }

    :host footer {
        background: #3E3E3E;
        position: fixed;
        bottom: 0px;
        width: 100%;
        opacity: .9;
        height:5.5rem;
        overflow: -webkit-paged-x;
        box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.2), 0px -4px 10px 0px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, .8);
    }
    :host footer.expand {
        position: fixed;
        bottom: 0px;
        width: 100%;
        opacity: .9;
        height:11rem;
        
    }
    
    :host .grid > div {
        height: 100%;
        width: 33.33%;
        cursor: pointer;
        display: inline-flex;
    }
    :host svg {
        width: 100%;
        height: 100%;
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
        user-select: none;
        
    }
    :host .item use {
        transition: fill 500ms ease-out 10ms;
    }
    :host .item.active use {
        fill: #03A9F4;
    }
    :host .grid:after {
        content: "";
        display: table;
        clear: both;
    }

    ::-webkit-scrollbar {
        width: 12px;
        height: 5px;
        background-color: grey;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: grey;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 0px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #03A9F4;
    }

</style>
<footer class="grid center"></footer>`


export class ScrollFooter extends HTMLElement {

    constructor() {
        super()
        //console.log('hi from constructor')
        this.attachShadow({mode: 'open'})
    }
    static get is() {
        return 'scroll-footer'
    }

    static get observedAttributes() {
        return ['items', 'select']
    }

    connectedCallback() {
        //console.log('connectedCallback')
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        
        this.registerElements()
    }
    registerElements(doc){
        //console.log('registerElements')
        
        this.dom = {
            footer: this.shadowRoot.querySelector('footer'),
        }

        this.dragScroll(this.shadowRoot)
    }
    attributeChangedCallback(n, ov, nv) {
        //super.attributeChangedCallback(n, ov, nv);
        console.dir(n)
        console.dir(ov)
        console.dir(nv)
        switch (n) {
            case 'items': {
                if(!nv){return}
                console.dir(this.dom.footer)
                //this.shadowRoot.addEventListener("DOMContentLoaded", () => {

                    console.log('bleep bloop')
                    //this.try(this.shadowRoot.querySelector('footer'))
                    const items = JSON.parse(nv)
                    items.map(x => {
                        
                        const div = document.createElement('div')
                        div.classList.add('item', 'col-1-4', x.uid)
                        div.innerHTML = x.svg
                        div.title =  x.uid.charAt(0).toUpperCase() + x.uid.slice(1)
                        div.onclick = () => this.nav(x.uid)
                        this.dom.footer.appendChild(div)
                        if(x.default){
                            div.onclick()
                        }
                    })
                //})
                break
            }
            case 'select': {
                this.nav(nv)
                break
            }
        }
    }
    nav(uid){
        console.log('nav bloop ', uid)
        this.dispatchEvent(
            new CustomEvent("nav", {
                detail: {
                    clicked: uid
                }
            })
        )
        this.shadowRoot.querySelectorAll('.item').forEach(el => el.classList.remove('active'))
        this.shadowRoot.querySelector(`.${uid}`).classList.add('active')
    }

    dragScroll(el){
        let drag = true, diffx = 1, diffy = 1;
        el.addEventListener('mousedown', e => {
            if (!e) { e = window.event; }
            //drag = false;
            var start = 1,
                animate = function () {
                    var step = Math.sin(start);
                    if (step <= 0) {
                        window.cancelAnimationFrame(animate);
                    } else {
                        el.scrollLeft += diffx * step;
                        el.scrollTop += diffy * step;
                        start -= 0.02;
                        window.requestAnimationFrame(animate);
                    }
                }
            animate()
        })
        el.addEventListener('mousemove', e => {
            if (drag === true) {
                if (!e) { e = window.event; }
                diffx = (this.startx - (e.clientX + el.scrollLeft));
                diffy = (this.starty - (e.clientY + el.scrollTop));
                el.scrollLeft += diffx;
                el.scrollTop += diffy;
            }
        })
        el.addEventListener('mouseup', e => {
            if (!e) { e = window.event; }
            drag = false;
            var start = 1,
                animate = function () {
                    var step = Math.sin(start);
                    if (step <= 0) {
                        window.cancelAnimationFrame(animate);
                    } else {
                        el.scrollLeft += diffx * step;
                    //console.log(diffx)
                        el.scrollTop += diffy * step;
                        start -= 0.02;
                        window.requestAnimationFrame(animate);
                    }
                }
            animate()
        })
    }
    try(el) {
        if (!el.length) {
          window.requestAnimationFrame(this.try(el))
        }else {
           return el
        }
    }
}
customElements.define(ScrollFooter.is, ScrollFooter);