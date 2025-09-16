import Link from "next/link"

export default function Home(){
  return (
    <div>
      <h1>CRUD completo</h1>
      <nav>
        <Link href="/get">GET</Link> <br />
        <Link href="/post">POST</Link> <br />
        <Link href="/put">PUT</Link> <br />
        <Link href="/delete">DELETE</Link> <br />
      </nav>
    </div>
  )
}