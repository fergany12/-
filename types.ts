// FIX: Expanded DeviceMode to include 'mobile' and 'desktop' to support all device controls.
export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface Device {
  name: DeviceMode;
  width: string;
  height: string;
}
