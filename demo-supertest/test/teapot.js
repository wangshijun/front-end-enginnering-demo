const request = require('supertest');
const expect = require('chai').expect;
const server = require('../server.js');

describe('api', () => {

    it('should return status 418 and content', (done) => {
        request(server)
            .get('/api/teapot')
            .expect('Content-Type', /text/)
            .expect(418)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res.text).to.equal('I am a teapot');
                done();
            });
    });

});
