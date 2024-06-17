const fetchAddressTransactions = async (address: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/address-txns?address=${address}`,
    {
      headers: {
        method: "GET",
        Accept: "application/json",
      },
    }
  );
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export default fetchAddressTransactions;
