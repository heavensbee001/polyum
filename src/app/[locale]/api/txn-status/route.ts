export async function GET(req: Request) {
  let data = null;
  let error = null;

  const { searchParams } = new URL(req.url);
  const txn = searchParams.get("txn");
  const chain = searchParams.get("chain");

  if (!txn) {
    throw new Error("txn field is required");
  }

  try {
    let _url = "";
    if (chain === "ethereum") {
      _url = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txn}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    } else if (chain === "polygon") {
      _url = `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txn}&apikey=${process.env.POLYGONSCAN_API_KEY}`;
    }
    const res = await fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (resData.error) {
      throw new Error(resData.error);
    }
    if (resData.status === "0" && resData.result.message === "OK") {
      data = { result: { status: "loading" } };
    } else if (resData.status === "1" && resData.result.status === "1") {
      data = { result: { status: "successful" } };
    } else if (resData.status === "1" && resData.result.status === "0") {
      data = { result: { status: "failed" } };
    } else {
      throw new Error("Unknown status");
    }
  } catch (err) {
    console.log(err);
    error = err;
  }

  if (error) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(
    {
      data,
    },
    { status: 200 }
  );
}
