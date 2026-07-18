export type BroadcastType = 'live' | 'homeshopping'

export type Broadcast = {
  id: string
  type: BroadcastType
  title: string
  category: string
  broadcastTime: string | null
  viewCount: number | null
  salesCount: number | null
  revenue: number | null
  itemCount: number
  rankNo: number
}
