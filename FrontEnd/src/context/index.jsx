import React from 'react';
import { MobileProvider, useMobile } from './MobileContext';
import { MediumDeviceProvider, useMediumDevice } from './MediumDeviceContext';
import { LargeDeviceProvider, useLargeDevice } from './LargeDeviceContext';
import { ExtraLargeDeviceProvider,useExtraLargeDevice } from './ExtraLargeDeviceContext';
export { useMobile, useMediumDevice, useLargeDevice };

export const ResponsiveProvider = ({ children }) => {
  return (
    <MobileProvider>
      <MediumDeviceProvider>
        <LargeDeviceProvider>
        <ExtraLargeDeviceProvider>
          {children}
        </ExtraLargeDeviceProvider>
        </LargeDeviceProvider>
      </MediumDeviceProvider>
    </MobileProvider>
  );
};