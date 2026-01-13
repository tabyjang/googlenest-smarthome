# Virtual Room Planner (가상 배치해 보기) - 상세 실행 체크리스트

**작성일:** 2026-01-14
**예상 작업량:** 중규모 (컴포넌트 5-7개)
**핵심 목표:** 고객이 자신의 방 사진에 Google Nest 제품을 드래그하여 배치해보고, 해당 구성으로 견적을 요청할 수 있는 인터랙티브 체험 기능 구현

---

## Phase 0: 사전 준비 (Prerequisites)

### 0.1 의존성 설치
- [ ] `react-draggable` 라이브러리 설치
  ```bash
  npm install react-draggable
  npm install @types/react-draggable --save-dev
  ```
- [ ] `html-to-image` 라이브러리 설치 (배치 결과 스크린샷 저장용)
  ```bash
  npm install html-to-image
  ```

### 0.2 에셋 준비
- [ ] **제품 누끼 이미지 (PNG, 투명 배경)** 수집/제작
  - [ ] `nest-hub-max.png` (약 200x150px)
  - [ ] `nest-hub-2nd.png` (약 150x120px)
  - [ ] `nest-audio.png` (약 100x150px)
  - [ ] `nest-mini.png` (약 80x80px)
  - [ ] `nest-cam.png` (약 80x120px)
  - [ ] `nest-thermostat.png` (약 100x100px)
  - [ ] `nest-doorbell.png` (약 60x150px)
- [ ] **기본 배경 이미지** 준비
  - [ ] `room-living.jpg` (모던 거실)
  - [ ] `room-bedroom.jpg` (침실)
  - [ ] `room-kitchen.jpg` (주방)
  - [ ] `room-office.jpg` (홈오피스)
- [ ] 에셋 폴더 구조 생성
  ```
  public/
  └── assets/
      └── room-planner/
          ├── products/
          │   ├── nest-hub-max.png
          │   ├── nest-audio.png
          │   └── ...
          └── backgrounds/
              ├── room-living.jpg
              ├── room-bedroom.jpg
              └── ...
  ```

### 0.3 파일 구조 설계
- [ ] 컴포넌트 폴더 생성
  ```
  src/
  └── components/
      └── room-planner/
          ├── RoomPlanner.tsx          # 메인 컨테이너
          ├── PlannerCanvas.tsx        # 배경 + 드래그 영역
          ├── ProductDock.tsx          # 하단 제품 목록
          ├── DraggableProduct.tsx     # 드래그 가능한 제품 아이템
          ├── BackgroundSelector.tsx   # 배경 선택/업로드
          ├── PlacedProductsList.tsx   # 배치된 제품 목록
          └── PlannerActions.tsx       # 액션 버튼 (초기화, 견적, 저장)
  ```

---

## Phase 1: 타입 정의 및 상수 설정

### 1.1 타입 정의 파일 생성
- [ ] `types/roomPlanner.ts` 파일 생성
  ```typescript
  // 제품 타입
  export interface PlannerProduct {
    id: string;
    name: string;
    nameKo: string;
    image: string;
    width: number;      // 캔버스에서의 기본 너비 (px)
    height: number;     // 캔버스에서의 기본 높이 (px)
    price: number;
    category: 'display' | 'audio' | 'security' | 'climate';
  }

  // 배치된 제품 타입
  export interface PlacedProduct {
    instanceId: string;   // 고유 인스턴스 ID (같은 제품 여러 개 배치 가능)
    productId: string;    // 원본 제품 ID
    x: number;            // 캔버스 내 X 좌표
    y: number;            // 캔버스 내 Y 좌표
    scale: number;        // 크기 배율 (0.5 ~ 2.0)
    zIndex: number;       // 레이어 순서
  }

  // 배경 타입
  export interface Background {
    id: string;
    name: string;
    thumbnail: string;
    fullImage: string;
    isCustom?: boolean;   // 사용자 업로드 여부
  }

  // Room Planner 전체 상태
  export interface RoomPlannerState {
    selectedBackground: Background | null;
    placedProducts: PlacedProduct[];
    selectedProductInstance: string | null;  // 현재 선택된 배치 제품
  }
  ```

