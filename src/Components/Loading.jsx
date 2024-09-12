import React from 'react';
import LoadingIcon from '../assets/load.gif'

function Loading() {
  return (
    <div style={{width: '100%', height:'100vh', zIndex: 20, position: 'fixed', left: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.8)'}} className='d-flex justify-content-center align-items-center'>
        <img src={LoadingIcon} alt='Loading...' style={{maxWidth: '100px', backgroundColor: '#fff', borderRadius: '100px'}} />
    </div>
  )
}

export default Loading