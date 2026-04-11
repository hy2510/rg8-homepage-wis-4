'use client'

import { Assets } from '@/8th/assets/asset-library'
import styled from 'styled-components'
import { labtopL, labtopS, phone, tabletS } from './StyleUtils'

// CSS Property for smooth gradient animation
const gradientAnimationCSS = `
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
`

// features > achieve

export const ChallengeTrophyCardStyle = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--line-color-primary);

  .title-link {
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-family: var(--font-family-secondary);
      font-weight: bold;
    }
  }

  .challenge-trophy-image {
    width: 72px;
    height: auto;
  }

  .challenge-award-name {
    font-family: var(--font-family-secondary);
    font-weight: 700;
    font-size: var(--font-size-medium);
    color: var(--font-color-secondary);
  }
`

export const DailyGoalCardStyle = styled.div`
  width: 100%;

  .body {
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 10px;
    align-items: center;

    .comment {
      font-size: var(--font-size-large);
      font-weight: bold;
      font-family: var(--font-family-secondary);
      padding-left: 10px;
    }

    .progress {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .donut-progress {
      position: relative;
      width: 100px;
      height: 100px;

      &::after {
        content: '';
        position: absolute;
        top: 14px;
        left: calc(50% - 1px);
        width: 2px;
        height: 2px;
        background-color: #fff;
        border-radius: 50%;
        z-index: 10;
      }
    }

    .donut-chart {
      position: absolute;
      top: 0;
      left: 0;
    }

    .donut-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1em;
      text-align: center;
      gap: 5px;

      .daily-progress {
        color: var(--font-color-secondary);

        &.active {
          color: var(--font-color-primary);
        }
      }

      .daily-goal {
        color: var(--font-color-secondary);
      }
    }
  }

  .body-complete {
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 5px;
    align-items: center;

    .comment {
      color: #b2720a;
      padding-left: 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      position: relative;
      z-index: 1;

      .comment-title {
        font-size: var(--font-size-large);
        font-weight: bold;
        font-family: var(--font-family-secondary);
      }

      .comment-text {
        font-family: var(--font-family-secondary);
        font-size: var(--font-size-medium);
        font-weight: bold;
        letter-spacing: -0.05em;
      }

      &.award {
        color: #fff;
      }
    }

    .complete {
      width: 100px;
      height: 100px;
      font-size: var(--font-size-xlarge);
      background-image: url(${Assets.Icon.Side.dailyGoalCompleteBg.src});
      background-size: 80px;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #b2720a;
      font-weight: bold;
      font-family: var(--font-family-secondary);
      position: relative;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${Assets.Icon.Side.sparklingBg.src});
        background-size: 125%;
        background-repeat: no-repeat;
        background-position: center;
        animation: sparklingFloat 3s linear infinite;

        @keyframes sparklingFloat {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }
      }
    }
  }
`

export const LevelMasterCardStyle = styled.div`
  width: 100%;
  min-width: 140px;
  min-height: 80px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--line-color-primary);

  .title-link {
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-family: var(--font-family-secondary);
      font-weight: bold;
    }

    img {
      display: block;
    }
  }

  .level {
    color: var(--font-color-light-blue);
    font-size: var(--font-size-xxlarge);
    font-weight: bold;
  }

  .earn-points {
    color: var(--font-color-secondary);
    font-size: var(--font-size-small);
  }
`

export const LevelMasterItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .level-master-item-container {
    cursor: pointer;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid var(--line-color-primary);
    position: relative;
    padding: 15px;

    &.current {
      border: 1px solid var(--line-color-light-blue);
      background-color: var(--color-light-blue-opacity-10);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }

    &.complete {
      background-color: var(--color-light-blue-opacity-10);
      border: none;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }

    .check-mark {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid var(--line-color-primary);

      &.current {
        border: 1.5px solid var(--line-color-light-blue);

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: var(--line-color-light-blue);
        }
      }
    }
  }

  .level {
    font-size: 2em;
    font-weight: bold;
    color: var(--font-color-secondary);

    &.current {
      color: var(--font-color-light-blue);
    }
  }

  .books-read {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-medium);
    font-weight: bold;
    color: var(--font-color-primary);
  }

  .earn-points {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-medium);
    font-weight: bold;
    color: var(--font-color-secondary);
  }

  .complete-text {
    cursor: pointer;
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-medium);
    font-weight: 800;
    color: var(--font-color-light-blue);
  }

  .progress {
    width: calc(100% - 30px);
    align-items: center;
    position: absolute;
    bottom: 15px;
    left: 15px;
    right: 15px;
    z-index: 1;

    .progress-bar {
      width: 100%;
      height: 10px;
      position: relative;
      background-color: var(--line-color-primary);
      border-radius: 100px;

      .progress-bar-fill {
        min-width: 30px;
        height: 14px;
        background-color: var(--line-color-light-blue);
        border-radius: 100px;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1;
        transition: width 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 5px;
          width: 15px;
          height: 3px;
          background-color: #f0fef5;
          border-radius: 100px;
        }
      }
    }
  }
`

export const ReadingUnitCardStyle = styled.div`
  width: 100%;

  .body {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    margin-top: 15px;
  }

  .friend-name {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    height: 60px;
    position: relative;

    .text {
      font-family: var(--font-family-secondary);
      font-size: var(--font-size-xlarge);
      font-weight: bold;
      color: var(--font-color-primary);
      margin-bottom: 20px;
      padding-left: 10px;
    }

    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .friend-progress {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    align-items: center;

    .progress-bar {
      width: 100%;
      height: 10px;
      position: relative;
      background-color: var(--line-color-primary);
      border-radius: 100px;

      .progress-bar-fill {
        min-width: 30px;
        height: 14px;
        background-color: var(--line-color-light-blue);
        border-radius: 100px;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1;
        transition: width 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 5px;
          width: 15px;
          height: 3px;
          background-color: #f0fef5;
          border-radius: 100px;
        }
      }
    }

    .progress-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;

      .progress-text-value {
        font-size: var(--font-size-small);
        font-weight: bold;
        color: var(--font-color-primary);
      }

      .progress-text-point {
        font-size: var(--font-size-small);
        color: var(--font-color-secondary);
      }
    }
  }
`

export const StreakCardStyle = styled.div`
  width: 100%;
`

export const StreakStatusStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  .streak-status-ready {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .streak-status-ready-icon {
    width: 50px;
    height: 50px;
  }

  .streak-progress {
    width: 100%;
    height: 24px;
    border-radius: 100px;
    background-color: var(--color-gray-light);

    &.active {
      background-color: rgb(255, 55, 75, 0.2);
    }

    .streak-progress-fill {
      min-width: 24px;
      height: 100%;
      border-radius: 100px;
      background-color: #fbce2a;
      background-image: url(${Assets.Icon.checkWhite.src});
      background-size: 24px;
      background-repeat: repeat-x;
      position: relative;
      transition: width 1s ease-in-out;

      .streak-fire-icon {
        display: none;
      }

      &.active {
        background-color: var(--color-red-medium);

        .streak-fire-icon {
          display: block;
          position: absolute;
          z-index: 1;
          top: calc(50% - 30px);
          right: -25px;
          width: 50px;
          height: 50px;
          opacity: 1;
          animation: pulsate-fwd 1.5s ease-in-out infinite both;
        }
      }
    }
  }

  @keyframes pulsate-fwd {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
    50% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .streak-progress-text {
    width: 100%;
    font-size: var(--font-size-small);
    color: var(--font-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      color: var(--color-red-medium);
    }

    span {
      color: var(--font-color-secondary);
    }
  }
`

export const StreakItemStyle = styled.div<{ streakDays: string }>`
  width: 100%;

  .container {
    width: 100px;
    height: 100px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-gray-light);
    border-radius: 20px;

    .streak-fire-icon {
      position: absolute;
      top: calc(50% - 10px);
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      z-index: 1;
      animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
      0%,
      100% {
        transform: translate(-50%, -50%) translateY(0px);
      }
      50% {
        transform: translate(-50%, -50%) translateY(-8px);
      }
    }

    .streak-award-gray-image {
      filter: grayscale(100%);
      opacity: 0.3;
    }
  }

  .progress {
    width: calc(100% - 30px);
    align-items: center;
    position: absolute;
    bottom: 12px;
    left: 15px;
    right: 15px;
    z-index: 1;

    .progress-bar {
      width: 100%;
      height: 10px;
      position: relative;
      background-color: var(--color-gray-medium);
      border-radius: 100px;

      .progress-bar-fill {
        min-width: 30px;
        height: 14px;
        background-color: var(--color-gray-strong);
        border-radius: 100px;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1;
        transition: width 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 5px;
          width: 15px;
          height: 3px;
          background-color: #f0fef5;
          border-radius: 100px;
        }
      }

      &.today-streak {
        background-color: #ffd6d9;

        .progress-bar-fill {
          background-color: var(--color-red-medium);
        }
      }
    }
  }