### 1.2 상수 정의 파일 생성
- [ ] `constants/roomPlannerData.ts` 파일 생성
  ```typescript
  import { PlannerProduct, Background } from '../types/roomPlanner';

  export const PLANNER_PRODUCTS: PlannerProduct[] = [
    {
      id: 'nest-hub-max',
      name: 'Nest Hub Max',
      nameKo: '네스트 허브 맥스',
      image: '/assets/room-planner/products/nest-hub-max.png',
      width: 180,
      height: 130,
      price: 299000,
      category: 'display'
    },
    // ... 나머지 제품들
  ];

  export const DEFAULT_BACKGROUNDS: Background[] = [
    {
      id: 'living-modern',
      name: '모던 거실',
      thumbnail: '/assets/room-planner/backgrounds/room-living-thumb.jpg',
      fullImage: '/assets/room-planner/backgrounds/room-living.jpg'
    },
    // ... 나머지 배경들
  ];

  export const CANVAS_CONFIG = {
    width: 800,
    height: 600,
    minScale: 0.3,
    maxScale: 2.0,
    scaleStep: 0.1
  };
  ```

---

## Phase 2: 핵심 컴포넌트 개발

### 2.1 메인 컨테이너 (RoomPlanner.tsx)
- [ ] 컴포넌트 기본 구조 작성
  ```typescript
  // 상태 관리
  const [background, setBackground] = useState<Background | null>(null);
  const [placedProducts, setPlacedProducts] = useState<PlacedProduct[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  ```
- [ ] 레이아웃 구조 구현 (상단: 캔버스 / 하단: 제품 독)
- [ ] 배경 선택 모달 트리거 구현
- [ ] 전체 상태를 자식 컴포넌트에 props로 전달

### 2.2 캔버스 영역 (PlannerCanvas.tsx)
- [ ] 캔버스 컨테이너 스타일링
  - [ ] 고정 비율 유지 (4:3 또는 16:9)
  - [ ] 반응형 처리 (모바일에서 축소)
  - [ ] 배경 이미지 `object-fit: cover` 적용
- [ ] 배경 미선택 시 안내 UI 표시
  - [ ] "배경을 선택하거나 내 방 사진을 업로드하세요" 문구
  - [ ] 업로드 버튼 / 기본 배경 선택 버튼
- [ ] 드롭 영역 설정
  - [ ] `onDrop` 이벤트로 제품 독에서 드래그된 제품 받기
  - [ ] 드롭 위치 좌표 계산 및 `placedProducts`에 추가
- [ ] 배치된 제품들 렌더링
  - [ ] `placedProducts.map()`으로 `DraggableProduct` 렌더링
  - [ ] `zIndex` 순서대로 레이어링

### 2.3 드래그 가능 제품 (DraggableProduct.tsx)
- [ ] `react-draggable` 래핑
  ```typescript
  import Draggable from 'react-draggable';

  <Draggable
    position={{ x: product.x, y: product.y }}
    onStop={handleDragStop}
    bounds="parent"
  >
    <div>...</div>
  </Draggable>
  ```
- [ ] 제품 이미지 렌더링
  - [ ] `scale` 값에 따른 크기 조절
  - [ ] 선택 시 하이라이트 테두리 (골드 컬러)
- [ ] 클릭 이벤트로 선택 상태 토글
- [ ] 선택된 제품에 컨트롤 UI 표시
  - [ ] 크기 조절 버튼 (+/-)
  - [ ] 삭제 버튼 (X)
  - [ ] 레이어 순서 버튼 (앞으로/뒤로)
- [ ] 드래그 종료 시 좌표 업데이트 콜백

