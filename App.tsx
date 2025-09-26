import React, { useState } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { Loader } from './components/Loader';
import { useScreenshotBlocker } from './hooks/useScreenshotBlocker';
// FIX: Import Controls component and necessary types/constants to make UI interactive.
import { Controls } from './components/Controls';
import type { DeviceMode } from './types';
import { DEFAULT_ZOOM } from './constants';

function App() {
  useScreenshotBlocker();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // FIX: Add state for deviceMode and zoom to be controlled by the Controls component.
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('tablet');
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);

  return (
    // FIX: Changed layout to flex-col to accommodate controls at the bottom.
    <main className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="flex-grow flex items-center justify-center relative w-full p-4 md:p-8">
        {isLoading && <Loader />}
        {/* FIX: Pass dynamic deviceMode and zoom props to DeviceFrame. */}
        <DeviceFrame 
          deviceMode={deviceMode}
          zoom={zoom}
          isLoading={isLoading}
          setIsLoading={setIsLoading} 
        />
      </div>
      {/* FIX: Render the Controls component and pass state handlers. */}
      <Controls 
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        zoom={zoom}
        setZoom={setZoom}
      />
    </main>
  );
}

export default App;