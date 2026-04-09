'use client'

import style from './page.module.scss'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useRef, useState } from 'react'

const DOCUMENT_FILES_EXT = [
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.pdf',
  '.json',
  '.html',
  '.htm',
  '.hwp',
  '.hwpx',
  '.txt',
  '.csv',
  '.zip',
  '.rar',
  '.7z',
  '.tar',
  '.gz',
]
const IMAGE_FILES_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

const ICON_ATTACH =
  'data:image/png;base64,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'
const ICON_DELETE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA9ASURBVHic7Z1rcBTXlcf/93ZPjxgJSQjE0+CwixEq8RCCsAR5qxyyG3u9ToFJRUWydiJcgIusHxWTlCtrJ0XZ8YfspnaTD05t1hUbsqk4lU2wnXKCU67YZA22SBCIxxiBMQkYG7Sg0QuEZqb7nv0wajE9L82ju+f2uH/fuvve00c6/7n39O17bzO4QNfy5bdwVb2DiJaCaDEYawJQB6AaQL0bPkjMIIDrAAZBdAaMnWFEJ3Si/euOHfvQ6Zszpwy/s2pVm2IY9xNj9wBY5NR9Kpz3QPQqA36ypqenx4kb2CqAw6tWBXQh7meMfQ1ES+20/XGHAScEY/+hMvbT1d3dcRvtlg4B/FBb21ZG9ASABXbY9MnKeRB9Z01Pz/MMEKUaK1kAf1qxYqXg/IcA1pZqyyd/GHDE4Pyrn+ruPlSKHV5sRQJYV2vro4LzQ/CD7zoEtHEhDh5qa9tFJcSxqBbg0Jo101k8/iIBf1/sjX1s5XdGLPaldeFwpNCKBQvgwMqVczXgNQKWFVrXx1FOKZzftbq7+0IhlQoSQFdr622Msd8DmF+Qaz5u8YHB2Pp1R46czbdC3gI4sHLl3ABwAMDColzzcYs/K5y3r+7uvpRP4byShwNNTVMDwD74wfcCCw0hfvtmS0tNPoXzEkAgFHoWwPKS3PJxk9ZqTXsun4KTCuBQa+tWAPeX7JKPqxCwuautbctk5XLmAH/85Cdnk673IvHixsd7DMeB5tuPHv0oW4GcLYDQ9e/DD76XqQ0w9q+5CmRtAf7U2touGDtgv08+ZWDd3xw9+k6mC1lbAMHYk8754+MqRP+S7VLGFuCdVavauBCHs1338RzEiNoyzSnI2AJwIbbDD34lwQTn2zJeSD3x5h13VIWGhj4CMM1xt3zcJNIwMjL3trNno8kn01qA0PDwP8APfiXSMFBb+9nUk2kCIODv3PHHx20EUVps0wTAiD7tjjs+bsMYW592Lvng7ZaWBkXTrqae96kYSCNqWNnTM2iesLQAiqY1wQ9+JcN0osXJJywCYERN7vrj4zYG55YYWwQgGPOndFc4HPhEyrGFWvdc8SkHxNjU5GOLADjRVPhUNikxtgiAGKty1xufMhBKPrAKgCgEn4omNcZq8oEB1KmQB65pqF27FjXLlkGdNg36wACunzyJoa4uiGh0cgMuwqdMQX17O6qbm6HU1UHv78dITw+GDx8GxW1by1kyRkqeZ4k3EdWCyTEMMP3uuzH/kUegzZyZdi1+9So++MEPcPU3vymDZ+nM/MIXcMuOHVDr07c6iH74IS5873sY+MMfyuBZOkRkEYCSfLBlzpyHFcZmuetSOvMffRQLHnsMSnV1xutKKIRp69dDqa7GUFeXy97dhHGOhd/6FuZt2wZelTl9UmtrMf3OO0G6jpGjR132MB2DqP+Fvr7/NI+tOYAQAfddsjLvwQcx5ytfyavs7Pvuw62PP45ytFqMc/zVU0+hcePGPAoz3PLQQ5i1ebPzjk2OJcapTwFlFcDUlSsxb/v2gurM6uhwXQRm8KfffXdB9Rbs3InQovJulkK5BMCJypoAzHvwwaIC6aYIig0+ADBFwdxtGSfmuAYjssa8XI6kotbVYerq1UXXd0MEpQTfpP7228E0zUavSkMaAVTdeisYL82dWR0dWPjEE46IgHGOhbt2lRR8IPG4GJwzxyavSkcaAXCbfhWNmzbZ3hKYv/wZ99xjiz27/lY7kEYA0cuXbbNlZ3dgR7NvgQixvj57bNmAPAK4eBGjFy/aZs8OEdgefABD4TD04WHb7JWKNAIQAM7u2WOrzVJyArv6/FTO7t4NstViaUgjAEMI/OXnP0d/d7etdovJCezu800u79+Pi/v2wSB5JCCNAAiA0HUcevhhDL/3nq22C+kOnGj2AWDg+HEc/sY3QEKAfAGkw8eDExsYwMHOTgyfOWOr/Xy6A6ea/cFwGG9v2wb92jUAgCLJCzdAIgGojE38Y6KRCA5u2WK7CBo3bcoqAjP4djf7g+EwDj7wAOLjiV+AsQmxy4A0AgCAGvXm2+kJEdjcHWTKCZzq8weOH8fBLVsmgg8A1YGyv2+zINP8D4RUFTcMAzGR2AM5GongYGcn2nfvRu1tt9l2n1kdHahasABX9u4FOMfszZtR09pqm30gEfy3t25FfGRk4lyQc4RKHO20G0tb9Nby5Wc1RfnrcjkDAIIIV6JRS6YcbGhA+wsvoHbx4hw15SG12QcAlXPMCAbL3uTGDOP9vz1+fOKVZLn9SYMzhhnBINSkX4pTOYETZA2+psn3z4aEAgASWfJ0TfOcCHIGX6LELxkpBQB4TwReDD4gsQCAhAhmaJrluVlGEXg1+IDkAgDkzwm8HHzAAwIA5O0OvB58wCMCAOQTQSUEH/CQAAB5RFApwQc8JgAgtwhG3n/f8fsPhsNpw7teDT7gQQEA2UVw5JvfdPbGRDi8c6dleNfLwQc8KgAgswgGTpyAPjrq2D1v9PXh2vnzE8deDz7gYQEA6SKomjkTasi5Fe7BGTOg1iS+xFIJwQc8LgDgpggCgQBWfPvbjt6LqypWPPkkVEWpiOADkr0OLhZVUbDm6afR+JnPOH6v+Rs2IGgY+MszzwASTe0qFs+3AOZMnkabJ3PkYmaOmUVew9MCcGoaVz7kml7mJTwrgHIG36QSROBJAcgQfBOvi8BzApAp+CZeFoGnBCBj8E28KgLPCEDm4Jt4UQSeEIAXgm/iNRFIPxDk1Fq9aH8/Pnr9dTBFwby77kJgqn3bJDdu2gSh6zj/3e9KP1gktQCcXKjZtWMHopEIAKD32Wex7rnnbF98AkB6EUjbBTi9UNMMPgCM9fWVbUFquZFSAG4t1EymHAtSZUA6AZQj+CYfRxFIJ4AFO3e6skqXAwgpCqYoimWBpJOrkgvdBdUNpBJAXXs7Zn3xi7bazLRKN8A5ZlZVoV7TME3T0BgMQk1dfNLZabsI5m3fjpqlS221WSpSCWDe1q222ssW/OkpkzlUzjE90+ITu0XAGOba/DeWijQCCDQ0oGbZMtvs5Rt8k6yzjW0WQe3atVm3li8H0ggguGABYNPmCeajXr7BN8kpApsSQ65p0GbPtsWWHUgjgFL3CTbJlPDlE3wTc0FqWk5gY2LIVXnG36QRQOzSpZJtFNrsZ2NiQaoDiSEJYeu2uKUijQCily7hWgkre+wKvolTIhjs6YExvl2cDEgjAEGE955/vqi6xfb5k5FTBEXmBGd+/GN/o8hM6ES48PLLuLx/f0H1Su3zJ4MzlvkRsYic4INf/xqX3ngDRsle2Yc0AiAk+sfDX/86+o8cyatO5NgxW5v9bGRNDDs7MXz6dF42+t56Cz3mwhW/BUjH/Ofq16/j7QcewPlf/hI0vl9gGkS4sHcvDnZ2Oh58k2zdwf/edx8+fO21rPXIMPD+nj3o2rEDRjQKBoBLtFegVPsE/t/YGPSkX0fdkiWYv2EDGlpbEWxoQDQSwcCxY7jwyisYOnXKUtfJ4CcjiHA1GrX4CQANra245XOfw7SlS6HV12PsyhVEjh7FhZdewsi5cxPltPH9AstF6j6B8jyQAqhWVQwlfWZ1qLcXQ729k9ZzK/jAzZygPxaDntRCRXp6EOnpmbR+jURjAIBEXQCQEECwwObRzeCbZMoJ8mGKoqBKUSYv6CKW/7ZgrOzZSUMwiECeIihH8E0y5QS50DhHvQQfixKMWRKr1E/Hlv0z1wzAjGAQUyb5pVRJsETbFMFkv+qQomC6pkGG6SCpMbZ0SAIouwCAhAimaRpCQmBM1xEVAoIInDFonCOkqtAkyaQ5Y2jQNESFwKiuI276yjmCjCGkqnm3aG5AKTFWUy7ecNed3AQ5R1CCZjMfvOKrkRJjizTjQsjzPTMfR4ilxNgqAMMYctcdH7eJG0YOAQCjQqJhSh97EUQwAMs2ahYBMGAsmm341cfzRIUAZyy7AACMRA2Z3lX52Ml4bEeSz1nHAYDhMcOQ6tOmPvZAAMaEAOVKAhlwQWBCKT4VxJhhQBABnJ9PPp/aApwGgOu+ACqOG2ZMDcMygcEiAC0Q6AVAUcNA3H8aqBh0IrNVp7iuZxfAPSdODAA4BQDX41KMCvvYwEg8buZ1JzvOnbOM9aQNUjPgTQCWL3j6eJe4ELhhxpGxN1KvpwlAEL0OJLLGoZvK8fEgBGAwHp+YgyiA11PLpAlAV9V9APqBhHpGdd1hN32cwnw7OU7E4HxyAXSEwzHG2P+Yx8PxeLIRH48QFwLDSXkcA17sCIdjqeUyvqgmzn+ERAsCAhCJxeBLwDsIAAPW7psY0X9lKptRAPeGwz0g2mceG0SIRKN+PuABiAiRlAmrAF7dcPr08Uzls05VIca+k3wcEwIDsZgvAokhAJF4HDHrQB4xzp/JVierADb19r4D4MXkc2OGkWgJ/EEi6SAAA7FY+jA+0U83vvvuoWz1ck5WiyvKYwAsAwdRIdAfi8HwRSANggj90SjG0ofwhwXnj+eqm1MAHeHwZSJ6LPV8TAhczXxDH5eJGgauRKMZB+0IeOTzp07l3Hghr5nKe5cs2cOAL2eqXK2qmKqqYBLugVfJEBGGdR2jup4tL9t9b2/vlsns5DVfWVeUfwZR2ronAnBN19EXjeKGP4/AFQjAqGGgLxrF9ezBPxLStIfysZf3z/YXixY1BlT1AIDF2cqonKNGURCSbP1bJUBIJOEjup76iJfKubiitHeEw3ntQ1NQu/1KS8sioetvgLH5ucopjKFqXAgBv2soibgQGDUMjBlGPon3Bej6+nvPns17r52Co/Or5uY5jOg1BizPpzwfF4PGOVTGoHIu14pUiRAAdCGgEyEmxM1ZPPnxLlPVuzaePPlBIfcs6uf5i5aWhoBh/AzAncXU50gIgzH2sReDQCKhE0AhwbbC2L6Aqv7T+HyOwqoWd0eAAPZyU9MjYOzfAASKteNTEjqAZ4719j61C8W9rim5g36ppaUVhvFDAJ8q1ZZPQXRDiK/ee+bMH0sxYkuGtgvgK5qbt4DoSQCfsMOmT1b+zIie3nD69G6G0p+8bU3Rf7RqVaDx+vUvMeBrAFbYadsHxxhj/143a9bPPr1/v22zdBx7RnulqWm5YOzLDPhHApY4dZ+KhrFTDHgVRP+9sbf3hCO3cMJoKr9qbp7Die4AsAxAExKDSfUgqgFj9W74IC1Eg2DsGoBBJNZlnAFwQjC2f7JxfDv4f/bbdoLHct9zAAAAAElFTkSuQmCC'

