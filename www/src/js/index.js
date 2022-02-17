import "./../css/app.scss";
function component() {
  let element = document.createElement("div");
  element.innerHTML = "Hello S4 !";
  return element;
}
document.body.appendChild(component());
