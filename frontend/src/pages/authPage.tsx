import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors: Record<string, string> = {};

    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (!isLogin && !formData.confirmPassword) validationErrors.confirmPassword = "Confirm Password is required";
    if (!isLogin && formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/channel"); // Redirect to home if no errors
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isLogin ? "Login to EpiGram" : "Create an Account"}
        </h2>

        {/* Input Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Third-party login */}
        <div className="mt-6">
          <p className="text-gray-400 text-center mb-4">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition">
              <FaGoogle className="h-6 w-6" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition">
              <FaFacebook className="h-6 w-6" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition">
              <FaGithub className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Switch between Login & Signup */}
        <p className="text-gray-400 text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
