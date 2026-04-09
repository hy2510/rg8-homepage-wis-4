const KO_RES = {
    daily_goal_title: '일일목표 달성!',
    daily_goal_message: '오늘의 학습 목표를 달성했어요!',
    daily_goal_badge_title: '일일목표 어워드 획득!',
    daily_goal_badge_message: '대단해요! 일일 학습 목표를 누적 {{num}}회 달성했어요!',
    streak_title: '연속학습 달성!',
    streak_message: '아자아자! 매일 독서 습관이 쌓여가고 있어요!',
    streak_badge_title: '연속학습 어워드 획득!',
    streak_badge_message: '멋져요! 연속학습을 누적 {{num}}회 달성했어요!',
    new_friends_story_title: '새로운 성장 스토리 잠금해제!',
    new_friends_story_message: '퀘스트 메뉴에서 확인해 보세요!',
    level_master_badge_title: '레벨 마스터 배지 획득!',
    level_master_badge_message: '훌륭해요! {{txt}} 레벨의 수준을 모두 마스터했어요!',
    challenge_award_title: '영어독서왕 챌린지 어워드 획득!',
    challenge_award_message: '축하합니다! 영어독서왕에 등극하셨어요!'
  }
  const EN_RES = {
      daily_goal_title: 'Daily Goal Achieved!',
      daily_goal_message: 'You’ve achieved the daily goals!',
      daily_goal_badge_title: 'Daily Goal Award Earned!',
      daily_goal_badge_message: 'Great job! You’ve achieved the daily goal {{num}} times!',
      streak_title: 'Day Streak Achieved!',
      streak_message: 'Go, go! My daily reading habit is building up!',
      streak_badge_title: 'Day Streak Award Achieved!',
      streak_badge_message: 'Awesome! You’ve reached a {{num}}-day study streak!',
      new_friends_story_title: 'New Friends’ Stories Unlocked!',
      new_friends_story_message: 'Check it out in the Quest Menu!',
      level_master_badge_title: 'Level Master Badge Achieved!',
      level_master_badge_message: 'Great job! I’ve mastered all the Levels of {{txt}}!',
      challenge_award_title: 'English Reading King Challenge Award Achieved!',
      challenge_award_message: 'Congratulations! You’ve become the English Reading King!',
  }
  const VI_RES = {
      daily_goal_title: 'Hoàn thành mục tiêu hàng ngày!',
      daily_goal_message: 'Bạn đã đạt được mục tiêu học tập của ngày hôm nay!',
      daily_goal_badge_title: 'Ghi nhận thành tích mục tiêu hàng ngày!',
      daily_goal_badge_message: 'Làm tốt lắm! Bạn đã tích lũy được {{num}} lần hoàn thành mục tiêu hàng ngày!',
      streak_title: 'Ghi nhận thành tích học liên tục!',
      streak_message: 'Cố lên! Bạn đang tích lũy kinh nghiệm cho thói quen đọc sách hàng ngày!',
      streak_badge_title: 'Ghi nhận thành tích học liên tục!',
      streak_badge_message: 'Thật tuyệt vời! Bạn đã tích lũy được {{num}} lần học liên tục!',
      new_friends_story_title: 'Đã mở khóa câu chuyện mới của nhân vật!',
      new_friends_story_message: 'Hãy kiểm tra trong trang Nhiệm vụ!',
      level_master_badge_title: 'ĐẠT HUY HIỆU LEVEL MASTER!',
      level_master_badge_message: 'Thật tuyệt vời! Bạn đã thành thạo tất cả các nội dung của level {{txt}}!',
      challenge_award_title: 'Ghi nhận thành tích King of Reading!',
      challenge_award_message: 'Chúc mừng! Bạn đã trở thành King of Reading!',
  }
  
  function initTranslation(language) {
      let Resource
      if(language === 'en'){
          Resource = EN_RES
      }else if(language === 'vi'){
          Resource = VI_RES
      }else{
          Resource = KO_RES
      }
      const t = (id, params = {}) => {
          const message = Resource[id]
          if(!message){
              return id
          }
          return message.replace(/{{(\w+)}}/g, (match, key) => {
              return params[key] !== undefined ? params[key] : match;
          });
      }
      return t
  }