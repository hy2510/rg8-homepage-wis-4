'use client'

import { useScreenMode, useStyle } from '@/7th/_ui/context/StyleContext'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'

const STYLE_ID = 'page_about_vn'

export default function Page() {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <main className={`container compact ${style.about_to_school}`}>
      <div className={style.contents_box}>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
      </div>
    </main>
  )
}

const TitleBox = ({
  txt1,
  txt2,
  txt1Color,
  txt2Color,
}: {
  txt1: string
  txt2: string
  txt1Color?: string
  txt2Color?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.title_box}>
        <div className={style.txt_1} style={{ color: txt1Color }}>
          {txt1}
        </div>
        <div className={style.txt_2} style={{ color: txt2Color }}>
          {txt2}
        </div>
      </div>
    </>
  )
}

const CardTitle = ({ txt1, txt2 }: { txt1: string; txt2: string }) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <div className={style.card_title}>
        <div
          className={style.txt_1}
          dangerouslySetInnerHTML={{ __html: txt1 }}></div>
        <div
          className={style.txt_2}
          dangerouslySetInnerHTML={{ __html: txt2 }}></div>
      </div>
    </>
  )
}

const SlideContainer = ({
  children,
  theme,
  slideCardData,
  fixCardContainerSize,
}: {
  children?: any
  theme?: string
  slideCardData: any
  fixCardContainerSize?: boolean
}) => {
  const style = useStyle(STYLE_ID)

  const [slideNumber, setSlideNumber] = useState(0)
  const cardData = [...slideCardData]

  const isMobile = useScreenMode() === 'mobile'

  return (
    <>
      <div className={style.slide_container}>
        <div
          className={
            style.slide_num
          }>{`${slideNumber + 1} / ${cardData.length}`}</div>
        <div
          className={`${style.left_arrow} ${theme == 'red' ? style.red : ''}`}
          onClick={() => {
            0 == slideNumber
              ? setSlideNumber(cardData.length - 1)
              : setSlideNumber(slideNumber - 1)
          }}></div>
        <div
          className={`${style.right_arrow} ${theme == 'red' ? style.red : ''}`}
          onClick={() => {
            slideNumber < cardData.length - 1
              ? setSlideNumber(slideNumber + 1)
              : setSlideNumber(0)
          }}></div>
        {children}
        <div
          className={`${style.card_container} ${fixCardContainerSize && style.fix_size}`}>
          <CardTitle
            txt1={slideCardData[slideNumber].title}
            txt2={
              isMobile
                ? slideCardData[slideNumber].subMobile
                : slideCardData[slideNumber].sub
            }
          />
          <div className={style.slide_image}>
            <Image
              src={slideCardData[slideNumber].imgSrc}
              width={1000}
              height={600}
              alt=""
            />
          </div>
          {/* <div>{slideCardData[slideNumber].comment}</div> */}
        </div>
      </div>
    </>
  )
}

const Section01 = () => {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  const slideCardData = [
    {
      title: 'TIẾNG ANH CĂN BẢN - DODO ABC',
      sub: 'Học Bảng chữ cái (Alphabet), Ngữ Âm (Phonics), Từ vựng phổ biến (Sight Words) thông qua việc xem hoạt hình và 5 bước luyện tập, học các bài hát đồng dao và trò chơi thú vị.',
      subMobile:
        'Học Bảng chữ cái (Alphabet), Ngữ Âm (Phonics), Từ vựng phổ biến (Sight Words) thông qua việc xem hoạt hình và 5 bước luyện tập, học các bài hát đồng dao và trò chơi thú vị.',
      imgSrc: '/src/images/@about-to-school/section01/slide/1.png',
    },
    {
      title: 'CÂU CHUYỆN ĐA DẠNG VÀ PHONG PHÚ',
      sub: 'Trải nghiệm hơn 6.000 nội dung đa dạng như eBook(Sách điện tử) có giọng đọc của người bản xứ, Movie Book được làm thành phim hoạt hình,pBook(sách giấy) tiếng Anh…',
      subMobile:
        'Trải nghiệm hơn 6.000 nội dung đa dạng như eBook(Sách điện tử) có giọng đọc của người bản xứ, Movie Book được làm thành phim hoạt hình,pBook(sách giấy) tiếng Anh…',
      imgSrc: '/src/images/@about-to-school/section01/slide/2.png',
    },
    {
      title: 'LUYỆN NÓI DỄ DÀNG HƠN VỚI AI SPEAK',
      sub: 'Học viên sau khi nghe giọng đọc của người bản xứ và tiến hành đọc theo, chương trình nhận dạng giọng nói AI sẽ phân tích trên từng âm tố và báo cáo kết quả.',
      subMobile:
        'Học viên sau khi nghe giọng đọc của người bản xứ và tiến hành đọc theo, chương trình nhận dạng giọng nói AI sẽ phân tích trên từng âm tố và báo cáo kết quả.',
      imgSrc: '/src/images/@about-to-school/section01/slide/3.png',
    },
    {
      title: 'BÀI TẬP AFTER READING TỈ MỈ VỚI 5 BƯỚC',
      sub: 'Phát triển đồng đều cả 4 kỹ năng chính của tiếng Anh thông qua phương pháp học tập phù hợp theo từng cấp độ.',
      subMobile:
        'Phát triển đồng đều cả 4 kỹ năng chính của tiếng Anh thông qua phương pháp học tập phù hợp theo từng cấp độ.',
      imgSrc: '/src/images/@about-to-school/section01/slide/4.png',
    },
  ]

  return (
    <>
      <div className={style.section01}>
        <div className={style.title_image}>
          <Image
            src={'/src/images/@about-to-school/section01/top_title_vn.svg'}
            width={600}
            height={205}
            alt=""
            style={{ width: '100%', height: 'auto', maxWidth: '700px' }}
          />
        </div>
        <div className={style.contents}>
          <div>
            Reading Gate là một chương trình đọc sách tiếng Anh được thiết kế
            nhằm giúp trẻ học tiếng Anh thông qua các quyển sách phù hợp với khả
            năng mình và cung cấp các dạng bài tập After Reading được nghiên cứu
            kỹ lưỡng.
          </div>
          <div>
            Giúp xây dựng thói quen đọc sách đều đặn và khả năng diễn đạt tiếng
            Anh sinh động thông qua những quyển sách, truyện tranh hữu ích và
            thú vị với nhiều chủ đề đa dạng.
          </div>
          <div>
            Nhờ các bài tập After Reading mà trẻ có thể hiểu được bối cảnh và
            nội dung cốt lõi của tiếng Anh, từ đó nâng cao khả năng tư duy bằng
            tiếng Anh.
          </div>
        </div>
        <SlideContainer
          theme=""
          slideCardData={slideCardData}
          fixCardContainerSize>
          <div className={style.overlap}>
            <TitleBox
              txt1={'để Xem, Nghe, Đọc, Nói'}
              txt2={'NỘI DUNG ĐA DẠNG'}
              txt1Color={''}
              txt2Color={'var(--blue)'}
            />
          </div>
        </SlideContainer>
      </div>
    </>
  )
}

