import DynamicForm from "../components/DynamicForm";
import jsonData from "../data/form.json";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-xl shadow-lg p-6 rounded-xl">
        <h1 className="text-3xl font-semibold mb-5">Dynamic Signup Form</h1>
        <DynamicForm jsonData={jsonData as any} />
      </div>
    </main>
  );
}
