import { useState } from "react";
import { Link } from "react-router";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
    }else{
    setUserData({
      "email": email,
      "password": password,
    });
    console.log(userData);
    setEmail("");
    setPassword("");
  }
  };
  return (
    <div className="p-7 bg-white h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 ml-2"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form className="flex flex-col justify-center pt-10 px-2">
          <h3 className="text-2xl font-semibold mb-1 ">What's your Email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:border-2 border-amber-200  w-full h-10 mb-7 rounded-md p-2 bg-[#eeeeee]"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-2xl font-semibold mb-1">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:border-2 border-amber-200  active:outline-none w-full h-10 mb-7 bg-[#eeeeee] rounded-md p-2"
            type="current-password"
            placeholder="Password"
          />
          <div className="flex flex-col gap-2">
            <p className={`${error ? "text-red-500  ":"hidden"}`}>{error}</p>
            <button
              className="w-full h-10 bg-black text-white px-4 py-2 rounded font-bold"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-5">
          New to Uber?{" "}
          <Link to={"/signup"} className="text-blue-500">
            Create an account
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="flex justify-center items-center btn w-full h-10 bg-amber-300 text-white px-4 py-2 rounded mt-5 font-bold"
          to={"/captain-login"}
        >
          Captain Login
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
