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
        homeNotLoggedIn:
          "Log in to Create forms, Fill forms. You can use Search to read forms.",
      },
      userManagement: {
        title: "Users Management",
        delete: "Delete",
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
      tagCloud: {
        button: "Tag Cloud",
        modalTitle: "Tag Cloud (Alphabetically)",
        loading: "Loading...",
        noTagsFound: "No tags found",
        formsFor: "Forms for",
        closeButton: "×",
      },
      userList: {
        removeButton: "Remove",
        searchHint:
          'Type name or email to search for users, (e.g. "Daniil" or "test@test.com", minimum 3 characters for suggestions)',
      },
      form: {
        title: "Form",
        header: "Header",
        questions: "Questions",
        quizHint:
          "Quiz Forms sum up the scores of each question to give a total score of 100.",
        addQuestionButton: "Add Question",
        cancelButton: "Cancel",
        uploadButton: "Upload",
      },
      newFormHeader: {
        imagePreview: "Preview:",
        noImageSelected: "No image selected yet.",
        formType: "Form Type",
        form: "Form",
        quiz: "Quiz",
        titleLabel: "Title",
        titlePlaceholder: "Form Title",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Form Description",
        topicLabel: "Topic",
        topicPlaceholder: "Form Topic",
        tagsLabel: "Tags",
        tagsHint:
          "Type tags divided with space, and each tag should start with # (e.g. '#development #job')",
        tagsPlaceholder: "Tags",
        suggestions: "Suggestions:",
        accessLabel: "Access:",
        public: "Public",
        private: "Private",
      },
      newFormQuestion: {
        questionTitle: "Question",
        showInResults: "Show in Results",
        type: "Type",
        shortAnswer: "Short Answer",
        paragraph: "Paragraph",
        multipleChoice: "Multiple Choice",
        checkboxes: "Checkboxes",
        dropdown: "Dropdown",
        questionPlaceholder: "Question",
        withScore: "With Score",
        scoreLabel: "SCORE:",
        correctAnswerPlaceholder: "Correct Answer",
        duplicateQuestion: "Duplicate question",
        required: "Required",
        delete: "Delete",
        untitledQuestion: "Untitled Question"
      },
      newFormOptions: {
        correctAnswerOption: "Select the correct answer option"
      }
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
      formCreation: {},
      forms: {
        myForms: "Мои Формы",
        newForm: "Новая Форма",
        noForms: "Форм пока нет.",
        createdAt: "Создано",
        filledForms: "Заполненные Формы",
        noFilledForms: "Заполненные формы не найдены.",
        submittedOn: "Отправлено",
        viewForm: "Просмотреть Форму",
        homeNotLoggedIn:
          "Войдите, чтобы создавать формы и заполнять их. Вы можете использовать поиск для чтения форм.",
      },
      userManagement: {
        title: "Управление Пользователями",
        delete: "Удалить",
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
      tagCloud: {
        button: "Облачко тегов",
        modalTitle: "Облачко тегов (по алфавиту)",
        loading: "Загрузка...",
        noTagsFound: "Теги не найдены",
        formsFor: "Формы для",
        closeButton: "×",
      },
      userList: {
        removeButton: "Удалить",
        searchHint:
          'Введите имя или электронную почту для поиска пользователей (например, "Даниил" или "test@test.com", минимум 3 символа для предложений)',
      },
      form: {
        title: "Форма",
        header: "Заголовок",
        questions: "Вопросы",
        quizHint:
          "Опросы суммируют баллы за каждый вопрос, чтобы получить общий счет 100.",
        addQuestionButton: "Добавить вопрос",
        cancelButton: "Отмена",
        uploadButton: "Загрузить",
      },
      newFormHeader: {
        imagePreview: "Предпросмотр:",
        noImageSelected: "Изображение еще не выбрано.",
        formType: "Тип формы",
        form: "Форма",
        quiz: "Викторина",
        titleLabel: "Заголовок",
        titlePlaceholder: "Заголовок формы",
        descriptionLabel: "Описание",
        descriptionPlaceholder: "Описание формы",
        topicLabel: "Тема",
        topicPlaceholder: "Тема формы",
        tagsLabel: "Теги",
        tagsHint:
          "Введите теги, разделенные пробелами, и каждый тег должен начинаться с # (например, '#разработка #работа')",
        tagsPlaceholder: "Теги",
        suggestions: "Предложения:",
        accessLabel: "Доступ:",
        public: "Публичный",
        private: "Приватный",
      },
      newFormQuestion: {
        questionTitle: "Вопрос",
        showInResults: "Показать в результатах",
        type: "Тип",
        shortAnswer: "Короткий ответ",
        paragraph: "Абзац",
        multipleChoice: "Множественный выбор",
        checkboxes: "Флажки",
        dropdown: "Выпадающий список",
        questionPlaceholder: "Вопрос",
        withScore: "С баллами",
        scoreLabel: "БАЛЛЫ:",
        correctAnswerPlaceholder: "Правильный ответ",
        duplicateQuestion: "Дублировать вопрос",
        required: "Обязательный",
        delete: "Удалить",
        untitledQuestion: "Безымянный вопрос"
      },
      newFormOptions: {
        correctAnswerOption: "Выберите правильный вариант ответа"
      }
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
