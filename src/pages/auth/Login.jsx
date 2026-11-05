
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ArrowRight } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    navigate("/owner");
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] lg:grid lg:grid-cols-2">
      {/* Branding panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-[#172B4D] p-12 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl font-bold">
              B
            </div>
            <span className="text-xl font-semibold">BusinessHub</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#D6A354]">
            Business management, simplified
          </p>

          <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
            Everything your business needs, in one place.
          </h1>

          <p className="mt-6 max-w-md leading-7 text-slate-300">
            Manage sales, inventory, branches, employees and business
            performance through one organized platform.
          </p>

          <div className="mt-10 space-y-4 text-sm text-slate-300">
            {[
              "Keep track of your business operations",
              "Manage sales and inventory efficiently",
              "Access your business from different devices",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D6A354]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} BusinessHub. All rights reserved.
        </p>

        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full border border-white/10" />
      </section>

      {/* Login form */}
      <section className="flex min-h-screen items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3 text-[#172B4D]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172B4D] font-bold text-white">
                B
              </div>
              <span className="text-xl font-semibold">BusinessHub</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-[#355C7D]">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#172B4D]">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your details to access your business workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email address or phone number
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#355C7D] focus:ring-2 focus:ring-[#355C7D]/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-[#355C7D] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#355C7D] focus:ring-2 focus:ring-[#355C7D]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#172B4D] py-3.5 text-sm font-semibold text-white transition hover:bg-[#243D62]"
            >
              Sign in
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">NEW TO BUSINESSHUB?</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={() => navigate("/register")}
            className="w-full rounded-lg border border-slate-300 bg-white py-3 text-sm font-semibold text-[#172B4D] transition hover:bg-slate-50"
          >
            Create a business account
          </button>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

          {/* Temporary development shortcuts */}
          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="mb-3 text-center text-xs text-slate-400">
              Quick access tabs
            </p>
            <div className="flex justify-center gap-5 text-xs font-medium text-[#355C7D]">
              <button onClick={() => navigate("/cashier")}>Cashier</button>
              <button onClick={() => navigate("/platform-admin")}>
                Platform Admin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
