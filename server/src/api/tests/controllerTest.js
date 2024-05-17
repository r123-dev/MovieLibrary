let chai = require('chai');
const chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

describe('Testing controller method', () => {
  //Get example
  /*it("It should GET all episodes", (done) => {
        chai.request(server)
            .get("/episodes")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
            });
        done();
    });*/
  //Post example
  /*it("It should POST comment by episode", (done) => {
    const body = { comment: "this a comment" };
    chai
      .request(server)
      .post("/comments/1")
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
    done();
  });*/
});
