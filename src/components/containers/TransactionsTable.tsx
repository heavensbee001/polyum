"use client";

import { formatDate } from "@/lib/utils/formatDate";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ITransactionsTable {
  data: any;
  unit: string;
}

const TransactionsTable = ({ data, unit }: ITransactionsTable) => {
  const [sortMode, setSortMode] = useState("timeStamp:desc");
  const [sortedData, setSortedData] = useState<any[]>([]);

  const sortData = (key: string) => {
    const [field, order] = key.split(":");
    const sortedData = [...data.result].sort((a: any, b: any) => {
      if (order === "asc") {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });

    setSortedData(sortedData);
  };

  useEffect(() => {
    sortData(sortMode);
  }, [data, sortMode]);

  const handleSortModeChange = (key: string) => {
    // if key is the same as the current sort mode, reverse the order
    const [field, order] = sortMode.split(":");
    if (key === field) {
      setSortMode(`${field}:${order === "asc" ? "desc" : "asc"}`);
    } else {
      // if key is different, set the new key as desc
      setSortMode(`${key}:desc`);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Txn Hash</TableHead>
          <TableHead
            className="text-right text-nowrap cursor-pointer hover:text-neutral-700"
            onClick={() => handleSortModeChange("value")}
          >
            <div className="relative inline-block w-0">
              {sortMode === "value:asc" && (
                <ArrowUp size={20} className="absolute right-1 -bottom-1" />
              )}
              {sortMode === "value:desc" && (
                <ArrowDown size={20} className="absolute right-1 -bottom-1" />
              )}
            </div>
            Amount
          </TableHead>
          <TableHead
            className="text-right text-nowrap cursor-pointer hover:text-neutral-700"
            onClick={() => handleSortModeChange("timeStamp")}
          >
            <div className="relative inline-block w-0">
              {sortMode === "timeStamp:asc" && (
                <ArrowUp size={20} className="absolute right-1 -bottom-1" />
              )}
              {sortMode === "timeStamp:desc" && (
                <ArrowDown size={20} className="absolute right-1 -bottom-1" />
              )}
            </div>
            Timestamp
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((txn: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {txn.hash && (
                      <Link
                        href={`/ethereum/transaction/${txn.hash}`}
                        className="text-cyan-600 hover:text-cyan-500 hover:underline"
                      >
                        {txn.hash.slice(0, 6)}...{txn.hash.slice(-4)}
                      </Link>
                    )}
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
  );
};
export default TransactionsTable;
