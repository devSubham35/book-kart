import { constants } from "@/lib/constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { sucessNotificationEndPoints } from "../endpoints";
import { BaseApiResponse } from "@/typescript/interface/common.types";
import { globalCatchError, globalCatchSucess, globalCatchWarning } from "@/lib/functions/_helper.lib";


const axiosInstance = axios.create({
  baseURL: constants.BASE_API_URL,
});

// axiosInstance.interceptors.request.use((config) => {

//   const cookies = parseCookies();
//   const token = cookies?.[constant.ACCESS_TOKEN];

//   if (token && !!config.headers) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (sucessNotificationEndPoints.includes(res.config.url as string)) {
      if (res?.status === 200 || res?.status === 201) {
        globalCatchSucess(res);
      } else {
        globalCatchWarning(res);
      }
    }

    return res;
  },

  async (error: AxiosError<BaseApiResponse>) => {

    if (error?.status == 401) {
      globalCatchError(error);
      window.location.reload();
    } else {
      globalCatchError(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
