export type CategoryMap = Record<
  string,
  {
    pid: number | null
    name: string
  }
>

export type ApiType = 'lb' | 'hs'

export type LiveItem = {
  objectID: string
  platform_id: string
  datetime_start: string
  product_cnt: number
  visit_cnt: number | null
  sales_cnt: number | null
  sales_amt: number | null
  title: string
  cid: number
}

export type HomeshoppingItem = {
  hsshow_id: string
  platform_id: string
  platform_name?: string
  hsshow_title: string
  hsshow_datetime_start: string
  hsshow_datetime_end?: string
  item_cnt: number
  visit_cnt: number | null
  sales_cnt: number | null
  sales_amt: number | null
  cat?: {
    cid: number
    cat_name: string
  }
}

