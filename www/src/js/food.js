import $ from "jquery";
export class food {
  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    // Éléments non-jQuery
    this.els = {
      Quote_text: document.querySelector(".js-quote-text"),
      Quote_author: document.querySelector(".js-quote-author"),
      Container: document.querySelector("js-container"),
    };

    // Éléments jQuery
    this.$els = {
      Quote_text: $(".js-quote-text"),
      Quote_author: $(".js-quote-author"),
      Container: $(".js-container"),
    };

    // Autres éléments
  }

  initEvents() {
    this.getQuote();
  }

  getQuote() {
    const api = {
      endpoint: "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand",
      params: {
        per_page: 1,
      },
    };
    $.ajaxSetup({ cache: false });
    $.getJSON(api.endpoint, api.params)
      .then((response) => {
        console.log(response[0]["content"]["rendered"]);
        this.renderQuote(response[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  renderQuote(quote) {
    const quoteContent = quote.content.rendered;
    const quoteAuthor = quote.title.rendered;
    this.$els.Quote_text.prepend(quoteContent);
    this.$els.Quote_author.text(quoteAuthor);
    this.$els.Container.addClass("is-ready");
  }
}
