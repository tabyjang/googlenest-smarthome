# Project Structure

```
google-nest-smart-home-experience/
├── .claude/                    # Claude Code 설정 (GSD 포함)
│   └── commands/gsd/           # GSD 명령어
├── .planning/                  # GSD 계획 디렉토리
│   └── codebase/               # 코드베이스 문서
├── components/                 # React 컴포넌트
│   ├── Estimator.tsx          # 견적 계산기 (5.1KB)
│   ├── Hero.tsx               # 히어로 섹션 (2.6KB)
│   ├── Navigation.tsx         # 네비게이션 바 (1.9KB)
│   ├── ProductShowcase.tsx    # 제품 쇼케이스 (3.5KB)
│   ├── SmartZoneControl.tsx   # 스마트 존 컨트롤 (10.4KB) ★ 가장 큼
│   └── VoiceExperience.tsx    # 음성 체험 (5.4KB)
├── .env.local                  # 환경 변수 (GEMINI_API_KEY)
├── .gitignore                  # Git 무시 파일
├── App.tsx                     # 메인 앱 컴포넌트
├── constants.tsx               # 상수 및 제품 데이터
├── index.html                  # HTML 엔트리 + TailwindCSS CDN
├── index.tsx                   # React 진입점
├── metadata.json               # AI Studio 메타데이터
├── package.json                # 의존성 및 스크립트
├── README.md                   # 프로젝트 설명
├── tsconfig.json               # TypeScript 설정
├── types.ts                    # 타입 정의
└── vite.config.ts              # Vite 설정
```

## Key Files

| 파일 | 역할 |
|------|------|
| `App.tsx` | 전체 레이아웃, 스크롤 상태 관리 |
| `constants.tsx` | 제품 데이터, Spline URL |
| `types.ts` | Product, RoomState, ZoneId 타입 |
| `vite.config.ts` | 개발 서버 포트(3000), 환경변수 주입 |

## Component Size Ranking
1. SmartZoneControl.tsx - 10.4KB (가장 복잡)
2. VoiceExperience.tsx - 5.4KB
3. Estimator.tsx - 5.1KB
4. ProductShowcase.tsx - 3.5KB
5. Hero.tsx - 2.6KB
6. Navigation.tsx - 1.9KB
