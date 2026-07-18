import type { Broadcast } from '../types/broadcast.js'
import type {
  CategoryMap,
  HomeshoppingItem,
  LiveItem,
} from '../types/labangba.js'

/**
 * 라방 cid(소분류) → 대분류 name
 */
export function getCategoryName(cid: number | string, cats: CategoryMap): string {
  const sub = cats[String(cid)]
  if (!sub) return '기타'
  if (sub.pid === null) return sub.name

  const parent = cats[String(sub.pid)]
  return parent ? parent.name : sub.name
}

/**
 * YYMMDDHHmm(10) 또는 YYYYMMDDHHmm(12) → ISO 8601 (KST, +09:00)
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

export function mapLiveBroadcast(
  item: LiveItem,
  cats: CategoryMap,
  rankNo: number,
): Broadcast {
  return {
    id: item.objectID,
    type: 'live',
    title: item.title ?? '',
    category: getCategoryName(item.cid, cats),
    broadcastTime: toIso8601(item.datetime_start),
    viewCount: item.visit_cnt ?? null,
    salesCount: item.sales_cnt ?? null,
    revenue: item.sales_amt ?? null,
    itemCount: item.product_cnt ?? 0,
    rankNo,
  }
}

export function mapHomeshoppingBroadcast(
  item: HomeshoppingItem,
  rankNo: number,
): Broadcast {
  return {
    id: item.hsshow_id,
    type: 'homeshopping',
    title: item.hsshow_title ?? '',
    category: item.cat?.cat_name ?? '기타',
    broadcastTime: toIso8601(item.hsshow_datetime_start),
    viewCount: item.visit_cnt ?? null,
    salesCount: item.sales_cnt ?? null,
    revenue: item.sales_amt ?? null,
    itemCount: item.item_cnt ?? 0,
    rankNo,
  }
}
