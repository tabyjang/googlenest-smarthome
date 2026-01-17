# Google Nest Smart Home Experience - 프로덕션 준비

## 프로젝트 비전

Google Nest 스마트홈 제품을 위한 **프로덕션급 쇼케이스 웹 애플리케이션**을 구축합니다. 현재 작동하는 프로토타입을 안정적이고, 접근 가능하며, 성능이 최적화된 프로덕션 서비스로 발전시킵니다.

## 핵심 가치

- **프로덕션 품질**: 실제 사용자가 사용할 수 있는 안정적인 서비스
- **성능 최적화**: Three.js 기반 3D 경험이 모든 디바이스에서 부드럽게 동작
- **접근성**: 모든 사용자가 쉽게 사용할 수 있는 웹 경험
- **신뢰성**: 테스트로 검증된 코드, 우아한 에러 처리

## 현재 상태 (Brownfield Project)

### ✅ 구현된 기능
- Google Nest 제품 카탈로그 쇼케이스
- 3D 룸 플래너 (Three.js, React Three Fiber)
- 실시간 견적 시스템 (이메일 전송)
- 음성 경험 데모 (Google Gemini AI)
- 인터랙티브 스마트 존 컨트롤
- 반응형 디자인 (Tailwind CSS)

### ✅ 최근 개선사항
- **보안 강화**: Gemini API 키 노출 문제 해결 (서버리스 프록시 패턴 적용)
- **환경 변수 관리**: .env.example 템플릿 추가
- **문서화**: 포괄적인 README.md 작성

### 🎯 개선이 필요한 영역

**1. 성능 최적화 (최우선)**
- Three.js 렌더링 최적화 (LOD, 인스턴싱)
- 번들 크기 최적화 (현재 vendor-three 청크가 큼)
- 이미지 최적화 (WebP, lazy loading)
- 코드 스플리팅 개선

**2. 접근성 개선 (최우선)**
- ARIA 라벨 추가
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 개선

**3. 테스트 인프라 구축 (최우선)**
- Vitest + React Testing Library 설정
- 단위 테스트 (컴포넌트, 유틸리티)
- 통합 테스트 (사용자 플로우)
- E2E 테스트 (Playwright - 이미 설치됨)

**4. 에러 처리 개선 (최우선)**
- React 에러 바운더리 추가
- 로딩 상태 관리
- 사용자 친화적 에러 메시지
- API 실패 처리 개선

## 기술 스택

### Frontend Core
- **Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Router**: React Router DOM 7.2.2

### 3D & Animation
- **3D Engine**: Three.js 0.182.0
- **React Integration**: @react-three/fiber 9.0.3, @react-three/drei 9.122.8
- **Animation**: Framer Motion 12.25.0

### AI & Services
- **AI**: Google Generative AI 1.35.0
- **Email**: Resend 6.7.0

### Styling
- **CSS Framework**: Tailwind CSS (custom design system)
- **Font**: Google Fonts (Playfair Display, Inter)

### Deployment
- **Platform**: Vercel (이미 배포됨)
- **Serverless Functions**: api/ 디렉토리 (Gemini 프록시, 이메일 전송)

## 제약사항

### 기술적 제약
- **API 제한**: Gemini API 무료 티어 사용 (분당 요청 제한 고려)
- **번들 크기**: Three.js는 큰 라이브러리 (최적화 필수)
- **브라우저 호환성**: 최신 브라우저 지원 (ES2020+)

### 프로젝트 제약
- **기존 디자인 시스템 유지**: 골드/크림/차콜 컬러 팔레트 유지
- **기존 기능 보존**: 현재 작동하는 모든 기능 유지
- **서버리스 아키텍처**: Vercel 서버리스 환경에 맞춤

### 우선순위
1. **성능 최적화** - 사용자 경험의 핵심
2. **접근성 개선** - 모든 사용자를 위한 웹
3. **테스트 인프라** - 안정성 확보
4. **에러 처리** - 우아한 실패 처리

## 성공 기준

### Phase 1: 기초 인프라
- [ ] 테스트 프레임워크 설정 완료
- [ ] 에러 바운더리 구현
- [ ] 로딩 상태 통합 관리
- [ ] 기본 접근성 감사 통과

### Phase 2: 성능 최적화
- [ ] Lighthouse 성능 점수 90+ 달성
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] 번들 크기 20% 감소

### Phase 3: 접근성 & 품질
- [ ] WCAG 2.1 AA 준수
- [ ] 키보드 네비게이션 100% 지원
- [ ] 테스트 커버리지 70%+ 달성
- [ ] 모든 주요 사용자 플로우 E2E 테스트 완료

### 프로덕션 배포
- [ ] 모든 테스트 통과
- [ ] 성능 벤치마크 충족
- [ ] 접근성 감사 통과
- [ ] 에러 모니터링 설정 (Sentry 등)
- [ ] Vercel 프로덕션 환경 배포

## 범위 외 항목

이번 프로젝트에서는 다음 사항을 다루지 않습니다:
- ❌ 백엔드 데이터베이스 추가 (서버리스 유지)
- ❌ 사용자 인증/계정 시스템
- ❌ 실제 결제 통합
- ❌ 다국어 지원 (한국어/영어만)
- ❌ 모바일 앱 개발

## 다음 단계

1. **Roadmap 생성**: `/gsd:create-roadmap`으로 개발 단계 정의
2. **Phase Planning**: 각 단계별 상세 계획 수립
3. **Execution**: 계획된 작업 실행
4. **Verification**: 각 단계마다 성공 기준 검증

---

**프로젝트 유형**: Brownfield (기존 코드베이스 개선)
**작업 모드**: YOLO Mode (빠른 실행, 중요한 결정만 확인)
**목표 완료일**: 마일스톤별 설정 예정
