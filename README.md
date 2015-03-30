# Punch-Out Codes Generator

Written in ES6; the meat of the algorithm is in `index.js`.

Based on the algorithm outlined [here](http://tomorrowcorporation.com/posts/retro-game-internals-punch-out-passwords).

## [See it in action](http://d.matthew-steele.com/projects/punchout/)

# Usage

## ES6 Module

When this start working:

```js
import punchOut from 'index';

//nextEnemy:
// 0: Don Flamenco
// 1: Piston Honda
// 2: Super Macho Man
punchOut.makePassword(winNumber, lossNumber, koNumber, nextEnemy);
```

## CommonJS

`gulp babel`, then load from `dist/` folder

## Web

Use SystemJS and jspm to load and run app

### Development Mode

`gulp serve`

### Production

`gulp web`, and distribute the `web` folder
