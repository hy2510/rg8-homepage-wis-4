'use client'

import { Assets } from '@/8th/assets/asset-library'
import { BookInfoModalStyle } from '@/8th/shared/styled/FeaturesStyled'
import { ModalFooterStyle } from '@/8th/shared/styled/SharedStyled'
import { BoxStyle, TextStyle } from '@/8th/shared/ui/Misc'
import { MiniModalContainer } from '@/8th/shared/ui/Modal'
import Image from 'next/image'
import { useState } from 'react'

export default function SelectStudentHistoryModal({
  studentHistoryList,
  onCloseModal,
  onSelectStudentHistoryId,
}: {
  studentHistoryList: { studentHistoryId: string; className: string }[]
  onCloseModal: () => void
  onSelectStudentHistoryId: (studentHistoryId: string) => void
}) {
  const [selectedStudentHistoryId, setSelectedStudentHistoryId] = useState<
    string | undefined
  >(undefined)

  if (true) {
    return (
      <BookInfoModalStyle>
        <MiniModalContainer>
          <div className="mini-modal-header">
            <div className="header-title">Select Student History</div>
            <div className="btn-close" onClick={onCloseModal}>
              <Image
                src={Assets.Icon.deleteBlack}
                alt="close"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="mini-modal-body">
            <BoxStyle display="flex" flexDirection="column" gap={10}>
              {studentHistoryList.map((item) => (
                <BoxStyle
                  key={item.studentHistoryId}
                  padding="12px"
                  borderRadius="8px"
                  border="1px solid var(--color-gray-light)"
                  onClick={() =>
                    setSelectedStudentHistoryId(item.studentHistoryId)
                  }
                  backgroundColor={
                    selectedStudentHistoryId === item.studentHistoryId
                      ? 'var(--line-color-light-blue)'
                      : 'var(--color-gray-light)'
                  }>
                  <TextStyle
                    fontFamily="sans"
                    fontWeight="bold"
                    fontColor="primary">
                    {item.className}
                  </TextStyle>
                </BoxStyle>
              ))}
            </BoxStyle>
          </div>
          <ModalFooterStyle isFixedBottom={false}>
            <BoxStyle
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={10}>
              <div />
              <BoxStyle display="flex" gap={10}>
                <TextStyle
                  onClick={onCloseModal}
                  fontFamily="sans"
                  fontWeight="bold"
                  fontColor="var(--line-color-light-blue)"
                  margin="0 10px 0 0">
                  {`CANCEL`}
                </TextStyle>
                <TextStyle
                  onClick={() => {
                    if (selectedStudentHistoryId) {
                      onSelectStudentHistoryId(selectedStudentHistoryId)
                    }
                  }}
                  fontFamily="sans"
                  fontWeight="bold"
                  fontColor="var(--line-color-light-blue)"
                  margin="0 10px 0 0">
                  {`OK`}
                </TextStyle>
              </BoxStyle>
            </BoxStyle>
          </ModalFooterStyle>
        </MiniModalContainer>
      </BookInfoModalStyle>
    )
  }
}
