import axios from "axios"

import type { Broadcast, BroadcastType } from "@/types/broadcast"

type BroadcastsResponse = {
  data: Broadcast[]
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

/**
 * GET /api/broadcasts?type=live|homeshopping
 */
export async function getBroadcasts(params: {
  type: BroadcastType
}): Promise<Broadcast[]> {
  const { data } = await api.get<BroadcastsResponse>("/api/broadcasts", {
    params,
  })
  return data.data
}