`

export const DailyGoalSettingStyle = styled.div`
  min-width: 320px;
  min-height: 200px;
  border: 1px solid var(--line-color-primary);
  border-radius: 20px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .goal-method-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .goal-method-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .goal-method-dropdown {
    width: fit-content;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid var(--line-color-primary);
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .goal-method-dropdown-item {
      font-family: var(--font-family-secondary);
      font-size: var(--font-size-medium);
      font-weight: bold;
      min-width: 150px;
      width: fit-content;
      padding: 15px 20px;
      cursor: pointer;
      border-bottom: 1px solid var(--line-color-primary);

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .goal-method-item {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .goal-method-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .count-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-gray-light);
    padding: 10px;
    border-radius: 100px;

    .btn-count {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      font-size: 1.2em;
    }
  }

  .change-history-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .change-history-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* 텍스트 스타일 클래스들 */
  .section-title {
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
    font-weight: bold;
    font-size: var(--font-size-medium);
    border-bottom: 1px solid var(--line-color-primary);
    padding-bottom: 10px;
    margin-bottom: 5px;
  }

  .goal-method-item-text {
    font-family: var(--font-family-secondary);
    color: var(--font-color-primary);
    font-size: var(--font-size-medium);
    font-weight: bold;
  }

  .cancel-button,
  .save-button {
    font-family: var(--font-family-rg-b);
    font-size: 0.9em;
    letter-spacing: 0.01em;
    cursor: pointer;
  }

  .cancel-button {
    color: var(--font-color-secondary);
  }

  .save-button {
    color: var(--font-color-light-blue);
  }

  .count-text {
    font-family: var(--font-family-secondary);
    color: var(--font-color-primary);
    font-weight: bold;
  }

  .history-item-title {
    font-family: var(--font-family-secondary);
    color: var(--font-color-primary);
    font-weight: bold;
    font-size: var(--font-size-medium);
  }

  .history-item-date {
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
    font-weight: bold;
    font-size: var(--font-size-medium);
  }
`

export const DailyGoalItemStyle = styled.div`
  width: 100%;
  height: auto;

  .daily-goal-item {
    width: 200px;
    min-height: 120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: var(--color-gray-light);
    border-radius: 20px;

    &.get-award {
      background-color: transparent;
    }

    &.current-box {
      background-color: #fff;
      border: 1.5px solid var(--color-gray-medium);
    }

    .daily-goal-image {
      margin-bottom: 10px;
    }

    .daily-goal-text {
      width: 200px;
      font-family: var(--font-family-secondary);
      color: var(--font-color-secondary);
      font-size: var(--font-size-medium);
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      &.current {
        color: var(--font-color-primary);
      }
    }
  }
`

export const ReadingUnitStoryItemStyle = styled.div``

export const ReadingUnitPrologueStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  .reading-unit-name {
    font-size: var(--font-size-xxlarge);
    font-family: var(--font-family-secondary);
    font-weight: 800;
    color: var(--font-color-primary);
  }

  .reading-unit-prologue-container {
    width: 300px;
    text-align: center;

    .reading-unit-prologue-text {
      font-size: var(--font-size-medium);
      font-family: var(--font-family-secondary);
      color: var(--font-color-secondary);
      font-weight: 500;
    }
  }
`

export const EarnedReadingUnitImageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;

  .earned-reading-unit-image {
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: all 0.3s ease;

    &.active {
      width: 300px;
      height: 300px;
      border-radius: 20px;
    }
  }

  .earned-reading-unit-text-container {
    text-align: center;

    .title {
      font-size: var(--font-size-large);
      font-family: var(--font-family-secondary);
      color: var(--font-color-primary);
      font-weight: 800;
      padding: 10px 0;
    }

    .message {
      font-size: var(--font-size-medium);
      font-family: var(--font-family-secondary);
      color: var(--font-color-secondary);
      font-weight: 500;
      width: 300px;
    }
  }

  .play-icon-container {
    cursor: pointer;
    width: 150px;
    height: 150px;
    position: absolute;
    bottom: 0;

    .play-icon {
      position: absolute;
      right: 5px;
      bottom: 5px;
      width: 30px;
      height: 30px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
`

export const CurrentReadingUnitImageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;

  .current-reading-unit-image-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;

    .current-reading-unit-image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 150px;
      border-radius: 100px;
    }

    .current-reading-unit-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 100px;
    }
  }

  .current-reading-unit-point {
    font-size: var(--font-size-medium);
    color: var(--font-color-secondary);
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 5px 0;

    .user-point {
      color: var(--font-color-primary);
    }
  }

  .progress {
    width: 130px;

    .progress-bar {
      width: 100%;
      height: 10px;
      position: relative;
      background-color: var(--line-color-primary);
      border-radius: 100px;

      .progress-bar-fill {
        min-width: 30px;
        height: 14px;
        background-color: var(--line-color-light-blue);
        border-radius: 100px;
        position: absolute;
        top: -2px;
        left: 0;
        z-index: 1;
        transition: width 0.3s ease;

        &::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 5px;
          width: 15px;
          height: 3px;
          background-color: #f0fef5;
          border-radius: 100px;
        }
      }
    }
  }
`

export const NotCompletedReadingUnitImageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .not-completed-reading-unit-image-container {
    position: relative;
    width: 150px;
    height: 150px;

    .not-completed-reading-unit-image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 150px;
      background-color: rgba(0, 0, 0, 0.5);
      background-image: url(${Assets.Icon.lockWhite.src});
      background-size: 30px;
      background-repeat: no-repeat;
      background-position: center;
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
      z-index: 100;
      border-radius: 100px;
    }

    .not-completed-reading-unit-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 100px;
      filter: grayscale(100%);
      opacity: 0.5;
    }
  }
`

export const CalendarGridStyle = styled.div`
  display: flex;
  flex-direction: column;

  .calendar-week-header {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }

  .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 1px;
    background-color: var(--color-gray-light);
    border-top: 0.5px solid var(--line-color-primary);
    border-bottom: 0.5px solid var(--line-color-primary);
  }

  .current-daily-goal {
    font-size: var(--font-size-medium);
    font-family: var(--font-family-secondary);
    font-weight: 600;
    padding: 15px 25px;
    border-bottom: 1px solid var(--line-color-primary);

    ${phone(`
      padding: 10px 20px;
    `)}

    .text-gray {
      font-family: var(--font-family-secondary);
      font-weight: 600;
      color: var(--font-color-secondary);
    }
  }
`

export const CalendarWeekdayStyle = styled.span<{
  variant: 'sun' | 'sat' | 'weekday'
}>`
  padding: 10px 0;
  background-color: var(--color-gray-light);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-small);
  font-weight: 700;
  text-align: center;
  color: ${({ variant }) =>
    variant === 'sun'
      ? 'var(--color-red-medium)'
      : variant === 'sat'
        ? 'var(--font-color-light-blue)'
        : 'var(--font-color-secondary)'};
