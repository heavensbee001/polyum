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

interface ITransactionsContainer {
  address: string;
}

const TransactionsContainer = async ({ address }: ITransactionsContainer) => {
  const { data } = await fetchAddressTransactions(address);

  const unit = "ETH";

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Txn Hash</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.result.map((txn: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={`/ethereum/transaction/${txn.hash}`}>
                        {txn.hash.slice(0, 6)}...{txn.hash.slice(-4)}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{txn.hash}</p>
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
              <TableCell>{txn.timestamp}</TableCell>
              <TableCell>see details</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TransactionsContainer;
