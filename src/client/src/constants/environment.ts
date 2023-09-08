import "dotenv/config";

interface ProcessEnv {
  BASE_PARAMS: string;
}
declare const process: {
  env: ProcessEnv;
};

const BASE_URL = process.env.BASE_PARAMS;
export default BASE_URL;
