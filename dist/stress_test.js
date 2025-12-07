/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/helper.js":
/*!*****************************!*\
  !*** ./assets/js/helper.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GenerateRandomHex: () => (/* binding */ GenerateRandomHex),\n/* harmony export */   GenerateTraceparent: () => (/* binding */ GenerateTraceparent),\n/* harmony export */   GetCurrentDateTimeRfc3339: () => (/* binding */ GetCurrentDateTimeRfc3339),\n/* harmony export */   GetHttpHeader: () => (/* binding */ GetHttpHeader),\n/* harmony export */   GetHttpHeaderVB: () => (/* binding */ GetHttpHeaderVB),\n/* harmony export */   GetHttpHeaderVFS: () => (/* binding */ GetHttpHeaderVFS),\n/* harmony export */   GetRandomNumber: () => (/* binding */ GetRandomNumber),\n/* harmony export */   GetUuidWithPrefix: () => (/* binding */ GetUuidWithPrefix),\n/* harmony export */   xDefaultCRequesterVb: () => (/* binding */ xDefaultCRequesterVb),\n/* harmony export */   xDefaultChannel: () => (/* binding */ xDefaultChannel)\n/* harmony export */ });\nconst xDefaultChannel = \"KTB\";\nconst xDefaultCRequesterVb = \"KTB\";\nconst GetCurrentDateTimeRfc3339 = (now = new Date()) => {\n  const bangkokTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);\n  const year = bangkokTime.getUTCFullYear();\n  const month = (bangkokTime.getUTCMonth() + 1).toString().padStart(2, \"0\");\n  const day = bangkokTime.getUTCDate().toString().padStart(2, \"0\");\n  const hours = bangkokTime.getUTCHours().toString().padStart(2, \"0\");\n  const minutes = bangkokTime.getUTCMinutes().toString().padStart(2, \"0\");\n  const seconds = bangkokTime.getUTCSeconds().toString().padStart(2, \"0\");\n  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+07:00`;\n};\nconst GetRandomNumber = (min = 10, max = 100000) => {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\nconst GetUuidWithPrefix = (prefix = \"\") => {\n  let randomUuid = crypto.randomUUID();\n  return (prefix + randomUuid.substring(prefix.length, randomUuid.length)).replace(\"--\", \"-t\");\n};\nconst GenerateTraceparent = () => {\n  const version = \"00\";\n  const traceId = GenerateRandomHex(32);\n  const parentId = GenerateRandomHex(16);\n  const traceFlags = \"01\"; // Sampled\n\n  return `${version}-${traceId}-${parentId}-${traceFlags}`;\n};\nconst GenerateRandomHex = (length = 0) => {\n  let result = \"\";\n  while (result.length < length) {\n    result += Math.random().toString(16).substring(2);\n  }\n  return result.substring(0, length);\n};\nconst GetHttpHeader = (data = {}) => {\n  const prefix = \"DDP-\";\n  const xRefId = GetUuidWithPrefix();\n  const xCorrelationId = GetUuidWithPrefix(prefix);\n  const xTraceparent = GenerateTraceparent();\n  let defaultHeader = {\n    \"Content-Type\": \"application/json\",\n    \"x-channel-id\": xDefaultChannel,\n    \"x-request-date\": GetCurrentDateTimeRfc3339().split(\"T\")[0],\n    \"x-request-time\": GetCurrentDateTimeRfc3339().split(\"T\")[1],\n    \"x-request-id\": xRefId + \"-reqid\",\n    \"x-correlation-id\": xCorrelationId,\n    \"x-requester\": xDefaultCRequesterVb,\n    \"x-traceparent\": xTraceparent,\n    \"x-devops-src\": \"perf\",\n    \"x-devops-dest\": \"perf\",\n    \"x-devops-key\": \"perf\"\n  };\n  return {\n    ...defaultHeader,\n    ...data\n  };\n};\nconst GetHttpHeaderVFS = (data = {}) => {\n  const prefix = \"DPP-PFM-\";\n  const xRefId = GetUuidWithPrefix();\n  const xCorrelationId = GetUuidWithPrefix(prefix);\n  const xTraceparent = GenerateTraceparent();\n  let defaultHeader = {\n    \"Content-Type\": \"application/json\",\n    \"x-ref-id\": xRefId,\n    \"x-channel\": \"PT\",\n    \"x-request-date-time\": GetCurrentDateTimeRfc3339(),\n    \"x-correlation-id\": xCorrelationId,\n    \"x-requester\": \"PT\",\n    \"x-traceparent\": xTraceparent,\n    \"x-devops-src\": \"\",\n    \"x-devops-dest\": \"\",\n    \"x-devops-key\": \"\"\n  };\n  return {\n    ...defaultHeader,\n    ...data\n  };\n};\nconst GetHttpHeaderVB = (data = {}) => {\n  const prefix = \"DDP-\";\n  const xRefId = GetUuidWithPrefix();\n  const xCorrelationId = GetUuidWithPrefix(prefix);\n  const xTraceparent = GenerateTraceparent();\n  let defaultHeader = {\n    \"Content-Type\": \"application/json\",\n    \"x-channel-id\": \"VB\",\n    \"x-request-date\": GetCurrentDateTimeRfc3339().split(\"T\")[0],\n    \"x-request-time\": GetCurrentDateTimeRfc3339().split(\"T\")[1],\n    \"x-request-id\": xRefId + \"-reqid\",\n    \"x-correlation-id\": xCorrelationId,\n    \"x-requester\": \"VB\",\n    \"x-traceparent\": xTraceparent,\n    \"x-devops-src\": \"perf\",\n    \"x-devops-dest\": \"perf\",\n    \"x-devops-key\": \"perf\"\n  };\n  return {\n    ...defaultHeader,\n    ...data\n  };\n};\n\n//# sourceURL=webpack://demo-k6/./assets/js/helper.js?\n}");

