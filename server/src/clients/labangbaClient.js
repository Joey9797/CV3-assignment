import axios from 'axios'
import env from '../config/env.js'

// 라방바 api 호출 클라이언트

const labangbaApi = axios.create({
  baseURL: env.labangbaBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @param {'lb' | 'hs'} apiType
 * @returns {Promise<object[]>}
 */
export async function fetchBroadcastList(apiType) {
  try {
    const { data } = await labangbaApi.post('/api/assignment/list', { type: apiType })
    return Array.isArray(data.list) ? data.list : []
  } catch (error) {
    const status = error.response?.status ?? 'unknown'
    throw new Error(`Failed to fetch broadcast list (${apiType}): ${status}`)
  }
}

/**
 * 카테고리 전체 맵 (cid → { pid, name })
 * @returns {Promise<Record<string, { pid: number|null, name: string }>>}
 */
export async function fetchCategories() {
  try {
    const { data } = await labangbaApi.post('/api/home/gnb', {})
    return data.cats ?? {}
  } catch (error) {
    const status = error.response?.status ?? 'unknown'
    throw new Error(`Failed to fetch categories: ${status}`)
  }
}
