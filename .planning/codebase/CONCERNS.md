# Technical Concerns & Debt

## High Priority

### 1. TailwindCSS CDN 사용
- **문제**: 프로덕션에 부적합, 성능 저하
- **해결**: `tailwindcss` 패키지 설치 및 빌드 파이프라인 통합
- **영향**: 모든 파일

### 2. 하드코딩된 이미지 URL
- **문제**: Unsplash/Picsum 의존, 실제 제품 이미지 없음
- **해결**: 에셋 폴더에 실제 Google Nest 제품 이미지 추가
- **위치**: `constants.tsx`, `SmartZoneControl.tsx`

### 3. API Key 노출 위험
- **문제**: 클라이언트에서 직접 Gemini API 호출
- **해결**: 백엔드 프록시 또는 서버리스 함수 사용
- **위치**: `VoiceExperience.tsx`

---

## Medium Priority

### 4. 테스트 없음
- **문제**: 단위/통합 테스트 미작성
- **해결**: Vitest + Testing Library 도입
- **영향**: 모든 컴포넌트

### 5. 반응형 디자인 불완전
- **문제**: 모바일 최적화 부족 (특히 SmartZoneControl)
- **해결**: 모바일 전용 레이아웃 추가
- **위치**: `SmartZoneControl.tsx`

### 6. 접근성(A11y) 미흡
- **문제**: aria-label 없음, 키보드 네비게이션 미지원
- **해결**: ARIA 속성 추가, 포커스 관리
- **영향**: 모든 인터랙티브 컴포넌트

### 7. Spline iframe 성능
- **문제**: 무거운 3D 렌더링, 모바일에서 느림
- **해결**: 모바일에서 정적 이미지 폴백, 지연 로딩
- **위치**: `Hero.tsx`

---

## Low Priority

### 8. AnimatePresence 재정의
- **문제**: `ProductShowcase.tsx`에서 불필요하게 재정의
  ```tsx
  const AnimatePresence = motion.AnimatePresence; // 잘못됨
  ```
- **해결**: framer-motion에서 직접 import
- **위치**: `ProductShowcase.tsx:82`

### 9. 하드코딩된 가격
- **문제**: 견적 가격이 코드에 하드코딩
- **해결**: 설정 파일 또는 CMS 연동
- **위치**: `Estimator.tsx`

### 10. 구글 제품 이름 상표권
- **문제**: "Google Nest" 브랜드 사용
- **해결**: 데모/학습용 명시 또는 이름 변경
- **영향**: 전체 UI 텍스트

---

## Code Smells

### 11. 큰 컴포넌트 파일
- `SmartZoneControl.tsx` (214줄) - 분리 고려
- 3D 뷰, 상세 패널, 토글 버튼을 서브컴포넌트로

### 12. 반복 패턴
- Navigation/Hero에서 유사한 스크롤 기반 스타일 로직
- 커스텀 훅으로 추출 가능

### 13. 매직 넘버
- `scrollY > 50` (Navigation)
- `0.2` (Hero 스크롤 진행률)
- 상수로 추출 권장
