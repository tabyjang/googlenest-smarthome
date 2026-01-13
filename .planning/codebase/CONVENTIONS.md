# Coding Conventions

## File Naming
- **컴포넌트**: PascalCase (`ProductShowcase.tsx`)
- **타입 파일**: lowercase (`types.ts`)
- **설정 파일**: lowercase with dots (`vite.config.ts`)

## Component Structure
```tsx
import React from 'react';
import { motion } from 'framer-motion';
// 외부 라이브러리 먼저, 내부 모듈 나중

interface ComponentProps {
  // Props 인터페이스
}

const Component: React.FC<ComponentProps> = ({ prop }) => {
  // State hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {}, []);

  // Handlers
  const handleEvent = () => {};

  // Render
  return (...);
};

export default Component;
```

## TypeScript
- `React.FC<Props>` 타입 사용
- 인터페이스는 `interface` 키워드 사용 (type alias 대신)
- 타입은 `types.ts`에 중앙화

## Styling (TailwindCSS)
- 인라인 className 사용
- 조건부 클래스: 템플릿 리터럴 + 삼항 연산자
  ```tsx
  className={`base-class ${condition ? 'active' : 'inactive'}`}
  ```
- 긴 클래스는 줄바꿈 없이 한 줄에 작성

## Animation (Framer Motion)
- `motion.div` 직접 사용
- `initial`, `animate`, `exit` 패턴
- `whileHover`, `whileTap` 인터랙션
- `AnimatePresence`로 exit 애니메이션 처리

## State Management
- `useState` 훅 사용
- 복잡한 상태는 객체로 관리 (Estimator의 options)
- Props drilling 허용 (전역 상태 관리 없음)

## Comments
- 한국어 주석 사용 (주요 섹션 설명)
- JSX 내 주석: `{/* 섹션 설명 */}`

## Import Aliases
- `@/*` → 프로젝트 루트 (tsconfig.json, vite.config.ts)

## 한/영 혼용
- UI 텍스트: 한국어
- 코드/변수명: 영어
- 주석: 한국어
