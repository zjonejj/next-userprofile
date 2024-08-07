// app/utils/responseUtil.ts

import { NextResponse } from "next/server";

class ResponseUtil {
  static success<T>(data: T) {
    return NextResponse.json(data, { status: 200 });
  }

  static error(status: number, message: string, data: any = null) {
    return NextResponse.json(
      {
        success: false,
        message,
        data,
      },
      { status }
    );
  }
}

export default ResponseUtil;
