import $ from "jquery";

/************************************************ Récupération d'un paramètre dans l'url et instanciation du résultat dans une variable ************************************************/
function getParamByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var pages = getParamByName("id");
console.log(pages);

//Parcours des différents tableau
var ingredients = 0,
  equipements = 0,
  instructions = 0;

export class Foodetails {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    /************************************************ Appel de class ************************************************/

    // Éléments non-jQuery
    this.els = {
      //Titre et somaire
      titlefood: document.querySelector(".title_details"),
      sumfood: document.querySelector(".sum_details"),

      //Ingrédients
      ingfood: document.querySelector(".ingredient_details"),
      ingname: document.querySelector(".ingredientname_details"),
      ingmetric: document.querySelector(".ingredientmetric_details"),
      ingus: document.querySelector(".ingredientus_details"),

      //Equipements
      equipimg: document.querySelector(".equipmentimg_details"),

      //Instructions
      instru: document.querySelector(".instructions_details"),
    };

    // Éléments jQuery
    this.$els = {
      //Titre et somaire
      titlefood: $(".title_details"),
      sumfood: $(".sum_details"),

      //Ingrédients
      ingfood: document.querySelector(".ingredient_details"),
      ingname: $(".ingredientname_details"),
      ingmetric: $(".ingredientmetric_details"),
      ingus: $(".ingredientus_details"),

      //Equipements
      equipimg: document.querySelector(".equipmentimg_details"),

      //Instructions
      instru: $(".instructions_details"),
    };

    // Autres éléments
  }

  initEvents() {
    this.getFoodsum();
  }

  getFoodsum() {
    /************************************************ Variables ************************************************/

    //Titre et somaire
    const api_summarise = {
      endpoint:
        "https://api.spoonacular.com/recipes/" +
        pages +
        "/summary?apiKey=4ab5c3e49cb746eb8dd35673e691d303",
    };
    $.ajaxSetup({ cache: false });
    $.getJSON(api_summarise.endpoint)
      .then((response) => {
        console.log(response["title"]);
        console.log(response["summary"]);
        this.renderFoodsum(response);
      })
      .catch((e) => {
        console.log(e);
      });

    //Ingrédients
    const api_ingredient = {
      endpoint:
        "https://api.spoonacular.com/recipes/" +
        pages +
        "/ingredientWidget.json?apiKey=4ab5c3e49cb746eb8dd35673e691d303",
    };
    $.ajaxSetup({ cache: false });

    $.getJSON(api_ingredient.endpoint)
      .then((response) => {
        console.log(response);
        this.renderFoodingre(response);
      })
      .catch((e) => {
        console.log(e);
      });

    //Equipements
    const api_equipment = {
      endpoint:
        "https://api.spoonacular.com/recipes/" +
        pages +
        "/equipmentWidget.json?apiKey=4ab5c3e49cb746eb8dd35673e691d303",
    };
    $.ajaxSetup({ cache: false });

    $.getJSON(api_equipment.endpoint)
      .then((response) => {
        console.log(response);
        this.renderFoodequip(response);
      })
      .catch((e) => {
        console.log(e);
      });

    //Instructions
    const api_instructions = {
      endpoint:
        "https://api.spoonacular.com/recipes/" +
        pages +
        "/analyzedInstructions?apiKey=4ab5c3e49cb746eb8dd35673e691d303",
    };
    $.ajaxSetup({ cache: false });

    $.getJSON(api_instructions.endpoint)
      .then((response) => {
        console.log(response);
        this.renderFoodinstru(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /************************************************ Rendu ************************************************/

  //Titre et somaire
  renderFoodsum(food) {
    const detailstitle = food.title;
    const sumtitle = food.summary;
    this.$els.titlefood.text(detailstitle);
    this.$els.sumfood.append(sumtitle);
  }

  //Ingrédients
  renderFoodingre(food) {
    const ingrefood =
      "https://spoonacular.com/cdn/ingredients_250x250/" +
      food.ingredients[ingredients].image;
    const namefood = food.ingredients[ingredients].name;
    const metricfood =
      food.ingredients[ingredients].amount.metric.value +
      " " +
      food.ingredients[ingredients].amount.metric.unit;
    const usfood =
      food.ingredients[ingredients].amount.us.value +
      " " +
      food.ingredients[ingredients].amount.us.unit;
    this.$els.ingfood.setAttribute("src", ingrefood);
    this.$els.ingname.text(namefood);
    this.$els.ingmetric.text(metricfood);
    this.$els.ingus.text(usfood);
  }

  //Equipements
  renderFoodequip(food) {
    const imgequip =
      "https://spoonacular.com/cdn/equipment_250x250/" +
      food.equipment[equipements].image;
    this.$els.equipimg.setAttribute("src", imgequip);
  }

  //Instructions
  renderFoodinstru(food) {
    const instruction = food[0].steps[instructions].step;
    this.$els.instru.text(instruction);
  }
}
