import telegram from "../../images/socials/telegram.png";
import itr from "../../images/socials/Itransition.png";

export default function Footer() {
  return (
    <div className="bg-background-accent dark:bg-background-dark-accent text-text-dark-muted py-12 px-6 mt-96 -mb-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Daniil Pak. All rights reserved.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-row justify-center items-center">
            <img className="h-8 inline" src={telegram} />
            <a
              href="https://t.me/sanvxzl"
              className="text-primary-light hover:text-primary-DEFAULT transition-colors duration-300"
            >
              @sanvxzl
            </a>
          </div>
          <div>
            <a href="https://www.itransition.com/">
              <img className="h-6 inline" src={itr} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
