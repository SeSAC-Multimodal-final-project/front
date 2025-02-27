
// import { useState } from "react"
// import { Button } from "../ui/Button"
// import { Label } from "../ui/Label"
// import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup"
// import { Checkbox } from "../ui/Checkbox"
// //import SignUp2 from "./SignUp2";
// import "../../output.css"

// export default function SignUp() {
//   const [incomeRange, setIncomeRange] = useState("")
//   const [incomeRange, setIncomeRange] = useState("")

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Form */}
//       <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
//         {/* Income Range Section */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-medium">소득금액 구간</h2>
//           <RadioGroup value={incomeRange} onValueChange={setIncomeRange} className="flex flex-wrap gap-4">
//             {["0 ~ 50%", "51 ~ 75%", "76 ~ 100%", "101 ~ 200%", "200% 이상"].map((range) => (
//               <div key={range} className="flex items-center space-x-2">
//                 <RadioGroupItem value={range} id={range} />
//                 <Label htmlFor={range}>{range}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>

//         {/* Personal Characteristics Section */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-medium">개인 특성 정보 (중복 선택)</h2>
//             <Button variant="link" className="text-[#4ba6f7]">
//               2025년 가구 규모별 기준중위 소득표 보기
//             </Button>
//           </div>
//           <div className="bg-[#f4f4f4] p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
//             {[
//               "예비부부/난임",
//               "임신부",
//               "출산/입양",
//               "장애인",
//               "국가보훈대상자",
//               "농업인",
//               "어업인",
//               "축산인",
//               "임업인",
//               "초등학생",
//               "중학생",
//               "고등학생",
//               "대학생/대학원생",
//               "질병/질환자",
//               "구직자/실업자",
//               "해당사항 없음",
//             ].map((item) => (
//               <div key={item} className="flex items-center space-x-2">
//                 <Checkbox id={`personal-${item}`} />
//                 <Label htmlFor={`personal-${item}`}>{item}</Label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Household Characteristics Section */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-medium">가구 특성 정보</h2>
//           <div className="bg-[#f4f4f4] p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
//             {[
//               "다문화가정",
//               "북한이탈주민가정",
//               "한부모가정/조손가정",
//               "1인 가구",
//               "다자녀가구",
//               "무주택세대",
//               "신규전입가구",
//               "확대가족",
//               "해당사항 없음",
//             ].map((item) => (
//               <div key={item} className="flex items-center space-x-2">
//                 <Checkbox id={`household-${item}`} />
//                 <Label htmlFor={`household-${item}`}>{item}</Label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-center gap-4 pt-4">
//           <Button variant="outline" className="px-8 py-2 border-[#bbbbbb] text-[#8a8a8a] hover:bg-gray-50">
//             이전
//           </Button>
//           <Button className="px-8 py-2 bg-[#4ba6f7] hover:bg-[#4ba6f7]/90 text-white">회원가입 완료</Button>
//         </div>
//       </div>
//     </div>
//   )
// }
