import AddressDetailContainer from "@/components/containers/AddressDetailContainer";
import TransactionsContainer from "@/components/containers/TransactionsContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const AddressPage = ({
  params,
}: {
  params: { addressHash: string; chain: string };
}) => {
  const { addressHash, chain } = params;

  return (
    <div>
      <Suspense fallback={<AddressSkeleton />}>
        <AddressDetailContainer address={addressHash} chain={chain} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <TransactionsContainer
          key={addressHash + chain}
          address={addressHash}
          chain={chain}
        />
      </Suspense>
    </div>
  );
};

export default AddressPage;

const AddressSkeleton = () => {
  return (
    <div>
      <div className="max-w-lg min-h-[80px] w-full px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300">
        <Skeleton className="h-4 w-3/5 mb-12 mb-6" />
        <Skeleton className="h-4 w-full mt-4 mb-6" />
        <Skeleton className="h-4 w-full mb-6" />
      </div>
    </div>
  );
};
