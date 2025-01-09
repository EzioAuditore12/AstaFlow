import React from 'react';
import { MobileProvider, useMobile } from './MobileContext';
import { MediumDeviceProvider, useMediumDevice } from './MediumDeviceContext';
import { LargeDeviceProvider, useLargeDevice } from './LargeDeviceContext';

export { useMobile, useMediumDevice, useLargeDevice };

export const ResponsiveProvider = ({ children }) => {
  return (
    <MobileProvider>
      <MediumDeviceProvider>
        <LargeDeviceProvider>
          {children}
        </LargeDeviceProvider>
      </MediumDeviceProvider>
    </MobileProvider>
  );
};