const ICON_CHECK_OFF =
  'data:image/png;base64,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'
const ICON_CHECK_ON =
  'data:image/png;base64,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'

export default function AttachFile({
  buttonText = 'Choose',
  limitSizeMB = 5,
  ext,
  onFileChanged,
  isActiveDelete = false,
  isFileDelete,
  onFileDelete,
}: {
  buttonText?: string
  limitSizeMB?: number
  ext?: string[] | 'document' | 'image'
  onFileChanged?: (file: File | null) => void
  isActiveDelete?: boolean
  isFileDelete?: boolean
  onFileDelete?: (isDelete: boolean) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  const onFileChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = limitSizeMB * 1024 * 1024
    const targetFiles = e.target.files
    if (targetFiles && targetFiles.length > 0) {
      for (let i = 0; i < targetFiles.length; i++) {
        const f = targetFiles[i]
        if (f.size > maxSize) {
          alert(t('t918', { txt: f.name, num: limitSizeMB }))
          return
        }
      }

      setFile(targetFiles[0])
      if (onFileChanged) {
        onFileChanged(targetFiles[0])
      }
    }
  }

  let acceptExt = '*/*'
  if (ext !== undefined) {
    if (Array.isArray(ext)) {
      acceptExt = ext.join(',')
    } else if (ext === 'document') {
      acceptExt = DOCUMENT_FILES_EXT.join(',')
    } else if (ext === 'image') {
      acceptExt = IMAGE_FILES_EXT.join(',')
    }
  }

  return (
    <>
      {file === null && (
        <SelectButton
          buttonText={buttonText}
          onSelectFile={() => {
            if (fileRef.current) {
              fileRef.current.click()
            }
          }}
          buttonDeleteText={t('t374')}
          isActiveDelete={isActiveDelete}
          isDeleteFile={isFileDelete}
          onDeleteFile={() => {
            if (onFileDelete) {
              onFileDelete(true)
            }
          }}
        />
      )}
      {file && (
        <SelectedFile
          filename={file.name}
          onCancel={() => {
            setFile(null)
            if (fileRef.current) {
              fileRef.current.value = ''
            }
            if (onFileChanged) {
              onFileChanged(null)
            }
          }}
        />
      )}
      <input
        ref={fileRef}
        onChange={onFileChangeEvent}
        type={'file'}
        accept={acceptExt}
        style={{ display: 'none' }}
      />
    </>
  )
}

