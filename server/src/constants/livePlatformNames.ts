/**
 * 라방(live) platform_id → 화면용 채널명
 * 라방바 프론트 번들에 있던 매핑을 상수로 옮긴 것 (API 없음)
 */
export const LIVE_PLATFORM_NAMES: Record<string, string> = {
  baemin: '배민라이브',
  cjonstyle: 'CJ온스타일',
  coupang: '쿠팡라이브',
  eland: '이랜드몰',
  gmarket: 'G라이브',
  grip: '그립',
  gsshop: '지에스샵 샤피라이브',
  himart: '롯데하이마트',
  hmall: '현대Hmall 쇼라',
  homeplus: '홈플러스',
  interpark: '인터파크TV',
  kakao: '카카오쇼핑LIVE',
  live11: '11번가 라이브11',
  live24_ect: '라이브24',
  live24_nhl: '농협 라이블리',
  live24_sshm: '삼삼해물',
  lotteD: '롯데백라이브',
  lotteON: '롯데온라이브',
  lotteimall: '롯데홈쇼핑',
  naver: '네이버쇼핑LIVE',
  sauce: '소스라이브',
  ssg: '쓱라이브',
  tmon: '티몬플레이',
  vogo: '보고플레이',
  wmp: '위메프',
  nsmall: 'NS홈쇼핑',
  pang_live: '팡라이브',
  ssg_live: '신세계쇼핑라이브',
  lotte_100: '롯데백라이브',
  lotte_on: '롯데온라이브',
  skstoa: 'SK스토아',
  olive: '올리브영',
  gongyoung: '공영라방',
}

/**
 * live platform_id를 채널명으로 변환
 * 맵에 없으면 platform_id 그대로 반환
 */
export function getLivePlatformName(platformId: string): string {
  return LIVE_PLATFORM_NAMES[platformId] ?? platformId
}
