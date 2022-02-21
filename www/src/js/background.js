/*
 * Objectif : récupérer une image aléatoire à partir d'une API et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une image de façon asynchrone à partir de l'API d'Unsplash (https://source.unsplash.com/)
 * 3- Définir l'image comme fond
 * */
import $ from "jquery";
export class Background {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    // Éléments non-jQuery
    this.els = {
      Background: document.querySelector(".js-background"),
    };

    // Éléments jQuery
    this.$els = {
      Background: $(".js-background"),
    };

    // Autres éléments
    this.url = "https://source.unsplash.com/collection";
    this.cat = "random";
    this.size = "1440x800";
  }

  initEvents() {
    this.loadImage();
  }

  loadImage() {
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = `${this.url}/${this.cat}/${this.size}`;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
    //si ça resolve :
    promise.then((image) => {
      console.log(image.src);
      this.setBackground(image.src);
    });

    //si ça reject :
    promise.catch((err) => {
      console.log(err);
    });
  }
  setBackground(image) {
    this.$els.Background.css("background-image", `url(${image})`);
    //ajout de la petite transition
    this.$els.Background.addClass("is-ready");
  }
}
