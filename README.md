# Google Nest Smart Home Experience

프리미엄 Google Nest 스마트홈 제품 쇼케이스 웹사이트

## 🚀 주요 기능

- **제품 쇼케이스**: Google Nest 제품 카탈로그
- **3D 룸 플래너**: 드래그 앤 드롭으로 방 디자인
- **견적 시스템**: 실시간 가격 계산 및 이메일 견적서
- **음성 경험**: Google Gemini AI 기반 음성 어시스턴트 데모
- **인터랙티브 데모**: 스마트 존 컨트롤 시뮬레이션

## 📋 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

## 🔧 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/tabyjang/googlenest-smarthome.git
cd googlenest2me
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# .env.example을 복사하여 시작
cp .env.example .env
```

필수 환경 변수:

```env
# Google Gemini API Key (필수)
GEMINI_API_KEY=your_gemini_api_key_here

# Resend Email API Key (견적 기능용)
RESEND_API_KEY=your_resend_api_key_here

# Email 설정
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=business@yourdomain.com
```

**API 키 발급:**
- Google Gemini API: https://aistudio.google.com/app/apikey
- Resend API: https://resend.com/api-keys

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 http://localhost:3000 에서 실행됩니다.

### 5. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 🏗️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **3D Graphics**: Three.js, React Three Fiber
- **Animation**: Framer Motion
- **AI**: Google Generative AI (Gemini)
- **Email**: Resend
- **Styling**: Tailwind CSS (custom design system)

## 📁 프로젝트 구조

```
googlenest2me/
├── api/                    # 서버리스 API 함수
│   ├── gemini.ts          # Gemini AI 프록시 (보안)
│   └── send-quote.ts      # 이메일 전송
├── components/            # React 컴포넌트
│   ├── demo/             # 인터랙티브 데모
│   ├── estimator/        # 견적 시스템
│   ├── hero/             # 히어로 섹션
│   ├── layout/           # 레이아웃 (Navigation, Footer)
│   ├── products/         # 제품 카드/그리드
│   ├── room-planner/     # 3D 룸 플래너
│   └── three/            # Three.js 컴포넌트
├── pages/                 # 페이지 컴포넌트
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   └── ExperiencePage.tsx
├── public/               # 정적 자산
├── constants.tsx         # 앱 상수 (제품 데이터, 가격)
├── types.ts             # TypeScript 타입 정의
└── vite.config.ts       # Vite 설정
```

## 🔐 보안

**중요**: API 키는 절대 클라이언트 코드에 노출되지 않습니다.

- ✅ Gemini API는 `/api/gemini` 서버리스 함수를 통해 프록시됨
- ✅ API 키는 서버 측 환경 변수에서만 사용됨
- ✅ 클라이언트 번들에 API 키가 포함되지 않음

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub 저장소 연결
2. 환경 변수 설정 (Vercel 대시보드)
3. 자동 배포

```bash
# Vercel CLI 사용
npm i -g vercel
vercel
```

### Netlify 배포

1. `netlify.toml` 설정
2. 환경 변수 추가
3. 배포

## 📝 개발 가이드

### 새 제품 추가

`constants.tsx`의 `PRODUCTS` 배열에 추가:

```typescript
{
  id: 'new-product',
  name: '제품명',
  description: '설명',
  imageUrl: '/assets/product.jpg',
  category: 'audio',
  price: 100000
}
```

### 새 페이지 추가

1. `pages/NewPage.tsx` 생성
2. `App.tsx`에 라우트 추가

```typescript
const NewPage = lazy(() => import('./pages/NewPage'));

// Routes에 추가
<Route path="/new" element={<Layout><NewPage /></Layout>} />
```

## 🐛 알려진 이슈

자세한 내용은 `.planning/codebase/CONCERNS.md`를 참조하세요.

## 📄 라이선스

MIT License

## 👥 기여

Pull Request를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 문의

프로젝트 관련 문의: [이메일 주소]

## 🙏 감사의 말

- Google Nest 디자인 시스템
- React Three Fiber 커뮤니티
- Framer Motion 팀
