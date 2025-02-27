import React, {useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate는 react-router-dom에서 가져옵니다
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import axios from 'axios';
import "../../output.css";



export default function SignUp1() {
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [incomeRange, setIncomeRange] = useState("");
  const [personalCharacteristics, setPersonalCharacteristics] = useState([]);
  const [householdCharacteristics, setHouseholdCharacteristics] = useState([]);
  const navigate = useNavigate ();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      area,
      district,
      birthDate,
      gender,
      incomeRange,
      personalCharacteristics,
      householdCharacteristics
    };
    try {
      const response = await axios.post('http://localhost:8000/submit', formData);
      console.log('JSON 응답:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('백엔드로 데이터를 전송하는 동안 오류가 발생했습니다:', error);
    }
  };

 
  const handlePreviousClick = () => {
    navigate('/'); // MainPage로 이동
  
  };

  const handleCheckboxChange = (e, setState, state) => {
    const { id, checked } = e.target;
    setState(prevState => 
      checked ? [...prevState, id] : prevState.filter(item => item !== id)
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-8">
          {/* 거주 지역 섹션 */}
          <section>
            <h2 className="text-lg font-medium mb-4">거주지역</h2>
            <div className="flex gap-4">
              <Input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="서울특별시"
                className="flex-1 h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
              />
              <Input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="강북구"
                className="flex-1 h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
              />
            </div>
          </section>

          {/* 생년월일 섹션 */}
          <section>
            <h2 className="text-lg font-medium mb-4">생년월일</h2>
            <Input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="생년월일 입력 (예:19850101)"
              className="h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
            />
          </section>

      {/* 성별 섹션 */}
      <section>
        <h2 className="text-lg font-medium mb-4">성별</h2>
        <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4" name="gender">
          <div className="flex items-center">
            <RadioGroupItem value="male" id="male" name="gender" className="border-[#bbbbbb] text-[#4ba6f7]" />
            

            <Label htmlFor="male" className="ml-2 text-base">남성</Label>
          </div>
          <div className="flex items-center">
          <RadioGroupItem value="female" id="female" name="gender" className="border-[#bbbbbb] text-[#4ba6f7]" />
            <Label htmlFor="female" className="ml-2 text-base">여성</Label>
          </div>
        </RadioGroup>
      </section>

      {/* 소득금액 구간 섹션 */}
      <section>
        <h2 className="text-lg font-medium mb-4">소득금액 구간</h2>
        <RadioGroup value={incomeRange} onValueChange={setIncomeRange} className="flex flex-wrap gap-4" name="incomeRange">
          {["0 ~ 50%", "51 ~ 75%", "76 ~ 100%", "101 ~ 200%", "200% 이상"].map((range) => (
            <div key={range} className="flex items-center space-x-2">
              <RadioGroupItem value={range} id={range} name="incomeRange" />  
              <Label htmlFor={range}>{range}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>


          {/* 개인 특성 정보 섹션 */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">개인 특성 정보 (중복 선택)</h2>
              <Button variant="link" className="text-[#4ba6f7]">2025년 가구 규모별 기준중위 소득표 보기</Button>
            </div>
            <div className="bg-[#f4f4f4] p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "예비부부/난임", "임신부", "출산/입양", "장애인", "국가보훈대상자",
                "농업인", "어업인", "축산인", "임업인", "초등학생", "중학생",
                "고등학생", "대학생/대학원생", "질병/질환자", "구직자/실업자", "해당사항 없음"
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`${item}`} onChange={(e) => handleCheckboxChange(e, setPersonalCharacteristics)} />
                  <Label htmlFor={`${item}`}>{item}</Label>
                </div>
              ))}
            </div>
          </section>

          {/* 가구 특성 정보 섹션 */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">가구 특성 정보</h2>
            <div className="bg-[#f4f4f4] p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "다문화가정", "북한이탈주민가정", "한부모가정/조손가정", "1인 가구",
                "다자녀가구", "무주택세대", "신규전입가구", "확대가족", "해당사항 없음"
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`${item}`} onChange={(e) => handleCheckboxChange(e, setHouseholdCharacteristics)} />
                  <Label htmlFor={`${item}`}>{item}</Label>
                </div>
              ))}
            </div>
          </section>

          {/* 내비게이션 버튼 */}
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" className="px-8 py-2 border-[#bbbbbb] text-[#8a8a8a] hover:bg-gray-50">이전</Button>
            <Button type="submit" className="px-8 py-2 bg-[#4ba6f7] hover:bg-[#4ba6f7]/90 text-white" onClick={handlePreviousClick}>회원가입 완료</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
