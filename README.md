# NextJS tailwindCSS 템플릿

## Commit convention

```
Feat: 기능 개발
- 로그인 모달 구현
- 무한 스크롤 추가

UI: 화면 작업
- 헤더 컴포넌트 마크업
- 반응형 레이아웃 구현
- 다크모드 스타일 추가

Fix: 버그 수정
- iOS Safari 스크롤 이슈 해결
- 크로스브라우징 대응

Refactor: 코드 개선
- 컴포넌트 분리
- 상태관리 로직 개선
- 성능 최적화

Style: 스타일 수정
- 폰트 사이즈 조정
- 색상 변수 정리
- 간격 일관성 유지

Setting: 개발 환경
- 패키지 설치
- 환경변수 설정
- 타입 정의

Docs: 문서 작업
- README 업데이트
- 컴포넌트 사용법 문서화

Remove: 제거
- 미사용 컴포넌트 정리
- 레거시 코드 제거
```

## 기술 스택

### Framework

- [Next.js](https://nextjs.org/) 14 (App Router)
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)

### Styling

- [Tailwind CSS](https://tailwindcss.com/)

### Code Quality

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Development Tools

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router
├── components/       # React Components
│   ├── common/      # 공통 컴포넌트
│   ├── layout/      # 레이아웃 컴포넌트
│   └── sections/    # 페이지별 섹션
├── hooks/           # Custom React Hooks
├── lib/            # 유틸리티 함수
├── services/       # API 서비스
├── store/          # Zustand 스토어
└── types/          # TypeScript 타입 정의
```

## 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 환경 설정

- Node.js 18.17 이상
- npm 9.6.7 이상

## 라이센스

MIT License
