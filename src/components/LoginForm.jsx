import { Form, Link } from "react-router-dom"

export default function LoginForm({isSubmitting}) {
  return (
    <Form
      className="w-4/5 lg:w-1/3 flex flex-col border border-gray-300 rounded-xl shadow-lg p-6 bg-white"
      method="patch"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Login
      </h2>
      <div className="space-y-4">
        <p>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </p>
        <p>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </p>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition ${
            isSubmitting ? "opacity-75 pointer-events-none" : ""
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : "login"}
        </button>
        <Link
          to="?mode=signup"
          className="text-blue-500 mt-4 block text-center hover:underline"
        >
          Don't have an account? Sign up!
        </Link>
      </div>
    </Form>
  )
}