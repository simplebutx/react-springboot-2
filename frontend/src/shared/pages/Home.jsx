import '@/shared/styles/Home.css';

function Home() {

    return (
        <div className="home">
  <section className="hero">
    <h1>Spring Security Portfolio</h1>
    <p>
      세션 기반 로그인과 권한(Role) 인가를 구현한 백엔드 중심 포트폴리오 프로젝트입니다.
    </p>

    <div className="features">
      <div className="feature-card">
        🔐 회원가입 / 로그인
      </div>
      <div className="feature-card">
        👤 마이페이지
      </div>
      <div className="feature-card">
        🛠 관리자 페이지
      </div>
    </div>
  </section>
</div>
    )
}

export default Home;