export async function GET(req: Request) {
  let data = null;
  let error = null;

  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    throw new Error("address field is required");
  }

  const _url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=0&offset=100&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;

  try {
    const res = await fetch(_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = await res.json();

    if (data.error) {
      throw new Error(data.error);
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
