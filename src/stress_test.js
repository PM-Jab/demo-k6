import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { GetHttpHeader } from "/Users/ar667468/Desktop/possawee/demo-k6/assets/js/helper.js";

export const options = {
    scenarios: {
        achieve_target_tps: {
            executor: 'ramping-arrival-rate',
            timeUnit: '1s',
            preAllocatedVUs: 10,
            stages: [
                { duration: '1m', target: 10 },
                { duration: '5m', target: 10 },
                { duration: '1m', target: 0 },
            ],
        },
    },
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

    const response = http.post(
        "http://localhost:3000/demo",
        JSON.stringify(reqBody),
        reqHeader
    );


    const isSuccess = check(response, {
        "status is 200": (r) => r.status === 200,
        "response code is 0000": (r) => r.json().code === "0000",
    });

    if (!isSuccess) {
        console.error(`Request for account ${randomPocket.AccountID} failed. Status: ${response.status}, Body: ${response.body}`);
    }
};

export function handleSummary(data) {
    const runId = __ENV.RUN_ID || "NO-RUN-ID";
    return {
        [`/account/tmp/report-${runId}.html`]: htmlReport(data),
        [`/account/tmp/report-${runId}.txt`]: textSummary(data, {
            indent: " ",
            enableColors: false,
        }),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
