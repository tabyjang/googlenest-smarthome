# Architecture

## Overview
싱글 페이지 마케팅/랜딩 페이지 구조. 스크롤 기반 섹션 네비게이션.

## Application Flow

```
index.html
    └── index.tsx (React 진입점)
        └── App.tsx (메인 라우터/레이아웃)
            ├── Navigation (고정 헤더)
            ├── Hero (전체 화면 섹션)
            ├── ProductShowcase (제품 그리드)
            ├── SmartZoneControl (인터랙티브 플로어플랜)
            ├── Estimator (견적 계산기)
            ├── VoiceExperience (AI 음성 체험)
            └── Footer
```

## Component Architecture

### Container Components
- **App.tsx** - 전역 스크롤 상태 관리, 섹션 레이아웃

### Presentational Components
- **Hero** - 3D 배경 + 텍스트 오버레이, 스크롤 기반 시차 효과
- **Navigation** - 스크롤 위치 기반 스타일 변경
- **ProductShowcase** - 제품 카드 그리드, 호버 인터랙션
- **SmartZoneControl** - 3D 아이소메트릭 뷰, 구역 선택 상태 관리
- **Estimator** - 폼 상태 관리, 가격 계산 로직
- **VoiceExperience** - AI API 호출, 로딩/에러 상태 처리

## State Management
- **React useState** - 로컬 컴포넌트 상태
- **Props Drilling** - 스크롤 위치 (App → Navigation, Hero)
- 전역 상태 관리 라이브러리 없음

## Data Flow
```
사용자 인터랙션
    ↓
컴포넌트 로컬 State 업데이트
    ↓
(VoiceExperience만) Google Gemini API 호출
    ↓
UI 렌더링
```

## Patterns Used
- **Functional Components** - 모든 컴포넌트
- **Custom Hooks** 없음 (useScroll은 framer-motion 제공)
- **Prop Types via TypeScript** - 인터페이스 정의
- **CDN Import Maps** - 외부 라이브러리 로딩
