import React from 'react';
import { DEVICES, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP, DEFAULT_ZOOM } from '../constants';
import type { DeviceMode } from '../types';
import { MobileIcon, TabletIcon, DesktopIcon, PlusIcon, MinusIcon, RefreshIcon } from './Icons';

interface ControlsProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  zoom: number;
  // FIX: Corrected the type for setZoom to allow functional updates, resolving the error where a function was passed to a prop expecting a number.
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const ControlButton: React.FC<{ onClick: () => void; isActive: boolean; children: React.ReactNode; 'aria-label': string; title: string }> = ({ onClick, isActive, children, 'aria-label': ariaLabel, title }) => {
  const baseClasses = "p-2.5 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform active:scale-95";
  const activeClasses = "bg-indigo-600 text-white";
  const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`} aria-label={ariaLabel} title={title}>
      {children}
    </button>
  );
};

export const Controls: React.FC<ControlsProps> = ({ deviceMode, setDeviceMode, zoom, setZoom }) => {
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  };

  const incrementZoom = () => setZoom(prev => Math.min(MAX_ZOOM, prev + ZOOM_STEP));
  const decrementZoom = () => setZoom(prev => Math.max(MIN_ZOOM, prev - ZOOM_STEP));

  return (
    <div className="w-full flex justify-center p-2 sm:p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-gray-800 p-2 md:p-3 rounded-xl shadow-lg">
        {/* Device Toggles */}
        <div className="flex items-center gap-2 bg-gray-700/50 p-1 rounded-lg">
            {(Object.keys(DEVICES) as DeviceMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setDeviceMode(mode)}
                className={`p-2.5 rounded-md transition-colors duration-200 ease-in-out flex items-center transform active:scale-95 ${
                  deviceMode === mode ? 'bg-indigo-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'
                }`}
                title={`Switch to ${mode} view`}
              >
                {mode === 'mobile' && <MobileIcon className="h-5 w-5" />}
                {mode === 'tablet' && <TabletIcon className="h-5 w-5" />}
                {mode === 'desktop' && <DesktopIcon className="h-5 w-5" />}
              </button>
            ))}
            <div className="w-px h-6 bg-gray-600 mx-1" aria-hidden="true"></div>
            <div className="w-20 text-center">
              <span className="text-sm font-medium text-gray-300 capitalize">{deviceMode}</span>
            </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ControlButton onClick={decrementZoom} isActive={false} aria-label="Zoom Out" title="Zoom Out"><MinusIcon className="h-5 w-5" /></ControlButton>
          <div className="flex items-center gap-2 sm:gap-3 w-48">
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={ZOOM_STEP}
              value={zoom}
              onChange={handleZoomChange}
              aria-label="Zoom slider"
            />
            <div className="w-20 text-center bg-gray-900/50 border border-gray-600 rounded-md py-1.5">
              <span className="text-sm font-mono text-cyan-300 tracking-wider">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
          <ControlButton onClick={incrementZoom} isActive={false} aria-label="Zoom In" title="Zoom In"><PlusIcon className="h-5 w-5" /></ControlButton>
           <ControlButton onClick={() => setZoom(DEFAULT_ZOOM)} isActive={false} aria-label="Reset Zoom" title="Reset Zoom"><RefreshIcon className="h-5 w-5" /></ControlButton>
        </div>
      </div>
    </div>
  );
};