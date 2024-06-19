import fetchAddressTransactions from "@/lib/data/fetchAddressTransactions";
import TransactionsTable from "./TransactionsTable";

interface ITransactionsContainer {
  address: string;
  chain: string;
}

const TransactionsContainer = async ({
  address,
  chain,
}: ITransactionsContainer) => {
  const { data } = await fetchAddressTransactions(address, chain);

  if (data.message !== "OK" || data.error) {
    return <h3>No transactions data found</h3>;
  }

  return (
    <section>
      <TransactionsTable data={data} chain={chain} />
    </section>
  );
};

export default TransactionsContainer;
