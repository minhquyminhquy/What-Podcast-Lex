import { Headphones } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Headphones className="h-8 w-8 text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Lex Fridman Podcast Search</h1>
      </div>
    </header>
  )
}
