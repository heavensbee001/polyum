import fetchAddressTransactions from "@/lib/data/fetchAddressTransactions";

interface ITransactionsContainer {
  address: string;
}

const TransactionsContainer = async ({ address }: ITransactionsContainer) => {
  const { data } = await fetchAddressTransactions(address);

  return <div></div>;
};

export default TransactionsContainer;
