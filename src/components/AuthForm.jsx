import {
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { useContext } from "react";

import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import { GlobalContext } from "../context/GlobalProvider";

export default function AuthForm() {
  const { t } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const isSubmitting = navigation.state === "submitting";

  let content = mode === "signup" ? <RegistrationForm t={t} isSubmitting={isSubmitting} /> : <LoginForm t={t} isSubmitting={isSubmitting} />

  return (
    <>
      {content}
    </>
  );
}
