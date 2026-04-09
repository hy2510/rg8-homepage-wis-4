import { redirect } from 'next/navigation'

export default function Page() {
  async function revalidate(formData: FormData): Promise<void> {
    'use server'

    const PASSWD = 'qwe123'
    const TAG_LIST = [
      'data:cdn',
      'board:campaign',
      'board:challenge',
      'board:infographic',
      'board:new-contents',
      'board:newsletter',
      'board:superstar',
      'statistic:read',
      'home',
      'publishedbook',
      'publishedbook:quiz',
      'publishedbook:page',
    ]

    const password = formData.get('password') as string
    if (password !== PASSWD) {
      console.log(new Date().toISOString(), ' :: Invalid password')
      return
    }
    const tag = formData.get('tag') as string
    if (!TAG_LIST.includes(tag)) {
      console.log(new Date().toISOString(), ' :: Invalid tag')
      return
    }

    const { revalidateTag } = await import('next/cache')
    revalidateTag(tag)
    console.log(new Date().toISOString(), ` :: [${tag}] `, ' :: Revalidated')
    redirect('/')
  }

  return (
    <div>
      <form action={revalidate}>
        <div>
          PW: <input type="password" name="password" />
        </div>
        <div>
          TAG: <input type="text" name="tag" />
        </div>
        <button type="submit">Revalidate</button>
      </form>
    </div>
  )
}
