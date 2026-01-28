# React + Spring Boot 포트폴리오 (Session Login / Role / Admin)

React 프론트엔드와 Spring Boot 백엔드로 만든 포트폴리오 프로젝트입니다.  
**세션 기반 로그인(Spring Security)**, **권한(Role) 기반 인가**, **마이페이지**, **관리자(Admin) 기능**을 중심으로 “웹 서비스의 기본 흐름”을 구현했습니다.

---

## 1) 핵심 기능

### 인증(Authentication) / 세션(Session)
- 회원가입: 비밀번호 **BCrypt 암호화 저장**
- 로그인: Spring Security 인증 성공 시 **세션에 인증 정보 저장**
- 로그인 유지: 이후 요청에서 세션 기반으로 인증 복원
- 로그아웃: 세션 무효화

### 인가(Authorization) / Role
- USER / ADMIN 역할 분리
- 관리자 전용 API 접근 제한

### 유저 기능(User)
- 내 정보 조회(마이페이지)
- (추가 예정/선택) 유저 정보 수정, 프로필 확장 등

### 관리자 기능(Admin)
- 유저 목록 조회(관리자 전용)
- (추가 예정/선택) 유저 권한 변경, 계정 잠금 등

---

## 2) 기술 스택

### Backend
- Java, Spring Boot
- Spring Security (Session 기반 인증)
- Spring Data JPA
- MySQL
- Lombok

### Frontend
- React (Vite)
- Axios

### Infra / Tools
- (선택) AWS RDS / S3
- DBeaver(DB 관리)


---

## 3) 프로젝트 구조 (Backend)

> 패키지 단위로 관심사를 분리해서 유지보수/확장성을 높였습니다.
```
com.htm.react_springboot_2
├─ admin
│ ├─ controller (AdminController)
│ ├─ dto (AdminUserListResponse)
│ └─ service (AdminService)
├─ auth
│ ├─ controller (AuthController)
│ ├─ domain (CustomUserDetails, Role)
│ ├─ dto (SignupRequest)
│ └─ service (AuthService, CustomUserDetailService)
├─ global
│ ├─ config (SecurityConfig, WebConfig)
│ └─ exception (전역 예외 처리/예정)
├─ user
│ ├─ controller (UserController)
│ ├─ domain (User)
│ ├─ dto (UserMyPageResponse)
│ └─ repository (UserRepository)
├─ HealthController
└─ ReactSpringboot2Application
```

---

## 4) 실행 방법 (로컬)

### 4-1. Backend 실행

#### 1) MySQL DB 생성

```sql
CREATE DATABASE react_springboot2
DEFAULT CHARACTER SET utf8mb4;
```

2) application.properties 설정
```
spring.datasource.url=jdbc:mysql://localhost:3306/react_springboot2
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3) 서버 실행
```
./gradlew bootRun
또는 IntelliJ에서
ReactSpringboot2Application 실행
```

### 4-2. Frontend 실행
```
npm install
npm run dev
```

## 5) 환경 변수 (Frontend)
.env
```
VITE_API_BASE_URL=http://localhost:8080
```

## 6) API 요약

Auth

POST /api/auth/signup : 회원가입

POST /api/auth/login : 로그인 (세션 생성)

POST /logout : 로그아웃

GET /api/auth/me : 로그인 사용자 정보 확인

User

GET /api/users/me : 마이페이지(내 정보)

Admin (ADMIN 권한 필요)

GET /api/admin/users : 전체 유저 목록

Health

GET /api/health : 서버 상태 확인



## 7) Security 설계 요약

- Spring Security FilterChain에서 요청을 먼저 가로채 인증/인가 처리

- 로그인 성공 시 SecurityContext가 세션에 저장

- 이후 요청에서 세션 기반으로 인증 정보가 복원됨

핵심 구성 요소

- CustomUserDetailService: 로그인 시 유저 조회

- CustomUserDetails: User(Entity)를 감싸 Spring Security가 이해하는 인증 정보 제공

- SecurityConfig: 접근 규칙/로그인 처리/예외 처리 등 보안 정책 정의


## 8) 트러블슈팅

## 9) 스크린샷 / 데모

## 10) 배포
배포 아키텍처

- Frontend: S3 정적 호스팅 + CloudFront

- Backend API: AWS Elastic Beanstalk (Spring Boot JAR 배포)

- Database: AWS RDS (MySQL)

도메인/세션 동작

- 사용자는 CloudFront 도메인으로 접속

- 프론트가 API 요청을 Elastic Beanstalk로 전달

- 세션 기반 인증(JSESSIONID) 을 사용하므로,

  - Axios 요청에 withCredentials: true 설정

  - 백엔드에서 CORS에 allowCredentials(true) + 허용 Origin 지정

CI/CD

- GitHub Actions → Elastic Beanstalk 자동 배포

   - main 브랜치 push 시 ./gradlew clean bootJar

   - 생성된 JAR을 EB로 배포


