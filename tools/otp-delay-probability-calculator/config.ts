
export const CONFIG = {
  options: [
    { 
      id: 'carrier', 
      label: 'Mobile Operator Type', 
      type: 'select', 
      values: ['Private (Jio/Airtel/Vi)', 'Government (BSNL/MTNL)', 'International Roaming'], 
      default: 'Private (Jio/Airtel/Vi)' 
    },
    { 
      id: 'signal', 
      label: 'Signal Bars (Current)', 
      type: 'slider', 
      min: 1, 
      max: 5, 
      default: 4 
    }
  ]
};
