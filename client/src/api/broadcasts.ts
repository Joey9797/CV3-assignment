import type { Broadcast, BroadcastType } from "@/types/broadcast"

/**
 * GET /api/broadcasts?type=live|homeshopping
 */
export async function fetchBroadcasts(
  type: BroadcastType
): Promise<Broadcast[]> {
  // TODO: implement
  void type
  return []
}
