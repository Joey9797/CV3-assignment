import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
// import { BroadcastList } from "@/components/BroadcastList"

export function BroadcastPage() {
  // TODO: type state, fetch, loading/error/empty
  return (
    <main className="px-4 py-6 sm:px-6">
      <Tabs defaultValue="live">
        <TabsList>
          <TabsTrigger value="live">라방</TabsTrigger>
          <TabsTrigger value="homeshopping">홈쇼핑</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <BroadcastList /> */}
    </main>
  )
}
