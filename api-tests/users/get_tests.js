import axios from "axios";
import qa from "../../config/qa.js";
import "dotenv/config";
import { expect } from "chai";

const TOKEN = process.env.USER_TOKEN;

describe("GET tests for users", () => {
  let lastId;
  it("GET all users", async () => {
    try {
      const res = await axios.get(qa.baseUrl + "users", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (!res.data) throw new Error("res.data was not found");
      expect(res.data).to.not.null;
      expect(res.data.code).to.be.eq(200);
      const countOfData = res.data.data.length;
      lastId = res.data.data[countOfData - 1].id;
    } catch (error) {
      qa.catchError(error);
    }
    // return axios
    //   .get(qa.baseUrl + "users", {
    //     headers: {
    //       Authorization: `Bearer ${TOKEN}`,
    //     },
    //   })
    //   .then((res) => {
    //     expect(res.data).to.not.null;
    //     expect(res.data.code).to.be.eq(200);
    //     expect(res.data.meta.pagination.total).to.be.eq(2965);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  });

  it("Get a user witd id", async () => {
    const res = await axios.get(qa.baseUrl + "users/" + lastId, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.data.data.id).to.be.eq(lastId);
  });
});
