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
}

const AddressDetailContainer = async ({ address }: IAddressDetailContainer) => {
  // add a little timer to simulate the time it takes to fetch the data
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await fetchAddressDetails(address);

  const unit = "ETH";

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
      <h3>
        <span className="mr-2 text-lg text-neutral-400">Balance:</span>
        {data.result / 10 ** 18} {unit}
      </h3>
    </section>
  );
};

export default AddressDetailContainer;
