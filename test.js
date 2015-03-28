import PunchOut from './index.js';


describe('punch out passwords', () => {
  let punchOut;
  beforeEach(() => { punchOut = new PunchOut() });
  it('adds an offset', () => {
    let input = [0, 3, 6, 5, 0, 1, 5, 2, 6, 5];
    let output = [6, 6, 1, 2, 9, 1, 6, 6, 8, 3];

    expect(punchOut.addOffset(input)).toEqual(output);
  });
});
