"use client"
import React, { useState } from 'react'

const Footer = () => {
  const [name, setName] = useState("");
  return (
    <footer className="bg-gray-900 text-gray-500 py-12 px-8">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">Logo</h4>
            <p className="text-gray-500 mb-4">Discover stories that stay with you long after the last page.</p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#45B649] hover:text-white transition-colors duration-300">F</a>
                <a href="#" className="w-10 h-10 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#45B649] hover:text-white transition-colors duration-300">T</a>
                <a href="#" className="w-10 h-10 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#45B649] hover:text-white transition-colors duration-300">P</a>
                <a href="#" className="w-10 h-10 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#45B649] hover:text-white transition-colors duration-300">W</a>
            </div>
          </div>
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">My Reads</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Favourites</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#45B649] text-lg font-semibold mb-4">Genres</h4>
            <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Romance</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Thriller</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Sci-Fi</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#45B649] transition-colors duration-300">Mystery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#45B649] w-auto text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-500 mb-4">Subscribe to our newsletter for new releases and exclusive content.</p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Your Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 px-4 bg-gray-700 text-white rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-[#45B649]"
              />
              <button className="bg-gradient-to-r from-[#45B649] to-[#38a03c] text-white py-2 px-4 rounded-r-md font-semibold hover:from-[#3a9b3d] hover:to-[#2e8b31] transition-colors duration-300">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 StoryVerse. All rights reserved. Created by Amplity.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
