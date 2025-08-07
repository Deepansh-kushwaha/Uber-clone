import React, { useState } from "react";
import { Link } from "react-router";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const handleSiginup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(email, password, firstname, lastname);
    if (!email || !password || !firstname  ) {
      setError("Please fill in all fields");
    }else{
    setUserData({
      "fullname": {
        "firstname": firstname,
        "lastname": lastname,
      },
      "email": email,
      "password": password,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    console.log(userData);
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
          <h3 className="text-base font-semibold mb-1 ">What's your Name?</h3>
          <div className="flex gap-4 mb-7 ">
            <input
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="focus:border-2 border-amber-200   h-10 w-1/2 rounded-md p-2 bg-[#eeeeee]"
              type="text"
              placeholder="John "
            />
            <input
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="focus:border-2 border-amber-200   h-10 w-1/2 rounded-md p-2 bg-[#eeeeee]"
              type="text"
              placeholder="Doe"
            />
          </div>
          <h3 className="text-base font-semibold mb-1 ">What's your Email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:border-2 border-amber-200  w-full h-10 mb-7 rounded-md p-2 bg-[#eeeeee]"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base font-semibold mb-1">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:border-2 border-amber-200  active:outline-none w-full h-10 mb-7 bg-[#eeeeee] rounded-md p-2"
            type="current-password"
            placeholder="Password"
          />
          <div className="flex flex-col gap-2">
            <p className={`${error ? "text-red-500" : "hidden"}`}>{error}</p>
            <button
              className="w-full h-10 bg-black text-white px-4 py-2 rounded  font-bold"
              onClick={(e) => handleSiginup(e)}
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-5">
          Already have a account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className=" text-[10px] leading-tight">
          By proceeding, you consent to get calls , whatsapp and sms, including by automated means, from Uber and its affiliates to the mobile number you provided.
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
