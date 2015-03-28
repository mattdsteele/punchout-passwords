import PunchOut from './index.js';

describe('punch out passwords', () => {
  let punchOut;
  beforeEach(() => { punchOut = new PunchOut() });
  it('adds an offset', () => {
    let input = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];

    expect(punchOut.addOffset(input)).toEqual(output);
  });

  it('creates a checksum', ()=> {
    expect(punchOut.makeOffset(2, 4, 0, 1, 1, 9)).toEqual(238);
  });

  it('creates intermediate bits', ()=> {
    let expected = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0];
    expect(punchOut.intermediateBits(2, 4, 0, 1, 1, 9)).toEqual(expected);
  });
  it('creates intermediate bits', ()=> {
    let intermediate = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0];
    let expected =     [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0];
    expect(punchOut.addOpponent(intermediate, 238, 2)).toEqual(expected);
  });
});
