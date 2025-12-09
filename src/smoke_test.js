import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { GetHttpHeader } from "../assets/js/helper.js";

export const options = {
  vus: 5,
  iterations: 100,
  duration: "1m",
  summaryTrendStats: ["avg", "med", "min", "max", "p(90)", "p(95)", "p(99)"],
};

const accounts = new SharedArray("accounts", function () {
  const csvFilePath = "../assets/accounts.csv";
  const file = open(csvFilePath);
  const parsed = papaparse.parse(file, { header: true });
  return parsed.data;
});

export default () => {
  const randomAccount = accounts[Math.floor(Math.random() * (accounts.length - 1))];

  // Http request body
  let reqBody = {
    username: randomAccount.AccountID,
  };

  const reqHeader = {
    headers: GetHttpHeader(),
    timeout: "30s",
  };

  const response = http.post("http://127.0.0.1:6000/demo", JSON.stringify(reqBody), reqHeader);

  // check response
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response code is 0000": (r) => r.json().code === "0000",
  });

  // sleep for next round
  sleep(0.1);
};