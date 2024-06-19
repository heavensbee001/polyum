const fetchTransactionDetails = async (txn: string, chain: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/txn-details?txn=${txn}&chain=${chain}`,
    {
      headers: {
        method: "GET",
        Accept: "application/json",
      },

      cache: "no-cache",
    }
  );
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export default fetchTransactionDetails;
