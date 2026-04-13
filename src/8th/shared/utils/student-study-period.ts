/**
 * 무제한 학습 기간은 API에서 StudyEndDay 9999, StudyEndDate 9999-xx-xx 등으로 내려옴.
 */
export function isUnlimitedStudyPeriod(
  studyEndDay: number,
  studyEndDate?: string,
): boolean {
  if (studyEndDay >= 9999) return true
  const digits = (studyEndDate || '').replace(/\D/g, '')
  return digits.length >= 4 && digits.startsWith('9999')
}
