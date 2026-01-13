import { ProductDetail, PlannerProduct, Background } from './types';

export const PRODUCTS: ProductDetail[] = [
  {
    id: 'nest-hub',
    name: 'Nest Hub (2세대)',
    description: '당신의 일상을 돕는 스마트 디스플레이.',
    fullDescription: '7인치 스마트 디스플레이로 음악 감상, 영상 통화, 스마트홈 제어, 수면 모니터링까지. Google 어시스턴트가 내장되어 음성으로 모든 것을 제어하세요.',
    imageUrl: 'https://lh3.googleusercontent.com/5ANvpqZMFYNlHcR7Qwc3FkLmN0JVqTlHxVZHRxvGv4EKxqy5TrF1qF4tZ8wI0yVfqQ',
    category: 'hub',
    price: 129000,
    features: [
      '7인치 터치스크린 디스플레이',
      'Google 어시스턴트 내장',
      '수면 센서로 수면 패턴 분석',
      '스마트홈 기기 중앙 제어',
      '사진 프레임 모드',
      'YouTube, Netflix 스트리밍'
    ],
    specs: {
      '디스플레이': '7인치 LCD 터치스크린',
      '스피커': '43.5mm 풀레인지 스피커',
      '마이크': '3개 far-field 마이크',
      '연결': 'Wi-Fi 802.11 b/g/n/ac, Bluetooth 5.0',
      '크기': '177.4 x 120.4 x 69.5mm',
      '무게': '558g'
    },
    officialUrl: 'https://store.google.com/product/nest_hub_2nd_gen'
  },
  {
    id: 'nest-audio',
    name: 'Nest Audio',
    description: '공간을 가득 채우는 풍부한 사운드.',
    fullDescription: '강력한 베이스와 선명한 고음을 제공하는 스마트 스피커. 방 어디에서든 풍부한 사운드를 경험하고, 음성으로 음악을 제어하세요.',
    imageUrl: 'https://lh3.googleusercontent.com/5ANvpqZMFYNlHcR7Qwc3FkLmN0JVqTlHxVZHRxvGv4EKxqy5TrF1qF4tZ8wI0yVfqQ',
    category: 'audio',
    price: 109000,
    features: [
      '75mm 우퍼 + 19mm 트위터',
      'Media EQ로 자동 음질 최적화',
      'Ambient IQ로 주변 소음 보정',
      '멀티룸 오디오 지원',
      'Google 어시스턴트 내장',
      'Spotify, YouTube Music 연동'
    ],
    specs: {
      '우퍼': '75mm',
      '트위터': '19mm',
      '마이크': '3개 far-field 마이크',
      '연결': 'Wi-Fi 802.11 b/g/n/ac, Bluetooth 5.0',
      '크기': '175 x 124 x 78mm',
      '무게': '1.2kg'
    },
    officialUrl: 'https://store.google.com/product/nest_audio'
  },
  {
    id: 'nest-cam',
    name: 'Nest Cam (배터리)',
    description: '집안의 안전을 위한 스마트 보안 카메라.',
    fullDescription: '실내외 어디서든 사용 가능한 무선 보안 카메라. 사람, 동물, 차량을 구분하는 AI 감지 기능과 HDR 영상으로 선명한 화질을 제공합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/5ANvpqZMFYNlHcR7Qwc3FkLmN0JVqTlHxVZHRxvGv4EKxqy5TrF1qF4tZ8wI0yVfqQ',
    category: 'security',
    price: 229000,
    features: [
      '1080p HDR 영상',
      'AI 기반 사람/동물/차량 감지',
      '무선 배터리 (최대 7개월)',
      '실내외 겸용 (IP54)',
      '양방향 오디오',
      '야간 투시 기능'
    ],
    specs: {
      '해상도': '1080p HDR',
      '화각': '130° 대각선',
      '배터리': '6Ah 리튬이온 (최대 7개월)',
      '방수': 'IP54',
      '연결': 'Wi-Fi 802.11 b/g/n, Bluetooth LE',
      '크기': '83 x 83 x 83mm'
    },
    officialUrl: 'https://store.google.com/product/nest_cam_battery'
  },
  {
    id: 'nest-thermostat',
    name: 'Nest Thermostat',
    description: '에너지 절약의 시작, 지능형 온도 조절기.',
    fullDescription: '학습형 온도 조절기로 에너지를 절약하세요. 생활 패턴을 학습하고 자동으로 최적의 온도를 유지합니다.',
    imageUrl: 'https://lh3.googleusercontent.com/5ANvpqZMFYNlHcR7Qwc3FkLmN0JVqTlHxVZHRxvGv4EKxqy5TrF1qF4tZ8wI0yVfqQ',
    category: 'control',
    price: 179000,
    features: [
      '생활 패턴 자동 학습',
      '에너지 사용량 리포트',
      '원격 온도 제어',
      'Google 어시스턴트 연동',
      '절약 모드 자동 전환',
      'HVAC 시스템 호환'
    ],
    specs: {
      '디스플레이': '2.08인치 컬러 LCD',
      '센서': '온도, 습도, 근접, 주변광',
      '연결': 'Wi-Fi 802.11 b/g/n, Bluetooth LE',
      '호환': '대부분의 24V HVAC 시스템',
      '크기': '직경 97mm x 깊이 28mm',
      '무게': '200g'
    },
    officialUrl: 'https://store.google.com/product/nest_thermostat'
  }
];

