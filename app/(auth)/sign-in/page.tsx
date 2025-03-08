import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-[#BF9BDE] font-bold text-[36px] mb-6 text-center">Vocake</h1>
        <SignIn />
      </div>
    </div>
  );
} 