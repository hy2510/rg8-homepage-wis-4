export default function PrivacyPolicyContentsKR() {
  return (
    <div className="privacy-policy-contents">
      <div className="comment">
        {`㈜리딩게이트에서는 리딩게이트 서비스 이용을 위해 개인정보를 수집 및
        이용합니다.`}
      </div>
      <div className="d-flex align-items-center">
        <span className="square-symbol"></span>
        <span>개인정보 이용목적 및 수집항목, 이용기간</span>
      </div>
      <div className="privacy-policy-table">
        <div className="colm-a">
          <span>목적</span>
        </div>
        <div className="colm-b">
          <ul>
            <li>
              {`서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산
              콘텐츠 제공, 구매 및 요금 결제 등`}
            </li>
            <li>
              {`회원제 서비스 이용에 따른 본인 확인, 개인 식별, 가입 의사 확인,
              민원처리, 고지사항 전달 등`}
            </li>
            <li>
              {`회사 광고, 이벤트, 행사, 판촉, 설문조사 또는 기타 사이트 기능 관리
              등`}
            </li>
            <li>
              {`개인화된 서비스, 제품, 제안 및 행사 소식에 관한 정보/자료 제공`}
            </li>
          </ul>
        </div>
        <div className="colm-a">
          <span>수집 항목</span>
        </div>
        <div className="colm-b">
          <ul>
            <li>
              {`회원가입 시 : `}
              <b>{`(필수) 이름, 로그인ID (이메일), 비밀번호, 이메일`}</b>
              {`, 출생년도,
              (본인 또는 보호자) 연락처, 보호자 성명`}
            </li>
            <li>{`이용권 결제 시`}</li>
            <li className="indent">{`신용카드 : 카드사명, 카드번호, 이메일`}</li>
            <li className="indent">
              {`실시간 계좌이체 : 은행명, 출금계좌번호, 주민등록번호, 예금주,
              이메일`}
            </li>
            <li className="indent">
              {`무통장 입금 : 입금자명, 이메일, 휴대전화 번호`}
            </li>
            <li>{`환불 처리 시 : 은행명, 환불 받을 계좌번호, 예금주`}</li>
            <li>
              {`교육기관 단체 이용시 : 이름, 휴대전화번호, 이메일, 교육기관 정보
              (학교명 또는 학원명 주소)`}
            </li>
            <li>
              {`이벤트 진행 시 : 이벤트 응모 정보 (아이디, 이름, 나이, 닉네임,
              성별, 학교명 학원명, 학년, 반), 이벤트 경품 및 상품 배송정보
              (수취인명, 수취인 휴대전화번호, 배송주소)`}
            </li>
          </ul>
        </div>
        <div className="colm-a">
          <span>보유 이용 기간</span>
        </div>
        <div className="colm-b">
          <ul>
            <li>
              {`개인정보를 수집한 목적을 달성하거나 회원의 요청이 있는 경우에는
              지체 없이 파기`}
            </li>
            <li>
              {`단, 전자 상거래 등에서 소비자 보호에 관한 법률 등 관련 법령 규정에
              의하여 보존할 필요가 있는 경우 개인 정보를 일정기간 보유 가능`}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="comment">
          {`• 서비스 이용 과정이나 정보처리 과정에서 쿠키, 서비스 이용 기록, 접속
          로그가 생성되어 수집될 수 있습니다.`}
        </div>
        <div className="comment">
          {`• 개인정보 수집 및 이용 동의에 거부하실 수 있으며, 동의 거부 시 서비스
          이용이 불가합니다.`}
        </div>
      </div>
    </div>
  )
}
