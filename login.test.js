import supertest from "supertest";
import mongoose from "mongoose";
import app from "./app.js";

const { login } = (await import("./controllers/usersControllers.js")).default;

mongoose.set("strictQuery", false);
const DB_TEST_URI = process.env.DB_TEST_URI;
jest.mock('../db/models/User.js');

console.log('env db', DB_TEST_URI);

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should not register the same user 2 times", async () => {
    await supertest(app).post("/api/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    const response = await supertest(app).post("/api/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(409);
  });

  it("should verify", async () => {
    const user = await User.findOne({ email: "testUser2@gmail.com" });
    const response = await supertest(app).get(
      `/api/users/verify/${user.verificationToken}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.data.message).toBe("Verification successful");
  });

  it("should login", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.user.email).toBe({
      token,
      user: { email: "testUser1@gmail.com", subscription: "starter" },
    });
  });
});
