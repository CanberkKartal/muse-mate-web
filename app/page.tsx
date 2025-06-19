'use client'

import { useAuth } from '@context/auth-provider'
import { Button } from '@components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import Link from 'next/link'
import { Building, Map, Users } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="text-indigo-600">MuseMate</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your personal museum tour guide. Discover amazing museums, explore collections, and create personalized tours.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {user ? (
                <div className="space-x-4">
                  <Link href="/museums">
                    <Button size="lg" className="w-full sm:w-auto">
                      Explore Museums
                    </Button>
                  </Link>
                  <Link href="/tours">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0">
                      My Tours
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="max-w-7xl mx-auto">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for museum exploration
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle>Museum Discovery</CardTitle>
                    <CardDescription>
                      Browse through a curated collection of museums with detailed information about their collections and exhibits.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Map className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle>Personal Tours</CardTitle>
                    <CardDescription>
                      Create customized tours by selecting sections that interest you most and save them for your visits.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle>Curated Experience</CardTitle>
                    <CardDescription>
                      Discover key objects and highlights in each section, making your museum visits more focused and enjoyable.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}