import React from 'react'

const LoadSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  )
}

export default LoadSpinner