import { jest } from "@jest/globals";

import supertest from "supertest";
import app from "../app.js";

jest.mock("../models/User.js");

describe("POST /api/users/login", () => {
  test("should return status code 200, token, and user object with email and subscription fields", async () => {


    const response = await supertest(app).post("/api/users/login").send({
      email: "User1@mail.com",
      password: "123456",
    });

    console.log("response", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("User1@mail.com");
    expect(typeof response.body.user.email).toBe("string");
  });
});
