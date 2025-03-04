export default function Home() {
  return (
    <main>
      <header>
        <nav>
          <a href="/">홈</a>
          <a href="/about">소개</a>
          <a href="/contact">연락처</a>
        </nav>
      </header>

      <section>
        <h1>환영합니다</h1>
        <p>이곳은 메인 콘텐츠가 들어갈 영역입니다.</p>
        <span className="a11y-hidden">스크린 리더만 읽을 수 있는 텍스트</span>
      </section>

      <section>
        <h2>주요 기능</h2>
        <ul>
          <li>기능 1</li>
          <li>기능 2</li>
          <li>기능 3</li>
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 웹사이트 이름. All rights reserved.</p>
      </footer>
    </main>
  );
}
