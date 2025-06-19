'use client'

import { useMuseums } from '@/lib/hooks/use-museums'
import { MuseumCard } from '@/components/museum/museum-card'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

export default function MuseumsPage() {
  const { data: museums, isLoading, error } = useMuseums()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMuseums = museums?.filter(museum =>
    museum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    museum.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    museum.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    museum.theme?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

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
          <p className="text-red-600">Error loading museums. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Explore Museums</h1>
          <p className="text-muted-foreground mt-1">
            Discover amazing museums and start planning your visits
          </p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search museums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredMuseums.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No museums found matching your search.' : 'No museums available.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {filteredMuseums.length} museum{filteredMuseums.length !== 1 ? 's' : ''} found
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMuseums.map(museum => (
              <MuseumCard key={museum.id} museum={museum} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}