import React from 'react'

const NxtContext = React.createContext({
  savedVideoList: [],
  isDark: false,
  toggleDarkMode: () => {},
  onSavingVideo: () => {},
  onUnSavingVideo: () => {},
})

export default NxtContext
