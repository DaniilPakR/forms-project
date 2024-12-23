import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header: {
        forms: "Forms",
        adminPage: "Admin Page",
        signUp: "Sign up",
        logIn: "Log in",
        logOut: "Log out",
        search: "Search",
      },
      formCreation: {
        form: "Form",
        header: "Header",
      },
      forms: {
        myForms: "My Forms",
        newForm: "New Form",
        noForms: "No Forms Yet.",
        createdAt: "Created at",
        filledForms: "Filled Forms",
        noFilledForms: "No filled forms found.",
        submittedOn: "Submitted on",
        viewForm: "View Form",
        homeNotLoggedIn: "Log in to Create forms, Fill forms. You can use Search to read forms.",
      },
      userManagement: {
        title: "Users Management",
        block: "Block",
        unblock: "Unblock",
        makeAdmin: "Make Admin",
        removeAdmin: "Remove Admin",
        name: "Name",
        email: "Email",
        admin: "Admin",
        blocked: "Blocked",
        updatedAt: "Updated At",
        createdAt: "Created At",
        yes: "Yes",
        no: "No",
      },
      auth: {
        signUp: "Sign Up",
        login: "Login",
        name: "Name",
        email: "Email",
        password: "Password",
        submitting: "Submitting...",
        alreadyHaveAccount: "Already have an Account? Log in!",
        dontHaveAccount: "Don't have an account? Sign up!",
      },
      error: {
        pageDoesntExist: "Page doesn't exist",
      },
    },
  },
  ru: {
    translation: {
      header: {
        forms: "Формы",
        adminPage: "Панель Админа",
        signUp: "Регистрация",
        logIn: "Войти",
        logOut: "Выйти",
        search: "Поиск",
      },
      formCreation: {

      },
      forms: {
        myForms: "Мои Формы",
        newForm: "Новая Форма",
        noForms: "Форм пока нет.",
        createdAt: "Создано",
        filledForms: "Заполненные Формы",
        noFilledForms: "Заполненные формы не найдены.",
        submittedOn: "Отправлено",
        viewForm: "Просмотреть Форму",
        homeNotLoggedIn: "Войдите, чтобы создавать формы и заполнять их. Вы можете использовать поиск для чтения форм.",
      },
      userManagement: {
        title: "Управление Пользователями",
        block: "Заблокировать",
        unblock: "Разблокировать",
        makeAdmin: "Сделать Админом",
        removeAdmin: "Убрать Админа",
        name: "Имя",
        email: "Электронная Почта",
        admin: "Админ",
        blocked: "Заблокирован",
        updatedAt: "Обновлено",
        createdAt: "Создано",
        yes: "Да",
        no: "Нет",
      },
      auth: {
        signUp: "Регистрация",
        login: "Войти",
        name: "Имя",
        email: "Электронная Почта",
        password: "Пароль",
        submitting: "Отправка...",
        alreadyHaveAccount: "Уже есть аккаунт? Войдите!",
        dontHaveAccount: "Нет аккаунта? Зарегистрируйтесь!",
      },
      error: {
        pageDoesntExist: "Страница не существует",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
