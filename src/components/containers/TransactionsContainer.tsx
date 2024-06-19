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

  const unit = chain === "polygon" ? "MATIC" : "ETH";

  return (
    <section>
      <TransactionsTable data={data} unit={unit} />
    </section>
  );
};

export default TransactionsContainer;
