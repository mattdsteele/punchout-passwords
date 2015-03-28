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
}
