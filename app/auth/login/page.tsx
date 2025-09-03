import Login from "@/components/organisms/Login";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;

// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Book, Phone, ArrowRight } from "lucide-react";
// import { useUserStore } from "@/hooks/useUserStore";
// import PageLoader from "@/components/atoms/PageLoader";
// // import { useUserStore } from "@/stores/user/userStore";

// // import { useUser } from "../../contexts/UserContext";
// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const authId = searchParams.get("id") || "";
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const login = useUserStore((state) => state.login);
//   const isAuthenticated = useUserStore((state) => state.isAuthenticated);

//   useEffect(() => {
//     // Simulate loading delay for better UX
//     // await new Promise((resolve) => setTimeout(resolve, 1000));
//     const autoLogin = async () => {
//       const res = await login(authId.trim());

//       if (res.success == true) {
//         const params = new URLSearchParams(window.location.search);
//         const redirectTo = params.get("to") || "/library";
//         router.push(redirectTo);
//       } else {
//         setErrorMsg(res.message || "Login failed. Please try again.");
//       }
//       setIsLoading(false);
//     };

//     if (authId !== "") {
//       setPhoneNumber(authId);
//       setIsLoading(true);
//       autoLogin();
//     }
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/library");
//     }
//   }, [isAuthenticated, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!phoneNumber.trim()) return;

//     setIsLoading(true);

//     // Simulate loading delay for better UX
//     // await new Promise((resolve) => setTimeout(resolve, 1000));

//     const res = await login(phoneNumber.trim());

//     if (res.success == true) {
//       const params = new URLSearchParams(window.location.search);
//       const redirectTo = params.get("to") || "/library";
//       router.push(redirectTo);
//     } else {
//       setErrorMsg(res.message || "Login failed. Please try again.");
//     }
//     setIsLoading(false);
//     // router.push("/library");
//   };

//   const formatPhoneNumber = (value: string) => {
//     // Remove all non-digit characters
//     const digits = value.replace(/\D/g, "");

//     // Nigerian numbers: +234 XXX XXX XXXX
//     // if (digits.startsWith("234")) {
//     //   if (digits.length >= 13) {
//     //     return `+234${digits}`;
//     //   } else if (digits.length >= 9) {
//     //     return `+234${digits}`;
//     //   } else if (digits.length >= 6) {
//     //     return `+234 ${digits.slice(3, 6)} ${digits.slice(6)}`;
//     //   } else if (digits.length > 3) {
//     //     return `+234 ${digits.slice(3)}`;
//     //   }
//     //   return "+234 ";
//     // }

//     // If starts with 0, convert to +234
//     if (digits.startsWith("0")) {
//       const rest = digits.slice(1);
//       // if (rest.length >= 0) {
//       return `234${rest}`;
//       // }
//       // else if (rest.length >= 6) {
//       //   return `+234 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
//       // } else if (rest.length >= 3) {
//       //   return `+234 ${rest.slice(0, 3)} ${rest.slice(3)}`;
//       // } else if (rest.length > 0) {
//       //   return `+234 ${rest}`;
//       // }
//       // return "+234 ";
//     }

//     return digits;
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     setPhoneNumber(formatted);
//   };

//   return (
//     <Suspense fallback={<PageLoader />}>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-shaft dark:to-shaft flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//             {/* Logo and Title */}
//             <div className="text-center mb-8">
//               <div className="flex justify-center mb-4">
//                 <div
//                   className="w-16 h-16 bg-primary
//                rounded-2xl flex items-center justify-center"
//                 >
//                   <Book className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                 Welcome to StoryBook
//               </h1>
//               <p className="text-gray-600 dark:text-gray-300">
//                 Enter your phone number to get started
//               </p>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//                 >
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="w-5 h-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={phoneNumber}
//                     onChange={handlePhoneChange}
//                     placeholder="+234 900 000 0000"
//                     className="
//                     // w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600
//                     // rounded-lg focus:ring-2 focus:ring-bg-primary focus:border-pring-primary
//                     // bg-white dark:bg-gray-700 text-gray-900 dark:text-white
//                     // placeholder-gray-500 dark:placeholder-gray-400
//                   "
//                     required
//                   />
//                 </div>
//                 {/* <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                 We'll send you a verification code (Demo: any number works)
//               </p> */}
//               </div>

//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={isLoading || !phoneNumber.trim()}
//                 className="
//                 w-full flex items-center justify-center gap-2 py-3 px-4
//                 bg-primary disabled:bg-faded-primary
//                 text-white font-medium rounded-lg transition-colors cursor-pointer
//                 disabled:cursor-not-allowed
//               "
//               >
//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     Continue
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Error Messages */}
//             {errorMsg && (
//               <div className="mt-8 p-4 bg-[#ffe4e4c5] dark:bg-red-900/2 rounded-lg">
//                 <h3 className="text-sm font-medium text-red-500 dark:text-red-400 mb-2">
//                   {errorMsg || "Please enter a valid phone number"}
//                 </h3>
//               </div>
//             )}

//             {/* Demo Info */}
//             <div className="mt-8 p-4 bg-[#e4ffe6c5] dark:bg-blue-900/20 rounded-lg">
//               <h3 className="text-sm font-medium text-primary dark:text-white mb-2">
//                 Login Information
//               </h3>
//               <ul className="text-xs text-primary dark:text-white space-y-1">
//                 <li>• Enter any phone number to econtinue</li>
//                 <li>• You&apos;ll start with 100 points</li>
//                 <li>• Premium episodes cost 6-12 points</li>
//                 <li>• All preferences are saved locally</li>
//               </ul>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center mt-8">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               By continuing, you agree to our Terms of Service and Privacy
//               Policy
//             </p>
//           </div>
//         </div>
//       </div>
//     </Suspense>
//   );
// }