### 2.4 제품 독 (ProductDock.tsx)
- [ ] 가로 스크롤 가능한 제품 목록 UI
- [ ] 카테고리별 필터 탭 (전체/디스플레이/오디오/보안/온도)
- [ ] 각 제품 아이템 렌더링
  - [ ] 썸네일 이미지
  - [ ] 제품명 (한글)
  - [ ] 가격
- [ ] 드래그 시작 이벤트 처리
  - [ ] `draggable="true"` 속성
  - [ ] `onDragStart`에서 제품 ID 전달
- [ ] 제품 클릭 시 캔버스 중앙에 자동 배치 옵션

### 2.5 배경 선택기 (BackgroundSelector.tsx)
- [ ] 모달/사이드패널 형태로 구현
- [ ] 기본 제공 배경 그리드 표시
  - [ ] 썸네일 클릭 시 선택
  - [ ] 선택된 배경 체크 표시
- [ ] 사용자 이미지 업로드 기능
  ```typescript
  <input
    type="file"
    accept="image/*"
    onChange={handleFileUpload}
  />
  ```
- [ ] 업로드된 이미지 처리
  - [ ] `FileReader`로 Base64 변환
  - [ ] 이미지 크기 검증 (최소 800x600)
  - [ ] 로컬 스토리지 또는 상태에 저장
- [ ] 업로드 미리보기 표시

### 2.6 배치된 제품 목록 (PlacedProductsList.tsx)
- [ ] 사이드바 또는 하단 패널로 배치
- [ ] 배치된 제품 리스트 표시
  - [ ] 제품명
  - [ ] 개별 가격
  - [ ] 삭제 버튼
- [ ] 총 합계 금액 계산 및 표시
- [ ] "모두 삭제" 버튼
- [ ] 빈 상태 UI ("아직 배치된 제품이 없습니다")

### 2.7 액션 버튼 영역 (PlannerActions.tsx)
- [ ] **초기화 버튼**
  - [ ] 확인 다이얼로그 후 모든 배치 제품 삭제
- [ ] **이미지로 저장 버튼**
  - [ ] `html-to-image` 라이브러리로 캔버스 캡처
  - [ ] PNG 파일로 다운로드
  ```typescript
  import { toPng } from 'html-to-image';

  const handleSaveImage = async () => {
    const canvas = document.getElementById('planner-canvas');
    const dataUrl = await toPng(canvas);
    // 다운로드 트리거
  };
  ```
- [ ] **견적 요청 버튼**
  - [ ] 배치된 제품 목록을 Estimator 페이지로 전달
  - [ ] 또는 견적 모달 직접 오픈

---

## Phase 3: 상태 관리 및 비즈니스 로직

### 3.1 제품 배치 로직
- [ ] `addProductToCanvas` 함수 구현
  ```typescript
  const addProductToCanvas = (productId: string, x?: number, y?: number) => {
    const product = PLANNER_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const newPlacedProduct: PlacedProduct = {
      instanceId: `${productId}-${Date.now()}`,
      productId,
      x: x ?? CANVAS_CONFIG.width / 2 - product.width / 2,
      y: y ?? CANVAS_CONFIG.height / 2 - product.height / 2,
      scale: 1,
      zIndex: placedProducts.length + 1
    };

    setPlacedProducts(prev => [...prev, newPlacedProduct]);
  };
  ```

### 3.2 제품 위치 업데이트 로직
- [ ] `updateProductPosition` 함수 구현
  ```typescript
  const updateProductPosition = (instanceId: string, x: number, y: number) => {
    setPlacedProducts(prev =>
      prev.map(p => p.instanceId === instanceId ? { ...p, x, y } : p)
    );
  };
  ```

### 3.3 제품 크기 조절 로직
- [ ] `updateProductScale` 함수 구현
  ```typescript
  const updateProductScale = (instanceId: string, delta: number) => {
    setPlacedProducts(prev =>
      prev.map(p => {
        if (p.instanceId !== instanceId) return p;
        const newScale = Math.max(
          CANVAS_CONFIG.minScale,
          Math.min(CANVAS_CONFIG.maxScale, p.scale + delta)
        );
        return { ...p, scale: newScale };
      })
    );
  };
  ```

