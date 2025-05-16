import logo from "../assets/logo.png";
import {
  ShoppingCart,
  Bell,
  User,
  UserPen,
  Settings,
  LogOut,
  LayoutList,
} from "lucide-react";
import FromSignIn from "../components/formSignIn";
import FormSignUp from "../components/formSignUp";
import FormOTP from "../components/formOTP";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/user.context";
import { categories } from "../utils/categories";
import { slugify } from "../utils/slugify";
import BooksSearched from "../components/booksSearched";
import { useSelector } from "react-redux";
// import { useFilterBook } from "../contexts/filterBook.context";

// trong component Header

const apiUrl = import.meta.env.VITE_API_URL;

const Header = () => {
  // const { setSelectedCategories } = useFilterBook();

  const [isOpenOtp, setIsOpenOtp] = useState(false);
  const [keyWord, setKeyWord] = useState("");

  const { user, logout } = useUser();
  const carts = useSelector((state) => state.cart.items);
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  const handleLogOut = async () => {
    logout();
    window.location.reload();
  };

  const handleSearchClose = () => {
    setKeyWord("");
  };

  return (
    <div className="flex navbar bg-base-100 shadow-sm">
      <div className="flex-[2]">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img className="w-[130px]" src={logo} alt="" />
        </Link>
      </div>
      <div className="flex-[2] flex justify-end">
        <div className="dropdown dropdown-hover">
          <div className="flex row items-center cursor-pointer">
            <LayoutList />
            <span className="ms-1">Thể loại</span>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box z-10 shadow-md"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 w-[650px] max-w-screen-xl rounded-xl">
              {categories.map((category, index) => (
                <div key={index}>
                  <Link
                    to={`/${slugify(category.title)}?page=1`}
                    className="font-semibold mb-1 block hover:underline"
                  >
                    {category.title}
                  </Link>
                  <ul className="space-y-1 text-sm">
                    {category.links.map((link, idx) => (
                      <li key={idx} className="text-gray-600 hover:underline">
                        <Link
                          to={`/${slugify(category.title)}/${slugify(
                            link
                          )}?page=1`}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[5] flex justify-center relative">
        <label className="input w-[80%] ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Search"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </label>
        <BooksSearched onKeyWord={keyWord} onClose={handleSearchClose} />
      </div>
      <div className="flex-[2] flex justify-between">
        <div className="flex  items-center dropdown dropdown-hover">
          <Link to={"/cart"}>
            <ShoppingCart />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 rounded-full px-2 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
        <div className="flex  items-center">
          <a href="" tabIndex={0}>
            <Bell />
          </a>
        </div>

        <div className="flex  items-center">
          <a href="">phiếu của tôi</a>
        </div>
      </div>
      <div className="flex-[1] flex justify-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            {user ? (
              <img
                src={`${apiUrl}${user.avatar}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User />
            )}
          </div>
          {user ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow"
            >
              <li>
                <div className="flex justify-between">
                  <UserPen size={18} />
                  <Link to={"/profile"}>tài khoản</Link>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <Settings size={18} />
                  <a>cài đặt</a>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <LogOut size={18} />
                  <a onClick={handleLogOut}>đăng xuất</a>
                </div>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-35 p-1 shadow"
            >
              <li>
                <a
                  className="btn btn-soft btn-info justify-center text-sm"
                  onClick={() =>
                    document.getElementById("form_sign_in").showModal()
                  }
                >
                  Đăng nhập
                </a>
              </li>
              <li>
                <a
                  className="btn btn-soft btn-error justify-center text-sm"
                  onClick={() =>
                    document.getElementById("form_sign_up").showModal()
                  }
                >
                  Đăng ký
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      <dialog id="form_sign_in" className="modal">
        <FromSignIn />
      </dialog>
      <dialog id="form_sign_up" className="modal">
        <FormSignUp setOpen={setIsOpenOtp} />
      </dialog>
      <dialog id="form_otp" className="modal">
        <FormOTP open={isOpenOtp} />
      </dialog>
    </div>
  );
};

export default Header;
