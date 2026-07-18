import { BroadcastItem } from "@/components/BroadcastItem"
import type { Broadcast, BroadcastType } from "@/types/broadcast"

type BroadcastListProps = {
  items: Broadcast[]
  type: BroadcastType
}

/**
 * 방송 목록
 * md 미만에서는 헤더 숨김
 */
export function BroadcastList({ items, type }: BroadcastListProps) {
  const viewLabel = type === "live" ? "조회수" : "시청률"

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1080px] py-12 text-center text-sm text-muted-foreground">
        현재 방송 목록이 없습니다
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      {/* PC view 용 헤더 */}
      <div className="hidden border-b border-border py-3 text-xs text-muted-foreground md:flex md:items-center md:gap-3">
        <div className="min-w-0 flex-1">방송정보</div>
        <div className="flex w-[34rem] shrink-0 items-center gap-4">
          <span className="w-20 shrink-0">분류</span>
          <span className="w-30 shrink-0">방송시간</span>
          <span className="flex-1">{viewLabel}</span>
          <span className="flex-1">판매량</span>
          <span className="flex-1">매출액</span>
          <span className="w-10 shrink-0">상품수</span>
        </div>
      </div>

      <div>
        {items.map((item) => (
          <BroadcastItem key={item.id} item={item} type={type} />
        ))}
      </div>
    </div>
  )
}
