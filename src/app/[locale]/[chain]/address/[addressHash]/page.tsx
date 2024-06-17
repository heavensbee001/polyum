import TransactionsContainer from "@/components/containers/TransactionsContainer";
import { Suspense } from "react";

const AddressPage = () => {
  return (
    <div>
      <h1>Address Page</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <TransactionsContainer
          address={"0xe1a5b765C23FB8CC3518429743392ce84E45D806"}
        />
      </Suspense>
    </div>
  );
};

export default AddressPage;
