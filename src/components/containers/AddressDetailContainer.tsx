import fetchAddressDetails from "@/lib/data/fetchAddressDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "lucide-react";

interface IAddressDetailContainer {
  address: string;
  chain: string;
}

const AddressDetailContainer = async ({
  address,
  chain,
}: IAddressDetailContainer) => {
  // add a little timer to simulate the time it takes to fetch the data
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await fetchAddressDetails(address, chain);

  if (data.message !== "OK" || data.error) {
    return <h3>No address found</h3>;
  }

  const unit = chain === "polygon" ? "MATIC" : "ETH";

  return (
    <section className="mb-8">
      <h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {address.slice(0, 6)}...{address.slice(-4)}
            </TooltipTrigger>
            <TooltipContent>
              <p>{address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h1>
      <p className="mr-2 text-lg text-neutral-400">Balance:</p>
      <h3>
        {data.result / 10 ** 18} {unit}
      </h3>
    </section>
  );
};

export default AddressDetailContainer;
