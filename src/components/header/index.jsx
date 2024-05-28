import { Link, useNavigate } from "react-router-dom";
import useUserInfo from "../../hook/user/useUserInfo";
import useEnterpriseInfo from "../../hook/user/useEnterpriseInfo";

const Header = () => {
  const { data: userData } = useUserInfo();
  const { data: enterpriseData } = useEnterpriseInfo();

  const user = userData?.data;
  const enterprise = enterpriseData?.data;
  const navigate = useNavigate();

  const userRole = localStorage.getItem("roleUser");
  const enterpriseRole = localStorage.getItem("roleEnterprise");

  // Function to get avatar_url from user or enterprise
  const getAvatarUrl = () => {
    if (user?.avatar_url) {
      return user.avatar_url;
    }
    if (enterprise?.avatar_url) {
      return enterprise.avatar_url;
    }
    // Or a default URL if neither user nor enterprise have avatar_url
    return "http://res.cloudinary.com/dswewjrly/image/upload/v1715831315/wmndhsmpxuihewekekzy.jpg"; // Replace with an actual default avatar URL
  };

  // Function to get full_name from user or enterprise
  const getFullName = () => {
    if (user?.user_name) {
      return user.user_name;
    }
    if (enterprise?.enterprise_name) {
      return enterprise.enterprise_name;
    }
  };

  const renderAvatar = () => {
    return (
      <div className="flex items-center user_avatar">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between">
            <img
              src={getAvatarUrl()}
              className="h-10 rounded-3xl"
              alt="Avatar"
            />
            <span className="ml-3 text-white">{getFullName()}</span>
          </div>
          <div className="invisible w-[160px] rounded absolute z-50 flex flex-col bg-[#1F2937] py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
            {userRole && (
              <Link
                to={"/profile"}
                className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white"
              >
                Profile
              </Link>
            )}
            ||{enterpriseRole && (
              <Link
                to={"/enterprise/profile"}
                className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white"
              >
                Profile
              </Link>
            )}
            ||{(userRole === "admin" || enterpriseRole === "admin") && (
              <Link
                to={"/dashboard"}
                className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white"
              >
                Dashboard
              </Link>
            )}
            {!user?.s_id && (
              <Link
                to="/update-password"
                className="my-2 block border-b border-gray-100 py-1 text-sm font-semibold text-gray-500 hover:text-white"
              >
                Update password
              </Link>
            )}
            ||{!enterprise?.e_id && (
              <Link
                to="/enterprise/update-password"
                className="my-2 block border-b border-gray-100 py-1 text-sm font-semibold text-gray-500 hover:text-white"
              >
                Update password
              </Link>
            )}
            <span
              onClick={() => {
                localStorage.clear();
                navigate("/login");
                window.location.reload();
              }}
              className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white cursor-pointer"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="fixed z-20 inset-x-0">
      <nav className="border-gray-200 text-white px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between border-white items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TJOB
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {user || enterprise ? (
              renderAvatar()
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign up
                </Link>
              </>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
