import Link from "next/link";
import Image from "next/image";
const Navbar = (props) => {
  return (
    <nav className=" bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20 shadow-md ">
      <div className="inline-flex">
        <Image src="/logo_hor.svg" alt="logo" width={170} height={170} />
      </div>
      <div className="block">
        <div className="inline relative">
          <Link href="/">
            <a>
              <button className="bg-verde px-4 py-1 font-light inline-flex items-center space-x-2 rounded">
                <Image src="/home.svg" alt="logo" width={18} height={18} />
                <span className="text-sm text-white">Home</span>
              </button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
