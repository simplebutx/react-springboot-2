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

      <section className="toggle-row">
        <button
          className={`toggle-btn ${openTech ? "active" : ""}`}
          onClick={toggleTech}
          aria-expanded={openTech}
        >
          🧩 기술 스택 보기
          <span className="chev">{openTech ? "▲" : "▼"}</span>
        </button>

        <button
          className={`toggle-btn ${openFeat ? "active" : ""}`}
          onClick={toggleFeat}
          aria-expanded={openFeat}
        >
          ✅ 핵심 기능 보기
          <span className="chev">{openFeat ? "▲" : "▼"}</span>
        </button>
      </section>

      {openTech && (
        <section className="info-grid">
          <div className="info-card">
            <div className="info-head">
              <span className="info-dot" />
              <h3>Frontend</h3>
            </div>
            <ul>
              <li>React (Vite)</li>
              <li>React Router</li>
              <li>Axios (withCredentials)</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="info-head">
              <span className="info-dot" />
              <h3>Backend</h3>
            </div>
            <ul>
              <li>Spring Boot</li>
              <li>Spring Security (Session)</li>
              <li>JPA / Hibernate</li>
            </ul>
          </div>

          <div className="info-card">
            <div className="info-head">
              <span className="info-dot" />
              <h3>DB & Deploy</h3>
            </div>
            <ul>
              <li>MySQL (AWS RDS)</li>
              <li>Deploy: AWS Elastic Beanstalk</li>
              <li>Static: CloudFront / S3</li>
            </ul>
          </div>
        </section>
      )}

      {openFeat && (
        <section className="feature-grid">
          <div className="feature-card">
            <div className="feature-head">
              <span className="feature-dot" />
              <h3>Authentication (Session)</h3>
            </div>
            <ul>
              <li>회원가입 (BCrypt 암호화 저장)</li>
              <li>로그인 (Spring Security 인증)</li>
              <li>로그아웃 (세션 무효화)</li>
              <li>/api/auth/me 로그인 상태 조회</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-head">
              <span className="feature-dot" />
              <h3>Authorization (Role)</h3>
            </div>
            <ul>
              <li>USER / ADMIN 권한 분리</li>
              <li>관리자 전용 API 보호</li>
              <li>미인증 요청 401 처리</li>
              <li>권한 부족 403 처리</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-head">
              <span className="feature-dot" />
              <h3>Pages</h3>
            </div>
            <ul>
              <li>마이페이지 (내 정보 조회)</li>
              <li>관리자 페이지 (유저 목록 조회)</li>
              <li>네비게이션 로그인 상태 반영</li>
              <li>권한에 따라 메뉴 노출</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