const Section02 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardPkData = [
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_1.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_2.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_3.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_4.png',
    },
    {
      title: 'Level PreK',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/PreK_5.png',
    },
  ]

  const slideCardKData = [
    {
      title: 'Level KA',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KA.png',
    },
    {
      title: 'Level KB',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KB.png',
    },
    {
      title: 'Level KC',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/KC.png',
    },
  ]
  const slideCard1Data = [
    {
      title: 'Level 1A',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1A.png',
    },
    {
      title: 'Level 1B',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1B.png',
    },
    {
      title: 'Level 1C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/1C.png',
    },
  ]
  const slideCard2Data = [
    {
      title: 'Level 2A',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2A.png',
    },
    {
      title: 'Level 2B',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2B.png',
    },
    {
      title: 'Level 2C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/2C.png',
    },
  ]
  const slideCard36Data = [
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/3B.png',
    },
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/4A.png',
    },
    {
      title: 'Level 3A~6C',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section02/slide/6A.png',
    },
  ]

  return (
    <>
      <div className={style.section02}>
        <TitleBox
          txt1={'CHIA THÀNH 22 LEVEL CHI TIẾT'}
          txt2={'TỪ DỄ ĐẾN KHÓ'}
          txt1Color={''}
          txt2Color={'#F95977'}
        />
        <div className={style.row}>
          <div className={style.table_image}>
            <Image
              src={'/src/images/@about-to-school/section02/table_vn.png'}
              width={918}
              height={130}
              alt=""
            />
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardPkData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardKData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard2Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCard36Data}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section03 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardKData = [
    {
      title: 'Level K',
      sub: 'Listening Activity',
      subMobile: 'Listening Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/1.png',
    },
    {
      title: 'Level K',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/2-2.png',
    },
    {
      title: 'Level K',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/3.png',
    },
    {
      title: 'Level K',
      sub: 'Writing Activty',
      subMobile: 'Writing Activty',
      imgSrc: '/src/images/@about-to-school/section03/slide/ebk/4.png',
    },
  ]
  const slideCard1Data = [
    {
      title: 'Level 1',
      sub: 'Listening Activity',
      subMobile: 'Listening Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/1.png',
    },
    {
      title: 'Level 1',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/2-2.png',
    },
    {
      title: 'Level 1',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/3.png',
    },
    {
      title: 'Level 1',
      sub: 'Summary Test',
      subMobile: 'Summary Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/4.png',
    },
    {
      title: 'Level 1',
      sub: 'Writing Activity',
      subMobile: 'Writing Activity',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb1/5.png',
    },
  ]
  const slideCard2Data = [
    {
      title: 'Level 2 trở lên',
      sub: 'Reading Comprehension',
      subMobile: 'Reading Comprehension',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/1.png',
    },
    {
      title: 'Level 2 trở lên',
      sub: 'Vocabulary Practice',
      subMobile: 'Vocabulary Practice',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/2-2.png',
    },
    {
      title: 'Level 2 trở lên',
      sub: 'Summary Test',
      subMobile: 'Summary Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/3.png',
    },
    {
      title: 'Level 2 trở lên',
      sub: 'Cloze Test',
      subMobile: 'Cloze Test',
      imgSrc: '/src/images/@about-to-school/section03/slide/eb2/4.png',
    },
  ]

  return (
    <>
      <div className={style.section03}>
        <div className={style.row}>
          <TitleBox
            txt1={'PHÙ HỢP THEO TỪNG LEVEL'}
            txt2={'BÀI TẬP AFTER READING'}
            txt1Color={''}
            txt2Color={'var(--blue)'}
          />
          <div className={style.comment}>
            Sau khi đọc sách, học viên có thể kiểm tra mức độ đọc hiểu thông qua
            4~5 dạng bài tập (Reading
            Comprehension/Vocabulary/Listening/Summary/Writing).
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCardKData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCard1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCard2Data}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section04 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardPkData = [
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/1.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/2.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/3.png',
    },
    {
      title: 'DODO ABC (Sight Words)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/4.png',
    },
  ]
  const slideCardKData = [
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/5.png',
    },
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/6.png',
    },
    {
      title: 'eBook (KA~1C)',
      sub: '',
      imgSrc: '/src/images/@about-to-school/section04/slide/7.png',
    },
  ]

  return (
    <>
      <div className={style.section04}>
        <div className={style.row}>
          <TitleBox
            txt1={'CHƯƠNG TRÌNH NHẬN DẠNG GIỌNG NÓI'}
            txt2={'AI SPEAK'}
            txt1Color={''}
            txt2Color={'#F95977'}
          />
          <div className={style.comment}>
            Tính năng SPEAK được sử dụng trong chương trình DODO ABC phần Sight
            Words và chương trình eBook Level K và Level 1. Giúp cải thiện kỹ
            năng Nói bằng cách phân tích phát âm của học viên theo từng âm tố và
            đưa ra kết quả.
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardPkData}></SlideContainer>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme="red"
            slideCardData={slideCardKData}></SlideContainer>
        </div>
      </div>
    </>
  )
}

