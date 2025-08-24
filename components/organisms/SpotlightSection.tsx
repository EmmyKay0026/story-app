'use client'

import React, { useEffect } from 'react'
import DetailsCard from '../molecules/DetailsCard'
import { useStoryStore } from '@/stores/storyStore'

const SpotlightSection = () => {
  const { 
    spotlightStory, 
    isLoading, 
    error, 
    fetchSpotlightStory, 
    clearError 
  } = useStoryStore()

  useEffect(() => {
    fetchSpotlightStory()
  }, [fetchSpotlightStory])

  const handleRetry = () => {
    clearError()
    fetchSpotlightStory()
  }

  // Helper function to get error information and styling
  const getErrorInfo = (error: { error: string; code: number } | null) => {
    if (!error) return null

    const isNetworkError = error.code === 0
    const isNotFound = error.code === 404
    const isServerError = error.code >= 500
    const isClientError = error.code >= 400 && error.code < 500

    return {
      message: error.error,
      code: error.code,
      isNetworkError,
      isNotFound,
      isServerError,
      isClientError,
      // For 404 errors, we want to show a gentler message since no spotlight is normal
      shouldShowAsWarning: isNotFound,
      icon: isNetworkError ? 'network' : isNotFound ? 'info' : isServerError ? 'server' : 'warning'
    }
  }

  const errorInfo = getErrorInfo(error)

  return (
    <section className="flex flex-col px-[1rem] py-[3rem] md:px-[3rem] lg:px-0 justify-center w-[100%] mb-[4rem] items-center bg-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-col text-center text-3xl items-center justify-center md:text-3xl font-bold text-black dark:text-white mb-[2rem]">
        <p className="mb-3">Weekly Spotlight</p>
        <div className="h-1 w-20 mt-[-6] bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
      </div>

      <div className="justify-center w-full lg:w-[60%] border border-prime rounded-xl pb-[-2rem] items-center">
        {/* Enhanced Error State */}
        {errorInfo && (
          <div className={`
            ${errorInfo.shouldShowAsWarning 
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            } 
            border rounded-lg p-6 m-4
          `}>
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Different icons based on error type */}
              {errorInfo.icon === 'network' && (
                <svg 
                  className="w-8 h-8 text-red-400" 
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
              
              {errorInfo.icon === 'info' && (
                <svg 
                  className="w-8 h-8 text-yellow-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              )}
              
              {errorInfo.icon === 'server' && (
                <svg 
                  className="w-8 h-8 text-red-400" 
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
                  className="w-8 h-8 text-red-400" 
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
                <p className={`
                  ${errorInfo.shouldShowAsWarning 
                    ? 'text-yellow-800 dark:text-yellow-200' 
                    : 'text-red-800 dark:text-red-200'
                  } 
                  font-medium mb-2
                `}>
                  {errorInfo.isNotFound 
                    ? 'No Spotlight Story Available' 
                    : 'Unable to load weekly spotlight'
                  }
                </p>
                
                <p className={`
                  ${errorInfo.shouldShowAsWarning 
                    ? 'text-yellow-700 dark:text-yellow-300' 
                    : 'text-red-600 dark:text-red-300'
                  } 
                  text-sm mb-2
                `}>
                  {errorInfo.message}
                </p>

                {/* Show error code for non-404 errors */}
                {!errorInfo.isNotFound && errorInfo.code !== 0 && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-4">
                    Error Code: {errorInfo.code}
                  </p>
                )}

                {/* Show retry button for non-404 errors */}
                {!errorInfo.isNotFound && (
                  <button
                    onClick={handleRetry}
                    className={`
                      ${errorInfo.shouldShowAsWarning
                        ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-700'
                        : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-700'
                      } 
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    `}
                  >
                    {errorInfo.isNetworkError ? 'Retry Connection' : 'Try Again'}
                  </button>
                )}
              </div>

              {/* Additional help text for network errors */}
              {errorInfo.isNetworkError && (
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Please check your internet connection and try again.
                </p>
              )}

              {/* Gentle message for 404 errors */}
              {errorInfo.isNotFound && (
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  Check back later this week for our featured story.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="p-4">
            <div className="animate-pulse">
              <div className="flex space-x-4 p-6 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-24 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  <div className="flex space-x-2 mt-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story Content */}
        {!isLoading && !error && (
          <>
            {spotlightStory ? (
              <DetailsCard story={spotlightStory} />
            ) : (
              <div className="text-center py-12 px-6">
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                    />
                  </svg>
                  <p className="text-lg font-medium">No spotlight story this week</p>
                  <p className="text-sm">Check back next week for our featured story</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default SpotlightSection