`
export const CalendarHeaderStyle = styled.div`
  width: 100%;
  padding: 15px 20px;
  border-bottom: 1px solid var(--line-color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  ${phone(`
    padding: 10px;
  `)}

  .goal-toggle {
    width: fit-content;
    display: flex;
    background-color: #fff;
    border: 1px solid var(--line-color-primary);
    border-radius: 100px;
    padding: 4px;
    gap: 4px;
  }

  .toggle-button {
    cursor: pointer;
    flex: 1;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    border-radius: 100px;
    color: var(--font-color-secondary);
    padding-top: 2px;
    transition: all 0.2s ease;

    &.active {
      background-color: var(--font-color-primary);
      color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:hover:not(.active) {
      color: var(--font-color-primary);
    }
  }
  .left-group,
  .right-group {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .left-group {
    ${phone(`
      gap: 10px;
      padding-left: 5px;
    `)}
  }

  .right-group {
    ${phone(`
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: #fff;
      padding: 10px;
      border-top: 1px solid var(--line-color-primary);
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    `)}
  }

  .comment {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: var(--font-size-medium);
    font-weight: 700;

    .title {
      font-family: var(--font-family-secondary);
      color: var(--font-color-primary);
    }

    .value {
      font-family: var(--font-family-secondary);
      color: var(--font-color-light-blue);

      &.black {
        color: var(--font-color-primary);
      }
    }

    .icon {
      width: 20px;
      height: 4px;
      border-radius: 100px;

      &.blue {
        background-color: var(--line-color-light-blue);
      }
      &.yellow {
        background-color: #ffcb2c;
      }
    }
  }
`

export const CalendarItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 70px;
  gap: 2px;
  background-color: #fff;
  padding: 2px 0;
  position: relative;

  &.daily-goal-achievement-bg {
    background-color: #edf9fc;
  }

  .day-number {
    font-size: var(--font-size-small);
    font-weight: 700;
    font-family: var(--font-family-secondary);
    color: var(--font-color-primary);
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &.today {
      color: #fff;
      background-color: var(--color-red-medium);
    }

    &.other-month {
      color: var(--font-color-secondary);

      &.today {
        color: #fff;
      }
    }
  }

  .content {
    cursor: pointer;
  }

  .books-read,
  .points {
    font-size: var(--font-size-small);
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
    text-align: center;

    .point-unit {
      font-size: var(--font-size-small);
      font-family: var(--font-family-secondary);
      color: var(--font-color-secondary);
    }
  }

  .books-read.active {
    color: var(--font-color-light-blue);
    font-weight: 700;
  }

  .points.active {
    color: var(--font-color-light-blue);
    font-weight: 700;
  }

  .badge-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .daily-goal-achievement-line {
    width: calc(100% + 1px);
    height: 2px;
    background-color: var(--line-color-light-blue);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  .attendance-line {
    width: calc(100% + 1px);
    height: 2px;
    background-color: #ffcb2c;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`

export const CalendarEventItemStyle = styled.div`
  width: 100%;
  padding: 20px 25px;
  border-bottom: 1px solid var(--line-color-primary);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  ${phone(`
    &:nth-last-child(1) {
      padding-bottom: 50px;
    }
  `)}

  .event-day {
    padding-top: 5px;
    font-size: var(--font-size-small);
    color: var(--font-color-secondary);
    min-width: 80px;
  }

  .event-message {
    font-size: var(--font-size-medium);
    font-family: var(--font-family-secondary);
    font-weight: 600;
  }
`

export const CalendarEventLoadMoreStyle = styled.button`
  width: 100%;
  padding: 16px;
  background-color: var(--color-gray-light);
  border: 1px solid var(--line-color-primary);
  border-radius: 8px;
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-medium);
  font-weight: 600;
  color: var(--font-color-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-medium);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const SettingCheckSelectorStyle = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

// features > daily

export const DailyRGCourseListStyle = styled.div`
  display: flex;
  flex-direction: column;
`

export const DailyRGBookItemStyle = styled.div<{
  isCurrent?: boolean
  isCompleted?: boolean
  color?: string
  isPreK?: boolean
}>`
  ${gradientAnimationCSS}

  width: 100%;
  min-height: 150px;
  border-radius: 20px;
  border: ${({ isCompleted }) =>
    !isCompleted ? 'none' : '1px solid var(--line-color-primary)'};
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 3px;
  background-color: ${({ isCurrent, isCompleted = 0 }) =>
    isCurrent || isCompleted ? '#fff' : '#a2b1c410'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${phone(`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
  `)}

  &.current-book {
    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      z-index: -1;
      padding: 3px;
      border-radius: 22px;
    }

    &::after {
      background-image: conic-gradient(
        from var(--angle),
        ${({ color }) => color}
      );
    }

    /* &::before {
      background-image: conic-gradient(
        from var(--angle),
        #ffca2b,
        #ffffff,
        #ffca2b
      );
      filter: blur(10px);
      animation: 2s spin linear infinite;
    } */

    @keyframes spin {
      from {
        --angle: 0deg;
      }
      to {
        --angle: 360deg;
      }
    }
  }

  .book-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 30px;

    &.mobile-prek-container {
      ${phone(`
        flex-direction: column;
        gap: 10px;
        margin-bottom: 5px;
      `)}
    }

    &.mobile-book-container {
      ${phone(`
        gap: 10px;
      `)}
    }

    .book-number,
    .completed-mark,
    .completed-mark-twin {
      position: absolute;
      top: -10px;
      left: -10px;
      z-index: 1;
      border-radius: 20px;
    }

    .book-number {
      font-size: var(--font-size-small);
      font-weight: 600;
      color: ${({ isCompleted, isCurrent }) =>
        isCompleted || isCurrent ? '#fff' : 'var(--font-color-secondary)'};
      border: 2px solid #fff;
      background: ${({ color, isCompleted, isCurrent }) =>
        isCompleted || isCurrent ? color : 'var(--color-gray-medium)'};
      background-image: url('${Assets.Icon.glossyPointSmall.src}');
      background-size: 6px;
      background-repeat: no-repeat;
      background-position: top 5px left 5px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .completed-mark {
      background-image: url('${Assets.Icon.Study.checkMarkGold.src}');
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      width: 40px;
      height: 40px;
    }

    .completed-mark-twin {
      background-image: url('${Assets.Icon.Study.checkMarkGoldTwin.src}');
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      width: 70px;
      height: 40px;
    }

    .prek-thumbnail {
      border-radius: 15px;
      background-color: var(--color-gray-strong);
      overflow: hidden;

      ${phone(`
        width: 100%;
        border-radius: 18px 18px 0 0;
      `)}
      .image-wrapper {
        position: relative;
        display: block;
        .image {
          display: block;
          min-width: 300px;
          max-width: 300px;
          min-height: 180px;
          max-height: 180px;
          object-fit: cover;
          object-position: center;
          background-color: var(--color-gray-medium);
          filter: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 'none' : 'grayscale(100%)'};
          opacity: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 1 : 0.6};

          ${phone(`
          width: 100%;
          height: auto;
          object-fit: cover;
          object-position: center;
          min-width: none;
          max-width: none;
          min-height: 180px;
          max-height: 180px;
        `)}
        }
        .character {
          position: absolute;
          width: 42px;
          height: 42px;
          top: 0;
          right: 0;
          margin-top: 2px;
          margin-right: 2px;
          filter: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 'none' : 'grayscale(100%)'};
          opacity: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 1 : 0.6};
        }
      }
    }

    .book-cover {
      border-radius: 15px;
      /* background-color: var(--color-gray-strong); */

      ${phone(`
        padding: 5px;
      `)}

      .image-wrapper {
        position: relative;
        .image {
          display: block;
          min-width: 125px;
          max-width: 125px;
          min-height: 180px;
          max-height: 180px;
          object-fit: cover;
          object-position: center;
          border-radius: 15px;
          background-color: var(--color-gray-medium);
          filter: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 'none' : 'grayscale(100%)'};
          opacity: ${({ isCurrent, isCompleted }) =>
            isCurrent || isCompleted ? 1 : 0.6};
        }
      }
    }
  }

  .title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    ${phone(`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px;
      gap: 0;
    `)}

    .title-box {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 5px;
      padding-left: 3px;
      max-width: 380px;

      ${phone(`
        padding: 10px;
        padding-right: 0;
      `)}

      .title {
        color: ${({ isCurrent, isCompleted }) =>
          isCurrent || isCompleted
            ? 'var(--font-color-primary)'
            : 'var(--color-gray-strong)'};
        font-size: 1.1em;
        font-family: var(--font-family-rg-b);
        font-weight: 600;
        letter-spacing: 0.01em;
      }

      .dot {
        color: var(--font-color-secondary);
        font-size: var(--font-size-medium);
      }

      .point {
        color: ${({ isCurrent, isCompleted }) =>
          isCurrent || isCompleted
            ? 'var(--font-color-light-blue)'
            : 'var(--color-gray-strong)'};
        font-size: var(--font-size-small);

        &.good-job {
          color: var(--font-color-secondary);
        }
      }
    }

    .mobile-resource-download-container {
      display: none;

      ${phone(`
        display: block;
      `)}
    }
  }
