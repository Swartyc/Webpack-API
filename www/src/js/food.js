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
var word = getParamByName("word");
var num = getParamByName("number_choose");
if (word == null || word == "") {
  word = "pasta";
}
if (num == null || num == "" || num == 0) {
  num = 5;
}

export class Food {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    // Éléments non-jQuery
    this.els = {
      Legend: document.querySelector(".food_legend"),
      Image: document.querySelector(".food_image"),
      Link: document.querySelector(".food_link"),
      Container: document.querySelector("js-container"),
    };

    // Éléments jQuery
    this.$els = {
      Legend: $(".food_legend"),
      Image: document.querySelector(".food_image"),
      Link: document.querySelector(".food_link"),
      Container: $(".js-container"),
    };

    // Autres éléments
  }

  initEvents() {
    this.getFood();
  }

  getFood() {
    console.log(word, num);
    const api = {
      endpoint:
        "https://api.spoonacular.com/recipes/complexSearch?number=" +
        num +
        "&query=" +
        word +
        "&apiKey=55f4f7870c864602936c39f8a7e3fafc",
      params: {
        per_page: 1,
      },
    };
    $.ajaxSetup({ cache: false });
    $.getJSON(api.endpoint)
      .then((response) => {
        console.log(response["results"][0]["title"]);
        this.renderFood(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  renderFood(food) {
    const foodLegend = food.results[0].title;
    const foodimgsrc = food.results[0].image;
    const foodimgalt = food.results[0].title + "_image";
    const foodlink = "details.html?id=" + food.results[0].id;
    console.log(foodlink);
    this.$els.Legend.text(foodLegend);
    this.$els.Image.setAttribute("src", foodimgsrc);
    this.$els.Image.setAttribute("alt", foodimgalt);
    this.$els.Link.setAttribute("href", foodlink);
    this.$els.Container.addClass("is-ready");
  }
}
