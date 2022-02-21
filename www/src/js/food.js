import $ from "jquery";
/*
 * Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
 * 3- Afficher la citation
 * */

export class Food {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    // Éléments non-jQuery
    this.els = {
      Legend: document.querySelector(".food_legend"),
      Container: document.querySelector("js-container"),
    };

    // Éléments jQuery
    this.$els = {
      Legend: $(".food_legend"),
      Container: $(".js-container"),
    };

    // Autres éléments
  }

  initEvents() {
    this.getFood();
  }

  getFood() {
    const api = {
      endpoint:
        "https://api.spoonacular.com/recipes/complexSearch?number=5&query=pasta&apiKey=55f4f7870c864602936c39f8a7e3fafc",
      params: {
        per_page: 1,
      },
    };
    $.ajaxSetup({ cache: false });
    $.getJSON(api.endpoint)
      .then((response) => {
        console.log(response["results"][1]["title"]);
        this.renderFood(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  renderFood(food) {
    const foodLegend = food.results[0].title;
    this.$els.Legend.text(foodLegend);
    this.$els.Container.addClass("is-ready");
  }
}
