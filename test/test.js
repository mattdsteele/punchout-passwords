import {
  addOffset,
  makeOffset,
  intermediateBits,
  addOpponent,
  rotateCount,
  rotate,
  breakApart
} from "./../src/index.js";
import punchOut from "../src/index.js";

import { expect } from "chai";

describe("punch out passwords", () => {
  it("adds an offset", () => {
    let input = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];

    expect(addOffset(input)).to.deep.equal(output);
  });

  it("creates a checksum", () => {
    expect(makeOffset(2, 4, 0, 1, 1, 9)).to.deep.equal(238);
  });

  it("creates intermediate bits", () => {
    let expected =
      // prettier-ignore
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0];
    expect(intermediateBits(2, 4, 0, 1, 1, 9)).to.deep.equal(expected);
  });
  it("creates intermediate bits", () => {
    let intermediate =
      // prettier-ignore
      [ 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0 ];
    let expected =
      // prettier-ignore
      [ 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0 ];
    expect(addOpponent(intermediate, 238, 2)).to.deep.equal(expected);
  });

  it("knows the rotateCount", () => {
    expect(rotateCount(2, 1)).to.deep.equal(1);
  });

  it("rotates", () => {
    let start =
      // prettier-ignore
      [ 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0 ];
    let end =
      // prettier-ignore
      [ 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0 ];
    expect(rotate(start, 2)).to.deep.equal(end);
  });

  it("converts to another intermediate step", () => {
    let start =
      // prettier-ignore
      [ 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1 ];
    let rotateCount = 1;
    let expected = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    expect(breakApart(start, rotateCount)).to.deep.equal(expected);
  });

  it("ties it all together", () => {
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];
    expect(punchOut(24, 1, 19, 2)).to.deep.equal(output);
  });

  it("does some others", () => {
    expect(punchOut(99, 0, 99, 0)).to.deep.equal(
      // prettier-ignore
      [ 2, 6, 7, 0, 5, 3, 7, 6, 2, 9 ]
    );
    expect(punchOut(99, 0, 99, 2)).to.deep.equal(
      // prettier-ignore
      [ 9, 4, 0, 8, 6, 1, 8, 5, 3, 8 ]
    );
  });
});
