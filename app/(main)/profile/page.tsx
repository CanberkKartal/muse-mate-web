'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@context/auth-provider'
import { useTours } from '@lib/hooks/use-tours'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import Link from 'next/link'
import { User, Mail, Calendar, Map, Building, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const { data: tours } = useTours(user?.id)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

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

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </div>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Member Since
              </div>
              <p className="font-medium">
                {format(new Date(user.created_at), 'MMMM d, yyyy')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Map className="w-5 h-5 mr-2" />
              Tour Statistics
            </CardTitle>
            <CardDescription>
              Your museum exploration journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Tours</span>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {tours?.length || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Museums Explored</span>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {new Set(tours?.map(tour => tour.museum.id)).size || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Sections</span>
              <Badge variant="secondary" className="text-base px-3 py-1">
                {tours?.reduce((acc, tour) => acc + tour.sections.length, 0) || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {tours && tours.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Recent Tours
            </CardTitle>
            <CardDescription>
              Your latest museum tour creations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tours.slice(0, 5).map(tour => (
                <div
                  key={tour.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{tour.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tour.museum.name} • {tour.sections.length} section{tour.sections.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(tour.created_at), 'MMM d')}
                    </span>
                    <Link href={`/tours/${tour.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {tours.length > 5 && (
              <div className="mt-4 text-center">
                <Link href="/tours">
                  <Button variant="outline">View All Tours</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with exploring museums and creating tours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/museums">
              <Button className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Explore Museums
              </Button>
            </Link>
            <Link href="/tours">
              <Button variant="outline" className="flex items-center">
                <Map className="w-4 h-4 mr-2" />
                View My Tours
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}