const Section05 = () => {
  const style = useStyle(STYLE_ID)

  const slideCardRow1Data = [
    {
      title: 'MỤC TIÊU HÀNG NGÀY',
      sub: 'Có thể kiểm tra tiến độ học tập trong Nhật ký khi thiết lập và hoàn thành Mục tiêu hàng ngày.',
      subMobile:
        '나의 일일 학습 목표를 설정하고 목표를 달성하면 캘린더에서 달성 현황을 확인할 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/1@2x.png',
    },
    {
      title: 'HỌC LIÊN TỤC',
      sub: 'Đạt thành tích Học liên tục bằng cách hoàn thành trên một quyển sách mỗi ngày.',
      subMobile:
        '매일 한 권 이상 학습을 완료하여 연속 학습을 이어갈 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/2@2x.png',
    },
    {
      title: 'LEVEL MASTER',
      sub: 'Tích lũy đủ điểm theo từng level để nhận Huy hiệu Level Master.',
      subMobile:
        '레벨별로 정해진 학습 포인트를 모두 채우면 레벨마스터를 달성해요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/3@2x.png',
    },
    {
      title: 'DODO VÀ NHỮNG NGƯỜI BẠN',
      sub: 'Tích lũy điểm để mở khóa câu chuyện về những người bạn của Dodo.',
      subMobile:
        '포인트를 쌓아 도도와 친구들의 성장 스토리를 열어볼 수 있어요.',
      imgSrc: '/src/images/@about-to-school/section05/slide/4@2x.png',
    },
  ]

  return (
    <>
      <div className={style.section05}>
        <div className={style.row}>
          <TitleBox
            txt1={'TẠO ĐỘNG LỰC HỌC TẬP THÚ VỊ VỚI'}
            txt2={'TÍNH NĂNG TÍCH LŨY ĐIỂM'}
            txt1Color={''}
            txt2Color={'var(--blue)'}
          />
          <div className={style.comment}>
            <div className={style.col_left}>
              <Image
                src="/src/images/@about-to-school/section05/book.png"
                width={141}
                height={220}
                alt=""
              />
            </div>
            <div className={style.col_right}>
              <div>
                Tất cả sách của Reading Gate đều được phân bổ điểm khác nhau dựa
                trên số từ, số trang và độ khó của câu.
              </div>
              <div>
                Cần hoàn thành bài tập với trung bình trên 70% để nhận được điểm
                của quyển sách đó.
              </div>
              <div>
                Mỗi quyển sách có thể nhận điểm tối đa 2 lần, hoàn thành lần đầu
                nhận 100%, hoàn thành lần 2 nhận 50% số điểm ghi trên bìa sách.
              </div>
            </div>
          </div>
        </div>
        <div className={style.row}>
          <SlideContainer
            theme=""
            slideCardData={slideCardRow1Data}></SlideContainer>
        </div>
        <div className={style.row}>
          <div className={style.end_image}>
            <Image
              src={'/src/images/@about-to-school/section05/ending_vn.png'}
              width={1768}
              height={504}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}