`

export const DailyRGCourseContainerStyle = styled.div`
  padding-top: 20px;
  position: sticky;
  top: 60px;
  z-index: 800;
  background-color: #fff;

  ${labtopS(`
    top: 120px;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20px;
    right: -20px;
    bottom: -5px;
    background-color: #fff;
    z-index: 0;

    ${labtopS(`
      left: -10px;
      right: -10px;
    `)}
  }
`

export const DailyRGCourseStyle = styled.div<{
  isCurrent?: boolean
  bgColor?: string
  progressColor?: string
  isCompleted?: boolean
}>`
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  min-height: 77px;
  border-radius: 20px;
  background-color: ${({ bgColor }) => bgColor};
  background-image: url(${Assets.Icon.glossyPoint.src});
  background-size: 10px 10px;
  background-position: top 7px left 7px;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 1fr 80px;
  position: relative;

  .course-title {
    position: relative;
    z-index: 2;
  }

  ${labtopS(`
    grid-template-columns: 1fr 70px;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-image: url(${Assets.Image.GlossyBg.src});
    background-size: contain;
    background-position: top 0 left 0;
    background-repeat: no-repeat;
    animation: var(--animation-glass-complete);
    z-index: 0;
  }

  .menu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    position: relative;
    border-left: 1.5px solid;
    border-color: ${({ isCurrent, isCompleted }) =>
      isCurrent || isCompleted ? '#ffffff70' : 'var(--line-color-primary)'};
  }
`

export const ProgressBarContainerStyle = styled.div`
  position: relative;
  padding: 20px 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  ${labtopS(`
    padding: 10px 0 10px 20px;
  `)}
`

export const ProgressBarStyle = styled.div`
  width: calc(100% - 30px);
  height: 14px;
  position: relative;

  ${labtopS(`
    width: calc(100% - 20px);
  `)}

  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 4px);
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 100px;
  }
`

export const ProgressBarFillStyle = styled.div<{ progressColor?: string }>`
  min-width: 30px;
  height: 14px;
  background-color: ${({ progressColor }) =>
    progressColor ? progressColor : 'var(--color-gray-strong)'};
  border-radius: 100px;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    right: 5px;
    width: 15px;
    height: 3px;
    background-color: #fff;
    border-radius: 100px;
  }
`

export const DailyRGLevelStyle = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  gap: 10px;
  position: relative;
  padding-left: 10px;

  ${labtopL(`
    padding-top: 10px;
  `)}

  ${phone(`
    padding-top: 5px;
  `)}
`

export const DailyRGSubTextStyle = styled.div<{ isFollowText?: boolean }>`
  font-size: ${({ isFollowText }) =>
    isFollowText ? 'var(--font-size-large)' : 'var(--font-size-xlarge)'};
  font-family: var(--font-family-secondary);
  font-weight: ${({ isFollowText }) => (isFollowText ? '500' : '700')};
  padding-left: 10px;
  padding-top: ${({ isFollowText }) => (isFollowText ? '0' : '10px')};
  color: ${({ isFollowText }) =>
    isFollowText ? 'var(--font-color-secondary)' : 'var(--font-color-primary)'};

  ${labtopS(`
    padding-top: 0;
  `)}
`

export const DailyRGNavBarStyle = styled.div`
  position: sticky;
  top: -1px;
  z-index: 899;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  gap: 0;
  border-top: 1px solid var(--line-color-primary);
  border-bottom: 1px solid var(--line-color-primary);

  ${labtopS(`
    top: 69px;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -20px;
    right: -20px;
    bottom: 0;
    background-color: #fff;
    z-index: -1;

    ${labtopS(`
      left: -10px;
      right: -10px;
    `)}
  }

  .level-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 30px;

    .level-item {
      cursor: pointer;
      font-size: var(--font-size-medium);
      color: var(--font-color-secondary);

      &.current {
        color: var(--font-color-light-blue);
      }
    }
  }

  .more-button {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    .more-button-trigger {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }

    img {
      display: block;
    }
  }
`

export const GoToNextLevelButtonStyle = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: var(--color-gray-light);
  padding: 20px 10px;
  border-radius: 15px;

  img {
    display: block;
  }
`

export const QuickJumpButtonStyle = styled.button<{ isVisible: boolean }>`
  cursor: pointer;
  position: fixed;
  left: 50%;
  bottom: 90px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  border: 3px solid var(--line-color-light-blue);
  font-size: 28px;
  z-index: 801;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  animation: ${({ isVisible }) =>
    isVisible ? 'float 2s ease-in-out infinite' : 'none'};

  @keyframes float {
    0%,
    100% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  &:hover {
    animation-play-state: paused;
    transform: translateX(-50%) translateY(-5px) scale(1.05);
  }
`

// features > level

export const PrintVocabularyModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1100;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BookInfoModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BookInfoMainBannerStyle = styled.div<{ bookCover: string }>`
  width: 100%;
  min-height: 100px;
  background-image: url(${({ bookCover }) => bookCover});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 15px;

  .wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    background-image: url(${Assets.Icon.glossyPoint2.src});
    background-size: 10px;
    background-repeat: no-repeat;
    background-position: top 6px left 6px;
    backdrop-filter: blur(10px);
    padding: 10px;
    border-radius: 20px;
    overflow: hidden;

    .book-cover {
      width: 100%;
      min-width: 80px;
      max-width: 150px;
      min-height: 100px;
      position: relative;
      display: flex;
      align-items: center;

      .movie-play-button {
        cursor: pointer;
        position: absolute;
        top: calc(50% - 25px);
        left: calc(50% - 25px);
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.3);

        img {
          width: 100%;
          height: 100%;
        }

        &:active {
          top: calc(50% - 24px);
          left: calc(50% - 24px);
          width: 48px;
          height: 48px;
          box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.5);
        }
      }

      .cover-wrapper {
        position: relative;
        .book-cover-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 15px;
        }
        .expired-overlay {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 15px;
          .overlay-img {
            display: block;
            width: 70%;
            height: 70%;
            object-fit: contain;
            border-radius: 15px;
          }
        }
      }
    }
  }

  .content {
    .book-info {
      padding-top: 10px;
      color: #fff;

      ${phone(`
        padding-left: 3px;
      `)}

      .book-code {
        font-size: var(--font-size-small);
        font-family: var(--font-family-secondary);
        font-weight: 500;
        margin-bottom: 3px;
      }

      .title {
        font-size: var(--font-size-large);
        margin-bottom: 10px;

        ${phone(`
          font-size: 1em;
        `)}
      }

      .author {
        font-size: var(--font-size-medium);

        ${phone(`
          font-size: var(--font-size-small);
        `)}
      }
    }

    .buttons {
      padding-bottom: 10px;
    }
  }
`

export const BookInfoButtonsStyle = styled.div`
  padding: 0 15px;
  margin-bottom: 40px;
  font-size: var(--font-size-medium);
  color: var(--font-color-light-blue);

  ${phone(`
    min-height: 40px;
    overflow-x: scroll;
    margin-bottom: 30px;
  `)}

  .btn {
    cursor: pointer;
    width: fit-content;
    height: 24px;
    padding-left: 33px;
    background-image: url(${Assets.Icon.downloadLightBlue.src});
    background-size: contain;
    background-position: left center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;

    ${phone(`
      min-width: fit-content;
    `)}

    &.to-do {
      background-image: url(${Assets.Icon.Side.toDo.src});
    }

    &.favorite {
      background-image: url(${Assets.Icon.Side.favorite.src});
    }

    &.add {
      &::after {
        content: '';
        position: absolute;
        top: calc(100% - 10px);
        left: 14px;
        width: 20px;
        height: 20px;
        background-image: url(${Assets.Icon.plusGreen.src});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    &.remove {
      color: var(--font-color-secondary);
      &::after {
        content: '';
        position: absolute;
        top: calc(100% - 10px);
        left: 14px;
        width: 20px;
        height: 20px;
        background-image: url(${Assets.Icon.minusBlue.src});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
`

