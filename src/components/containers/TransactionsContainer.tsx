import fetchAddressTransactions from "@/lib/data/fetchAddressTransactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";

interface ITransactionsContainer {
  address: string;
  chain: string;
}

const TransactionsContainer = async ({
  address,
  chain,
}: ITransactionsContainer) => {
  const { data } = await fetchAddressTransactions(address, chain);

  const unit = "ETH";

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Txn Hash</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.result.map((txn: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={`/ethereum/transaction/${txn.hash}`}
                        className="text-cyan-600 hover:text-cyan-500 hover:underline"
                      >
                        {txn.hash.slice(0, 6)}...{txn.hash.slice(-4)}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">{txn.hash}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                {parseFloat((txn.value / 10 ** 18).toFixed(6))
                  .toString()
                  .replace(/\.?0+$/, "") || 0}{" "}
                {unit}
              </TableCell>
              <TableCell className="text-right">
                {formatDate(Number(txn.timeStamp))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TransactionsContainer;
