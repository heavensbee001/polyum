"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

const ChainSelector = () => {
  const chains = [
    { id: "1", name: "ethereum" },
    { id: "137", name: "polygon" },
  ];

  const router = useRouter();
  const { chain, addressHash } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}/address/${addressHash}`);
  };
  return (
    <select
      defaultValue={chain}
      onChange={handleChange}
      className={cn(
        "!cursor-pointer appearance-none text-white text-center outline-none h-10 md:w-auto md:px-4 rounded-full tracking-wide",
        chain === "ethereum" && "bg-ethereum-500",
        chain === "polygon" && "bg-polygon-500"
      )}
    >
      {chains.map((chain) => (
        <option key={chain.id} value={chain.name}>
          {chain.name}
        </option>
      ))}
    </select>
  );
};

export default ChainSelector;
