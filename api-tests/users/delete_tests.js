import axios from "axios";
import { expect } from "chai";

import qa from "../../config/qa.js";

describe("DELETE Tests", () => {
  let userId;

  before(async () => {
    userId = await qa.createRamdomUser(
      qa.baseUrl,
      qa.randomUserData,
      qa.customConfig
    );
  });

  it("DELETE a user with valid id to see 204 status code", async () => {
    const res = await axios.delete(
      qa.baseUrl + "users/" + userId,
      qa.customConfig
    );
    // console.log(res.data);
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(204);
    expect(res.data).to.not.null;
  });

  it("DELETE a user with INVALID id to see 404 status code", async () => {
    const res = await axios.delete(qa.baseUrl + "users/3133", qa.customConfig);
    // console.log(res.data);
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(404);
    expect(res.data).to.not.null;
    expect(res.data.data.message).to.be.eq("Resource not found");
  });

  it("DELETE a user with invalid token to see 401", async () => {
    const base = qa.baseUrl + "users/" + userId;
    const res = await axios.delete(base, {
      headers: { Authorization: `Bearer asa1231` },
    });
    // console.log(res.data);
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(401);
    expect(res.data.data.message).to.be.eq("Invalid token");
  });
});
