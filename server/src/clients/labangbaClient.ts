import axios from 'axios'
import env from '../config/env.js'
import type {
  ApiType,
  CategoryMap,
  HomeshoppingItem,
  LiveItem,
} from '../types/labangba.js'

const labangbaApi = axios.create({
  baseURL: env.labangbaBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})


/**
 * 카테고리 목록 조회 (cid → { pid, name })
 */
// 함수 오버로드: apiType('lb'|'hs')에 따라 각각 리턴 타입을 지정
export async function fetchBroadcastList(
  apiType: 'lb',
): Promise<LiveItem[]>
export async function fetchBroadcastList(
  apiType: 'hs',
): Promise<HomeshoppingItem[]>
export async function fetchBroadcastList(
  apiType: ApiType,
): Promise<LiveItem[] | HomeshoppingItem[]> {
  try {
    const { data } = await labangbaApi.post<{ list?: unknown[] }>(
      '/api/assignment/list',
      { type: apiType },
    )
    return Array.isArray(data.list) ? (data.list as LiveItem[] | HomeshoppingItem[]) : []
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? (error.response?.status ?? 'unknown')
      : 'unknown'
    throw new Error(`방송 목록 조회 실패 (${apiType}): ${status}`)
  }
}

/**
 * 카테고리 목록 조회 (cid → { pid, name })
 */
export async function fetchCategories(): Promise<CategoryMap> {
  try {
    const { data } = await labangbaApi.post<{ cats?: CategoryMap }>(
      '/api/home/gnb',
      {},
    )
    return data.cats ?? {}
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? (error.response?.status ?? 'unknown')
      : 'unknown'
    throw new Error(`카테고리 목록 조회 실패 : ${status}`)
  }
}
