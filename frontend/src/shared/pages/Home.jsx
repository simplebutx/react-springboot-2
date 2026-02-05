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
              <li>Spring Boot</li>
              <li>Spring Security (Session)</li>
              <li>JPA / Hibernate</li>
              <li>Request / Response DTO 분리</li>
               <li>@Transactional 트랜잭션 관리</li>
               <li>전역 예외 처리 (@RestControllerAdvice)</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>DB & Deploy</h3>
            <ul>
              <li>MySQL (AWS RDS)</li>
              <li>Deploy: AWS Elastic Beanstalk</li>
              <li>Static: CloudFront / S3</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>CI/CD</h3>
            <ul>
              <li>GitHub Actions 자동 배포</li>
              <li>Frontend / Backend 파이프라인 분리</li>
              <li>Push 시 자동 빌드 & 배포</li>
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
            <h3>Authentication</h3>
            <ul>
              <li>회원가입 (BCrypt 암호화 저장)</li>
              <li>로그인 (Spring Security 인증)</li>
              <li>로그아웃 (세션 무효화)</li>
              <li>/api/auth/me 로그인 상태 조회</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Authorization</h3>
            <ul>
              <li>USER / ADMIN 권한 분리</li>
              <li>관리자 전용 API 보호</li>
              <li>401 / 403 처리</li>
              <li>작성자만 수정/삭제 가능</li>
            </ul>
          </div>

          <div className="panel-item">
            <h3>Features</h3>
            <ul>
              <li>게시판 CRUD (작성자만 수정/삭제 권한, 관리자 전체 삭제 권한)</li>
              <li>마이페이지 (가입자 정보, 작성 글 목록 조회, 회원탈퇴)</li>
              <li>관리자 페이지 (회원정보, 권한변경, 회원삭제)</li>
              <li>권한별 메뉴 노출 (네비 상태 반영)</li>
              <li>댓글 CRUD</li>
              <li>게시글 이미지 업로드 (AWS S3 Presigned URL)</li>
              <li>Swagger API 문서화</li>
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
