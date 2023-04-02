import React from 'react'
import SVG from 'react-inlinesvg';

const Loading = () => {
  return (
    // <div className="loading loading-overlay">
    <div>
    <SVG src={process.env.PUBLIC_URL + '/static/assets/svg/spin.svg'}  width={72} height={72} className="circular" />
    <div>Loading...</div>
  </div>
  )
}

export default Loading