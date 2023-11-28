const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./index.js");
const db = require("./config/dbConnect.js");
//console.log("app...", app);
chai.use(chaiHttp);

const expect = chai.expect;
describe("User Testing", () => {
  let token; // To store the JWT token

  before(async () => {
    // Perform  before running tests

    console.log("hhh");
    db.connectDB();
  });

  // after(async () => {
  //   db.closeDB;
  // });

  it("ok  getting users", async () => {
    const response = await chai.request(app).get("/api/v1/users");
    console.log("get all users");
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.an("array");

    // expect(response.body).to.have.a("array");
  });

  it("should fail to register an existing user", async () => {
    const user = {
      name: "new user",
      email: "janaki@gmail.com",
      password: "123456789",
    };
    const response = await chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user);
    console.log(response.body);
    expect(response).to.have.status(400);
    console.log("erre", response.body.message);
    expect(response.body)
      .to.have.property("message")
      .that.equals(
        `Duplicate fields values ${user.email} please  use another  value`
      );
  });

  it("should authenticate a user and return a token", async () => {
    const response = await chai.request(app).post("/api/v1/users/login").send({
      email: "janaki@gmail.com",
      password: "123456789",
    });
    console.log(response.body);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("token");
  });

  it("should fail to authenticate with invalid credentials", async () => {
    const response = await chai.request(app).post("/api/v1/users/login").send({
      email: "newuser@gmail.com",
      password: "12345678",
    });
    console.log(response.body);
    expect(response).to.have.status(401);
    expect(response.body)
      .to.have.property("message")
      .that.equals("Please give correct email & password");
  });
});
