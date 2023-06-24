import NavBar from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";
import appState from "../../../data/AppState";

import { FiLogOut } from "react-icons/fi";

function Profile() {
  var user = appState.getUserData();
  console.log(user);
  var navigate = useNavigate();
  return (
    <>
      <NavBar />
      <section className="h-screen mt-[8vh] flex flex-col justify-center items-center bg-accentColor bg-opacity-10">
        {user._id !== undefined ? (
          <>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <h1 className="text-slate-700">{user.email}</h1>
            {user.phone &&  <h1>{`+91 ${user.phone}`}</h1>}
            <p className="mt-5 bg-lightColor font-semibold tracking-  text-white px-5 py-2 rounded-md">{`Access Level: ${
              user.userType ?? "".toUpperCase()
            }`}</p>

            <p
              className="mt-5 bg-red-600 font-semibold tracking-  text-white px-5 py-2 rounded-md"
              onClick={() => {
                appState.logOutUser();
                navigate("/");
              }}
            >
              <FiLogOut className="pr-2 inline text-xl" />
              Logout
            </p>
          </>
        ) : (
          <>
            <h1>Currently not logged in</h1>
            <button
              onClick={async () => {
                navigate("/");
              }}
              className="bg-lightColor  rounded-lg text-white font-semibold text-md  py-2 px-10 mt-5"
            >
              Login
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default Profile;
