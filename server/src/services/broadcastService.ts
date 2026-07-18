import { fetchBroadcastList, fetchCategories } from '../clients/labangbaClient.js'
import { mapHomeshoppingBroadcast, mapLiveBroadcast } from '../mappers/broadcastMapper.js'
import type { Broadcast, BroadcastType } from '../types/broadcast.js'
import type { CategoryMap } from '../types/labangba.js'

class HttpError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

let categoryCache: CategoryMap | null = null

/**
 * 카테고리 맵 조회
 * 최초에 외부 API를 호출, 이후에는 메모리 캐시를 반환
 */
async function getCategories(): Promise<CategoryMap> {
  if (!categoryCache) {
    categoryCache = await fetchCategories()
  }
  return categoryCache
}

/**
 * 방송 유형별 목록 조회 (최대 10개)
 *
 * @param type live | homeshopping
 * @throws {HttpError} type이 유효하지 않은 경우 400
 */
export async function getBroadcasts(type: string): Promise<Broadcast[]> {
  if (type !== 'live' && type !== 'homeshopping') {
    throw new HttpError('잘못된 요청 type 입니다.', 400)
  }

  const broadcastType = type as BroadcastType

  if (broadcastType === 'live') {
    const [rawList, cats] = await Promise.all([
      fetchBroadcastList('lb'),
      getCategories(),
    ])

    return rawList
      .slice(0, 10)
      .map((item, index) => mapLiveBroadcast(item, cats, index + 1))
  }

  const rawList = await fetchBroadcastList('hs')
  return rawList
    .slice(0, 10)
    .map((item, index) => mapHomeshoppingBroadcast(item, index + 1))
}

/**
 * 서버 실행 시 카테고리 캐시 미리 로드
 * 실패해도 서버는 계속 실행됨
 */
export async function warmUpCategoryCache(): Promise<void> {
  try {
    await getCategories()
    console.log('카테고리 캐시 로드 완료')
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn('카테고리 캐시 로드 실패:', message)
  }
}
