import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    genre: "M",
    birthdate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    let validationErrors: Record<string, string> = {};

    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";

    if (!isLogin) {
      if (!formData.name) validationErrors.name = "Name is required";
      if (!formData.genre) validationErrors.genre = "Genre is required";
      if (!formData.birthdate)
        validationErrors.birthdate = "Birthdate is required";
      if (!formData.confirmPassword)
        validationErrors.confirmPassword = "Confirm Password is required";
      if (formData.password !== formData.confirmPassword)
        validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      return;
    }

    console.log("FormData before requestData:", formData);
    console.log("isLogin state:", isLogin);

    const endpoint = isLogin ? "/api/user/login" : "/api/user/signup";

    const formPayload = new FormData();
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);

    if (!isLogin) {
      formPayload.append("name", formData.name);
      formPayload.append("genre", formData.genre);
      formPayload.append("birthdate", formData.birthdate);
      formPayload.append("confirmPassword", formData.confirmPassword);
    }

    // DEBUG: Check FormData contents before sending
    for (const pair of formPayload.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        body: formPayload, // Send as FormData
        // Do NOT set 'Content-Type' manually (browser does it for us)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        localStorage.setItem("token", data.token);
        navigate("/channel");
      } else {
        setErrors({ general: data.message || "Something went wrong" });
        toast.error(data.message);
      }
    } catch (error: any) {
      setErrors({ general: "Network error. Please try again later." });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      genre: "M",
      birthdate: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isLogin ? "Login to EpiGram" : "Create an Account"}
        </h2>

        {/* Input Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              <div>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
                />
              </div>
            </div>
          )}

          {/* <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition font-bold text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button> */}
          <button
            type="submit"
            onClick={() => console.log("Button clicked")} // Debugging click event
            disabled={loading}
            className={`w-full py-2 rounded-md transition font-bold text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
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
            onClick={toggleAuthMode}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
