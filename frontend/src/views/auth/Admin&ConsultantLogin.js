import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "services/auth";

const Admin_Consultant_Login = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      email,
      password,
    };
    if (role === "admin") {
      const response = await userLogin(formData, role);
      if (response?.success) {
        toast.success("Successfully logged in as admin");
        navigate.push("/admin", { role: "admin" });
      } else if (
        response?.error?.msg === "Invalid email id" ||
        response?.error?.msg === "Invalid Password"
      ) {
        toast.error(response.error.msg);
        setIsLoading(false);
        return;
      } else {
        toast.error("An unknown network error has occurred please try again later");
        setIsLoading(false);
      }
    } else {
      const response = await userLogin(formData, role);
      if (response?.success) {
        toast.success("Successfully logged in as Consultant");
        navigate.push("/admin", { role: "consultant", consultant_id: response.id });
      } else if (
        response?.error?.msg === "Invalid email id" ||
        response?.error?.msg === "Invalid Password"
      ) {
        toast.error(response.error.msg);
        setIsLoading(false);
        return;
      } else {
        toast.error("An unknown network error has occurred please try again later");
        setIsLoading(false);
      }
    }
  };

  const toggleRole = () => {
    setRole((prev) => (prev === "admin" ? "consultant" : "admin"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {role === "admin" ? "Admin Portal" : "Consultant Portal"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition duration-150 ease-in-out"
        >
          Switch to {role === "admin" ? "Consultant" : "Admin"} Login
        </button>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Having trouble? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Admin_Consultant_Login;