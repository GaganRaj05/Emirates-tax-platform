import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { userLogin } from "services/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "context/AuthContext";
export default function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });
  const {setUser} = useAuth();
  const navigate = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const response = await userLogin(formData, 'user');
    setIsLoading(true);
    if(response?.error?.msg === "No user exists please create an account") {
      toast.error('Email not found, Please create an account');
      return;
    }
    else if(response?.error?.msg === "Incorrect password") {
      toast.error('Please check your password');
      return;
    }
    else if(response?.success) {
      toast.success('Login successfull');
      setUser(response.userData);
      
      navigate.push('/admin',{role:'user',user_id:response.userData.id});

    }

  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small> Login to Emirates-Tax-Platform</small>
                </div>
                <form method='POST' onSubmit={(e)=>handleSubmit(e)} >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name='password'
                      onChange={handleChange}
                      value={formData.password}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      
                    >
                      {isLoading ? <ClipLoader/> : "Sign in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              
              <div className="w-1/2 text-left">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Don't have an account yet? Create one..</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
