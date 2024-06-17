const fetchAddressDetails = async (address: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/address-details?address=${address}`,
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

export default fetchAddressDetails;
