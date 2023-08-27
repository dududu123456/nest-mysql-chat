import type { AxiosRequestConfig } from "axios";
import axios from "axios";

function commonHttpRequest<Res>(config: AxiosRequestConfig) {
  console.log("commonHttpRequest config", config);
  return new Promise<Res>(async (resolve, reject) => {
    try {
      const res = await axios.request(config);
      const { data } = res;
      resolve(data);
      console.log("commonHttpRequest res.data", data);
    } catch (err) {
      console.log("commonHttpRequest err", err);
      reject(err);
    }
  });
}

export function requestDemo() {
  return commonHttpRequest<any>({
    url: "http://localhost:3000/api/cats",
    method: "get",
  });
}
