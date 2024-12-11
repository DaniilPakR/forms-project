export default function NewFormHeader({title, setTitle, description, setDescription}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        placeholder="Form Title"
        className="w-full rounded-lg p-2 bg-gray-200"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        name=""
        value={description}
        placeholder="Form Description"
        className="w-full rounded-lg p-2 bg-gray-200"
        id=""
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
