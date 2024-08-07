import { ErrorResponse, FetchOptions } from "../typings/fetch";

// 统一请求
export const apiFetch = async <T>(
  path: string,
  options: FetchOptions
): Promise<T> => {
  const { method, pathParams, queryParams, body } = options;

  let url = path;
  if (pathParams) {
    Object.keys(pathParams).forEach((key) => {
      url = url.replace(`:${key}`, pathParams[key]);
    });
  }

  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += `?${queryString}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let responseData: any;
  try {
    responseData = await response.json();
  } catch (e) {
    if (response.status === 200) {
      responseData = {};
    } else {
      throw {
        status: response.status,
        data: null,
        message: "Failed to parse response JSON",
      } as ErrorResponse;
    }
  }

  if (!response.ok) {
    throw {
      status: response.status,
      data: responseData.data || null,
      message: responseData.message || "Unable to parse error information",
    } as ErrorResponse;
  }

  return responseData as T;
};
