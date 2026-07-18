import dayjs from "dayjs"
import "dayjs/locale/ko"

import type { Broadcast, BroadcastType } from "@/types/broadcast"

type BroadcastItemProps = {
  item: Broadcast
  type: BroadcastType
}

/**
 * 방송 시간 포맷팅
 * - yyyy-mm-ddThh:mm:00+09:00 → yyyy.mm.dd (ddd) hh:mm 변환
 */
function formatBroadcastTime(value: string | null) {
  if (!value) return "-"
  const date = dayjs(value)
  if (!date.isValid()) return "-"
  return date.locale("ko").format("YY.MM.DD (ddd) HH:mm")
}

/**
 * 비로그인 가림 처리
 * - md 미만: 자물쇠 + 로그인 필요 표시
 * - md 이상: 자물쇠 + 항목 라벨 표시
 */
function MetricValue({
  label,
  value,
}: {
  label?: string
  value: number | null
}) {
  const content =
    value == null ? (
      <span className="text-muted-foreground">
        <span className="md:hidden" aria-label="로그인 필요">
          🔒
        </span>
        <span className="hidden md:inline">🔒 로그인</span>
      </span>
    ) : (
      <span>{value}</span>
    )

  return (
    <span className="inline-flex items-center gap-0.5">
      {label ? <span className="md:hidden">{label}</span> : null}
      {content}
    </span>
  )
}

/**
 * 방송 목록 item
 * - md 이상: 한 줄 테이블형
 * - md 미만: 세로로 줄바꿈
 */
export function BroadcastItem({ item, type }: BroadcastItemProps) {
  const broadcastTime = formatBroadcastTime(item.broadcastTime)
  const viewLabel = type === "live" ? "조회수" : "시청률"

  return (
    <article className="w-full border-b border-border">
      <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-4">
        {/* 덩어리1: 순위, 플랫폼, 제목 */}
        <div className="grid min-w-0 flex-1 grid-cols-[1.5rem_5rem_minmax(0,1fr)] items-baseline gap-2">
          <span className="font-bold">{item.rankNo}</span>
          <p className="truncate text-xs text-muted-foreground">{item.platform}</p>
          <p className="truncate font-medium text-foreground">{item.title}</p>
        </div>

        {/* 덩어리2: 카테고리, 시간, 지표, 상품수 */}
        <div className="flex max-w-140 shrink-0 items-center gap-1 pl-8 text-xs text-muted-foreground md:w-[34rem] md:pl-0 md:text-sm md:gap-4">
          <span className="w-20 shrink-0 truncate">{item.category}</span>
          <span className="w-30 shrink-0">{broadcastTime}</span>

          <span className="flex-1">
            <MetricValue label={viewLabel} value={item.viewCount} />
          </span>
          <span className="flex-1">
            <MetricValue label="판매" value={item.salesCount} />
          </span>
          <span className="flex-1">
            <MetricValue label="매출" value={item.revenue} />
          </span>

          <span className="w-10 shrink-0">{item.itemCount}</span>
        </div>
      </div>
    </article>
  )
}
