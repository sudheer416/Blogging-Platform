const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./index.js");
const db = require("./config/dbConnect.js");
//console.log("app...", app);
chai.use(chaiHttp);

const expect = chai.expect;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NDdlZGRhNjY4YzVlYmMwOTZjMSIsImlhdCI6MTcwMTA1OTkzOCwiZXhwIjoxNzg3NDU5OTM4fQ.Dhy9nbAuuX5LQJdE2JY0l2n22LW-UbWLjUQy8Dx5XZM";
describe("blogs  managment test", () => {
  let token; // To store the JWT token

  before(async () => {
    // Perform  before running tests

    console.log("hhh");
    db.connectDB();
  });

  it("Get all Blogs", async () => {
    const response = await chai.request(app).get("/api/v1/blogs/post");
    console.log("get all users");
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.an("array");
  });

  it("should create a new blog post", async () => {
    const token =
      " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NDdlZGRhNjY4YzVlYmMwOTZjMSIsImlhdCI6MTcwMTA1OTkzOCwiZXhwIjoxNzg3NDU5OTM4fQ.Dhy9nbAuuX5LQJdE2JY0l2n22LW-UbWLjUQy8Dx5XZM";

    console.log("post..", token);
    const response = await chai
      .request(app)
      .post("/api/v1/blogs/post")
      .set("authorization", token)
      .send({
        title: "test title",
        content: "new test content",
      });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("status").that.equals("success");
  });
  it("should fail to create a blog post without authentication", async () => {
    const token =
      " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NDdlZGRhNjY4YzVlYmMwOTZjMSIsImlhdCI6MTcwMTA1OTkzOCwiZXhwIjoxNzg3NDU5OTM4fQ.Dhy9nbAuuX5LQJdE2JY0l2n22LW-UbWLjUQy8Dx5XZM1";

    console.log("post..", token);
    const response = await chai
      .request(app)
      .post("/api/v1/blogs/post")
      .set("authorization", token)
      .send({
        title: "test title",
        content: "new test content",
      });
    console.log(response.body);
    expect(response).to.have.status(401);
    expect(response.body)
      .to.have.property("message")
      .that.equals("Invalid token please provide vaild token");
  });

  it("authentiacte user only should upate on own post", async () => {
    const token =
      " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NDdlZGRhNjY4YzVlYmMwOTZjMSIsImlhdCI6MTcwMTA1OTkzOCwiZXhwIjoxNzg3NDU5OTM4fQ.Dhy9nbAuuX5LQJdE2JY0l2n22LW-UbWLjUQy8Dx5XZM";

    console.log("post..", token);
    const response = await chai
      .request(app)
      .patch("/api/v1/blogs/post/6564ed1927b00535a43a4236")
      .set("authorization", token)
      .send({
        content: "new  content",
      });

    expect(response).to.have.status(203);
    expect(response.body)
      .to.have.property("message")
      .that.equals("Updated post Successfully");
  });
});
