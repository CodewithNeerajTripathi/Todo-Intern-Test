export default function TodosLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-screen   px-4 sm:px-8 py-6">
      <div className="w-full  max-w-4xl h-full flex items-center justify-center overflow-y-auto rounded-xl   ">
  {children}
</div>

      <div className="w-full max-w-4xl mt-6 bg-white text-center rounded-xl shadow-sm p-4 border border-dashed border-gray-300">
        <p className="text-gray-600 text-base font-medium">
          Select a todo to view or edit
        </p>
      </div>
    </div>
  );
}
