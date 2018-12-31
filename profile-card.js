/*
* Use tag to import via es6 module (html import depricated in v1 spec :/ )
* <script type="module" src="../components/profile-card/profile-card.js"></script>
*/
// jshint asi: true, esversion: 6, laxcomma: true 
'use strict()'

const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
@keyframes heart {
  0% {
    transform: scale( 1 );
  }
  20% {
    transform: scale( 1.25 );
  }
  40% {
    transform: scale( 1 );
  }
  60% {
    transform: scale( 1.25 );
  }
  80% {
    transform: scale( 1 );
  }
  100% {
    transform: scale( 1 );
  }
}

:host .card {
    color: #EEE;
    margin: .25rem;
    margin-top: .5rem;
    padding-top: 0.02px;
    font-size: .96rem;
    margin-bottom: 8vw;
    background-color: #3D3D3D;
}
.heart {
    top: 10px;
    height: 5vw;
    fill: #ff4081;
    position: relative;
    margin: 5px 5px 5px 7px;
    animation: heart 1s ease infinite;
    -webkit-animation: heart 1s ease infinite;
}
:host .img-container {
    margin: .25rem;
    margin-top: 0.35rem;
    padding-top: .3rem;
}

:host img.main {
    max-width: 100%;
    width: -webkit-fill-available;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, .8);
    margin: .25rem;
}
:host .circle {
    width: 64px;
    height: 64px;
    position: fixed;
    border-radius: 50%;
    margin-top: -2.5rem;
    margin-left: -3rem;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, .8);
}
:host .card-content {
    width: 100%;
}
:host .card-header {
    text-align: center;
    font-size: 6vw;
}
:host .card-footer {
    background: #333;
    padding: .8rem;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    -moz-box-shadow: 0 0 8px rgba(0, 0, 0, .8);
    box-shadow: 0 0 0.8rem rgba(0, 0, 0, .8);
    text-align: center;
    border-bottom: 3pt solid #03A9F4;
    cursor: pointer !important;
}
:host .welcome {
    text-align: center;
    padding-top: 5rem;
    padding-bottom: 1rem;
    font-size: 3vw;
}
:host .header-container {
    margin: 0 auto;
}
</style>
<div class="card">

    <div class="img-container">
        <img class="main" src=""/>
    </div>
    <div class="card-content">
        <div class="card-header">
            <div class="header-container">
                <img class="circle" src=""/> 
                <span>&nbsp; I <svg class="heart" viewBox="0 0 32 29.6">
                    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"></path>
                </svg> Code &amp; Collies</span>
            </div>
        </div>
        <div class="welcome">Welcome to my corner of the interwebs</div>
    </div>
    <div class="card-footer">Reach Out</div>

</div>`

export class ProfileCard extends HTMLElement {

    constructor() {
        super()
        //console.log('hi from constructor')
        this.attachShadow({ mode: 'open' })
    }
    static get is() {
        return 'profile-card'
    }

    static get observedAttributes() {
        return ['image', 'profilepic', 'title']
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.registerElements(this.shadowRoot)
    }
    registerElements(doc) {
        //console.log('registerElements')

        this.dom = {
            footer: doc.querySelector('.card-footer')
          , title: doc.querySelector('.title')
          , profilepic: doc.querySelector('.circle')
          , image: doc.querySelector('.main')
        }

        this.registerListeners(doc)
    }
    registerListeners() {

        this.dom.footer.onclick = () => {
            this.dispatchEvent(
                new CustomEvent("nav", {
                    detail: {
                        clicked: 'contact'
                    }
                })
            )
        }
    }

    attributeChangedCallback(n, ov, nv) {

        switch (n) {
            case 'image': {
                if(!nv){return}
                setTimeout(() => this.dom.image.src = nv, 0)
                break
            }
            case 'title': {
                if(!nv){return}
                setTimeout(() => this.dom.title.textContent = nv, 0)
                break
            }
            case 'profilepic': {
                if(!nv){return}
                console.log('HIT HIT HIT')
                setTimeout(() => this.dom.profilepic.src = nv, 0)
                break
            }
        }
    }
}
customElements.define(ProfileCard.is, ProfileCard);