'use client'

import TaskList from '@/components/task-list'
import { Toaster } from '@/components/ui/toaster'
import { supabaseBrowserClient } from '@/lib/supabase-browser'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import SignIn from './sign-in/page'
import { usePaceStore } from '@/lib/store'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const { user, setUser } = usePaceStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }))
  const supabase = supabaseBrowserClient

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      setSession(data?.session || null)
    }
    fetchSession()
  }, [])

  return (
    <div className="flex w-full h-screen flex-col gap-4 items-center justify-center">
      {session ? <TaskList /> : <SignIn />}
      <Toaster />
    </div>
  )
}
