import { getLevelBooks } from '@/7th/_repository/client/achievement/level-books'
import { getLevelPoint } from '@/7th/_repository/client/achievement/level-point'
import { getCategorySeries } from '@/7th/_repository/client/library/category/category-series'
import { getSearchLevelBook } from '@/7th/_repository/client/library/search/search-level'
import { getReadingKingEventDetail } from '@/7th/_repository/client/readingking/event-detail'
import { getReadingKingEventList } from '@/7th/_repository/client/readingking/event-list'
import { postChangePassword as postAccountChangePassword } from './account/change-password'
import { getClassGroup } from './account/class-group'
import { getClassList } from './account/class-list'
import { postFindIdClassAndStudentName } from './account/find-id-class-and-student-name'
import { getForgotId } from './account/forgot-id'
import { postForgotIdClassAndStudentName } from './account/forgot-id-class-and-student-name'
import { getForgotPassword } from './account/forgot-password'
import { postForgotPasswordConfirm } from './account/forgot-password-confirm'
import { postSignin } from './account/signin'
import { postSigninWithCode } from './account/signin-with-code'
import { deleteSignout } from './account/signout'
import { postSignupCertEmail } from './account/signup-cert-email'
import { postSignupCertPhone_VN } from './account/signup-cert-phone-vn'
import { postSignupConfirmEmail } from './account/signup-confirm-email'
import { postSignupConfirmEmail_VN } from './account/signup-confirm-email-vn'
import { postSignupConfirmPhone_VN } from './account/signup-confirm-phone-vn'
import { postSignup_VN } from './account/signup-vn'
import { getLevelMaster } from './achievement/level-master'
import { getLevelTest } from './achievement/level-test'
import { getReadingKingTrophy } from './achievement/readingking-trophy'
import { getSuccessiveDailyGoal } from './achievement/success-daily-goal'
import { getSuccessiveStudy } from './achievement/success-study'
import { getAttendCalendar } from './calendar/attend-calendar'
import { getStudyCalendar } from './calendar/study-calendar'
import { getFindCustomer } from './customer/find-customer'
import { getSearchCustomer } from './customer/search-customer'
import { getSpeakingReport } from './history/speaking-report'
import { getStudyReport } from './history/study-report'
import { getBoardCustomerReview } from './home/board-customer-reivew-detail'
import { getBoardCustomerReviewList } from './home/board-customer-reivew-list'
import { getBoardGallery } from './home/board-gallery-detail'
import { getBoardGalleryList } from './home/board-gallery-list'
import { getBoardNotice } from './home/board-notice-detail'
import { getBoardNoticeList } from './home/board-notice-list'
import { getMain } from './home/main'
import { getBoardNoticeMain } from './home/main-notice-list'
import { getBookInfo } from './library/book-info/book-info'
import { postStudyMode } from './library/book-info/study-mode'
import { getCategoryTheme } from './library/category/category-theme'
import { getExportBookList } from './library/export/export-book-list'
import { getExportStudentReport } from './library/export/export-student-report'
import { getExportVocabulary } from './library/export/export-vocabulary'
import { getExportWorksheet } from './library/export/export-worksheet'
import { getFavorite } from './library/favorite/favorite'
import { postFavoriteAdd } from './library/favorite/favorite-add'
import { deleteFavorite } from './library/favorite/favorite-delete'
import { deleteFavoriteAll } from './library/favorite/favorite-delete-all'
import { getNewBooks } from './library/new-books'
import { getSearchDodoABCBook } from './library/search/search-dodoabc'
import { getSearchKeywordBook } from './library/search/search-keyword'
import { getSearchMovieBook } from './library/search/search-movie'
import { getSearchPreKBook } from './library/search/search-pk'
import { getSearchSeriesBook } from './library/search/search-series'
import { getSearchThemeBook } from './library/search/search-theme'
import { getSearchTryAgain } from './library/search/search-try-again'
import { getSearchWorkbook } from './library/search/search-workbook'
import { getTodo } from './library/todo/todo'
import { postTodoAdd } from './library/todo/todo-add'
import { deleteTodo } from './library/todo/todo-delete'
import { deleteTodoAll } from './library/todo/todo-delete-all'
import { putAdjustChange } from './payment/adjust/adjust-change'
import { getAdjustHistory } from './payment/adjust/adjust-history'
import { getPaymentHistory } from './payment/history/payment-history'
import { postInappPurchase } from './payment/inapp/inapp-purchase'
import { getPurchaseProduct } from './payment/purchase-product/purchase-product'
import { putRegistTicket } from './payment/regist-ticket/regist-ticket'
import { getUnpaidBalance } from './payment/unpaid-balance/unpaid-balance'
import { getHallOfFame } from './ranking/hall-of-fame'
import { getLevelMasterBoard } from './ranking/level-master'
import { getRankingPoint } from './ranking/point-ranking'
import { getRankingReadingking } from './ranking/readingking'
import { getRankingReadingkingGroup } from './ranking/readingking-group'
import { getReadingKingEventPrizeList } from './readingking/event-prize-list'
import { getReadingKingEventSet } from './readingking/event-prize-set'
import { deleteBoardGalleryDelete } from './staff/board-gallery-delete'
import { postBoardGalleryModify } from './staff/board-gallery-modify'
import { postBoardGalleryWrite } from './staff/board-gallery-write'
import { deleteBoardNoticeDelete } from './staff/board-notice-delete'
import { postBoardNoticeModify } from './staff/board-notice-modify'
import { postBoardNoticeWrite } from './staff/board-notice-write'
import { putAttendance } from './student/attendance'
import { putChangeContinuousStudyViewType } from './student/change-continuous-study-view-type'
import { postChangeGroupClass } from './student/change-group-class'
import { postChangePassword } from './student/change-password'
import { postChangeSmsAgree } from './student/change-sms-agree'
import { putChangeStudentName } from './student/change-student-name'
import { postChangeStudySetting } from './student/change-study-setting'
import { getChangeableGroupClassInfo } from './student/changeable-group-class-info'
import { getContinuousStudy } from './student/continuous-study'
import { getLevelTestInfo } from './student/level-test-info'
import { getStudent } from './student/student'
import { getStudentAvatarList } from './student/student-avatar-list'
import { putStudentAvatarUpdate } from './student/student-avatar-update'
import { getStudentDailyLearning } from './student/student-daily-learning'
import { getStudentDailyLearningHistory } from './student/student-daily-learning-history'
import { putStudentDailyLearningSave } from './student/student-daily-learning-save'
import { putStudentDailyLearningSaveLevel } from './student/student-daily-learning-save-level'
import { getStudentEarnReadingUnit } from './student/student-earn-reading-unit'
import { getStudentHistoryList } from './student/student-history-list'
import { postStudentPhoneCert } from './student/student-phone-cert'
import { postStudentPhoneRequest } from './student/student-phone-request'
import { getTodayStudyLearning } from './student/today-study-learning'
import { getWho } from './student/who'
import { postWithdraw } from './student/withdraw'

