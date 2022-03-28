<h1 align="center">Webpack FoodAPI</h1>

<h3><ins>Lancer l'API :</ins></h3>
<ol>
    <li>Allez dans le dossier "www"</li>
    <li>Tapez dans la console : <code>yarn</code></li>
    <li>Puis tapez dans la console : <code>yarn start</code></li>
</ol>
<br/>
<hr/>
<br/>
<h2 align="center"><ins>Explications de l'API</ins><h2>
<h3><ins>Page principale :</ins></h3>
<p>Elle affiche des recettes prises sur <a target="_blank" href="https://spoonacular.com/food-api">spoonacular</a>.</p>
<br/>
<p>Champs dans la navigation :</p>
<ol>
    <li>Permet de rentrer un ingrédient (en anglais) afin de faire une recherche en fonction de celui-ci</li>
    <li>Permet d'afficher un nombre défini de recettes</li>
</ol>
<br/>
<hr/>
<hr/>
<br/>
<h3><ins>Page secondaire :</ins></h3>
<p>Lorsque l'utilisateur clique sur l'une des recettes, une seconde page s'ouvre pour afficher plusieurs informations qui sont :</p>
<ol>
    <li>Un sommaire de la recette</li>
    <li>Les ingredients nécessaires à la recette</li>
    <li>Les équipements nécessaires à la recette</li>
    <li>Les étapes de la recette</li>
</ol>
<br/>
<hr/>
<hr/>
<br/>
<h3><ins>Structure :</ins></h3>
<pre>
WEBPACK-API
└───www
    └───src
        ├───details.html
        ├───index.html
        ├───css
        │   ├───components
        │   ├───config
        │   └───layouts
        ├───fonts
        ├───images
        └───js
            └───helpers
</pre>
<br/>
<p>Les fichiers :</p>
<ul>
    <li><code>index.html</code> : Affiche les recettes suivant ce que l'utilisateur a rentré</li>
    <li><code>details.html</code> : Affiche la recette cliquée sur la page</li>
    <li><code>food.js</code> : Traite ce que l'utilisateur a rentré et l'envoie sur la page principale</li>
    <li><code>fooddetails.js</code> : Traite ce que l'utilisateur a cliqué et envoie les différentes parties sur la page secondaire</li>
</ul>
