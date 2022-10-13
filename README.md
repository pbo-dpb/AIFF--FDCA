# Vue 3 + Vite + Web Components (composants web)

## Project setup // Mise en route
```
npm install
```

## Compilation // Compilation

### Compiles and hot-reloads for development // Compilations et recharges à chaud pour le développement
```
npm run dev
```

### Compiles and minifies for production // Compilation et miniaturisation pour la production
```
npm run build
```

## Interfaces // Interfaces

### English

A single component can be embedded in an ABCMS web page. An example of how the component is loaded in available in `index.html`.

The web component can raise a `navigation-context-update` event to update the wrapper's UI. See `WrapperEventDispatcher.js` for more information on how to format this `CustomEvent`.

### Français

Un seul composant peut être intégré dans une page web ABCMS. Un exemple de la façon dont le composant est chargé est disponible dans `index.html`.

Le composant Web peut déclencher un événement `navigation-context-update` pour mettre à jour l'interface utilisateur de la page ABCMS englobante. Voir `WrapperEventDispatcher.js` pour plus d'informations sur la façon de formater ce `CustomEvent`.
