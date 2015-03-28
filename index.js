var _ = require('lodash');

function digits(val, bitPair) {
  return _.padLeft(val.toString(2), 8, '0')
    .split('')
    .map(i => parseInt(i))
    .slice(bitPair * 2, bitPair * 2 + 2);
}

export function makeOffset(...args) {
  return 255 - args.reduce((a,b) =>  a + b, 0);
}

export function addOffset(input) {
  let withOffset = [];
  let offsets = [6, 3, 5, 7, 9, 0, 1, 4, 2, 8];
  input.forEach((val, i) => {
    withOffset.push((val + offsets[i]) % 10);
  });
  return withOffset;
}

export function intermediateBits(winHigh, winLow, lossHigh, lossLow, koHigh, koLow) {
  return [0, 0]
    .concat(digits(winHigh, 2))
    .concat(digits(koLow, 3))
    .concat([0, 0])
    .concat(digits(koLow, 2))
    .concat(digits(winHigh, 3))
    .concat([0, 0])
    .concat(digits(koHigh, 2))
    .concat(digits(winLow, 3))
    .concat([0, 0])
    .concat(digits(winLow, 2))
    .concat(digits(koHigh, 3))
    .concat(digits(lossLow, 3))
    .concat([0, 0]);
}

export function addOpponent(intermediate, checksum, opponent) {
  intermediate.splice(0, 2, digits(checksum, 1)[0], digits(checksum, 1)[1]);
  intermediate.splice(6, 2, digits(checksum, 2)[0], digits(checksum, 2)[1]);
  intermediate.splice(12, 2, digits(checksum, 3)[0], digits(checksum, 3)[1]);
  intermediate.splice(18, 2, digits(checksum, 0)[0], digits(checksum, 0)[1]);
  intermediate.splice(26, 2, digits(opponent, 3)[0], digits(opponent, 3)[1]);
  return intermediate;
}

export function rotateCount(opponent, losses) {
  return (opponent + losses + 1) % 3;
}

export function rotate(intermediate, rotateCount) {
  _.times(rotateCount, ()=> {
    let removed = intermediate.splice(0, 1);
    intermediate = intermediate.concat(removed);
  });
  return intermediate;
}