### 3.4 레이어 순서 변경 로직
- [ ] `bringToFront` 함수 구현
- [ ] `sendToBack` 함수 구현
- [ ] `moveLayerUp` / `moveLayerDown` 함수 구현

### 3.5 제품 삭제 로직
- [ ] `removeProduct` 함수 구현
  ```typescript
  const removeProduct = (instanceId: string) => {
    setPlacedProducts(prev =>
      prev.filter(p => p.instanceId !== instanceId)
    );
    if (selectedInstance === instanceId) {
      setSelectedInstance(null);
    }
  };
  ```

### 3.6 견적 연동 로직
- [ ] `getQuoteFromPlacement` 함수 구현
  ```typescript
  const getQuoteFromPlacement = () => {
    const productCounts = placedProducts.reduce((acc, placed) => {
      acc[placed.productId] = (acc[placed.productId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const items = Object.entries(productCounts).map(([productId, count]) => {
      const product = PLANNER_PRODUCTS.find(p => p.id === productId);
      return {
        productId,
        name: product?.nameKo,
        quantity: count,
        unitPrice: product?.price,
        totalPrice: (product?.price || 0) * count
      };
    });

    return {
      items,
      grandTotal: items.reduce((sum, item) => sum + item.totalPrice, 0)
    };
  };
  ```

---

## Phase 4: UI/UX 스타일링

### 4.1 전체 레이아웃 스타일
- [ ] 럭셔리 디자인 시스템 적용
  - [ ] 크림 배경 (`bg-cream-100`)
  - [ ] 골드 악센트 (`border-gold-400`, `text-gold-500`)
  - [ ] 부드러운 그림자 (`shadow-luxury`)
- [ ] 반응형 브레이크포인트 설정
  - [ ] Desktop: 캔버스 800x600, 제품독 하단
  - [ ] Tablet: 캔버스 600x450, 제품독 하단
  - [ ] Mobile: 캔버스 full-width, 제품독 하단 슬라이드업

### 4.2 캔버스 영역 스타일
- [ ] 테두리: `border-2 border-cream-300 rounded-2xl`
- [ ] 그림자: `shadow-luxury-lg`
- [ ] 빈 상태: 점선 테두리 + 중앙 아이콘

### 4.3 제품 독 스타일
- [ ] 배경: `bg-white rounded-2xl`
- [ ] 스크롤바: 커스텀 골드 스타일
- [ ] 제품 카드: 호버 시 `scale-105` + 골드 테두리

### 4.4 드래그 제품 스타일
- [ ] 선택 시: `ring-2 ring-gold-400 ring-offset-2`
- [ ] 드래그 중: `opacity-80 cursor-grabbing`
- [ ] 컨트롤 버튼: 작은 원형 버튼 그룹

### 4.5 애니메이션 적용
- [ ] 제품 배치 시: `framer-motion` scale 애니메이션
- [ ] 제품 삭제 시: fade-out 애니메이션
- [ ] 배경 변경 시: crossfade 전환
- [ ] 모달 오픈/클로즈: slide-up 애니메이션

---

## Phase 5: 페이지 통합 및 라우팅

### 5.1 새 페이지 생성
- [ ] `pages/ExperiencePage.tsx` 파일 생성
- [ ] Room Planner를 메인 컨텐츠로 배치
- [ ] 페이지 헤더/설명 텍스트 추가
  - [ ] "나만의 스마트홈 배치해보기"
  - [ ] "제품을 드래그하여 원하는 위치에 배치하세요"

### 5.2 라우터 등록
- [ ] `App.tsx`에 새 라우트 추가
  ```typescript
  <Route path="/experience" element={<Layout><ExperiencePage /></Layout>} />
  ```

### 5.3 네비게이션 연결
- [ ] 상단 네비게이션에 "체험하기" 메뉴 추가
- [ ] 홈페이지 CTA 버튼에 링크 연결
- [ ] 제품 상세 페이지에서 "배치해보기" 버튼 추가

