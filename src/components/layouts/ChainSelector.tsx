"use client";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="relative h-10 w-10 md:w-auto">
      <div className="absolute pointer-events-none top-0 left-0 h-10 w-10 flex justify-center items-center">
        {chain === "ethereum" && (
          <Image
            src="/icons/ethereum.svg"
            alt="ethereum Logo"
            width={14}
            height={5}
            className=" top-2 left-[14px]"
          />
        )}
        {chain === "polygon" && (
          <Image
            src="/icons/polygon.svg"
            alt="polygon Logo"
            width={20}
            height={20}
            className=" top-3 left-3"
          />
        )}
      </div>
      <select
        defaultValue={chain}
        onChange={handleChange}
        className={cn(
          "!cursor-pointer appearance-none text-transparent md:text-white text-center outline-none h-10 w-10 md:w-auto md:pr-4 md:pl-10 rounded-full tracking-wide",
          "transition-all ease-in-out duration-200 bg-gradient-to-br bg-size-200 bg-pos-0 hover:bg-pos-100",
          chain === "ethereum" &&
            "to-ethereum-500/70 via-ethereum-500 from-ethereum-500/70 shadow-lg shadow-ethereum-500/30",
          chain === "polygon" &&
            "to-polygon-500/60 via-polygon-500 from-polygon-500/60 shadow-lg shadow-polygon-500/30"
        )}
        style={{ backgroundSize: "200% 200%" }}
      >
        {chains.map((chain) => (
          <option key={chain.id} value={chain.name}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelector;
