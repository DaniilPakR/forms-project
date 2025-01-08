import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

export default function FormatButtons({ state, setState }) {
  const handleFormatChange = (value) => {
    setState((prevMarkdown) => {
      if (prevMarkdown.includes(value)) {
        return prevMarkdown.filter((item) => item !== value);
      } else {
        return [...prevMarkdown, value];
      }
    });
  };

  return (
<div className="flex flex-row gap-3">
  <button
    className={`transition-all duration-300 ease-in-out rounded-md p-2 text-center ${
      state.includes("bold")
        ? "text-white bg-black shadow-md"
        : "text-gray-500 hover:text-black hover:bg-gray-200"
    }`}
    onClick={() => handleFormatChange("bold")}
  >
    <FormatBoldIcon className="transition-transform duration-300 hover:scale-110" />
  </button>
  <button
    className={`transition-all duration-300 ease-in-out rounded-md p-2 text-center ${
      state.includes("italic")
        ? "text-white bg-black shadow-md"
        : "text-gray-500 hover:text-black hover:bg-gray-200"
    }`}
    onClick={() => handleFormatChange("italic")}
  >
    <FormatItalicIcon className="transition-transform duration-300 hover:scale-110" />
  </button>
  <button
    className={`transition-all duration-300 ease-in-out rounded-md p-2 text-center ${
      state.includes("underlined")
        ? "text-white bg-black shadow-md"
        : "text-gray-500 hover:text-black hover:bg-gray-200"
    }`}
    onClick={() => handleFormatChange("underlined")}
  >
    <FormatUnderlinedIcon className="transition-transform duration-300 hover:scale-110" />
  </button>
</div>
  );
}
