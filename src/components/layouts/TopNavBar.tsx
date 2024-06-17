import Image from "next/image";

interface TopNavBarProps {}

const TopNavBar: React.FC<TopNavBarProps> = ({}) => {
  return (
    <>
      <nav className="h-16 mb-8 border-b border-neutral-100 fixed top-0 left-0 w-screen bg-white z-30">
        <div className="h-full px-4 max-w-screen-lg mx-auto flex items-center">
          <Image
            src="/icons/polyum-icon.svg"
            alt="Polyum Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-black text-3xl">Polyum</span>
        </div>
      </nav>
      <div className="h-16 w-screen mb-8"></div>
    </>
  );
};

export default TopNavBar;
