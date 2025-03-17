/**
 * 페이지의 스크롤을 막는 유틸리티 함수
 * 주로 모달, 팝업, 모바일 메뉴 등이 열릴 때 배경 스크롤을 방지하기 위해 사용
 *
 * @returns {number} 현재 스크롤 위치 (Y축 값) - 스크롤 복원 시 사용됨
 */
export const preventScroll = () => {
  // 현재 스크롤 위치를 저장
  const currentScrollY = window.scrollY;

  // body를 fixed로 설정하여 스크롤 방지
  document.body.style.position = "fixed";

  // 가로 스크롤바가 생기는 것을 방지하기 위해 너비 100% 설정
  document.body.style.width = "100%";

  // 스크롤 방지 시 화면 깜빡임을 방지하기 위해
  // 현재 스크롤 위치를 음수값으로 top에 설정
  document.body.style.top = `-${currentScrollY}px`;

  // allowScroll 함수에서 사용할 스크롤 위치값 반환
  return currentScrollY;
};

/**
 * 이전에 막았던 페이지 스크롤을 다시 허용하는 함수
 * preventScroll()과 쌍으로 사용됨
 *
 * @param {number} prevScrollY - preventScroll()에서 반환된 이전 스크롤 위치
 */
export const allowScroll = (prevScrollY: number) => {
  // fixed position 해제
  document.body.style.position = "";

  // 너비 설정 해제
  document.body.style.width = "";

  // top 위치 설정 해제
  document.body.style.top = "";

  // 이전 스크롤 위치로 페이지 스크롤 복원
  window.scrollTo(0, prevScrollY);
};
