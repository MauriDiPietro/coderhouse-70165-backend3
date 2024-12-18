import { createLogger, transports, format } from "winston";
const { combine, printf, timestamp, colorize } = format;

const logConfig = {
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((info) => `[${info.level}] | ${info.timestamp} | ${info.message}`)
  ),
  transports: [new transports.Console({ level: "silly" })],
};

const logger = createLogger(logConfig);

logger.silly("imprimimos silly");
logger.debug("imprimimos debug");
logger.verbose("imprimimos verboose");
logger.info("imprimimos info");
logger.http("imprimimos http");
logger.warn("imprimimos warn");
logger.error("imprimimos error");
