import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark"; // reusable variable declared

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <div
      className="relative flex items-center w-16 h-8 p-1 bg-gray-200 dark:bg-gray-900 rounded-full cursor-pointer transition-colors"
      onClick={toggleTheme}
      role="switch"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-slate-700 rounded-full shadow-md transform transition-transform ${
          isDarkTheme ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <span
        className={`absolute left-2 text-sm font-semibold transition-opacity ${
          isDarkTheme ? "opacity-0" : "opacity-100"
        }`}
      >
        🌞
      </span>
      <span
        className={`absolute right-2 text-sm font-semibold transition-opacity ${
          isDarkTheme ? "opacity-100" : "opacity-0"
        }`}
      >
        🌙
      </span>
    </div>
  );
}
