
const fetchItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const data = await response.json();
  return data;
};

export default fetchItems;