export const BookInfoSummaryStyle = styled.div`
  padding: 0 15px;
  margin-bottom: 30px;

  .summary-content {
    font-size: 1em;
    font-family: var(--font-family-secondary);
  }
`

export const BookInfoDetailStyle = styled.div`
  padding: 20px 10px;
  margin: 0 10px;
  border-top: 1px solid var(--line-color-primary);
  border-bottom: 1px solid var(--line-color-primary);

  &:last-child {
    border-top: none;
  }
`

export const BookInfoDetailItemStyle = styled.div`
  .title {
    font-size: var(--font-size-medium);
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
  }

  .content {
    font-size: var(--font-size-small);
    color: var(--font-color-primary);
    letter-spacing: -0.08em;
    padding-top: 3px;
  }
`

export const BookInfoPointsStyle = styled.div`
  padding: 20px 10px;
  margin: 0 10px;
  border-bottom: 1px solid var(--line-color-primary);

  .title {
    font-size: var(--font-size-medium);
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
  }

  .wrapper {
    .earn-point {
      font-size: var(--font-size-small);

      .point-icon {
        width: 24px;
        height: 24px;
        background-image: url(${Assets.Icon.Study.checkMarkGold.src});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        opacity: 0.5;

        &.passed {
          -webkit-filter: grayscale(0%);
          filter: grayscale(0%);
          opacity: 1;
        }
      }

      .passed {
        padding-top: 2px;
        color: var(--font-color-secondary);
        letter-spacing: -0.05em;
      }

      .point {
        padding-top: 2px;
        color: var(--font-color-primary);
      }
    }
  }
`

