import React from 'react';
import '../../style/sass/signup.scss';
import backArrow from '../../style/images/backArrow.png';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedYear, setSelectedYear] = useState('-');
  const [selectedMonth, setSelectedMonth] = useState('-');
  const [selectedDay, setSelectedDay] = useState('-');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const PHONENUMBER_LIST = ['010', '011'];
  const phoneNumberOption = /^[0-9]{8}$/;
  useEffect(() => {
    setSelectedPhoneNumber(PHONENUMBER_LIST[0]);
  }, []);
  const validPhoneNumber =
    selectedPhoneNumber && phoneNumber.match(phoneNumberOption) !== null;
  const inputEmail = e => {
    const email = e.target.value;
    setEmail(email);
  };
  const emailOption = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const validMail = email.match(emailOption) !== null;
  const inputPassword = e => {
    const password = e.target.value;
    setPassword(password);
  };
  const ablePassword = password.length > 10;
  const passwordMatch = password === confirmPassword;
  const inputConfirmPassword = e => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };
  const inputNickname = e => {
    const nickname = e.target.value;
    setNickname(nickname);
  };
  const nicknameOption = /^[a-zA-Z0-9가-힣]{1,12}$/;
  const validNickname = nickname.match(nicknameOption) !== null;
  const inputPhoneNumber = e => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };
  const handlePhoneNumberChange = e => {
    setSelectedPhoneNumber(e.target.value);
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/users/signIn');
  };
  const BIRTHDAY_YEAR_LIST = Array.from(
    { length: 15 },
    (_, i) => `${i + 1990}년`,
  );
  const BIRTHDAY_MONTH_LIST = Array.from(
    { length: 12 },
    (_, i) => `${i + 1}월`,
  );
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
  const handleYearChange = e => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = e => {
    setSelectedDay(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const phoneNumberValue = selectedPhoneNumber + phoneNumber;
      const birthday = selectedYear + selectedMonth + selectedDay;

      console.log(phoneNumberValue);
      console.log(birthday);
      const data = {
        email,
        password,
        nickname,
        phoneNumberValue,
        birthday,
      };
      const response = await fetch('http://192.168.35.252:8000/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
    }
  };
  const handleSignUpButtonClick = () => {
    handleSignUp();
  };
  useEffect(() => {
    // handleSignUp();
  }, []);
  const signUpClick = () => {
    alert('회원가입 시도');
  };

  return (
    <div className="joinInfoRequire">
      <div className="header">
        <button className="back" onClick={handleBackButtonClick}>
          <img className="backArrow" src={backArrow} alt="Join backArrow" />
          <div className="BackText">뒤로</div>
        </button>
      </div>
      <div className="container">
        <div className="titleText">회원가입</div>
        <div className="basicInfoFrame">
          <div className="label">
            <p className="userinfoText">기본 정보</p>
            <p className="infoOptionalText">필수 사항</p>
          </div>
          <div className="userInputFrame">
            <input
              className="userInput"
              type="text"
              placeholder="이메일"
              onChange={inputEmail}
            />

            <input
              className="userInput"
              type="password"
              placeholder="비밀번호"
              onChange={inputPassword}
            />

            <input
              className="userInput"
              type="password"
              placeholder="비밀번호확인"
              onChange={inputConfirmPassword}
            />
          </div>
          <div />
          <div className="nicknameInfoFrame">
            <div className="nicknameLabel">
              <p className="nicknameInfoText">닉네임</p>
              <p className="infoOptionalText">필수 사항</p>
            </div>
            <div className="nicknameInputFrame">
              <input
                className="nicknameInput"
                type="text"
                placeholder="닉네임 (한글+숫자조합 12자 이하)"
                onChange={inputNickname}
              />
            </div>
          </div>

          <div className="phoneNumberInfoFrame">
            <div className="phoneNumberLabel">
              <p className="phoneNumberinfoText">전화번호</p>
              <p className="infoOptionalText">필수 사항</p>
            </div>
            <div className="numberSelectBox">
              <select
                className="numberBox"
                onChange={handlePhoneNumberChange}
                value={selectedPhoneNumber}
              >
                {PHONENUMBER_LIST.map((number, index) => (
                  <option key={index}>{number}</option>
                ))}
              </select>
              <input
                className="numberInput"
                type="text"
                placeholder="휴대폰 번호를 입력해주세요(- 제외)"
                onChange={inputPhoneNumber}
              />
            </div>
          </div>
          <div className="birthdayFrame">
            <div className="birthdayLabel">
              <p className="birthdayInfoText">생일</p>
              <p className="infoOptionalText1">선택 사항</p>
            </div>
            <div className="birthdaySelectFrame">
              <select
                className="yearBox"
                onChange={handleYearChange}
                value={selectedYear}
              >
                <option value="-">-</option>
                {BIRTHDAY_YEAR_LIST.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="monthBox"
                onChange={handleMonthChange}
                value={selectedMonth}
              >
                <option value="-">-</option>
                {BIRTHDAY_MONTH_LIST.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="dayBox"
                onChange={handleDayChange}
                value={selectedDay}
              >
                <option value="-">-</option>
                {BIRTHDAY_DAY_LIST.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <Button
        disabled={
          !validMail ||
          !ablePassword ||
          !passwordMatch ||
          !validNickname ||
          !validPhoneNumber
        }
        onClick={() => {
          handleSignUpButtonClick();
          signUpClick();
        }}
      >
        회원가입
      </Button>
    </div>
  );
};

export default Join;
