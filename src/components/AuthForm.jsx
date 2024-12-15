import {
  useSearchParams,
  useNavigation,
} from "react-router-dom";

import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const isSubmitting = navigation.state === "submitting";

  let content = mode === "signup" ? <RegistrationForm isSubmitting={isSubmitting} /> : <LoginForm isSubmitting={isSubmitting} />

  return (
    <>
      {content}
    </>
  );
}
