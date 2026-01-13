# Testing

## Current Status
**테스트 설정 없음** - 테스트 프레임워크 미설치

## Recommended Setup (향후)

### Unit Testing
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Test Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

### Testing Priorities
1. **Estimator** - 가격 계산 로직 (순수 함수화 필요)
2. **VoiceExperience** - API 모킹, 상태 전이
3. **SmartZoneControl** - 구역 선택 상태

### E2E Testing (선택)
```bash
npm install -D playwright
```

## Manual Testing Checklist

### Hero
- [ ] Spline 3D 모델 로드 확인
- [ ] 스크롤 시 텍스트 페이드아웃

### Navigation
- [ ] 스크롤 시 배경색 변경
- [ ] 앵커 링크 동작

### ProductShowcase
- [ ] 호버 시 오버레이 표시
- [ ] 이미지 로드 확인

### SmartZoneControl
- [ ] 구역 클릭 시 상세 패널 변경
- [ ] Day/Night 모드 토글

### Estimator
- [ ] 방 개수 증감
- [ ] 옵션 체크박스 토글
- [ ] 총 가격 계산 정확성

### VoiceExperience
- [ ] 마이크 버튼 클릭 시 애니메이션
- [ ] API 호출 성공/실패 처리
- [ ] 빠른 예시 버튼 동작
