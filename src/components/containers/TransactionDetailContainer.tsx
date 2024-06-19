import fetchTransactionDetails from "@/lib/data/fetchTransactionDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formatHex } from "@/lib/utils/formatHex";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { formatDate } from "@/lib/utils/formatDate";

interface ITransactionDetailContainer {
  txn: string;
  chain: string;
}

const TransactionDetailContainer = async ({
  txn,
  chain,
}: ITransactionDetailContainer) => {
  try {
    // add a little timer to simulate the time it takes to fetch the data
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { data } = await fetchTransactionDetails(txn, chain);

    if (data.error) {
      throw new Error(data.error);
    }

    const unit = chain === "polygon" ? "MATIC" : "ETH";

    const shareUrl =
      chain === "ethereum"
        ? `https://etherscan.io/tx/${txn}`
        : `https://polygonscan.com/tx/${txn}`;

    return (
      <div className="mb-8">
        <section className="mb-12 pt-4">
          <p className="mr-2 text-lg text-neutral-400">Transaction hash:</p>
          <Link href={shareUrl} target="_blank">
            <h1 className="cursor-pointer text-cyan-600 hover:text-cyan-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {txn.slice(0, 6)}...{txn.slice(-4)}
                    <LinkIcon size={28} className="inline ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{txn}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h1>
          </Link>
        </section>
        <hr className="text-neutral-100 mb-8" />
        <section className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-6 md:col-span-4">
            <p className="text-lg text-neutral-400">Amount:</p>
            <h3>
              {formatHex(data.result.value) / 10 ** 18} {unit}
            </h3>
          </div>
          <div className="col-span-6 md:col-span-4">
            <p className="text-lg text-neutral-400">Gas fee:</p>
            <p className="text-xl">
              {data.result.gasPrice
                ? `${formatHex(data.result.gasPrice) / 10 ** 18} ${unit}`
                : "N/A"}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="text-lg text-neutral-400 md:text-right">Timestamp:</p>
            <p className="text-xl md:text-right">
              {formatDate(formatHex(data.result.blockData?.timestamp))}
            </p>
          </div>
        </section>
        <section className="grid grid-cols-12 gap-4 mb-8">
          <div className="col-span-12 md:col-span-6">
            <p className="text-lg text-neutral-400">From:</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {data.result.from && (
                    <p className="text-lg">
                      {data.result.from.slice(0, 6)}...
                      {data.result.from.slice(-8)}
                    </p>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{data.result.from}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="text-lg text-neutral-400">To:</p>
            <p className="text-lg">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {data.result.to && (
                      <p className="text-lg">
                        {data.result.to.slice(0, 6)}...
                        {data.result.to.slice(-8)}
                      </p>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{data.result.to}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <h3>No transaction found</h3>;
  }
};

export default TransactionDetailContainer;
