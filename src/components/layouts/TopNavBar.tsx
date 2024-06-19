import Image from "next/image";
import ChainSelector from "./ChainSelector";

interface ITopNavBarProps {
  hideSelector?: boolean;
}

const TopNavBar: React.FC<ITopNavBarProps> = ({ hideSelector }) => {
  return (
    <>
      <nav className="h-16 mb-8 border-b border-neutral-100 fixed top-0 left-0 w-screen bg-white z-30">
        <div className="h-full px-4 max-w-screen-md mx-auto grid grid-cols-12 gap-2">
          <div className="flex flex-nowrap items-center col-span-6">
            <Image
              src="/icons/polyum-icon.svg"
              alt="Polyum Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            <span className="font-black text-3xl">Polyum</span>
          </div>

          {!hideSelector && (
            <div className="col-span-6 flex justify-end items-center">
              <ChainSelector />
            </div>
          )}
        </div>
      </nav>
      <div className="h-16 w-screen mb-8"></div>
    </>
  );
};

export default TopNavBar;
