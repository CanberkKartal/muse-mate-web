'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/auth-provider'
import { useMuseum } from '../../lib/hooks/use-museums'
import { useCreateTour } from '../../lib/hooks/use-tours'
import { SectionList } from '../museum/section-list'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface TourCreatorProps {
  museumId: string
}

export function TourCreator({ museumId }: TourCreatorProps) {
  const [tourName, setTourName] = useState('')
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  
  const { user } = useAuth()
  const router = useRouter()
  const { data: museum, isLoading: museumLoading } = useMuseum(museumId)
  const createTourMutation = useCreateTour()

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleCreateTour = async () => {
    if (!user || !museum || !tourName.trim() || selectedSections.length === 0) {
      return
    }

    setIsCreating(true)
    
    try {
      const tour = await createTourMutation.mutateAsync({
        name: tourName.trim(),
        museum_id: museumId,
        section_ids: selectedSections,
        userId: user.id
      })
      
      router.push(`/tours/${tour.id}`)
    } catch (error) {
      console.error('Failed to create tour:', error)
    } finally {
      setIsCreating(false)
    }
  }

  if (museumLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!museum) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Museum not found.</p>
        </CardContent>
      </Card>
    )
  }

  const canCreate = tourName.trim() && selectedSections.length > 0 && !isCreating

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/museums/${museumId}`}>
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Museum
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Tour</CardTitle>
          <CardDescription>
            Create a personalized tour for {museum.name} by selecting the sections you want to visit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tourName">Tour Name</Label>
            <Input
              id="tourName"
              placeholder="My Amazing Museum Tour"
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Selected Sections ({selectedSections.length})</Label>
            <p className="text-sm text-muted-foreground">
              Click on sections below to add them to your tour. You must select at least one section.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Sections for Your Tour</h3>
        
        {museum.sections && museum.sections.length > 0 ? (
          <SectionList
            sections={museum.sections}
            onSectionToggle={handleSectionToggle}
            selectedSections={selectedSections}
            showSelection={true}
          />
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                This museum has no sections available for tour creation.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleCreateTour}
          disabled={!canCreate}
          className="flex items-center"
        >
          {isCreating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isCreating ? 'Creating Tour...' : 'Create Tour'}
        </Button>
      </div>
    </div>
  )
}