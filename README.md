# goodeed

Front-end and integration test.

## Build with
- [Vue-CLI](https://cli.vuejs.org/) : Standard Tooling for Vue.js Development
- [Vuetify](https://vuetifyjs.com/fr-FR/) : Material Design component framework for Vue.js
- [Vue Slick Carousel](https://github.com/gs-shop/vue-slick-carousel) : Carousel for Vue.js
- [Jest](https://jestjs.io/) : JavaScript Testing Framework

## Project setup
Clone the repo :
```bash
git clone https://github.com/Shindraela/goodeed.git
```
Go into the folder and use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
for starting the project. Go on `http://localhost:8080/`, it will run on it.

### Run tests
```
npm run test:unit
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Architecture
The first page displays the projects list. A project card has a title, a description, the number of donators, the percentage, a progress bar and a button "Donner gratuitement".

By clicking this button, you go to another page that displays a random ad campagn, and there is a modal on first plan which indicates that it's a free donation and you have to watch the video at least 20 seconds to make it. When you click to the "Play" button of the modal, it disappears and play the video. In the header begins the counter of 20 seconds. If the user changes the page, the video and counter are on pause.

When the 20 seconds are over, the counter displays the message "Valider mon don" and you have to click on it to make appear a validation modal which shows to which association the donation has just been made. We confirm this donation by clicking the button "Confirmer le don", which bring us back to the projects list page.

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License
[MIT](https://choosealicense.com/licenses/mit/)