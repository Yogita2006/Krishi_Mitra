export interface Weather {
  temperature: number;
  rainChance: number;
  windSpeed: number;
  condition: string;
}

export interface Alert {
  id: string;
  type: 'pest' | 'weather' | 'disease';
  severity: 'high' | 'medium' | 'low';
  titleEn: string;
  titleHi: string;
  icon: string;
}

export interface CropHealth {
  cropNameEn: string;
  cropNameHi: string;
  growthStage: string;
  growthStageHi: string;
  riskLevel: 'safe' | 'warning' | 'danger';
  daysToHarvest: number;
}

export interface Action {
  titleEn: string;
  titleHi: string;
  icon: string;
  details: string;
}

export interface Treatment {
  problemEn: string;
  problemHi: string;
  medicineEn: string;
  medicineHi: string;
  dosage: string;
  safetyDays: number;
  organicOptionEn: string;
  organicOptionHi: string;
}

export const currentWeather: Weather = {
  temperature: 32,
  rainChance: 20,
  windSpeed: 12,
  condition: 'sunny'
};

export const currentAlert: Alert = {
  id: '1',
  type: 'pest',
  severity: 'high',
  titleEn: 'Stem Borer Attack Detected',
  titleHi: 'तना छेदक का हमला',
  icon: 'bug'
};

export const cropHealth: CropHealth = {
  cropNameEn: 'Rice (Paddy)',
  cropNameHi: 'धान',
  growthStage: 'Flowering',
  growthStageHi: 'फूल आना',
  riskLevel: 'warning',
  daysToHarvest: 45
};

export const doActions: Action[] = [
  {
    titleEn: 'Water in Evening',
    titleHi: 'शाम को पानी',
    icon: 'droplet',
    details: '1 inch water'
  },
  {
    titleEn: 'Spray Medicine',
    titleHi: 'दवा छिड़काव',
    icon: 'spray-can',
    details: 'See below'
  }
];

export const avoidActions: Action[] = [
  {
    titleEn: 'No Fertilizer',
    titleHi: 'खाद मत डालें',
    icon: 'flask-conical',
    details: 'Wait 7 days'
  },
  {
    titleEn: 'No Plowing',
    titleHi: 'जुताई नहीं',
    icon: 'tractor',
    details: 'Field too wet'
  }
];

export const currentTreatment: Treatment = {
  problemEn: 'Stem Borer (Yellow Worm)',
  problemHi: 'तना छेदक (पीला कीड़ा)',
  medicineEn: 'Chlorpyrifos 20% EC',
  medicineHi: 'क्लोरपाइरिफॉस',
  dosage: '2.5 ml per liter water (50 ml per 15L tank)',
  safetyDays: 20,
  organicOptionEn: 'Neem Oil + Garlic Extract',
  organicOptionHi: 'नीम तेल + लहसुन'
};
