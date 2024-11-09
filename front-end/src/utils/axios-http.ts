/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
// import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { config } from '../../config'

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.API_REQUEST_TIMEOUT,
})

axiosInstance.interceptors.request.use(
  req => {
    const token = localStorage.getItem('token') || ''
    req.headers.Authorization = `Bearer ${token}`
    return req
  },
  err => {
    return Promise.reject(err)
  },
)

// interface StatusCodeHandlers {
//   404?: () => void
//   200?: () => void
//   [statusCode: number]: (() => void) | undefined
// }

// type Route = keyof API_ROUTE_TYPE_DEFINITION;

// Utility type to get the type of a route's value
// type RouteValue<R extends Route> = API_ROUTE_TYPE_DEFINITION[R];


// type FetchFromApi<T, R extends Route> = {
//   config?: AxiosRequestConfig
//   success?: (data: T | RouteValue<R>) => void
//   error?: (err: AxiosError | Error) => void
//   statusCode?: StatusCodeHandlers
// }

// function fetchFromApi<T = any, R extends Route = Route>(
//   url: R,
//   args: FetchFromApi<T, R>,
// ): Promise<T | RouteValue<R> | undefined>;
// async function fetchFromApi<T = any, R extends Route = Route>(
//   url: R,
//   args: FetchFromApi<T, R>,
// ): Promise<T | RouteValue<R> | undefined> {
//   const { config, success, error } = args
//   try {
//     const axiosConfig: AxiosRequestConfig = {
//       ...config,
//     }

//     const response: AxiosResponse<T |  RouteValue<R>> = await axiosInstance.request({
//       url,
//       method: config?.method || 'GET',
//       ...axiosConfig,
//     })

//     if (response.status >= 200 && response.status < 300) {
//       if (success) success(response.data)
//       if (args.statusCode && args.statusCode[response.status]) {
//         args.statusCode[response.status]?.()
//       }
//       return response.data;
//     } else {
//       throw new Error(`Request failed with status ${response.status}`)
//     }
//   } catch (err: any) {
//     console.error('$fetch error', err)
//     const axiosError = err as AxiosError
//     if (axiosError.isAxiosError && axiosError.response) {
//       console.error('$fetch error', axiosError.response)
//       if (error) error(axiosError)
//       if (
//         args.statusCode &&
//         args.statusCode[axiosError.response?.status || 404]
//       ) {
//         args.statusCode[axiosError.response?.status || 404]?.()
//       }
//     } else {
//       console.error('$fetch error', err)
//       if (error) error(err)
//     }
//     return undefined
//   }
// }
// async function fetchFromApi<R extends Route>(
//   url: R,
//   request: RouteValue<R>['request'],
//   config?: AxiosRequestConfig
// ): Promise<RouteValue<R>['response'][keyof RouteValue<R>['response']] | undefined> {

// async function fetchFromApi<R extends Route>(route: R, request: RouteValue<R>['request'], config?: AxiosRequestConfig) {
//   let url = route as string
//   if (request.params) {
//     const params = request.params as any;
//     url = url.replace(/{(\w+)}/g, (_, key: string) => {
//       if (params[key] && (typeof params[key] === 'string' || typeof params[key] === 'number')) {
//         return params[key].toString()
//       }
//       throw new Error(`Missing parameter ${key} in api ${route} request`)
//     })
//   }
//   const axiosConfig: AxiosRequestConfig = {
//     ...config,
//   }
//   if (request.query) {
//     axiosConfig.params = request.query
//   }
//   try {
//     const response: AxiosResponse = await axiosInstance.request({
//       url,
//       method: config?.method || 'GET',
//       ...axiosConfig,
//     })
//     const statusCode = response.status
//     return {
//       [statusCode]: response.data,
//       data: response.data,
//     } as unknown as (RouteValue<R>['response'] & { data: any })
//   } catch (err: any) {
//     console.error('$fetch error', err)
//     return null
//   }
// }
// const $fetch = fetchFromApi
const $http = axiosInstance
export default $http
