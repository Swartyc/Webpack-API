import "../css/app.scss";
import { Food } from "./food";
import { Foodetails } from "./foodetails";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    // Start application
    new Food();
    new Foodetails();
  }
}

new App();