/***/ }),

/***/ "./src/stress_test.js":
/*!****************************!*\
  !*** ./src/stress_test.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   options: () => (/* binding */ options)\n/* harmony export */ });\n/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! k6/http */ \"k6/http\");\n/* harmony import */ var k6_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(k6_http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! k6 */ \"k6\");\n/* harmony import */ var k6__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(k6__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var https_raw_githubusercontent_com_benc_uk_k6_reporter_main_dist_bundle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js */ \"https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js\");\n/* harmony import */ var https_raw_githubusercontent_com_benc_uk_k6_reporter_main_dist_bundle_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(https_raw_githubusercontent_com_benc_uk_k6_reporter_main_dist_bundle_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var https_jslib_k6_io_k6_summary_0_0_1_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! https://jslib.k6.io/k6-summary/0.0.1/index.js */ \"https://jslib.k6.io/k6-summary/0.0.1/index.js\");\n/* harmony import */ var https_jslib_k6_io_k6_summary_0_0_1_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(https_jslib_k6_io_k6_summary_0_0_1_index_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var k6_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! k6/data */ \"k6/data\");\n/* harmony import */ var k6_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(k6_data__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var https_jslib_k6_io_papaparse_5_1_1_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! https://jslib.k6.io/papaparse/5.1.1/index.js */ \"https://jslib.k6.io/papaparse/5.1.1/index.js\");\n/* harmony import */ var https_jslib_k6_io_papaparse_5_1_1_index_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(https_jslib_k6_io_papaparse_5_1_1_index_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Users_ar667468_Desktop_possawee_demo_k6_assets_js_helper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/js/helper.js */ \"./assets/js/helper.js\");\n\n\n\n\n\n\n\nconst options = {\n  scenarios: {\n    achieve_target_tps: {\n      executor: 'ramping-arrival-rate',\n      timeUnit: '1s',\n      preAllocatedVUs: 10,\n      stages: [{\n        duration: '1m',\n        target: 10\n      }, {\n        duration: '5m',\n        target: 10\n      }, {\n        duration: '1m',\n        target: 0\n      }]\n    }\n  },\n  summaryTrendStats: [\"avg\", \"med\", \"min\", \"max\", \"p(90)\", \"p(95)\", \"p(99)\"]\n};\nconst accounts = new k6_data__WEBPACK_IMPORTED_MODULE_4__.SharedArray(\"accounts\", function () {\n  const csvFilePath = \"../assets/accounts.csv\";\n  const file = open(csvFilePath);\n  const parsed = https_jslib_k6_io_papaparse_5_1_1_index_js__WEBPACK_IMPORTED_MODULE_5___default().parse(file, {\n    header: true\n  });\n  return parsed.data;\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  const randomAccount = accounts[Math.floor(Math.random() * (accounts.length - 1))];\n\n  // Http request body\n  let reqBody = {\n    username: randomAccount.AccountID\n  };\n  const reqHeader = {\n    headers: (0,_Users_ar667468_Desktop_possawee_demo_k6_assets_js_helper_js__WEBPACK_IMPORTED_MODULE_6__.GetHttpHeader)(),\n    timeout: \"30s\"\n  };\n  const response = k6_http__WEBPACK_IMPORTED_MODULE_0___default().post(\"http://localhost:3000/demo\", JSON.stringify(reqBody), reqHeader);\n  const isSuccess = (0,k6__WEBPACK_IMPORTED_MODULE_1__.check)(response, {\n    \"status is 200\": r => r.status === 200,\n    \"response code is 0000\": r => r.json().code === \"0000\"\n  });\n  if (!isSuccess) {\n    console.error(`Request for account ${randomPocket.AccountID} failed. Status: ${response.status}, Body: ${response.body}`);\n  }\n});\n\n// export function handleSummary(data) {\n//     const runId = __ENV.RUN_ID || \"NO-RUN-ID\";\n//     return {\n//         [`/account/tmp/report-${runId}.html`]: htmlReport(data),\n//         [`/account/tmp/report-${runId}.txt`]: textSummary(data, {\n//             indent: \" \",\n//             enableColors: false,\n//         }),\n//         stdout: textSummary(data, { indent: \" \", enableColors: true }),\n//     };\n// }\n\n//# sourceURL=webpack://demo-k6/./src/stress_test.js?\n}");

/***/ }),

/***/ "https://jslib.k6.io/k6-summary/0.0.1/index.js":
/*!****************************************************************!*\
  !*** external "https://jslib.k6.io/k6-summary/0.0.1/index.js" ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = require("https://jslib.k6.io/k6-summary/0.0.1/index.js");

/***/ }),

/***/ "https://jslib.k6.io/papaparse/5.1.1/index.js":
/*!***************************************************************!*\
  !*** external "https://jslib.k6.io/papaparse/5.1.1/index.js" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = require("https://jslib.k6.io/papaparse/5.1.1/index.js");

/***/ }),

/***/ "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js":
/*!********************************************************************************************!*\
  !*** external "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js" ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

/***/ }),

/***/ "k6":
/*!*********************!*\
  !*** external "k6" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("k6");

/***/ }),

/***/ "k6/data":
/*!**************************!*\
  !*** external "k6/data" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("k6/data");

/***/ }),

/***/ "k6/http":
/*!**************************!*\
  !*** external "k6/http" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("k6/http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/stress_test.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;