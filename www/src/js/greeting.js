/*
 * Objectif : déterminer un "salut" en fonction de l'heure et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une salutation en fonction de l'heure
 * 3- Récupérer une valeur aléatoire à partir d'un tableau
 * 4- Afficher le résultat
 */
import $ from "jquery";
import { getGreetingByTime } from "./helpers/greetingsHelper";
export class Greeting {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    // Éléments non-jQuery
    this.els = {
      Greeting: document.querySelector(".js-greeting"),
      Container: document.querySelector("js-container"),
    };

    // Éléments jQuery
    this.$els = {
      Greeting: $(".js-greeting"),
      Container: $(".js-container"),
    };
    this.names = ["You", "brother", "friend"];
    // Autres éléments
  }

  initEvents() {
    this.displayMessage();
  }

  selectName() {
    const i = Math.floor(Math.random() * this.names.length);
    return this.names[i];
  }
  makeMessage() {
    return `Hello ${this.selectName()}, we are the ${getGreetingByTime()}`;
  }
  displayMessage() {
    console.log(this.makeMessage());
    this.$els.Greeting.text(this.makeMessage());
  }
}
