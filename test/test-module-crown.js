// require('jsdom-global')();
// const chai = require('chai');
// const assert = require('assert');
// const Watch = require('../src/index');

// chai.should();

// describe('Crown', () => {
//     it('should return a Watch instance with a "crown" property.', () => {
//         const settings = {
//             testing: true,
//             dials: [{
//                 hands: {
//                     hour: 'chronograph-hour-hand',
//                 },
//             }],
//             crown: {
//                 id: 'crown-btn'
//             }
//         };
//         const test = new Watch(settings);
//         test.should.have.property('crown');
//     });

//     it('should return a Watch instance with a "crown" property using only a string declaration.', () => {
//         const settings = {
//             testing: true,
//             dials: [{
//                 hands: {
//                     hour: 'chronograph-hour-hand',
//                 },
//             }],
//             crown: 'crown-btn'
//         };
//         const test = new Watch(settings);
//         test.should.have.property('crown');
//     });

//     it('should return an error from the Watch class for not providing a crown ID', () => {
//         const settings = {
//             testing: true,
//             dials: [{
//                 hands: {
//                     hour: 'chronograph-hour-hand',
//                 },
//             }],
//             crown: {}
//         };
//         const test = () => new Watch(settings);
//         assert.throws(test, ReferenceError, 'The Crown class requires that an ID of the crown element be provided.');
//     });
// });