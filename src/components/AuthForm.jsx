import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

export default function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const linkText =
    mode === "login"
      ? "Don't have an account? Sign up!"
      : "Already have an Account? Log in!";

  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method={`${mode === "signup" ? "post" : "patch"}`}>
        <h2 className="">{mode === "login" ? "Login" : "Sign Up"}</h2>
        <div>
          <p className="">
            <label htmlFor="email" className="">
              Email
            </label>
            <input type="email" id="email" name="email" />
          </p>
          <p className="">
            <label htmlFor="password" className="">
              Password
            </label>
            <input type="password" id="password" name="password" />
          </p>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 ${
              isSubmitting && "pointer-events-none"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>

          <Link
            to={`?mode=${mode === "login" ? "signup" : "login"}`}
            className="text-blue-500 mt-4 block text-center"
          >
            {linkText}
          </Link>
        </div>
      </Form>
    </div>
  );
}
