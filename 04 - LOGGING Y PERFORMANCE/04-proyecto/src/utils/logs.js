import { createLogger, transports, format } from "winston";
const { combine, printf, timestamp, colorize } = format;

const logConfig = {
  format: combine(
    timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    // colorize(),
    printf((info) => `[${info.level}] | ${info.timestamp} | ${info.message}`)
  ),
  transports: [
    new transports.Console({ level: "silly" }),
    new transports.File({
      filename: "./src/utils/logs/logs.log",
      level: "warn",
    }),
  ],
};

export const logger = createLogger(logConfig);
