const fs = require("fs");
const fsPromise = fs.promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const { json } = require("stream/consumers");

const logsEvent = async (method, urlpath, resStatus, resBody) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logRequest = ` Request : ${uuid()}    ${method}   ${urlpath}   ${dateTime}`;
  const logResponse = `Response : status:${resStatus} `;
  const logItem = {
    logRequest: logRequest,
    logResponse: logResponse,
  };
  console.log(`${JSON.stringify(logItem)} \n`);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", "evntLogs.txt"),
      `${JSON.stringify(logItem)} \n`
    );
  } catch (err) {
    console.log("Error :", err);
  }
};

const logs = (req, res, next) => {
  logsEvent(req.method, req.url, res.statusCode, res.body);
  next();
};

module.exports = { logs, logsEvent };
