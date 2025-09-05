import React from 'react'
import { StoryCardSkeleton } from './LibrarySkeletons'
import { ButtonNew } from '../atoms/Button'

const HomeSkeleton= () => {
  return( 
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="w-full p-4">
          <StoryCardSkeleton variant="compact_v2" />
        </div>
        ))
      }
    </>
  )
}
export default HomeSkeleton



export const SpotlightSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="bg-gray-200 dark:bg-gray-700 h-[300] "/>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between mb-4">

            {/* <div className="space-y-2 mb-3">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div> */}
            <div className="flex-1">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            </div>
            {/* <button
              onClick={() => toggleBookmark(story.id)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                isBookmark ? "Remove from bookmark" : "Add to bookmark"
              }
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isBookmark
                    ? "fill-shaft text-shaft dark:text-white dark:fill-white"
                    : "text-gray-400"
                }`}
              />
            </button> */}
          </div>

          <div className="bg-gray-700 h-5 dark:bg-gray-700 mb-6 leading-relaxed line-clamp-4"/>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"/>
              
            <div className="text-center p-3 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"/>
            <div className="text-center p-3 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"/>
              
          </div>

          <div className="flex gap-2 mb-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}


