# TWP_project

Welcome to TWP! The following instructions should help you work with this project.

## Description

This website it a clone of Trello, it enables the user to create task groups (called categories) in which he can post some precise actions (cards). Within each card, the user can add comments to add more precision to actions.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Routes
1. "/home": Technically the homepage, gathers all of the current cards, their respective details are accessible through buttons
2. "/": The page that loads at the beginning of the app, regroups all of the base of the app: displays all of the existing categories as well as their corresponding cards
3. "/Card/:id": This view represents the card that was clicked on: displays its ID, content, title
4. "/AddCard/:id": A form in which you can add a card to a precise category
5. "/ModifyCard/:id": A form that enables to modify a precise card
6. "/AddCategory": Enables to add a category to the main view ("/")
7. "/ModifyComment/:postId/:commentId": This view is a redirection from the "/card/:id" view and enables to modify a precise comment from a certain card
8. "/ModifyCategory/:id": This view presents the user with a form that enables to modify a precise category


### Authors
-> Tiphaine Mossala
-> Nathan Delmarche
-> Côme Mençon
