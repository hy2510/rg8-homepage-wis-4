const basicEventList: { name: string; category: string }[] = [
  {
    name: '회원가입',
    category: 'airbridge.user.signup',
  },
  {
    name: '상품구매',
    category: 'airbridge.ecommerce.order.completed',
  },
  {
    name: '로그인',
    category: 'airbridge.user.signin',
  },
]

const abStandardEventList: { name: string; category: string }[] = [
  {
    name: '로그아웃',
    category: 'airbridge.user.signout',
  },
  {
    name: '홈 화면 조회',
    category: 'airbridge.ecommerce.home.viewed',
  },
  {
    name: '상품 리스트 조회',
    category: 'airbridge.ecommerce.productList.viewed',
  },
  {
    name: '이용권 상품 조회',
    category: 'airbridge.ecommerce.product.viewed',
  },
  {
    name: '결제 시작',
    category: 'airbridge.initiateCheckout',
  },
  {
    name: '구매 취소',
    category: 'airbridge.ecommerce.order.canceled',
  },
  {
    name: '무료 체험 시작',
    category: 'airbridge.startTrial',
  },
]

const abCustomEventList: { name: string; category: string }[] = [
  {
    name: '회원가입 진입',
    category: 'rg_sign_up_enter',
  },
  {
    name: '회원가입 시작',
    category: 'rg_sign_up_start',
  },
  {
    name: '회원가입 완료',
    category: 'rg_sign_up_complete',
  },
  {
    name: '로그인 성공',
    category: 'rg_login_success',
  },
  {
    name: '로그인 실패',
    category: 'rg_login_fail',
  },
  {
    name: '탈퇴',
    category: 'rg_user_deactivated',
  },
  {
    name: '이용권 등록 화면 진입',
    category: 'rg_voucher_view',
  },
  {
    name: '이용권 코드 입력 시도',
    category: 'rg_voucher_input_attempt',
  },
  {
    name: '이용권 등록 완료',
    category: 'rg_voucher_register_complete',
  },
  {
    name: '이용권 등록 실패',
    category: 'rg_voucher_register_fail',
  },
  {
    name: '이용권 상태 조회',
    category: 'rg_subscription_status_view',
  },
  {
    name: '무료 체험 시작',
    category: 'rg_trial_start',
  },
  {
    name: '무료 체험 종료',
    category: 'rg_trial_complete',
  },
  {
    name: '이용권 구매 화면 진입',
    category: 'rg_subscription_view',
  },
  {
    name: '이용권 결제하기 클릭',
    category: 'rg_payment_click',
  },
  {
    name: '결제 시도',
    category: 'rg_payment_attempt',
  },
  {
    name: '결제 완료',
    category: 'rg_payment_complete',
  },
  {
    name: '결제 취소',
    category: 'rg_payment_canceled',
  },
  {
    name: '유료 회원 전환',
    category: 'rg_premium_upgrade',
  },
  {
    name: 'GNB 탭 클릭',
    category: 'rg_gnb_tab_click',
  },
  {
    name: '학습하기 버튼 클릭',
    category: 'rg_study_start_click',
  },
  {
    name: '버전(차수) 진입',
    category: 'rg_version_enter',
  },
  {
    name: '캘린더 화면 진입',
    category: 'rg_calendar_view',
  },
  {
    name: '캘린더 날짜 클릭',
    category: 'rg_calendar_date_click',
  },
  {
    name: '연속학습어워드 화면 진입',
    category: 'rg_streak_award_view',
  },
  {
    name: '연속학습어워드 달성',
    category: 'rg_streak_award_achieved',
  },
  {
    name: '퀘스트 목록 화면 진입',
    category: 'rg_quest_view',
  },
  {
    name: '퀘스트 완료',
    category: 'rg_quest_complete',
  },
  {
    name: '나의RG 화면 진입',
    category: 'rg_my_rg_view',
  },
  {
    name: '나의RG 상세 통계 확인',
    category: 'rg_my_rg_stats_view',
  },
  {
    name: '기초 카테고리 진입',
    category: 'rg_basic_category_view',
  },
  {
    name: '도서 섹션 탭 클릭',
    category: 'rg_book_section_tab_click',
  },
  {
    name: '도서 탐색 필터 적용',
    category: 'rg_book_filter_apply',
  },
  {
    name: '도서 검색',
    category: 'rg_book_search',
  },
  {
    name: '도서 상세 조회',
    category: 'rg_book_detail_view',
  },
  {
    name: 'Movie 카테고리 진입',
    category: 'rg_movie_category_view',
  },
  {
    name: 'Movie 상세 조회',
    category: 'rg_movie_detail_view',
  },
  {
    name: 'Movie 시청 시작',
    category: 'rg_movie_watch_start',
  },
  {
    name: 'Daily RG 시작',
    category: 'rg_daily_start',
  },
  {
    name: 'Daily RG 미완료',
    category: 'rg_daily_not_completed',
  },
  {
    name: 'Daily RG 완료',
    category: 'rg_daily_complete',
  },
  {
    name: 'My Read 화면 진입',
    category: 'rg_result_myread_view',
  },
  {
    name: 'My Read 기간 선택',
    category: 'rg_result_myread_period_select',
  },
  {
    name: 'My Read 도서 클릭',
    category: 'rg_result_myread_book_click',
  },
  {
    name: 'My Speak 화면 진입',
    category: 'rg_result_myspeak_view',
  },
  {
    name: 'My Speak 기간 선택',
    category: 'rg_result_myspeak_period_select',
  },
  {
    name: '랭킹 탭 진입',
    category: 'rg_ranking_view',
  },
  {
    name: '랭킹 서브탭 클릭',
    category: 'rg_ranking_tab_click',
  },
  {
    name: '다독(포인트) 랭킹 조회',
    category: 'rg_ranking_points_view',
  },
  {
    name: '월 선택',
    category: 'rg_ranking_period_select',
  },
  {
    name: '포인트 안내 클릭',
    category: 'rg_ranking_points_info_click',
  },
  {
    name: '영어독서왕 랭킹 조회',
    category: 'rg_ranking_challenge_view',
  },
  {
    name: '대회 선택',
    category: 'rg_ranking_challenge_select',
  },
  {
    name: '레벨마스터 랭킹 조회',
    category: 'rg_ranking_level_view',
  },
  {
    name: '명예의전당 조회',
    category: 'rg_ranking_hall_view',
  },
  {
    name: '나의 활동 화면 진입',
    category: 'rg_my_activity_view',
  },
  {
    name: '계정설정 화면 진입',
    category: 'rg_account_setting_view',
  },
  {
    name: '계정정보 화면 진입',
    category: 'rg_account_info_view',
  },
  {
    name: '일일목표 화면 진입',
    category: 'rg_daily_goal_view',
  },
  {
    name: '리딩유닛 스토리 화면 진입',
    category: 'rg_readingunit_story_view',
  },
  {
    name: '레벨마스터 목록 화면 진입',
    category: 'rg_level_master_view',
  },
]

export function findEventCategory(name: string): string | undefined {
  const category = basicEventList.find((item) => item.name === name)?.category
  if (!!category) {
    return category
  }
  // FIXME :: 서비스 오픈 전까지 category 필터링 안되도록 설정
  // category = abStandardEventList.find((item) => item.name === name)?.category
  // if (!!category) {
  //   return category
  // }
  // category = abCustomEventList.find((item) => item.name === name)?.category
  // if (!!category) {
  //   return category
  // }
  return undefined
}
