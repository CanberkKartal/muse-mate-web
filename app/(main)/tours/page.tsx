'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../context/auth-provider'
import { useTours, useDeleteTour } from '../../../lib/hooks/use-tours'
import { TourCard } from '../../../components/tour/tour-card'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import Link from 'next/link'
import { Plus, Search, Loader2 } from 'lucide-react'

export default function ToursPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { data: tours, isLoading, error } = useTours(user?.id)
  const deleteTourMutation = useDeleteTour()
  const [searchTerm, setSearchTerm] = useState('')
  const [deletingTourId, setDeletingTourId] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const handleDeleteTour = async (tourId: string) => {
    setDeletingTourId(tourId)
    try {
      await deleteTourMutation.mutateAsync(tourId)
    } catch (error) {
      console.error('Failed to delete tour:', error)
    } finally {
      setDeletingTourId(null)
    }
  }

  const filteredTours = tours?.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.museum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.museum.city.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Error loading tours. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tours</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personalized museum tours
          </p>
        </div>
        
        <Link href="/museums">
          <Button className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Tour
          </Button>
        </Link>
      </div>

      {tours && tours.length > 0 && (
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {tours && tours.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium mb-2">No tours yet</h3>
              <p className="text-muted-foreground mb-4">
                Start exploring museums and create your first personalized tour.
              </p>
              <Link href="/museums">
                <Button>Explore Museums</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : filteredTours.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No tours found matching your search.' : 'No tours available.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} found
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                onDelete={handleDeleteTour}
                isDeleting={deletingTourId === tour.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}