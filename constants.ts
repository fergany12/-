import type { DeviceMode, Device } from './types';

export const TARGET_URL = 'https://fergany.netlify.app/';

// FIX: Added 'mobile' and 'desktop' configurations to match the updated DeviceMode type.
export const DEVICES: Record<DeviceMode, Device> = {
  mobile: {
    name: 'mobile',
    width: '390px',
    height: '844px',
  },
  tablet: {
    name: 'tablet',
    width: '820px',
    height: '1180px',
  },
  desktop: {
    name: 'desktop',
    width: '1440px',
    height: '900px',
  },
};

// FIX: Added missing zoom constants required by the Controls component.
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 2;
export const ZOOM_STEP = 0.05;
export const DEFAULT_ZOOM = 1;