---

## Phase 6: 고급 기능 (Optional Enhancements)

### 6.1 로컬 스토리지 저장
- [ ] 배치 상태 자동 저장 (5초마다 또는 변경 시)
- [ ] 페이지 재방문 시 이전 배치 복원
- [ ] "저장된 배치 불러오기" 기능

### 6.2 배치 템플릿
- [ ] 미리 구성된 추천 배치 제공
  - [ ] "1인 가구 추천 세트"
  - [ ] "패밀리 홈 추천 세트"
  - [ ] "홈오피스 추천 세트"
- [ ] 템플릿 선택 시 자동 배치

### 6.3 제품 회전 기능
- [ ] 90도 단위 회전 버튼
- [ ] 또는 자유 회전 (드래그로 각도 조절)

### 6.4 그리드 스냅 기능
- [ ] 토글 가능한 그리드 오버레이
- [ ] 드래그 시 그리드에 스냅

### 6.5 다중 선택 기능
- [ ] Shift+클릭으로 여러 제품 선택
- [ ] 선택된 제품들 일괄 이동/삭제

### 6.6 공유 기능
- [ ] 배치 결과 이미지 SNS 공유
- [ ] 고유 URL 생성하여 링크 공유

---

## Phase 7: 테스트 및 QA

### 7.1 기능 테스트
- [ ] 배경 선택/업로드 정상 동작
- [ ] 제품 드래그 앤 드롭 정상 동작
- [ ] 제품 크기 조절 정상 동작
- [ ] 제품 삭제 정상 동작
- [ ] 레이어 순서 변경 정상 동작
- [ ] 견적 연동 정상 동작
- [ ] 이미지 저장 정상 동작

### 7.2 반응형 테스트
- [ ] Desktop (1920px, 1440px, 1280px)
- [ ] Tablet (1024px, 768px)
- [ ] Mobile (430px, 375px, 320px)

### 7.3 브라우저 호환성 테스트
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### 7.4 성능 테스트
- [ ] 대용량 이미지 업로드 시 성능
- [ ] 제품 20개 이상 배치 시 드래그 성능
- [ ] 메모리 누수 확인

### 7.5 접근성 테스트
- [ ] 키보드 네비게이션 가능 여부
- [ ] 스크린 리더 호환성
- [ ] 컬러 대비 확인

---

## Phase 8: 배포 및 모니터링

### 8.1 최종 점검
- [ ] 콘솔 에러 없음 확인
- [ ] 불필요한 console.log 제거
- [ ] 이미지 최적화 (WebP 변환, 압축)
- [ ] 번들 사이즈 확인

### 8.2 배포
- [ ] Git commit & push
- [ ] Vercel 자동 배포 확인
- [ ] Production 환경 테스트

### 8.3 문서화
- [ ] 컴포넌트 JSDoc 주석 추가
- [ ] 사용 가이드 작성 (필요시)

---

## 예상 일정 (Reference Only)

| Phase | 작업 내용 | 예상 복잡도 |
|-------|----------|------------|
| Phase 0 | 사전 준비 | 낮음 |
| Phase 1 | 타입/상수 정의 | 낮음 |
| Phase 2 | 핵심 컴포넌트 개발 | **높음** |
| Phase 3 | 비즈니스 로직 | 중간 |
| Phase 4 | UI/UX 스타일링 | 중간 |
| Phase 5 | 페이지 통합 | 낮음 |
| Phase 6 | 고급 기능 | 선택사항 |
| Phase 7 | 테스트 | 중간 |
| Phase 8 | 배포 | 낮음 |

---

## 참고 자료

- [react-draggable 공식 문서](https://github.com/react-grid-layout/react-draggable)
- [html-to-image 공식 문서](https://github.com/bubkoo/html-to-image)
- [Framer Motion 공식 문서](https://www.framer.com/motion/)

---

**작성자:** Claude AI
**버전:** 1.0
