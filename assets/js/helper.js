export const xDefaultChannel = "KTB";
export const xDefaultCRequesterVb = "KTB";

export const GetCurrentDateTimeRfc3339 = (now = new Date()) => {
    const bangkokTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const year = bangkokTime.getUTCFullYear();
    const month = (bangkokTime.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = bangkokTime.getUTCDate().toString().padStart(2, "0");
    const hours = bangkokTime.getUTCHours().toString().padStart(2, "0");
    const minutes = bangkokTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = bangkokTime.getUTCSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+07:00`;
};

export const GetRandomNumber = (min = 10, max = 100000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const GetUuidWithPrefix = (prefix = "") => {
    let randomUuid = crypto.randomUUID();
    return (
        prefix + randomUuid.substring(prefix.length, randomUuid.length)
    ).replace("--", "-t");
};

export const GenerateTraceparent = () => {
    const version = "00";
    const traceId = GenerateRandomHex(32);
    const parentId = GenerateRandomHex(16);
    const traceFlags = "01"; // Sampled

    return `${version}-${traceId}-${parentId}-${traceFlags}`;
};

export const GenerateRandomHex = (length = 0) => {
    let result = "";
    while (result.length < length) {
        result += Math.random().toString(16).substring(2);
    }
    return result.substring(0, length);
};

export const GetHttpHeader = (data = {}) => {
    const prefix = "DDP-";
    const xRefId = GetUuidWithPrefix();
    const xCorrelationId = GetUuidWithPrefix(prefix);
    const xTraceparent = GenerateTraceparent();
    let defaultHeader = {
        "Content-Type": "application/json",
        "x-channel-id": xDefaultChannel,
        "x-request-date": GetCurrentDateTimeRfc3339().split("T")[0],
        "x-request-time": GetCurrentDateTimeRfc3339().split("T")[1],
        "x-request-id": xRefId+"-reqid",
        "x-correlation-id": xCorrelationId,
        "x-requester": xDefaultCRequesterVb,
        "x-traceparent": xTraceparent,
        "x-devops-src": "perf",
        "x-devops-dest": "perf",
        "x-devops-key": "perf",
    };
    return {
        ...defaultHeader,
        ...data,
    };
};

export const GetHttpHeaderVFS = (data = {}) => {
    const prefix = "DPP-PFM-";
    const xRefId = GetUuidWithPrefix();
    const xCorrelationId = GetUuidWithPrefix(prefix);
    const xTraceparent = GenerateTraceparent();
    let defaultHeader = {
        "Content-Type": "application/json",
        "x-ref-id": xRefId,
        "x-channel": "PT",
        "x-request-date-time": GetCurrentDateTimeRfc3339(),
        "x-correlation-id": xCorrelationId,
        "x-requester": "PT",
        "x-traceparent": xTraceparent,
        "x-devops-src": "",
        "x-devops-dest": "",
        "x-devops-key": "",
    };
    return {
        ...defaultHeader,
        ...data,
    };
};

export const GetHttpHeaderVB = (data = {}) => {
    const prefix = "DDP-";
    const xRefId = GetUuidWithPrefix();
    const xCorrelationId = GetUuidWithPrefix(prefix);
    const xTraceparent = GenerateTraceparent();
    let defaultHeader = {
        "Content-Type": "application/json",
        "x-channel-id": "VB",
        "x-request-date": GetCurrentDateTimeRfc3339().split("T")[0],
        "x-request-time": GetCurrentDateTimeRfc3339().split("T")[1],
        "x-request-id": xRefId+"-reqid",
        "x-correlation-id": xCorrelationId,
        "x-requester": "VB",
        "x-traceparent": xTraceparent,
        "x-devops-src": "perf",
        "x-devops-dest": "perf",
        "x-devops-key": "perf",
    };
    return {
        ...defaultHeader,
        ...data,
    };
};