function SelectButton({
  buttonText,
  onSelectFile,
  buttonDeleteText,
  isActiveDelete,
  isDeleteFile = false,
  onDeleteFile,
}: {
  buttonText: string
  onSelectFile: () => void
  buttonDeleteText?: string
  isActiveDelete?: boolean
  isDeleteFile?: boolean
  onDeleteFile?: () => void
}) {
  const isDeletable = isActiveDelete
  return (
    <div className={style.file_container}>
      <button className={style.btn_attach} onClick={onSelectFile}>
        <span className={style.btn_icon}>
          <Image src={ICON_ATTACH} alt="" width={16} height={16} />
        </span>
        <span className={style.btn_label}>{buttonText}</span>
      </button>

      {isDeletable && (
        <button
          className={`${style.btn_attach} ${style.btn_attach_delete}`}
          onClick={onDeleteFile}>
          <span className={style.btn_icon}>
            <Image
              alt=""
              src={isDeleteFile ? ICON_CHECK_ON : ICON_CHECK_OFF}
              width={18}
              height={18}
            />
          </span>
          <span className={style.btn_label}>{buttonDeleteText}</span>
        </button>
      )}
    </div>
  )
}

function SelectedFile({
  filename,
  onCancel,
}: {
  filename: string
  onCancel: () => void
}) {
  return (
    <div className={style.file_container}>
      <span className={style.attached_item_label}>{filename}</span>
      <span
        className={style.btn_attached_item_cancel}
        onClick={() => onCancel()}>
        <Image src={ICON_DELETE} alt="" width={16} height={16} />
      </span>
    </div>
  )
}
