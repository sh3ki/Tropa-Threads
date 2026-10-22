export type Filter = 'all' | 'tees' | 'caps' | 'other' | 'oversized' | 'graphic'

export interface Product {
  id: string
  name: string
  category: 'tees' | 'caps' | 'other'
  style?: 'oversized' | 'graphic' | 'essential'
  price: number
  image: string
  imageAlt: string
  sizes: string[]
  condition: string
  badge?: string
  description: string
}
