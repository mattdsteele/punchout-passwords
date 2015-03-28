export default class PunchOut {
  addOffset(input) {
    let withOffset = [];
    let offsets = [6, 3, 5, 7, 9, 0, 1, 4, 2, 8];
    input.forEach((val, i) => {
      withOffset.push((val + offsets[i]) % 10);
    });
    return withOffset;
  };
}
