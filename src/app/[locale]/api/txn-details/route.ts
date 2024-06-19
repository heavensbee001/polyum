import { formatHex } from "@/lib/utils/formatHex";

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
      _url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txn}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    } else if (chain === "polygon") {
      _url = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${txn}&apikey=${process.env.POLYGONSCAN_API_KEY}`;
    }
    const res = await fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    let _blockUrl = "";
    if (chain === "ethereum") {
      _blockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&boolean=false&tag=${data.result.blockNumber}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    } else if (chain === "polygon") {
      _blockUrl = `https://api.polygonscan.com/api?module=proxy&action=eth_getBlockByNumber&boolean=false&tag=${data.result.blockNumber}&apikey=${process.env.POLYGONSCAN_API_KEY}`;
    }

    const blockRes = await fetch(_blockUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const blockData = await blockRes.json();

    data.result.blockData = blockData.result;
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
