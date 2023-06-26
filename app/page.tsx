import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12 p-12 md:p-24">
      <h1 className="text-6xl font-bold">The Quiz</h1>
      <Link
        href="/quiz"
        className="btn"
      >
        Start Quiz
      </Link>
    </main>
  )
}
