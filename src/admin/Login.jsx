import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "./UseAuth";
import useAxios from "./UseAxios";
import logo from "../assets/logo.webp";

const Login = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { user, login } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        login(response.data.data);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
      window.alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-primary-white">
      <div className="h-screen w-full flex flex-col items-center justify-center p-5 md:p-8 xl:p-13">
        <a href="/" className="mb-5">
          <img className="h-40" src={logo} alt="The Dental City" />
        </a>
        <div className="w-full max-w-lg bg-white border border-black/10 rounded-xl shadow-dark">
          <div className="p-5 md:p-8 space-y-5">
            <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide text-center">
              Sign in to your account
            </p>
            {errorMessage && (
              <div className="mb-4 text-responsive-text text-red-600 text-center">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="input bg-gray-100 text-gray-700 placeholder:text-gray-500 border border-gray-300"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="input bg-gray-100 text-gray-700 placeholder:text-gray-500 border border-gray-300"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`button w-full rounded ${
                  isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                } `}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
