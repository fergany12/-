import React from 'react';
import { TARGET_URL, DEVICES } from '../constants';
// FIX: Import DeviceMode to use it as a prop type.
import type { DeviceMode } from '../types';

interface DeviceFrameProps {
  // FIX: Add deviceMode to props to allow dynamic device switching.
  deviceMode: DeviceMode;
  zoom: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ deviceMode, zoom, isLoading, setIsLoading }) => {
  // FIX: Use the deviceMode prop to dynamically select the device configuration instead of hardcoding 'tablet'.
  const device = DEVICES[deviceMode];

  // FIX: Replace hardcoded classes with dynamic styles based on the deviceMode for a responsive frame.
  const frameClass = {
    mobile: 'rounded-[3.5rem] p-3.5',
    tablet: 'rounded-[2.5rem] p-3',
    desktop: 'rounded-xl p-2',
  }[deviceMode];
  
  const screenClass = {
    mobile: 'rounded-[2.8rem]',
    tablet: 'rounded-[1.8rem]',
    desktop: 'rounded-lg',
  }[deviceMode];

  return (
    <div
      className="transition-transform duration-300 ease-in-out"
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      <div
        className={`relative bg-gray-800 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 ease-in-out ${frameClass} ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        style={{
          width: device.width,
          height: device.height,
        }}
      >
        <div
          className={`relative w-full h-full bg-black overflow-hidden ${screenClass}`}
        >
          {/* FIX: Add a visual notch for the mobile view to improve device realism. */}
          {deviceMode === 'mobile' && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-gray-800 rounded-b-xl z-10" />
          )}
          <iframe
            src={TARGET_URL}
            title="Web Content"
            onLoad={() => setIsLoading(false)}
            className={`border-0 transition-opacity duration-700 ease-in-out delay-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{
              width: '100%',
              height: '100%',
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};