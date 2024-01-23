const Main = () => {
  return (
    <div className="page main">
      <div className="mainArea">
        <h1 className="logo">
          <span className="blind">logo</span>
        </h1>
        <div className="loginArea">
          <div className="loginGroup">
            <h2 className="loginTitle">LOGIN</h2>
            {/* 로그인 인풋 폼 */}
            <form>
              <div className="formInput">
                <label htmlFor="email" className="formLabel blind">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  className="formControl"
                  placeholder="이메일"
                />
              </div>
              <div className="formInput">
                <label htmlFor="password" className="formLabel blind">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  className="formControl"
                  placeholder="비밀번호"
                />
              </div>
            </form>
            {/* // 로그인 인풋 폼 */}
            <div className="btnArea">
              <button type="button" className="btn">
                로그인
              </button>
            </div>
          </div>
          <div className="loginGroup">
            <div className="btnArea btnBetween">
              <button type="button" className="btn">
                아이디 찾기
              </button>
              <button type="button" className="btn">
                비밀번호 찾기
              </button>
            </div>
          </div>
          <div className="loginGroup">
            <div className="btnArea">
              <button type="button" className="btn">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
