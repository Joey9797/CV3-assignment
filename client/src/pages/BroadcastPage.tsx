import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"


export function BroadcastPage() {
  // TODO: type state, fetch, loading/error/empty
  return (
    <main className="px-8 py-12">
      <div className="mx-auto w-full max-w-[1080px]">
        <h1 className="mb-4 text-lg font-semibold">라방바 데이터랩 방송 리스트</h1>
        <Tabs defaultValue="live">
          <TabsList>
            <TabsTrigger value="live">라이브 방송</TabsTrigger>
            <TabsTrigger value="homeshopping">홈쇼핑</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </main>
  )
}
