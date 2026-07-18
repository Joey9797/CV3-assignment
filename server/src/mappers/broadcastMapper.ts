import { getLivePlatformName } from '../constants/livePlatformNames.js'
import type { Broadcast } from '../types/broadcast.js'
import type {
  CategoryMap,
  HomeshoppingItem,
  LiveItem,
} from '../types/labangba.js'

/**
 * 라방 cid를 화면용 분류명(대분류)으로 변환
 * pid가 대분류(null)인 경우 그대로 반환, 소분류인 경우 상위 대분류명을 반환
 *
 * @param cid 소분류(또는 대분류) 카테고리 id
 * @param cats gnb 카테고리 맵
 */
export function getCategoryName(cid: number | string, cats: CategoryMap): string {
  const sub = cats[String(cid)]
  if (!sub) return '기타'
  if (sub.pid === null) return sub.name

  const parent = cats[String(sub.pid)]
  return parent ? parent.name : sub.name
}

/**
 * 라방바 날짜 문자열을 ISO 8601(KST, +09:00)로 변환
 * YMMDDHHmm(10) YYYYMMDDHHmm(12) -> yyyy-mm-ddThh:mm:00+09:00
 *
 * @param value 라방바 raw datetime
 */
function toIso8601(value: string | null | undefined): string | null {
  if (!value) return null

  const normalized = value.length === 10 ? `20${value}` : value
  if (normalized.length !== 12) return null

  const year = normalized.slice(0, 4)
  const month = normalized.slice(4, 6)
  const day = normalized.slice(6, 8)
  const hour = normalized.slice(8, 10)
  const minute = normalized.slice(10, 12)

  return `${year}-${month}-${day}T${hour}:${minute}:00+09:00`
}

/**
 * 라방(live) raw 응답을 공통 Broadcast DTO로 변환
 *
 * @param item 라방바 live 목록 항목
 * @param cats 카테고리 맵 (cid → 분류명 변환용)
 * @param rankNo 순위 (1~10)
 */
export function mapLiveBroadcast(
  item: LiveItem,
  cats: CategoryMap,
  rankNo: number,
): Broadcast {
  return {
    id: item.objectID,
    type: 'live',
    title: item.title ?? '',
    platform: getLivePlatformName(item.platform_id),
    category: getCategoryName(item.cid, cats),
    broadcastTime: toIso8601(item.datetime_start),
    viewCount: item.visit_cnt ?? null,
    salesCount: item.sales_cnt ?? null,
    revenue: item.sales_amt ?? null,
    itemCount: item.product_cnt ?? 0,
    rankNo,
  }
}

/**
 * 홈쇼핑(homeshopping) raw 응답을 공통 Broadcast DTO로 변환
 *
 * @param item 라방바 홈쇼핑 목록 항목
 * @param rankNo 순위 (1~10)
 */
export function mapHomeshoppingBroadcast(
  item: HomeshoppingItem,
  rankNo: number,
): Broadcast {
  return {
    id: item.hsshow_id,
    type: 'homeshopping',
    title: item.hsshow_title ?? '',
    platform: item.platform_name ?? '',
    category: item.cat?.cat_name ?? '기타',
    broadcastTime: toIso8601(item.hsshow_datetime_start),
    viewCount: item.visit_cnt ?? null,
    salesCount: item.sales_cnt ?? null,
    revenue: item.sales_amt ?? null,
    itemCount: item.item_cnt ?? 0,
    rankNo,
  }
}
