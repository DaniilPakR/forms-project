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
        className={`transition-all rounded-md text-center ${
          state.includes("bold") ? "text-black bg-gray-300" : "text-gray-500 "
        }`}
        onClick={() => handleFormatChange("bold")}
      >
        <FormatBoldIcon />
      </button>
      <button
        className={`transition-all rounded-md text-center ${
          state.includes("italic") ? "text-black bg-gray-300" : "text-gray-500 "
        }`}
        onClick={() => handleFormatChange("italic")}
      >
        <FormatItalicIcon />
      </button>
      <button
        className={`transition-all rounded-md text-center ${
          state.includes("underlined") ? "text-black bg-gray-300" : "text-gray-500 "
        }`}
        onClick={() => handleFormatChange("underlined")}
      >
        <FormatUnderlinedIcon />
      </button>
    </div>
  );
}
