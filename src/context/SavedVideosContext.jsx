import React from 'react'

const SavedVideosContext = React.createContext({
  saveVideosData: [],
  addVideos: () => {},
  removeVideos: () => {},
})

export default SavedVideosContext
