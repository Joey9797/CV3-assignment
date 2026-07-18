import { useEffect, useState } from "react"

import { getBroadcasts } from "@/api/broadcasts"
import { BroadcastList } from "@/components/BroadcastList"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
import type { Broadcast, BroadcastType } from "@/types/broadcast"

export function BroadcastPage() {
  const [type, setType] = useState<BroadcastType>("live")
  const [items, setItems] = useState<Broadcast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 이 요청이 아직 유효한지. cleanup에서 true로 바뀜.
    let cancelled = false

    // API 응답을 기다렸다가, 유효한 요청일 때만 state 갱신
    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await getBroadcasts({ type })
        // 응답 도착 시점에 검사. 새로운 요청이 발생했으면(cancelled가 true) 이전 요청 응답으로 덮어쓰지 않음
        if (!cancelled) {
          setItems(data)
        }
      } catch (err) {
        if (!cancelled) {
          setItems([])
          setError(
            err instanceof Error ? err.message : "방송 목록을 불러오지 못했습니다."
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    // 응답을 기다리지 않고 바로 시작 (이전 요청과 동시에 나갈 수 있음)
    void load()

    // React가 type 변경/언마운트 전에 호출. 이 effect의 요청을 무효화
    return () => {
      cancelled = true
    }
  }, [type])

  return (
    <main className="px-8 py-12">
      <div className="mx-auto w-full max-w-[1080px]">
        <h1 className="mb-4 text-lg font-semibold">라방바 데이터랩 방송 리스트</h1>
        <Tabs
          value={type}
          onValueChange={(value) => setType(value as BroadcastType)}
        >
          <TabsList>
            <TabsTrigger value="live">라이브 방송</TabsTrigger>
            <TabsTrigger value="homeshopping">홈쇼핑</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="mx-auto w-full max-w-[1080px] py-12 text-center text-sm text-muted-foreground">
            불러오는 중...
          </div>
        ) : error ? (
          <div className="mx-auto w-full max-w-[1080px] py-12 text-center text-sm text-destructive">
            {error}
          </div>
        ) : (
          <BroadcastList items={items} type={type} />
        )}
      </div>
    </main>
  )
}
