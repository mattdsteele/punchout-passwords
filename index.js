var _ = require('lodash');

export default class PunchOut {
  makeOffset(...args) {
    return 255 - args.reduce((a,b) =>  a + b, 0);
  }

  addOffset(input) {
    let withOffset = [];
    let offsets = [6, 3, 5, 7, 9, 0, 1, 4, 2, 8];
    input.forEach((val, i) => {
      withOffset.push((val + offsets[i]) % 10);
    });
    return withOffset;
  }

  digits(val, bitPair) {
    return _.padLeft(val.toString(2), 8, '0')
      .split('')
      .map(i => parseInt(i))
      .slice(bitPair * 2, bitPair * 2 + 2);
  }
  intermediateBits(winHigh, winLow, lossHigh, lossLow, koHigh, koLow) {
    return [0, 0]
      .concat(this.digits(winHigh, 2))
      .concat(this.digits(koLow, 3))
      .concat([0, 0])
      .concat(this.digits(koLow, 2))
      .concat(this.digits(winHigh, 3))
      .concat([0, 0])
      .concat(this.digits(koHigh, 2))
      .concat(this.digits(winLow, 3))
      .concat([0, 0])
      .concat(this.digits(winLow, 2))
      .concat(this.digits(koHigh, 3))
      .concat(this.digits(lossLow, 3))
      .concat([0, 0]);
  }
}
