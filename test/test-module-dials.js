require("jsdom-global")();
const chai = require("chai");
const assert = chai.assert;
const Watch = require("../src/index");

chai.should();

describe("Dials", () => {
  it('should return a Watch instance with a "dials" property.', () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
            second: "second-hand",
          },
          format: 24,
        },
      ],
    };
    const test = new Watch(settings);
    test.should.have.property("dialInstances");
  });

  it('should return a Watch instance with multiple "dials".', () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
            second: "second-hand",
          },
          format: 24,
        },
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
            second: "second-hand",
          },
          format: 24,
        },
      ],
    };
    const test = new Watch(settings);
    assert.lengthOf(test.dialInstances, 2);
  });

  it("should return an error from the Watch class for not providing dial hands", () => {
    const settings = {
      testing: true,
      dials: [
        {
          format: 24,
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "The Dial class needs an object containing the HTML elements for the hands."
    );
  });

  it("should return an error from the Watch class not providing a retrograde id", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
          },
          retrograde: {
            second: {
              duration: 25,
            },
          },
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "The retrograde second requires an id property be provided."
    );
  });

  it("should return an error from the Watch class having multiple second hands", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
            second: "second-hand",
          },
          retrograde: {
            second: {
              id: "second-hand",
            },
          },
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "A dial can only support one second hand at a time - either traditional or retrograde."
    );
  });

  it("should return an error from a retrograde second with too short a duration", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
          },
          retrograde: {
            second: {
              id: "second-hand",
              duration: 2,
            },
          },
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "The retrograde second hand requires a duration no less than 5."
    );
  });

  it("should return an error from the Watch class having a retrograde duration not divisible by 60", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
          },
          retrograde: {
            second: {
              id: "second-hand",
              duration: 11,
            },
          },
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "The retrograde second hand requires a duration that is evenly divisble by 60."
    );
  });

  it("should contain the correct Timezone value", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: "hour-hand",
            minute: "minute-hand",
          },
          timezone: "American/New_York",
        },
      ],
    };
    const test = new Watch(settings);
    assert.equal(test.dialInstances[0].timezone, "American/New_York");
  });

  it("should return an error from the Watch class having a split display but missing a hand property", () => {
    const settings = {
      testing: true,
      dials: [
        {
          hands: {
            hour: {
              ones: "test-hand",
            },
            minute: "minute-hand",
          },
        },
      ],
    };
    const test = () => new Watch(settings);
    assert.throws(
      test,
      ReferenceError,
      "A split display requires that the 'ones' and 'tenths' properties are both set."
    );
  });
});
