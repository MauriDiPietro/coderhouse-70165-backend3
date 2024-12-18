import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./logs/ejemplo-1.log" },
    consoleAppender: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "consoleAppender"], level: "trace" },
    dev: { appenders: ["consoleAppender"], level: "trace" },
    prod: { appenders: ["fileAppender"], level: "warn" },
  },
});

const ENV = 'prod'

let logger = log4js.getLogger(`${ENV}`);
/*
TRACE
DEBUG
INFO
WARN
ERROR
FATAL
*/

logger.trace("Imprimimos trace");
logger.debug("Imprimimos debug");
logger.info("Imprimimos info");
logger.warn("Imprimimos warn");
logger.error("Imprimimos error");
logger.fatal("Imprimimos fatal");
