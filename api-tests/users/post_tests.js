import axios from "axios";
import qa from "../../config/qa.js";
import { expect, use } from "chai";

describe("POST tests for users", () => {
  let userId;
  it("POST user with randomly created data", async () => {
    console.log("Authorization: " + qa.customConfig.headers.Authorization);
    const res = await axios.post(
      qa.baseUrl + "users",
      qa.randomUserData,
      qa.customConfig
    );
    console.log(res.data.data);
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(201);
    expect(res.data.data).to.not.null;
    expect(res.data.data).to.deep.include(qa.randomUserData);
    userId = res.data.data.id;
  });
});
