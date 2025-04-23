import { useState } from "react";

export default function ForgotPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Password reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <>
      <button
        className="text-sm text-blue-600 underline"
        onClick={() => setIsOpen(true)}
      >
        Forgot Password?
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Reset Your Password</h2>
            {submitted ? (
              <p className="text-green-600">
                A link to reset your password has been sent to your email. 
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded p-2 mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
