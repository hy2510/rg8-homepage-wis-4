'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

export type AuthStatus = 'unknown' | 'active' | 'inactive'

interface AuthContextProps {
  student: AuthStatus
  staff: AuthStatus
  changeAuthStatus: (
    status: {
      student?: AuthStatus
      staff?: AuthStatus
    },
    nextRedirect?: string,
  ) => void
  setGuardRedirect: (path: string) => void
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export default function AuthContextProvider({
  studentLogin,
  staffLogin,
  children,
}: {
  studentLogin: boolean
  staffLogin: boolean
  children: React.ReactNode
}) {
  const router = useRouter()

  const [student, setStudent] = useState<AuthStatus>(
    studentLogin ? 'active' : 'inactive',
  )
  const [staff, setStaff] = useState<AuthStatus>(
    staffLogin ? 'active' : 'inactive',
  )
  const ignoreGuardRedirectRef = useRef<boolean>(false)
  const [redirect, setRedirect] = useState<string | undefined>(undefined)
  const changeAuthStatus = useCallback(
    (
      status: { student?: AuthStatus; staff?: AuthStatus },
      nextRedirect?: string,
    ) => {
      if (nextRedirect) {
        ignoreGuardRedirectRef.current = true
        setRedirect(nextRedirect)
      }
      if (status.student) {
        setStudent(status.student)
      }
      if (status.staff) {
        setStaff(status.staff)
      }
    },
    [],
  )

  const setGuardRedirect = useCallback((path: string) => {
    if (!ignoreGuardRedirectRef.current) {
      setRedirect(path)
    }
  }, [])

  useEffect(() => {
    if (redirect) {
      router.replace(redirect)
      setRedirect(undefined)
      ignoreGuardRedirectRef.current = false
    }
  }, [redirect, router])

  return (
    <AuthContext.Provider
      value={{
        student,
        staff,
        changeAuthStatus,
        setGuardRedirect,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContextComponent is not binded.')
  }
  return {
    student: context.student,
    staff: context.staff,
  }
}

export function useChangeAuthStatus() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContextComponent is not binded.')
  }
  return context.changeAuthStatus
}

export function useGuardRedirect() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContextComponent is not binded.')
  }
  return context.setGuardRedirect
}