export const PRODUCT_CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'hub', name: '스마트 디스플레이' },
  { id: 'audio', name: '스마트 스피커' },
  { id: 'security', name: '보안 카메라' },
  { id: 'control', name: '온도 조절' }
];

export const ZONE_DETAILS: Record<string, { temp: number; device: string; status: string; imageUrl: string }> = {
  living: {
    temp: 24,
    device: 'Nest Hub Max',
    status: '음악 재생 중',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
  },
  bedroom: {
    temp: 22,
    device: 'Nest Audio',
    status: '취침 모드',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400'
  },
  kitchen: {
    temp: 23,
    device: 'Nest Thermostat',
    status: '에너지 절약',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
  },
  kids: {
    temp: 25,
    device: 'Nest Cam',
    status: '모니터링 On',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400'
  }
};

export const ESTIMATOR_PRICING = {
  basePrice: 250000,
  roomMultiplier: 120000,
  options: {
    lighting: { name: '지능형 조명 제어', price: 80000 },
    heating: { name: '각방 난방 제어', price: 150000 },
    voice: { name: '전 구역 음성 인식', price: 190000 },
    security: { name: '통합 보안 모니터링', price: 220000 }
  }
};

// Room Planner Constants
export const PLANNER_PRODUCTS: PlannerProduct[] = [
  {
    id: 'nest-hub-max',
    name: 'Nest Hub Max',
    nameKo: '네스트 허브 맥스',
    image: '/assets/room-planner/products/nest-hub-max.svg',
    width: 180,
    height: 130,
    price: 299000,
    category: 'display'
  },
  {
    id: 'nest-hub-2nd',
    name: 'Nest Hub (2nd Gen)',
    nameKo: '네스트 허브 2세대',
    image: '/assets/room-planner/products/nest-hub-2nd.svg',
    width: 150,
    height: 110,
    price: 129000,
    category: 'display'
  },
  {
    id: 'nest-audio',
    name: 'Nest Audio',
    nameKo: '네스트 오디오',
    image: '/assets/room-planner/products/nest-audio.svg',
    width: 100,
    height: 150,
    price: 109000,
    category: 'audio'
  },
  {
    id: 'nest-mini',
    name: 'Nest Mini',
    nameKo: '네스트 미니',
    image: '/assets/room-planner/products/nest-mini.svg',
    width: 80,
    height: 80,
    price: 59000,
    category: 'audio'
  },
  {
    id: 'nest-cam',
    name: 'Nest Cam',
    nameKo: '네스트 캠',
    image: '/assets/room-planner/products/nest-cam.svg',
    width: 80,
    height: 120,
    price: 229000,
    category: 'security'
  },
  {
    id: 'nest-doorbell',
    name: 'Nest Doorbell',
    nameKo: '네스트 도어벨',
    image: '/assets/room-planner/products/nest-doorbell.svg',
    width: 60,
    height: 140,
    price: 249000,
    category: 'security'
  },
  {
    id: 'nest-thermostat',
    name: 'Nest Thermostat',
    nameKo: '네스트 온도조절기',
    image: '/assets/room-planner/products/nest-thermostat.svg',
    width: 100,
    height: 100,
    price: 179000,
    category: 'climate'
  }
];

export const DEFAULT_BACKGROUNDS: Background[] = [
  {
    id: 'living-modern',
    name: '모던 거실',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=900&fit=crop'
  },
  {
    id: 'bedroom-cozy',
    name: '아늑한 침실',
    thumbnail: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&h=150&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=900&fit=crop'
  },
  {
    id: 'kitchen-bright',
    name: '밝은 주방',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=900&fit=crop'
  },
  {
    id: 'office-minimal',
    name: '미니멀 홈오피스',
    thumbnail: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=200&h=150&fit=crop',
    fullImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&h=900&fit=crop'
  }
];

export const CANVAS_CONFIG = {
  width: 800,
  height: 600,
  minScale: 0.3,
  maxScale: 2.0,
  scaleStep: 0.1
};

export const PLANNER_CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'display', name: '디스플레이' },
  { id: 'audio', name: '오디오' },
  { id: 'security', name: '보안' },
  { id: 'climate', name: '온도 제어' }
];
