function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || "0") + nr;
}

function digits(val, bitPair) {
  return padLeft(parseInt(val).toString(2), 8, "0")
    .split("")
    .map(i => parseInt(i))
    .slice(bitPair * 2, bitPair * 2 + 2);
}

export function makeOffset(...args) {
  return 255 - args.reduce((a, b) => a + parseInt(b), 0);
}

export function addOffset(input) {
  let withOffset = [];
  let offsets = [6, 3, 5, 7, 9, 0, 1, 4, 2, 8];
  input.forEach((val, i) => {
    withOffset.push((val + offsets[i]) % 10);
  });
  return withOffset;
}

export function intermediateBits(
  winHigh,
  winLow,
  lossHigh,
  lossLow,
  koHigh,
  koLow
) {
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
  for (let i = 0; i < rotateCount; i++) {
    let removed = intermediate.splice(0, 1);
    intermediate = intermediate.concat(removed);
  }
  return intermediate;
}

export function breakApart(intermediate, rotateCount) {
  let x = [];
  x.push(intermediate.slice(0, 3));
  x.push(intermediate.slice(3, 6));
  x.push(intermediate.slice(6, 9));
  x.push(intermediate.slice(9, 12));
  x.push(intermediate.slice(12, 15));
  x.push(intermediate.slice(15, 18));
  x.push(intermediate.slice(18, 21));
  x.push(intermediate.slice(21, 24));
  x.push(intermediate.slice(24, 27));
  x.push(
    intermediate.slice(27, 28).concat(
      padLeft(rotateCount.toString(2), 2, 0)
        .split("")
        .map(i => parseInt(i))
    )
  );
  return x.map(i => parseInt(i.join(""), 2));
}

function tensDigit(number) {
  return number < 10 ? 0 : number.toString().substring(0, 1);
}

export default function makePassword(wins, losses, koCount, opponentNumber) {
  let winHigh = tensDigit(wins),
    winLow = wins % 10,
    lossHigh = 0,
    lossLow = losses,
    koHigh = tensDigit(koCount),
    koLow = koCount % 10;
  let checksum = makeOffset(winHigh, winLow, lossHigh, lossLow, koHigh, koLow);
  let intermediate = intermediateBits(
    winHigh,
    winLow,
    lossHigh,
    lossLow,
    koHigh,
    koLow
  );
  let withOpponent = addOpponent(intermediate, checksum, opponentNumber);
  let rotateNumber = rotateCount(opponentNumber, losses);
  let newIntermediate = rotate(intermediate, rotateNumber);
  let brokenApart = breakApart(newIntermediate, rotateNumber);
  return addOffset(brokenApart);
}
