import useUserInfo from "../../hook/user/useUserInfo";
import useEnterpriseInfo from "../../hook/user/useEnterpriseInfo";
const HomePage = () => {
  useUserInfo();
  useEnterpriseInfo();
  return <div >
    <h1 className="min-h-screen text-3xl font-bold underline">Hello There!</h1>
    
  </div>
};
export default HomePage;
