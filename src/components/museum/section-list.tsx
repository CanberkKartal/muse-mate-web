import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Section, KeyObject } from '@/lib/types'
import { Building, Layers } from 'lucide-react'

interface SectionWithKeyObjects extends Section {
  key_objects?: KeyObject[]
}

interface SectionListProps {
  sections: SectionWithKeyObjects[]
  onSectionToggle?: (sectionId: string) => void
  selectedSections?: string[]
  showSelection?: boolean
}

export function SectionList({ 
  sections, 
  onSectionToggle, 
  selectedSections = [], 
  showSelection = false 
}: SectionListProps) {
  const groupedByFloor = sections.reduce((acc, section) => {
    if (!acc[section.floor]) {
      acc[section.floor] = []
    }
    acc[section.floor].push(section)
    return acc
  }, {} as Record<number, SectionWithKeyObjects[]>)

  const sortedFloors = Object.keys(groupedByFloor)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      {sortedFloors.map(floor => (
        <div key={floor} className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              Floor {floor === 0 ? 'G' : floor}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedByFloor[floor].map(section => {
              const isSelected = selectedSections.includes(section.id)
              
              return (
                <Card 
                  key={section.id} 
                  className={`cursor-pointer transition-all ${
                    showSelection 
                      ? isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:ring-1 hover:ring-gray-300'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => showSelection && onSectionToggle?.(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{section.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          Floor {floor === 0 ? 'G' : floor}
                        </div>
                      </div>
                      {showSelection && (
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  {section.key_objects && section.key_objects.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Key Objects ({section.key_objects.length})
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {section.key_objects.slice(0, 3).map(obj => (
                            <Badge key={obj.id} variant="secondary" className="text-xs">
                              {obj.name}
                            </Badge>
                          ))}
                          {section.key_objects.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{section.key_objects.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}