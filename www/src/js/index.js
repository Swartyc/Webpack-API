import "../css/app.scss";
import { Food } from "./food";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    // Start application
    new Food();
  }
}

new App();
