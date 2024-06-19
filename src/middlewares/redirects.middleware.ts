import { NextRequest, NextResponse } from "next/server";

export const redirectsMiddleware = async (
  request: NextRequest,
  response: NextResponse
) => {
  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = `/ethereum/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`;

    return NextResponse.redirect(url);
  }

  return response;
};
