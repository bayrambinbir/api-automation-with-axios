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

  it("POST user with incomplete user data to verify 422 status code", async () => {
    const postData = qa.customConfig;
    const res = await axios.post(
      qa.baseUrl + "users",
      qa.incompleteUserData,
      postData
    );
    //console.log(res.data.data);
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(422);
    expect(res.data.data).to.not.null;
    expect(res.data.data[0].message).to.be.eq("can't be blank");
  });

  it.only("POST user with a wrong token to see 401 status code", async () => {
    const postData = qa.randomUserData;
    const res = await axios.post(qa.baseUrl + "users", postData, {
      headers: { Authorization: `Bearer asa1231` },
    });
    expect(res.status).to.be.eq(200);
    expect(res.data.code).to.be.eq(401);
    expect(res.data.data.message).to.be.eq("Invalid token");
  });
});
