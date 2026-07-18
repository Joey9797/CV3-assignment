import dotenv from 'dotenv'

dotenv.config()

const env = {
  port: Number(process.env.PORT) || 3000,
  labangbaBaseUrl: process.env.LABANGBA_BASE_URL || 'https://live.ecomm-data.com',
}

export default env
