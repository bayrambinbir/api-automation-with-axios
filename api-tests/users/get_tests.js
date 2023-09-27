import axios from "axios";
import qa from "../../config/qa.js";
import "dotenv/config";
import { expect } from "chai";

const TOKEN = process.env.USER_TOKEN;

describe("GET tests for users", () => {
  it("GET all users", async () => {
    return axios
      .get(qa.baseUrl + "users", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        expect(res.data).to.not.null;
        expect(res.data.code).to.be.eq(200);
        expect(res.data.meta.pagination.total).to.be.eq(2965);
      });
  });
});