export const BookItemStyle = styled.div<{ level: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .book-cover-container {
    cursor: pointer;
    width: 100%;
    min-width: 100px;
    min-height: 120px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    .book-cover-wrapper {
      position: relative;

      .book-cover {
        display: block;
        width: 100%;
        height: auto;
        background-color: var(--color-gray-opacity-70);
        border-radius: 15px 15px 0 0;
      }

      .check-box-position {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
        padding: 10px;
        cursor: pointer;
      }

      .age-label {
        position: absolute;
        top: 4px;
        left: 4px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;
        .text {
          display: inline-block;
          border-radius: 15px;
          padding: 4px 6px;
          font-size: 0.7em;
          color: #f1f1f1;
          background-color: #000000bf;
        }
      }

      .badges {
        position: absolute;
        top: -8px;
        right: -8px;
        z-index: 1;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;

        img {
          width: auto;
          height: 30px;
          object-fit: contain;
        }

        .badge-passed {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .movie-icon {
        position: absolute;
        bottom: 3px;
        right: 3px;
        z-index: 1;
        width: 30px;
        height: 30px;
        background-color: #fff;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .book-cover-skeleton {
      width: 100%;
      height: 200px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 15px;
    }
  }

  .book-code-container {
    position: relative;
    width: 100%;
    height: 100%;

    .book-code {
      position: relative;
      z-index: 1;
      font-size: 0.6em;
      color: #fff;
      width: 100%;
      padding: 5px 0;
      text-align: center;
      border-radius: 0 0 15px 15px;
      background-color: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(100px);
      -webkit-backdrop-filter: blur(100px);
    }

    .book-code-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: 0 0 15px 15px;
      background-size: 100%;
      background-position: bottom center;
      background-repeat: no-repeat;
    }
  }

  .book-info-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;

    ${phone(`
      margin-top: 5px;
      align-items: flex-start;
    `)}

    .wrapper {
      text-align: left;
      padding-left: 5px;
      width: 100%;

      .title {
        font-family: var(--font-family-rg-b);
        font-weight: 600;
        letter-spacing: 0.01em;
        font-size: 0.85em;
        color: var(--font-color-primary);
        margin: 5px 0;

        ${phone(`
          font-weight: 600;
          font-size: 0.8em;
        `)}
      }

      .title-skeleton {
        width: 80px;
        height: 12px;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 6px;
        margin: 0 auto;
      }

      .point {
        font-size: 0.75em;
        color: var(--font-color-light-blue);
      }

      .point-skeleton {
        width: 40px;
        height: 12px;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 6px;
        margin: 0 auto;
      }

      .gap {
        width: 100%;
        height: 5px;
      }
    }
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

export const BookListDateGroupStyle = styled.div<{ isTodoList?: boolean }>`
  margin-bottom: ${({ isTodoList }) => (isTodoList ? '0' : '10px')};
  padding-bottom: ${({ isTodoList }) => (isTodoList ? '20px' : '0')};
  border-bottom: ${({ isTodoList }) =>
    isTodoList ? '1px solid var(--line-color-primary)' : 'none'};

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  .divider {
    width: 100%;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 2px);
      right: 0;
      z-index: 1;
      width: calc(100% - 150px);
      height: 1px;
      border-radius: 100px;
      background-color: var(--line-color-primary);
    }

    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      width: calc(100% + 20px);
      height: calc(100% + 10px);
      background-color: #fff;
      z-index: -1;
    }
  }
`

export const BookListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 20px 10px;

  ${labtopS(`
    grid-template-columns: repeat(5, 1fr);
  `)}

  ${tabletS(`
    grid-template-columns: repeat(4, 1fr);
  `)}

  ${phone(`
    grid-template-columns: repeat(3, 1fr);
    gap: 15px 5px;
  `)}

  @media (max-width: 350px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px 5px;
  }
`

export const BookListEmptyStateStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  p {
    color: var(--font-color-secondary);
    font-size: 1em;
    font-family: var(--font-family-secondary);
  }
`

export const CollectionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  ${phone(`
    gap: 20px;
  `)}

  .title {
    font-size: var(--font-size-large);
    color: var(--font-color-primary);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  color: var(--font-color-primary);
`

export const CollectionItemStyled = styled.div<{
  iconBgColor?: string
}>`
  cursor: pointer;
  padding: 15px;
  border: 1px solid var(--line-color-primary);
  border-radius: 20px;
  color: var(--font-color-primary);
  letter-spacing: -0.05em;

  .icon-box {
    width: 50px;
    height: 50px;
    background-color: ${({ iconBgColor }) => iconBgColor};
    background-image: url(${Assets.Icon.glossyPointSmall.src});
    background-size: 7px;
    background-repeat: no-repeat;
    background-position: top 5px left 5px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const LevelItemStyle = styled.div<{
  bgColor: string
  isTransitioning: boolean
  fontColor: string
}>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  position: relative;

  .level-image-container {
    width: 100%;
    height: 160px;
    border-radius: 20px;
    position: relative;
    background-color: ${({ bgColor }) => bgColor};
    background-image: url(${Assets.Icon.glossyPoint.src});
    background-size: 15px;
    background-position: top 5px left 5px;
    background-repeat: no-repeat;

    .progress-donut {
      --progress: 0%;
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 4;
      width: 40px;
      height: 40px;
      border: 1.5px solid #fff;
      border-radius: 50%;
      background: conic-gradient(
        ${({ bgColor }) => bgColor} var(--progress),
        #fff 0
      );
      display: flex;
      align-items: center;
      justify-content: center;

      .progress-donut-inner {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        color: ${({ bgColor }) => bgColor};
        font-family: var(--font-family-secondary);
        font-size: 0.75em;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .book-cover {
      position: absolute;
      left: 20px;
      bottom: 20px;
      z-index: 2;
      width: 80px;
      height: auto;
      border-radius: 10px;
      border: 2px solid #fff;
      object-fit: cover;
      transform: rotate(-5deg);
      background-color: ${({ bgColor }) => bgColor};
      transition: opacity 0.15s ease-in-out;
      opacity: ${({ isTransitioning }) => (isTransitioning ? 0.7 : 1)};
    }

    .book-cover-shadow {
      position: absolute;
      left: 20px;
      bottom: 20px;
      z-index: 1;
      width: 80px;
      height: 100px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      transform: rotate(-15deg);
    }
  }

  .level-container {
    width: 100%;
    height: 160px;
    position: absolute;

    .wrapper {
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 3;

      ${tabletS(`
        padding: 10px;
        padding-bottom: 5px;
        right: 15px;
        bottom: 15px;
        border-radius: 12px;
        backdrop-filter: blur(100px);
        -webkit-backdrop-filter: blur(100px);
      `)}

      .level {
        font-size: 2.5em;
        font-weight: 500;
        color: ${({ fontColor }) => fontColor};
        margin-bottom: 3px;

        ${tabletS(`
          font-size: 2.2em;
        `)}

        ${phone(`
          font-size: 2em;
        `)}
      }

      .more-books {
        font-size: var(--font-size-medium);
        font-weight: 500;
        color: #fff;
        padding-left: 5px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        opacity: 0.7;
      }
    }
  }

  .study-count {
    font-size: var(--font-size-small);
    font-weight: 500;
    color: var(--font-color-secondary);
    text-align: center;
  }

  .delete-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const LevelPkItemStyle = styled.div<{
  bgColor: string
  isTransitioning: boolean
  fontColor: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  position: relative;

  .thumbnail-container {
    cursor: pointer;
    width: 100%;
    height: 160px;
    padding: 20px;
    padding-top: 15px;
    border-radius: 20px;
    position: relative;
    background-color: ${({ bgColor }) => bgColor};
    background-image: url(${Assets.Icon.glossyPoint.src});
    background-size: 15px;
    background-position: top 5px left 5px;
    background-repeat: no-repeat;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .progress-donut {
      --progress: 0%;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 4;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: conic-gradient(
        ${({ bgColor }) => bgColor} var(--progress),
        #fff 0
      );
      display: flex;
      align-items: center;
      justify-content: center;

      .progress-donut-inner {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: #fff;
        color: ${({ bgColor }) => bgColor};
        font-size: 10px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    ${labtopS(`
      height: 100%;
      padding: 12px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;
    `)}

    .thumbnail-image {
      width: 100%;
      height: auto;
      border-radius: 15px;
      border: 2px solid #fff;
      transform: rotate(-5deg);
      background-color: ${({ bgColor }) => bgColor};
      position: relative;
      z-index: 2;
      filter: contrast(1.025);

      ${labtopS(`
        transform: rotate(0);
      `)}

      &.sub {
        border: none;
      }
    }

    .thumbnail-shadow {
      position: absolute;
      top: 15px;
      left: calc(50% - 80px);
      z-index: 1;
      width: 160px;
      height: 100px;
      border-radius: 15px;
      background-color: rgba(0, 0, 0, 0.2);
      transform: rotate(-12deg);

      ${labtopS(`
        display: none;
      `)}
    }

    .mobile-title {
      display: none;
      font-size: 1em;
      color: ${({ fontColor }) => fontColor};
      width: 100%;
      text-align: center;
      margin-bottom: 5px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      ${labtopS(`
        display: block;
      `)}
    }
  }

  .title-container {
    cursor: pointer;
    width: 100%;
    height: 160px;
    position: absolute;

    ${labtopS(`
      display: none;
    `)}

    .title {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 3;
      bottom: 15px;
      color: ${({ fontColor }) => fontColor};
      font-size: var(--font-size-large);
      text-align: center;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  .study-count {
    font-size: var(--font-size-small);
    color: var(--font-color-secondary);
    text-align: center;
  }

  .delete-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const LevelSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  ${phone(`
    gap: 20px;
  `)}

  .title {
    font-size: var(--font-size-large);
    color: var(--font-color-primary);

    ${labtopS(`
      font-size: 1.05em;
    `)}
  }

  .accordion-container {
    border-top: 1px solid var(--line-color-primary);
    transition: opacity 0.3s ease-in-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }

  .accordion-header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    transition: all 0.3s ease;
    border-bottom: 1px solid var(--line-color-primary);
    position: sticky;
    top: 0;
    z-index: 100;

    ${phone(`
      padding: 15px;
    `)}

    &.open {
      background-color: #edfafe;

      .accordion-title {
        font-family: var(--font-family-secondary);
        font-weight: 800;
        color: var(--font-color-light-blue);
        font-size: var(--font-size-large);
      }
    }

    .accordion-title {
      font-family: var(--font-family-secondary);
      font-weight: 800;
      color: var(--font-color-secondary);
      font-size: var(--font-size-large);
    }

    .arrow {
      font-size: var(--font-size-small);
      transition: transform 0.3s ease;
      margin-left: 10px;
    }
  }

  .accordion-body {
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      padding 0.3s ease;

    &.open {
      max-height: 10000px;
      border-bottom: 1px solid var(--line-color-primary);
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .level-header {
    font-size: var(--font-size-large);
    font-weight: 500;
    color: var(--font-color-primary);
    margin-bottom: 15px;
  }

  .sub-header {
    font-size: var(--font-size-medium);
    color: var(--font-color-primary);
    margin: 30px 0 20px 5px;
  }

  .level-container,
  .series-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 10px;
    margin-bottom: 10px;

    ${phone(`
      grid-template-columns: repeat(2, 1fr);
      gap: 15px 5px;
    `)}
  }

  .section-tabs {
    width: fit-content;
    background-color: #fff;
  }

  .section-tab {
    cursor: pointer;
    border: none;
    background-color: var(--color-gray-light);
    border-radius: 100px;
    padding: 12px 20px;
    color: var(--font-color-secondary);
  }

  .section-tab.active {
    background-color: var(--font-color-primary);
    color: #fff;
  }

  .series-pagination-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .pagination-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-gray-light);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: var(--bg-color-secondary);
      border-color: var(--line-color-secondary);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.prev {
      margin-right: 10px;
    }

    &.next {
      margin-left: 10px;
    }
  }

  .pagination-dots {
    display: flex;
    gap: 8px;
  }

  .pagination-dot {
    min-width: 8px;
    min-height: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: var(--line-color-primary);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--line-color-secondary);
    }

    &.active {
      background: var(--color-gray-strong);
    }
  }
`

export const RecentlyViewedStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  ${phone(`
    gap: 20px;
  `)}

  .section-tabs {
    width: fit-content;
    background-color: #fff;
  }

  .section-tab {
    cursor: pointer;
    border: none;
    background-color: var(--color-gray-light);
    border-radius: 100px;
    padding: 12px 20px;
    color: var(--font-color-secondary);
  }

  .section-tab.active {
    background-color: var(--font-color-primary);
    color: #fff;
  }

  .list {
    transition: opacity 0.3s ease-in-out;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }

    &.mobile-slider {
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;

      &::-webkit-scrollbar {
        display: none;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;

      &.todo-books-slider {
        padding-top: 5px;
      }

      .slider-item {
        flex: 0 0 72%;
        min-width: 180px;
        scroll-snap-align: start;
      }

      &.todo-books-slider .slider-item {
        flex: 0 0 36%;
        min-width: 90px;
      }
    }
  }
`

export const SearchBarStyle = styled.div`
  width: 100%;
  min-height: 52px;
  border: 1px solid var(--line-color-primary);
  border-radius: 100px;
  padding: 10px 20px;
  padding-right: 0;

  /* 검색 버튼 없이 인풋만 쓸 때 전체 너비 사용 */
  &.input-only {
    padding-right: 20px;

    .search-input {
      width: 100%;
      min-width: 0;
      flex: 1;
    }
  }

  .search-option {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 20px;
  }

  .search-input {
    width: calc(100% - 70px);
    height: 100%;
    border: none;
    outline: none;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-family: var(--font-family-secondary);
    }
  }

  .search-button {
    width: 50px;
    height: 100%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 20px;
      height: 20px;
    }
  }
`

export const LibraryFinderTabBarStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 16px;

  .tabs {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 1px;
      background: var(--line-color-primary);
    }
  }

  .tab {
    font-family: var(--font-family-secondary);
    font-weight: 700;
    font-size: var(--font-size-large);
    padding: 15px 30px;
    border-radius: 15px 15px 0 0;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &.inactive {
      color: #a0aec0;
      background: transparent;
    }

    &.active {
      color: #00b4d8;
      background: #fff;
      border: 1px solid var(--line-color-primary);
      border-bottom: 1px solid #fff;
    }
  }
`

export const SeriesItemStyle = styled.div<{
  bgColor: string
}>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  position: relative;

  /* scrollIntoView(block: start) 시 상단 고정 영역과 겹침 완화 */
  &[id^='library-series-'] {
    scroll-margin-top: 100px;
  }

  &.library-series-restore-flash .series-image-container {
    animation: library-series-restore-border-glow 1.5s ease-in-out infinite;
  }

  @keyframes library-series-restore-border-glow {
    0%,
    100% {
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 0.85),
        0 0 0 2px rgba(220, 38, 38, 0.55),
        0 0 12px rgba(239, 68, 68, 0.4);
    }
    50% {
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 1),
        0 0 0 4px rgba(220, 38, 38, 1),
        0 0 28px rgba(248, 113, 113, 0.85);
    }
  }

  .series-image-container {
    width: 100%;
    height: 160px;
    border-radius: 20px;
    position: relative;
    background-color: ${({ bgColor }) => bgColor};
    background-image: url(${Assets.Icon.glossyPoint.src});
    background-size: 15px;
    background-position: top 5px left 5px;
    background-repeat: no-repeat;
    overflow: hidden;

    .book-cover {
      position: absolute;
      left: calc(50% - 60px);
      bottom: -20%;
      z-index: 2;
      width: 120px;
      height: auto;
      border-radius: 10px;
      border: 2px solid #fff;
      object-fit: cover;
      background-color: ${({ bgColor }) => bgColor};
    }

    .book-cover-shadow {
      position: absolute;
      left: calc(50% - 75px);
      bottom: -20%;
      z-index: 1;
      width: 120px;
      height: 160px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      transform: rotate(-15deg);
    }
  }

  .series-name {
    font-size: var(--font-size-small);
    font-weight: 500;
    color: var(--font-color-secondary);
    text-align: center;
  }

  .delete-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const ThemeItemStyle = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  border: 1px solid var(--line-color-primary);
  border-radius: 20px;
  padding: 10px;

  .theme-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 15px;
    background-color: var(--color-gray-light);
  }

  .title {
    color: var(--font-color-primary);
    font-size: var(--font-size-medium);
    font-family: var(--font-family-rg-b);
    font-weight: 600;
    letter-spacing: 0.01em;
  }
`

export const ChallengeBoardStyle = styled.div`
  width: 100%;
  height: auto;
  min-height: 120px;
  border: 1px solid var(--line-color-primary);
  border-radius: 20px;
  gap: 10px;

  ${phone(`
    min-height: 80px;
  `)}

  .challenge-board-top {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    position: relative;
    padding: 10px;

    ${phone(`
      gap: 10px;
    `)}

    .challenge-board-symbol {
      display: block;
      width: 120px;
      height: auto;
      object-fit: cover;

      ${phone(`
        width: 80px;
      `)}
    }

    .challenge-board-title {
      width: calc(100% - 180px);
      display: flex;
      flex-direction: column;
      gap: 5px;

      ${phone(`
        width: calc(100% - 110px);
      `)}
    }

    .challenge-board-arrow {
      width: 40px;
      height: 40px;
      position: absolute;
      top: calc(50% - 20px);
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      ${phone(`
        width: 30px;
        height: 30px;
        top: calc(50% - 15px);
        right: 0;
      `)}

      img {
        display: block;
        width: 24px;
        height: 24px;

        ${phone(`
          width: 20px;
          height: 20px;
        `)}
      }
    }
  }
`

export const ChallengeBoardGoalInfoStyle = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  border-top: 1px solid var(--line-color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-light-blue-opacity-10);

  .challenge-board-goal-edit-button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
    }
  }
`

export const ChallengeBoardProgressInfoStyle = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  min-height: 100px;
  border-top: 1px solid var(--line-color-primary);
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ChallengeBoardProgressItemStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
  }

  .title-text {
    font-size: var(--font-size-medium);
    font-weight: 600;
    font-family: var(--font-family-secondary);
  }

  .sub-text {
    font-size: var(--font-size-small);
    font-weight: 600;
    font-family: var(--font-family-secondary);
    color: var(--font-color-secondary);
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    position: relative;
    background-color: var(--line-color-primary);
    border-radius: 100px;

    .progress-bar-fill {
      min-width: 30px;
      height: 14px;
      background-color: var(--line-color-light-blue);
      border-radius: 100px;
      position: absolute;
      top: -2px;
      left: 0;
      z-index: 1;
      transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);

      &.red {
        background-color: var(--color-red-medium);
      }

      &.green {
        background-color: #35c86a;
      }

      &.transparent {
        background-color: transparent;
      }

      &::after {
        content: '';
        position: absolute;
        top: 3px;
        right: 5px;
        width: 15px;
        height: 3px;
        background-color: #f0fef5;
        border-radius: 100px;
      }
    }

    .progress-bar-fill-goal {
      min-width: 30px;
      height: 10px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      border-right: 2px solid #3c4b62;
    }
  }
`

// features > rank

export const RankCardStyle = styled.div`
  width: 100%;
  min-width: 140px;
  min-height: 80px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid var(--line-color-primary);

  .title-link {
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-family: var(--font-family-secondary);
      font-weight: bold;
    }

    img {
      display: block;
    }
  }

  .rank {
    color: var(--font-color-light-blue);
    font-size: var(--font-size-xxlarge);

    &.arrow-down {
      color: var(--font-color-secondary);
      font-family: var(--font-family-secondary);
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`

// features > review

export const RecentReviewListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .header {
    width: fit-content;
    font-size: var(--font-size-large);

    img {
      display: block;
      width: 24px;
      height: 24px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

export const ReviewBookItemStyle = styled.div`
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.9em;
  position: relative;

  ${tabletS(`
    width: 100%;
    flex-direction: column;
  `)}

  .book-cover {
    width: 100px;
    height: 160px;
    transform: rotate(-5deg);
    display: flex;
    align-items: flex-end;
    position: relative;

    ${tabletS(`
      width: 100%;
      height: auto;
      min-height: 100px;
      transform: none;
      padding-left: 20px;
    `)}

    img {
      width: 100%;
      max-width: 100px;
      height: auto;
      object-fit: cover;
      border-radius: 15px;
      background-color: var(--color-gray-opacity-70);
    }
  }

  .review-book-info-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    ${tabletS(`
      width: calc(100% - 20px);
      background-color: var(--color-gray-light);
      padding: 10px;
      border-radius: 15px;
    `)}
  }

  .book-code {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-small);
    font-weight: 700;
    color: var(--font-color-secondary);
    margin-bottom: 3px;
  }

  .book-title {
    font-size: var(--font-size-large);
    font-family: var(--font-family-rg-b);
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .total-score {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-large);
    font-weight: 700;
    color: var(--font-color-secondary);
    padding-left: 5px;

    &.pass {
      color: var(--font-color-light-blue);
    }
  }

  .step-score {
    color: var(--font-color-secondary);
    border: 1px solid var(--line-color-primary);
    border-right: none;
    padding: 5px 8px;
    font-size: var(--font-size-small);
    background-color: #fff;

    ${tabletS(`
      padding: 3px 6px;
      font-size: 0.75em;
    `)}

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
      border: 1px solid var(--line-color-primary);
    }

    span {
      &:first-child {
        color: var(--font-color-secondary);
        margin-right: 2px;
      }
    }

    span {
      &:last-child {
        color: var(--font-color-primary);
      }
    }
  }

  .mobile-review-more-button-container {
    display: flex;
    align-items: center;
    gap: 10px;

    ${tabletS(`
      position: absolute;
      bottom: calc(50% + 5px);
      right: 0;
    `)}
  }

  .study-results {
    letter-spacing: -0.05em;
    font-size: var(--font-size-medium);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;

    span {
      &:first-child {
        color: var(--font-color-primary);
      }

      &:last-child {
        font-family: var(--font-family-secondary);
        color: var(--font-color-secondary);
        font-weight: 700;
        font-size: var(--font-size-large);
      }
    }
  }

  .date {
    letter-spacing: -0.05em;
    font-size: var(--font-size-medium);
  }

  .perfect-mark {
    min-height: 25px;
    position: relative;
    z-index: 1;
    overflow: hidden;

    span {
      position: relative;
      z-index: 1;
    }

    &.perfect {
      background-color: #ffca2b;
      background-image: url(${Assets.Icon.glossyPointSmall.src});
      background-size: 6px, contain;
      background-position: top 2px left 2px;
      background-repeat: no-repeat;
      color: #b2720a;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: var(--font-size-medium);
      letter-spacing: -0.05em;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-image: url(${Assets.Image.GlossyBgSmallWhite.src});
        background-size: contain;
        background-position: top 0 left 0;
        background-repeat: no-repeat;
        animation: var(--animation-glass-reflection-infinite);
        z-index: 0;
      }
    }
  }

  .more-icon {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url(${Assets.Icon.moreVerticalGray.src});
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
  }

  .report-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const ReviewListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ExtraOptionLayoutStyle = styled.div`
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: var(--line-color-primary);
  border-radius: 20px;
`

export const ExtraOptionContentHeaderStyle = styled.div`
  width: 100%;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: var(--line-color-primary);
  padding: 20px;
`

export const ExtraOptionContentBodyStyle = styled.div`
  width: 100%;
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: var(--line-color-primary);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:last-child {
    border-width: 0;
  }
`

export const SettingHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--line-color-primary);
  border-bottom: 1px solid var(--line-color-primary);
  padding: 20px;
  width: 100%;

  .title {
    padding-top: 2px;
  }

  .btn {
    cursor: pointer;
    font-family: var(--font-family-rg-b);
    font-size: 0.9em;
    letter-spacing: 0.01em;

    &.save {
      color: var(--font-color-light-blue);
    }

    &.cancel,
    &.saved {
      color: var(--font-color-secondary);
    }

    &.saved {
      cursor: default;
    }
  }
`

export const SettingImageSelectorStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  padding: 20px 0;
  margin-bottom: 20px;

  ${phone(`
    gap: 10px;
  `)}
`

export const SettingImageSelectorNavigationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--font-color-primary);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const SettingImageSelectorAvatarContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  ${phone(`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    gap: 10px 5px;
  `)}
`

export const SettingImageSelectorPageIndicator = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

export const SettingImageSelectorPageDot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--font-color-light-blue)' : 'var(--line-color-primary)'};
  transition: all 0.2s ease;
`

export const SettingImageSelectorAvatarItemStyle = styled.div<{
  isSelected: boolean
  imageSize: number
}>`
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  width: ${({ imageSize }) => imageSize}px;
  height: ${({ imageSize }) => imageSize}px;
  filter: grayscale(1);
  opacity: 0.5;

  ${({ isSelected }) =>
    isSelected &&
    `
    border-color: var(--line-color-light-blue);
    background-color: rgba(76, 207, 241, 0.20);
    filter: grayscale(0);
    opacity: 1;
  `}

  &:hover {
    transform: scale(1.05);
  }

  .avatar-image {
    transition: all 0.2s ease;
    position: absolute;
    top: calc(50% + 5px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ imageSize }) => imageSize}px;
    height: ${({ imageSize }) => imageSize}px;
    object-fit: cover;
  }

  .avatar-name {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--font-color-primary);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
`
export const SettingRadioSelectorStyle = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  ${phone(`
    gap: 10px 20px;
  `)}
`

export const RadioSelectorItemStyle = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
  transition: opacity 0.2s ease;
`

export const CustomRadioInputStyle = styled.input`
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid var(--line-color-light-blue);
  border-radius: 50%;
  background-color: transparent;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: #fff;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--line-color-light-blue);
  }

  &:focus {
    outline: 2px solid var(--font-color-primary);
    outline-offset: 2px;
  }
`

export const RadioLabelStyle = styled.div`
  cursor: pointer;
  color: var(--font-color-primary);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-medium);
  font-weight: 700;
  user-select: none;
`

export const StudentEditCardStyle = styled.div`
  width: 100%;
  border: 1px solid var(--line-color-primary);
  border-radius: 15px;
  padding: 20px;
  font-family: var(--font-family-secondary);
  position: relative;

  .label {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-small);
    color: var(--font-color-secondary);
    margin-bottom: 5px;
  }

  input {
    color: var(--font-color-primary);
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-medium);
    font-weight: 700;
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    padding: 0;
    margin: 0;

    &::placeholder {
      color: var(--font-color-secondary);
    }
  }
