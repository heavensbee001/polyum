import fetchTransactionStatus from "@/lib/data/fetchTransactionStatus";
import { cn } from "@/lib/utils/cn";

const getColor = (status: string) => {
  if (status === "loading") return "orange-500";
  if (status === "successful") return "lime-500";
  if (status === "failed") return "red-500";
  return "gray-500";
};

interface ITransactionStatusContainer {
  txn: string;
  chain: string;
}

const TransactionStatusContainer = async ({
  txn,
  chain,
}: ITransactionStatusContainer) => {
  try {
    // add a little timer to simulate the time it takes to fetch the data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { data } = await fetchTransactionStatus(txn, chain);

    if (data.error) {
      throw new Error(data.error);
    }

    return (
      <div
        className={cn(
          "absolute right-0 top-0 border-2 rounded-md px-3 py-1",
          `border-${getColor("successful")}`
        )}
      >
        <span className="hidden border-orange-500 border-lime-500 border-red-500"></span>
        {data.result.status}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <h3>No transaction found</h3>;
  }
};

export default TransactionStatusContainer;
