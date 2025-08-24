'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Button from '../atoms/Button'
import { StoryCard as StoryCardV2 } from "@/components/molecules/StoryCard"
import { useStoryStore } from '@/stores/storyStore'

const TopRated = () => {
  const { 
    topRatedStories, 
    isLoading, 
    error, 
    fetchTopRatedStories, 
    clearError 
  } = useStoryStore()

  useEffect(() => {
    fetchTopRatedStories()
  }, [fetchTopRatedStories])

  const handleRetry = () => {
    clearError()
    fetchTopRatedStories()
  }

  // Helper function to get error message and styling based on error code
  const getErrorInfo = (error: { error: string; code: number } | null) => {
    if (!error) return null

    const isNetworkError = error.code === 0
    const isServerError = error.code >= 500
    const isClientError = error.code >= 400 && error.code < 500

    return {
      message: error.error,
      code: error.code,
      isNetworkError,
      isServerError,
      isClientError,
      icon: isNetworkError ? 'network' : isServerError ? 'server' : 'warning'
    }
  }

  const errorInfo = getErrorInfo(error)

  return (
    <section className="max-w-7xl mx-[1rem] md:mx-[3rem] lg:mx-[3rem] top-[20%] py-[3rem] mb-[4rem] px-[2rem] md:px-[3.5rem] bg-white dark:bg-black rounded-xl relative">
      <div className="flex justify-between items-start">
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
            Top Rated
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r mt-[-6] from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
        </div>
        <Button 
          label="See more" 
          className="py-[8px] px-[15px]"
          onClick={() => {
            // Navigate to all top-rated stories page
            window.location.href = '/stories/top-rated'
          }}
        />
      </div>

      {/* Enhanced Error State */}
      {errorInfo && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Different icons based on error type */}
              {errorInfo.icon === 'network' && (
                <svg 
                  className="w-5 h-5 text-red-400 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" 
                  />
                </svg>
              )}
              {errorInfo.icon === 'server' && (
                <svg 
                  className="w-5 h-5 text-red-400 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" 
                  />
                </svg>
              )}
              {errorInfo.icon === 'warning' && (
                <svg 
                  className="w-5 h-5 text-red-400 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              
              <div>
                <p className="text-red-800 dark:text-red-200 font-medium">
                  {errorInfo.message}
                </p>
                {errorInfo.code !== 0 && (
                  <p className="text-red-600 dark:text-red-300 text-sm">
                    Error Code: {errorInfo.code}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Show different retry text based on error type */}
              <Button
                label={errorInfo.isNetworkError ? "Retry Connection" : "Retry"}
                onClick={handleRetry}
                className="py-1 px-3 text-sm top-0 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
              />
            </div>
          </div>
          
          {/* Additional help text for network errors */}
          {errorInfo.isNetworkError && (
            <div className="mt-2 pl-7">
              <p className="text-red-700 dark:text-red-300 text-sm">
                Please check your internet connection and try again.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stories Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {topRatedStories.length > 0 ? (
            topRatedStories.map((story) => (
              <Link
                href={`/story/${story.id}`}
                key={story.id}
                className="group"
              >
                <StoryCardV2
                  story={story}
                  showProgress={false}
                  showDescription={false}
                  variant="continue"
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <svg 
                  className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
                <p className="text-lg font-medium">No stories found</p>
                <p className="text-sm">Check back later for top-rated stories</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default TopRated