`

export const StudentEditCardButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`

export const StudentEditCardButton = styled.div`
  cursor: pointer;
  font-family: var(--font-family-rg-b);
  font-size: 0.9em;
  letter-spacing: 0.01em;

  &.edit,
  &.save {
    color: var(--font-color-light-blue);
  }

  &.cancel {
    color: var(--font-color-secondary);
  }
`

export const StudentInfoCardStyle = styled.div`
  width: 100%;
  height: 170px;
  background-color: var(--color-light-blue-opacity-10);
  background-image: url(${Assets.Icon.glossyPoint.src});
  background-size: 15px;
  background-position: top 7px left 7px;
  background-repeat: no-repeat;
  border-radius: 20px;
  border: 1px solid var(--line-color-primary);
  padding: 20px;
  position: relative;
  overflow: hidden;

  ${tabletS(`
    padding: 0;
    height: fit-content;
  `)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-image: url(${Assets.Image.GlossyBgBigWhite.src});
    background-size: contain;
    background-position: top 0 left 0;
    background-repeat: no-repeat;
    animation: var(--animation-glass-complete);
    z-index: 0;
  }

  .character-container {
    width: 250px;
    height: 160px;
    position: absolute;
    left: 20px;
    bottom: -25px;
    display: flex;
    align-items: flex-end;

    ${tabletS(`
      margin-top: 20px;
      position: relative;
      height: 130px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
    `)}

    .main-character {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: auto;
      height: 160px;
    }

    .sub-character {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: auto;
      height: 160px;
    }
  }

  .info-container {
    width: calc(100% - 280px);
    height: 100%;
    min-height: 70px;
    padding-left: 280px;
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;

    ${tabletS(`
      width: 100%;
      padding: 20px 0;
      padding-bottom: 30px;
      margin: 0 auto;
      align-items: center;
      background-color: #fff;
    `)}

    .info-content-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      ${tabletS(`
        align-items: center;
      `)}
    }

    .user-name {
      font-family: var(--font-family-secondary);
      font-size: var(--font-size-xlarge);
      font-weight: bold;

      ${tabletS(`
        width: 100%;
        text-align: center;
      `)}
    }

    .user-id,
    .sign-up-date,
    .customer-group-name {
      font-family: var(--font-family-secondary);
      font-weight: 700;
      font-size: var(--font-size-small);
      color: var(--font-color-secondary);
      margin-bottom: 5px;

      ${tabletS(`
        width: 100%;
        text-align: center;
      `)}

      &:last-child {
        margin-bottom: 0;
      }
    }

    .buttons {
      display: flex;
      gap: 20px;

      a {
        font-size: var(--font-size-medium);
        color: var(--font-color-light-blue);
      }
    }
  }
`

export const StudentProfileCardStyle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .header {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;

    .avatar {
      width: 68px;
      height: 68px;
      overflow: hidden;
      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        .frame {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        .avatar-image {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
      }
      img {
        display: block;
      }
    }

    .rank {
      cursor: pointer;
      font-size: var(--font-size-large);
      padding-top: 5px;
      color: var(--font-color-light-blue);
    }

    .name {
      font-size: var(--font-size-xlarge);
      font-weight: bold;
      font-family: var(--font-family-secondary);
      color: var(--font-color-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .body {
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 10px;

    .label {
      font-family: var(--font-family-rg-b);
      letter-spacing: 0.01em;
      font-weight: 500;
      font-size: var(--font-size-medium);
      color: var(--font-color-secondary);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: var(--font-size-medium);

      &.link {
        cursor: pointer;
        color: var(--font-color-light-blue);
      }
    }
  }
`

export const StudyStatusViewStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 25px;
  background-color: var(--color-gray-light);
  border-radius: 15px;
`
