import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Museum } from '../../lib/types'
import { MapPin, ExternalLink } from 'lucide-react'

interface MuseumCardProps {
  museum: Museum
}

export function MuseumCard({ museum }: MuseumCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{museum.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {museum.city}
        </div>
        {museum.theme && (
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
            {museum.theme}
          </div>
        )}
        <CardDescription className="line-clamp-3">
          {museum.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Link href={`/museums/${museum.id}`} className="flex-1">
            <Button className="w-full">
              Explore
            </Button>
          </Link>
          {museum.official_page && (
            <a
              href={museum.official_page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}