import axios from "axios";
import { assert, expect } from "chai";
import { faker } from "@faker-js/faker";
import qa from "../../config/qa.js";

describe("PATCH Tests", () => {
  let userId;

  before(async () => {
    userId = await qa.createRamdomUser(
      qa.baseUrl,
      qa.randomUserData,
      qa.customConfig
    );
  });

  it("PATCH name and email test", async () => {
    const getRes = await axios.get(
      qa.baseUrl + "users/" + userId,
      qa.customConfig
    );
    const nameBeforePatching = getRes.data.data.name;
    const emailBeforePatching = getRes.data.data.email;

    const newName = faker.person.firstName();
    while (newName == nameBeforePatching) {
      newName = faker.person.firstName();
    }

    const newEmail = faker.internet.email();
    while (newEmail == emailBeforePatching) {
      newEmail = faker.internet.email();
    }

    const patchRes = await axios.patch(
      qa.baseUrl + "users/" + userId,
      { name: newName, email: newEmail },
      qa.customConfig
    );
    const nameAfterPatching = patchRes.data.data.name;
    const emailAfterPatching = patchRes.data.data.email;

    expect(patchRes.status).to.be.eq(200);
    expect(patchRes.data.code).to.be.eq(200);
    assert.isNotNull(nameAfterPatching, "Name was not supposed to be null");
    assert.isNotNull(emailAfterPatching, "Email was not supposed to be null");
    expect(nameBeforePatching).to.not.be.eq(nameAfterPatching);
    expect(emailBeforePatching).to.not.be.eq(emailAfterPatching);
  });
});
