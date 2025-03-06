import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import axios from 'axios';
import "../../output.css";
import { Check } from "lucide-react";
import incomeTableImage from "C:/Users/r2com/Desktop/pratice/FInal project/front/fronted/src/assets/images/2025yfamilypay.png";

// 나이 계산 유틸리티 함수
const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const year = parseInt(birthDate.substring(0, 4));
  const month = parseInt(birthDate.substring(4, 6)) - 1;
  const day = parseInt(birthDate.substring(6, 8));

  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - month;

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }
  return age;
};

// 학생 나이 범위 상수
const ELEMENTARY_MIN_AGE = 8;
const ELEMENTARY_MAX_AGE = 13;
const MIDDLE_MIN_AGE = 14;
const MIDDLE_MAX_AGE = 16;
const HIGH_MIN_AGE = 17;
const HIGH_MAX_AGE = 19;

export default function SignUp1() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [incomeRange, setIncomeRange] = useState("");
  const [personalCharacteristics, setPersonalCharacteristics] = useState([]);
  const [householdCharacteristics, setHouseholdCharacteristics] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const regions = {
    "서울특별시": ["강남구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    "부산광역시": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
    "대구광역시": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
    "인천광역시": ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"],
    "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
    "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
    "울산광역시": ["남구", "동구", "북구", "중구", "울주군"],
    "세종특별자치시": ["세종시"],
    "경기도": ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
    "강원특별자치도": ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"],
    "충청북도": ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"],
    "충청남도": ["계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시", "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"],
    "전라북도": ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"],
    "전라남도": ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
    "경상북도": ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"],
    "경상남도": ["거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"],
    "제주특별자치도": ["서귀포시", "제주시"]
  };

  const isBirthDateValid = useMemo(() => {
    const birthDateRegex = /^\d{8}$/;
    return birthDateRegex.test(birthDate);
  }, [birthDate]);

  const age = useMemo(() => calculateAge(birthDate), [birthDate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...state,
      area: selectedRegion,
      district: selectedDistrict,
      birthDate,
      gender,
      incomeRange,
      personalCharacteristics,
      householdCharacteristics
    };
    try {
      const response = await axios.post('http://localhost:8000/submit', formData);
      console.log("서버 응답:", response.data);
      alert("회원가입 완료!");
      navigate("/signup3");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const handleCheckboxChange = (e, setState) => {
    const { id, checked } = e.target;
    setState(prevState => 
      checked ? [...prevState, id] : prevState.filter(item => item !== id)
    );
    };
    
    const isCheckboxDisabled = (item) => {
    if (gender === "male" && item === "임신부") return true;
    
    if (age >= 19 && ["초등학생", "중학생", "고등학생"].includes(item)) return true;
    
    if (age >= MIDDLE_MIN_AGE && age <= MIDDLE_MAX_AGE && item === "초등학생") return true;
    
    if (age >= ELEMENTARY_MIN_AGE && age <= ELEMENTARY_MAX_AGE && ["중학생", "고등학생"].includes(item)) return true;
    
    return false;
    };
    
    return (
    <div className="min-h-screen bg-white">
    <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto px-4 py-8 space-y-8">
    {/* 거주 지역 섹션 */}
    <section>
    <h2 className="text-lg font-medium mb-4">거주지역</h2>
    <div className="flex gap-4">
    <select
    value={selectedRegion}
    onChange={(e) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    }}
    className="flex-1 h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
    >
    <option value="">시/도 선택</option>
    {Object.keys(regions).map((region) => (
    <option key={region} value={region}>{region}</option>
    ))}
    </select>
    <select
    value={selectedDistrict}
    onChange={(e) => setSelectedDistrict(e.target.value)}
    className="flex-1 h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
    disabled={!selectedRegion}
    >
    <option value="">구/군 선택</option>
    {selectedRegion && regions[selectedRegion].map((district) => (
    <option key={district} value={district}>{district}</option>
    ))}
    </select>
    </div>
    </section>
    
        {/* 나머지 섹션은 기존과 동일 */}
        <section>
          <h2 className="text-lg font-medium mb-4">생년월일</h2>
          <div className="relative">
            <Input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="생년월일 입력 (예:19850101)"
              className="h-12 border-[#bbbbbb] text-base placeholder:text-[#bbbbbb]"
            />
            {isBirthDateValid && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#4ba6f7] rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </section>
    
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
    
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-medium">소득금액 구간</h2>
            <button
              type="button"
              className="bg-[#4ba6f7] text-white px-4 py-2 rounded-full text-sm"
              onClick={() => setShowIncomeModal(true)}
            >
              2025년 가구 규모별 기준중위 소득표 보기
            </button>
          </div>
          <RadioGroup value={incomeRange} onValueChange={setIncomeRange} className="flex flex-wrap gap-4" name="incomeRange">
            {["0 ~ 50%", "51 ~ 75%", "76 ~ 100%", "101 ~ 200%", "200% 이상"].map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <RadioGroupItem value={range} id={range} name="incomeRange" />
                <Label htmlFor={range}>{range}</Label>
              </div>
            ))}
          </RadioGroup>
        </section>
    
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">개인 특성 정보 (중복 선택)</h2>
          </div>
          <div className="bg-[#f4f4f4] p-6 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "예비부부/난임", "임신부", "출산/입양", "장애인", "국가보훈대상자",
              "농업인", "어업인", "축산인", "임업인", "초등학생", "중학생", "고등학생",
              "대학생/대학원생", "질병/질환자", "구직자/실업자", "해당사항 없음"
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`${item}`}
                  onChange={(e) => handleCheckboxChange(e, setPersonalCharacteristics)}
                  disabled={isCheckboxDisabled(item)}
                />
                <Label
                  htmlFor={`${item}`}
                  style={{ opacity: isCheckboxDisabled(item) ? 0.5 : 1 }}
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </section>
    
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
    
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" className="px-8 py-2 border-[#bbbbbb] text-[#8a8a8a] hover:bg-gray-50">이전</Button>
          <Button type="submit" className="px-8 py-2 bg-[#4ba6f7] hover:bg-[#4ba6f7]/90 text-white">회원가입 완료</Button>
        </div>
      </form>
      {/* [변경 부분] 4: 모달 추가 (showIncomeModal가 true일 때만 표시) */}
      {showIncomeModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowIncomeModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={incomeTableImage}
              alt="2025년 가구 규모별 기준중위 소득표"
              className="w-full h-auto"
            />
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowIncomeModal(false)}>
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
    }