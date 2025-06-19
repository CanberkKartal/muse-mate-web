import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TourWithDetails } from '@/lib/types'
import { MapPin, Calendar, Eye, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface TourCardProps {
  tour: TourWithDetails
  onDelete?: (tourId: string) => void
  isDeleting?: boolean
}

export function TourCard({ tour, onDelete, isDeleting }: TourCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onDelete && !isDeleting) {
      onDelete(tour.id)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{tour.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          {tour.museum.name} • {tour.museum.city}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" />
          Created {format(new Date(tour.created_at), 'MMM d, yyyy')}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {tour.sections.length} section{tour.sections.length !== 1 ? 's' : ''}
          </Badge>
          {tour.museum.theme && (
            <Badge variant="outline" className="text-xs">
              {tour.museum.theme}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm">
          Visit {tour.sections.slice(0, 2).map(s => s.name).join(', ')}
          {tour.sections.length > 2 && ` and ${tour.sections.length - 2} more section${tour.sections.length - 2 !== 1 ? 's' : ''}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Link href={`/tours/${tour.id}`} className="flex-1">
            <Button className="w-full flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              View Tour
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isDeleting ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}