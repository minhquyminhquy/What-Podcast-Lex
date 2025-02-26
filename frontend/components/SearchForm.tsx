import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (query: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keywords to search podcasts"
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}

