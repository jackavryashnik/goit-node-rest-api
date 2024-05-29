import { jest } from "@jest/globals";
import supertest from "supertest";
import app from "../app.js";

jest.mock("../models/User.js");


// Should be real user data
const email = "yevhen@gmail.com";
const password = "12345678";

describe("POST /api/users/login", () => {
  test("should return status code 200, token, and user object with email and subscription fields", async () => {


    const response = await supertest(app).post("/api/users/login").send({
      email: email,
      password: password,
    });

    console.log("response", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(email);
    expect(typeof response.body.user.email).toBe("string");
  });
});
