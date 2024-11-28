# MBTI 프로젝트
이 프로젝트는 MBTI(Myers-Briggs Type Indicator) 성격 유형 테스트를 구현한 웹 애플리케이션입니다.

## 기술 스택
•	Frontend: React
•	상태 관리: Context API
•	스타일링: styled-components
•	라우팅: react-router-dom
•	알림: react-toastify

## 프로젝트 구조
- `/src`: 소스 코드	
-`/api`: API 호출 관련 함수
- `/components`: React 컴포넌트
- `/context`: Context API 관련 파일
- `/data`: 정적 데이터 (예: MBTI 질문)
- `/utils`: 유틸리티 함수
 
![스크린샷 2024-11-28 오전 11 27 11](https://github.com/user-attachments/assets/56da7794-07d4-49e5-b995-af4cd11b117e)

##  주요 컴포넌트
1.	MbtiTestPage: MBTI 테스트를 수행하는 페이지
2.	TestForm: MBTI 질문을 표시하고 사용자 응답을 처리하는 폼
3.	TestResultList: 테스트 결과 목록을 표시
4.	TestResultItem: 개별 테스트 결과 항목을 표시
5.	Profile: 사용자 프로필 수정 페이지

##  API 통신
api 폴더 내의 함수들을 사용하여 백엔드와 통신합니다:
•	auth.js: 인증 관련 API (회원가입, 로그인, 프로필 수정)
•	testResults.js: 테스트 결과 관련 API (결과 저장, 조회, 삭제, 공개 설정 변경)

##  주요 기능 
1.	MBTI 테스트
•	사용자에게 MBTI 관련 질문을 제시
•	사용자의 응답을 기반으로 MBTI 유형 계산
2.	테스트 결과 관리
•	테스트 결과 저장
•	저장된 결과 조회
•	결과 공개/비공개 설정
•	결과 삭제
3.	사용자 관리
•	회원가입 및 로그인
•	프로필 수정 (닉네임 변경)
4.	결과 페이지
•	모든 공개된 테스트 결과 표시
•	각 MBTI 유형에 대한 설명 제공


