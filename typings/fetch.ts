import { AlertColor } from "@mui/material";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchOptions {
  method: string;
  pathParams?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: any;
}

export interface ErrorResponse {
  status: number;
  data: any;
  message: string;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}
