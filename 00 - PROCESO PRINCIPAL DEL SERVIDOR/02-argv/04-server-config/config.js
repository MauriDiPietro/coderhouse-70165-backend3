import dotenv from "dotenv";

const ENV = process.argv[2];

dotenv.config({
  path:
    ENV === "prod" ? "./.env.prod" : ENV === "dev" ? "./.env.dev" : "./.env",
});

export default {
  ENV: ENV,
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
};
