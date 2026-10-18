# Gemini 워터마크 제거 · Gemini Watermark Remover

Gemini로 만든 이미지 오른쪽 아래의 ✦ 마크를 지우고 저장하는 웹 도구입니다.
**사이트:** https://alexa97busan.github.io/gemini-watermark-remover/

- 이미지는 서버로 업로드되지 않고 브라우저 안에서만 처리됩니다.
- 여러 장 일괄 처리, 붙여넣기(⌘V), 원본/결과 비교 슬라이더, 돋보기, 수동 위치 지정
- 저장 설정: PNG·JPG·WEBP와 품질, 가로 크기, 비율 자르기(위치 드래그), ZIP 일괄 다운로드
- 휴대폰 공유 시트로 사진 앱에 저장, 클립보드 복사
- 한국어/영어(브라우저 언어 자동, `?lang=en`), 홈 화면·Dock 설치와 오프라인 사용

## 원리

Gemini는 로고를 반투명하게 합성합니다: `결과 = α·로고색 + (1−α)·원본`.
로고의 알파맵을 알고 있으므로 이 식을 거꾸로 풀어 원래 픽셀을 복원합니다.
마크 위치와 크기는 공식 레이아웃을 먼저 확인하고, 없으면 모서리 영역을 탐색합니다.

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 화면, 저장·공유, 언어 |
| `engine.js` | 알파맵, 마크 탐지와 제거 (DOM 없음) |
| `worker.js` | `engine.js`로 탐지를 백그라운드에서 실행 |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | 설치와 오프라인 지원 (배포 때 `sw.js`의 `VERSION`을 올리세요) |

## 참고

- 눈에 보이는 마크만 지웁니다. 이미지에 숨겨진 SynthID 디지털 워터마크는 그대로 남습니다.
- 본인이 만든 이미지를 깔끔하게 쓰는 용도로 사용하고, AI 생성 이미지를 실제 사진처럼 속이는 데 쓰지 마세요.

## 라이선스 및 출처

알파맵 데이터: [GargantuaX/gemini-watermark-remover](https://github.com/GargantuaX/gemini-watermark-remover) (MIT License, © 2025 Jad)
