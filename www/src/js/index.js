import "../css/app.scss";
import { Background } from "./background";
import { Quote } from "./quote";
import { Greeting } from "./greeting";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    // Start application
    new Background();
    new Quote();
    new Greeting();
  }
}

new App();