const Repository = {
  getLevelBooks,
  getLevelPoint,
  getLevelMaster,
  getLevelTest,
  getFavorite,
  postFavoriteAdd,
  deleteFavorite,
  deleteFavoriteAll,
  getTodo,
  postTodoAdd,
  deleteTodo,
  deleteTodoAll,
  getNewBooks,
  getBookInfo,
  postStudyMode,
  getCategorySeries,
  getCategoryTheme,
  getSearchLevelBook,
  getSearchPreKBook,
  getSearchDodoABCBook,
  getSearchThemeBook,
  getSearchSeriesBook,
  getSearchWorkbook,
  getReadingKingEventList,
  getReadingKingEventDetail,
  getReadingKingEventPrizeList,
  getReadingKingEventSet,
  getStudent,
  getStudentHistoryList,
  getStudentDailyLearning,
  putStudentDailyLearningSaveLevel,
  putStudentDailyLearningSave,
  getStudentDailyLearningHistory,
  postChangePassword,
  postChangeStudySetting,
  getSearchTryAgain,
  getSearchKeywordBook,
  getSearchMovieBook,
  getStudentAvatarList,
  putStudentAvatarUpdate,
  putChangeStudentName,
  postChangeSmsAgree,
  getRankingPoint,
  getRankingReadingking,
  getRankingReadingkingGroup,
  getAttendCalendar,
  getStudyCalendar,
  getStudyReport,
  getSpeakingReport,
  getTodayStudyLearning,
  getLevelTestInfo,
  getContinuousStudy,
  putChangeContinuousStudyViewType,
  getSuccessiveStudy,
  getSuccessiveDailyGoal,
  getReadingKingTrophy,
  postSignupCertEmail,
  postSignupConfirmEmail,
  postSignupConfirmEmail_VN,
  postSignupCertPhone_VN,
  postSignupConfirmPhone_VN,
  postSignup_VN,
  postSignin,
  postSigninWithCode,
  deleteSignout,
  postAccountChangePassword,
  getForgotId,
  getForgotPassword,
  postForgotPasswordConfirm,
  postForgotIdClassAndStudentName,
  postFindIdClassAndStudentName,
  getClassGroup,
  getClassList,
  getSearchCustomer,
  getFindCustomer,
  putAttendance,
  getExportBookList,
  getExportVocabulary,
  getExportStudentReport,
  getExportWorksheet,
  getBoardNoticeMain,
  getBoardNoticeList,
  getBoardNotice,
  getHallOfFame,
  getLevelMasterBoard,
  getMain,
  getAdjustHistory,
  putAdjustChange,
  getPaymentHistory,
  postWithdraw,
  getStudentEarnReadingUnit,
  getPurchaseProduct,
  getUnpaidBalance,
  putRegistTicket,
  postStudentPhoneRequest,
  postStudentPhoneCert,
  getWho,
  postInappPurchase,
  getBoardGalleryList,
  getBoardGallery,
  getBoardCustomerReviewList,
  getBoardCustomerReview,
  getChangeableGroupClassInfo,
  postChangeGroupClass,
  postBoardNoticeWrite,
  postBoardNoticeModify,
  deleteBoardNoticeDelete,
  postBoardGalleryWrite,
  postBoardGalleryModify,
  deleteBoardGalleryDelete,
}
export default Repository
