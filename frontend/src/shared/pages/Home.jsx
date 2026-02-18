import { useState } from "react";
import { Link } from "react-router-dom";
import "@/shared/styles/Home.css";

export default function Home() {
  const [openTech, setOpenTech] = useState(false);
  const [openFeat, setOpenFeat] = useState(false);

  const toggleTech = () => setOpenTech(v => !v);
  const toggleFeat = () => setOpenFeat(v => !v);

  return (
    <div className="home">
      <header className="hero">
        <h1 className="hero-title">
          React + Spring <span>Portfolio</span>
        </h1>
        <p className="hero-sub">
          
        </p>
      </header>

<section className="toggle-grid">
  <div className="toggle-col">
    <button
      className={`toggle-btn ${openTech ? "active" : ""}`}
      onClick={toggleTech}
      aria-expanded={openTech}
    >
      🧩 기술 스택 보기
      <span className="chev">{openTech ? "▲" : "▼"}</span>
    </button>

    {openTech && (
      <div className="panel-card">
        <div className="panel-stack">
          <div className="panel-item">
            <h3>Frontend</h3>
            <ul>
              <li>React (Vite)</li>
              <li>React Router</li>
              <li>Axios (withCredentials)</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Backend</h3>
            <ul>
              <li>Java</li>
              <li>Spring Boot</li>
              <li>Spring Security (Session)</li>
              <li>JPA / Hibernate</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Deploy</h3>
            <ul>
              <li>MySQL (AWS RDS)</li>
              <li>Deploy: AWS Elastic Beanstalk</li>
              <li>Static: CloudFront / S3</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>CI/CD</h3>
            <ul>
              <li>GitHub Actions</li>
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>


  <div className="toggle-col">
    <button
      className={`toggle-btn ${openFeat ? "active" : ""}`}
      onClick={toggleFeat}
      aria-expanded={openFeat}
    >
      ✅ 핵심 기능 보기
      <span className="chev">{openFeat ? "▲" : "▼"}</span>
    </button>

    {openFeat && (
      <div className="panel-card">
        <div className="panel-stack">
          <div className="panel-item">
            <h3>Authentication & Session Management</h3>
            <ul>
              <li>Spring Security 기반 Session 인증 방식 로그인 구현</li>
              <li>OAuth2 (Google) 소셜 로그인 연동</li>
              <li>세션 기반 로그인 유지 및 /api/auth/me를 통한 인증 상태 조회</li>
              <li>비밀번호 BCrypt 암호화 저장</li>
              <li>로그아웃 시 서버 세션 무효화 처리</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Authorization & Access Control</h3>
            <ul>
              <li>USER / ADMIN Role 기반 권한 분리</li>
              <li>관리자 전용 API 접근 제한 처리</li>
              <li>작성자 본인만 게시글 수정/삭제 가능하도록 인가 로직 구현</li>
              <li>인증 실패(401) / 권한 없음(403) 예외 처리</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Data Handling & API Design</h3>
            <ul>
              <li>Request / Response DTO 분리를 통한 계층 간 책임 분리</li>
              <li>@Transactional 기반 서비스 레이어 트랜잭션 관리</li>
              <li>Pageable 기반 게시글 페이징 처리</li>
              <li>Swagger API 문서화</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Image Upload (AWS S3)</h3>
            <ul>
              <li>Presigned URL 기반 이미지 업로드 구현</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Admin Dashboard</h3>
            <ul>
              <li>관리자 전용 회원 목록 조회</li>
              <li>회원 권한(Role) 변경 기능</li>
              <li>회원 계정 삭제 기능</li>
              <li>S관리자 권한에 따른 프론트 메뉴 동적 노출</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Deployment & CI/CD</h3>
            <ul>
              <li>AWS Elastic Beanstalk를 통한 백엔드 배포</li>
              <li>S3 + CloudFront 기반 React 정적 파일 호스팅</li>
              <li>GitHub Actions 기반 자동 빌드 및 배포 파이프라인 구성</li>
              <li>운영 환경 민감정보 보호를 위한 환경변수 분리 적용</li>
            </ul>
          </div>

        </div>
      </div>
    )}
  </div>
</section>


    </div>
  );
}
