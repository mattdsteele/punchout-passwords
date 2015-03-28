import {addOffset, makeOffset, intermediateBits, addOpponent, rotateCount, rotate, breakApart} from './index.js';
import punchOut from './index.js';

describe('punch out passwords', () => {
  it('adds an offset', () => {
    let input = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];

    expect(addOffset(input)).toEqual(output);
  });

  it('creates a checksum', ()=> {
    expect(makeOffset(2, 4, 0, 1, 1, 9)).toEqual(238);
  });

  it('creates intermediate bits', ()=> {
    let expected = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0];
    expect(intermediateBits(2, 4, 0, 1, 1, 9)).toEqual(expected);
  });
  it('creates intermediate bits', ()=> {
    let intermediate = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0];
    let expected =     [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0];
    expect(addOpponent(intermediate, 238, 2)).toEqual(expected);
  });

  it('knows the rotateCount', ()=> {
    expect(rotateCount(2, 1)).toEqual(1);
  });

  it('rotates', ()=> {
    let start = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0];
    let end   = [0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0];
    expect(rotate(start, 2)).toEqual(end);
  });

  it('converts to another intermediate step', ()=> {
    let start = [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1];
    let rotateCount = 1;
    let expected = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    expect(breakApart(start, rotateCount)).toEqual(expected);
  });

  it('ties it all together', ()=> {
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];
    expect(punchOut(24, 1, 19, 2)).toEqual(output);
  });

  it('does some others', ()=> {
    expect(punchOut(99, 0, 99, 0)).toEqual([2, 6, 7, 0, 5, 3, 7, 6, 2, 9]);
    expect(punchOut(99, 0, 99, 2)).toEqual([9,4,0,8,6,1,8,5,3,8]);
  });
});
