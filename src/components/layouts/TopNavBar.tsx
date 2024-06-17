import Image from "next/image";

interface TopNavBarProps {}

const TopNavBar: React.FC<TopNavBarProps> = ({}) => {
  return (
    <nav className="h-16 mb-8">
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
  );
};

export default TopNavBar;
