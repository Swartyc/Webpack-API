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
  instructions = 0,
  numberofingredients = 0,
  numberofequipments = 0,
  numberofinstructions = 0;

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
      ingre: document.querySelector(".theingredient"),

      //Equipements
      equipimg: document.querySelector(".equipmentfood"),

      //Instructions
      instru: document.querySelector(".instructions_details"),
    };

    // Éléments jQuery
    this.$els = {
      //Titre et somaire
      titlefood: $(".title_details"),
      sumfood: $(".sum_details"),

      //Ingrédients
      ingre: $(".theingredient"),

      //Equipements
      equipimg: $(".equipmentfood"),

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
    numberofingredients = food.ingredients.length;
    console.log("Nombre d'ingredients : " + numberofingredients);
    var theingre = [];
    var contentimgingre =
      "https://spoonacular.com/cdn/ingredients_250x250/" +
      food.ingredients[ingredients].image;
    theingre[0] =
      '<tr><th colspan="4">Ingredients</th></tr><tr><td class="subtitle" colspan="2" rowspan="2">Name</td><td class="subtitle" colspan="2">Values</td></tr><tr><td class="measurement">Metric</td><td class="measurement">US</td></tr><tr><td><img class="ingredient_details" src="' +
      contentimgingre +
      '" /></td><td class="ingredientname_details">' +
      food.ingredients[ingredients].name +
      '</td><td class="ingredientmetric_details">' +
      food.ingredients[ingredients].amount.metric.value +
      " " +
      food.ingredients[ingredients].amount.metric.unit +
      '</td><td class="ingredientus_details">' +
      food.ingredients[ingredients].amount.us.value +
      " " +
      food.ingredients[ingredients].amount.us.unit +
      "</td></tr>";
    for (ingredients = 1; ingredients < numberofingredients; ingredients++) {
      contentimgingre =
        "https://spoonacular.com/cdn/ingredients_250x250/" +
        food.ingredients[ingredients].image;
      theingre.push(
        '<tr><td><img class="ingredient_details" src="' +
          contentimgingre +
          '" /></td><td class="ingredientname_details">' +
          food.ingredients[ingredients].name +
          '</td><td class="ingredientmetric_details">' +
          food.ingredients[ingredients].amount.metric.value +
          " " +
          food.ingredients[ingredients].amount.metric.unit +
          '</td><td class="ingredientus_details">' +
          food.ingredients[ingredients].amount.us.value +
          " " +
          food.ingredients[ingredients].amount.us.unit +
          "</td></tr>"
      );
    }
    this.$els.ingre.html(theingre);
  }

  //Equipements
  renderFoodequip(food) {
    numberofequipments = food.equipment.length;
    console.log("Nombre d'équipment : " + numberofequipments);
    var imgequip = [];
    var contentimgequip =
      "https://spoonacular.com/cdn/equipment_250x250/" +
      food.equipment[equipements].image;
    imgequip[0] =
      '<img class="equipmentimg_details" src="' + contentimgequip + '" />';
    for (equipements = 1; equipements < numberofequipments; equipements++) {
      contentimgequip =
        "https://spoonacular.com/cdn/equipment_250x250/" +
        food.equipment[equipements].image;
      imgequip.push(
        '<img class="equipmentimg_details" src="' + contentimgequip + '" />'
      );
    }

    this.$els.equipimg.html(imgequip);
  }

  //Instructions
  renderFoodinstru(food) {
    numberofinstructions = food[0].steps.length;
    console.log("Nombre d'instructions : " + numberofinstructions);
    var instruction = [];
    instruction[instructions] =
      "<li>" + instruction + food[0].steps[instructions].step + "</li>";
    for (
      instructions = 1;
      instructions < numberofinstructions;
      instructions++
    ) {
      instruction.push("<li>" + food[0].steps[instructions].step + "</li>");
    }
    this.$els.instru.html(instruction);
  }
}
