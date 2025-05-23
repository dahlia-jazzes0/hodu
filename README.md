# 렌딩 페이지

## 파일 구조

```
(root)
├─ index.html
├─ css
│  ├─ index.css - layer 순서 정의, 다른 css 파일 임포트
|  ├─ reset.css
|  ├─ base.css - 웹폰트 임포트, 태그 기본 스타일 정의
|  ├─ tokens.css - 디자인 토큰 정의
|  ├─ recipes - 컴포넌트 정의, 레이아웃 정의
|  |  └─ index.css - 다른 recipes css 파일을 임포트하는 배럴 파일
|  └─ utilities.css - 유틸리티 클래스 정의
├─ img - 이미지 리소스
└─ scrips/img-optimization - 이미지 전처리 스크립트
```

## 작업 내용

- 피그마를 참고하여 페이지를 구현했습니다.
- 시멘틱 태그를 이용해 적절히 HTML을 구성했습니다.
- 제공 받은 이미지가 웹에 서빙하기엔 지나치게 커서 전처리를 하였습니다.
- CSS의 경우 의미별로 서로 다른 파일로 나눴습니다. 미디어 쿼리를 각 파일에 담아서 빠르게 데스크톱과 모바일 화면의 차이를 비교할 수 있도록 구성했습니다.
- CSS 방법론으로 BEM을 따랐습니다.
- 이전 과제에서 데스크톱을 먼저 작업했기에, 이번에는 모바일 화면부터 작업했습니다.
- 브레이크 포인트는 1280px을 기준으로 잡았습니다. 넓어서 다소 이상하게 보일 수 있는 모바일 화면이 바로 나타나지 않게 하기 위해 모바일 최대 가로 크기를 768px로 설정했습니다.
- 각 이미지에 적절한 alt 태그를 지정했습니다.
- 시멘틱 태그 덕분에 별도의 조치 없이 키보드 접근성을 대응했습니다.
