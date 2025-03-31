
function generateTrackingCode(keyword = "") {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    const keywordPart = keyword ? keyword.toLowerCase().replace(/\s+/g, '').substring(0, 6) : "";
    return `${keywordPart}${timestamp}${randomPart}`.toUpperCase();
}

console.log(generateTrackingCode("dkfdlkf"))

const damn = ""