# Punch-Out Codes Generator

Written in ES6

Based on the algorithm outlined [here](http://tomorrowcorporation.com/posts/retro-game-internals-punch-out-passwords).

## Usage

```js
import punchOut from 'index';

//nextEnemy:
// 0: Don Flamenco
// 1: Piston Honda
// 2: Super Macho Man
punchOut.makePassword(winNumber, lossNumber, koNumber, nextEnemy);
```
