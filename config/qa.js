import { faker } from "@faker-js/faker";
import "dotenv/config";

const TOKEN = process.env.USER_TOKEN;

export default {
  baseUrl: "https://gorest.co.in/public-api/",
  catchError: (error) => {
    if (error.response) {
      // Request made but the server responded with an error
      console.log("error.response.data: " + error.response.data);
      console.log("error.response.status: " + error.response.status);
      console.log("error.response.headers: " + error.response.headers);
    } else if (error.request) {
      // Request made but no response is received from the server.
      console.log("error.request: " + error.request);
    } else {
      // Error occured while setting up the request
      console.log("Error", error.message);
    }
  },
  randomUserData: {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    gender: "male",
    status: "active",
  },
  incompleteUserData: {
    name: faker.person.firstName(),
    gender: "male",
    status: "active",
  },
  customConfig: {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  },
};
