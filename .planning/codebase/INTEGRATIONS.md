# External Integrations

## 1. Google Gemini AI API

### Usage Location
- `components/VoiceExperience.tsx`

### Configuration
```typescript
const apiKey = process.env.API_KEY; // vite.config.ts에서 주입
const ai = new GoogleGenAI({ apiKey });
```

### API Call
```typescript
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: "사용자 프롬프트",
  config: {
    systemInstruction: "시스템 지시사항"
  }
});
```

### Environment Variable
- `.env.local` 파일에 `GEMINI_API_KEY` 설정 필요
- Vite에서 `process.env.API_KEY`로 주입

### Error Handling
- API 실패 시 폴백 응답 제공
- "오프라인 모드 실행" 상태 표시

---

## 2. Spline 3D

### Usage Location
- `components/Hero.tsx`

### Integration Method
```tsx
<iframe
  src={SPLINE_URL}
  frameBorder="0"
  width="100%"
  height="100%"
/>
```

### URL Source
- `constants.tsx`에 정의
- `https://my.spline.design/visionosiconsin3d-...`

### Notes
- 포인터 이벤트 활성화 (`pointerEvents: 'auto'`)
- 성능 영향 있음 (무거운 3D 렌더링)

---

## 3. Image CDNs

### Unsplash
- `SmartZoneControl.tsx`에서 사용
- 실제 제품 이미지 대체용
- 쿼리 파라미터: `auto=format&fit=crop&q=80&w=300`

### Picsum (Lorem Picsum)
- `constants.tsx`에서 사용
- 제품 플레이스홀더 이미지
- 시드 기반: `https://picsum.photos/seed/{seed}/400/300`

---

## 4. Google Fonts

### Usage Location
- `index.html`

### Font
- Google Sans (wght: 400, 500, 700)

### Preconnect
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 5. TailwindCSS CDN

### Usage Location
- `index.html`

### Method
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Notes
- 프로덕션에서는 빌드 타임 Tailwind 권장
- CDN은 개발/프로토타입용
