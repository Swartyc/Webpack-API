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
      Theimage: document.querySelector(".screen_choice"),
      Container: document.querySelector("js-container"),
    };

    // Éléments jQuery
    this.$els = {
      Theimage: $(".screen_choice"),
      Container: $(".js-container"),
    };

    // Autres éléments
  }

  initEvents() {
    this.getFood();
  }

  getFood() {
    console.log("Nom entrée : " + word + ", Nombre de vue : " + num);
    const api = {
      endpoint:
        "https://api.spoonacular.com/recipes/complexSearch?number=" +
        num +
        "&query=" +
        word +
        "&apiKey=4ab5c3e49cb746eb8dd35673e691d303",
      params: {
        per_page: 1,
      },
    };
    $.ajaxSetup({ cache: false });
    $.getJSON(api.endpoint)
      .then((response) => {
        this.renderFood(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  renderFood(food) {
    var imglegendalthref = [];
    imglegendalthref[0] =
      '<a class="food_link" href="details.html?id=' +
      food.results[0].id +
      '"><img class="food_image" src="' +
      food.results[0].image +
      '" alt="' +
      food.results[0].title +
      '_image" /><legend class="food_legend">' +
      food.results[0].title +
      "</legend></a>";
    for (var i = 1; i < num; i++) {
      imglegendalthref.push(
        '<a class="food_link" href="details.html?id=' +
          food.results[i].id +
          '"><img class="food_image" src="' +
          food.results[i].image +
          '" alt="' +
          food.results[i].title +
          '_image" /><legend class="food_legend">' +
          food.results[i].title +
          "</legend></a>"
      );
    }
    this.$els.Theimage.html(imglegendalthref);
    this.$els.Container.addClass("is-ready");
  }
}
