import type { PodcastEpisode } from "./types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface SearchResultsProps {
  results: PodcastEpisode[]
  isLoading: boolean
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (results.length === 0) {
    return <div className="text-center">No results found.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((episode) => (
        <Card key={episode.url}>
          <CardHeader>
            <CardTitle>{episode.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{episode.description}</CardDescription>
            <a
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Listen to Episode
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

