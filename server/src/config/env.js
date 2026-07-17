import dotenv from 'dotenv'

dotenv.config()

/**
 * 환경변수 로드
 * (.env 값이 없으면 기본값 사용)
 */
const env = {
  port: Number(process.env.PORT) || 3000,
  labangbaBaseUrl: process.env.LABANGBA_BASE_URL || 'https://live.ecomm-data.com',
}

export default env
