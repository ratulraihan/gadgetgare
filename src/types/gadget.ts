export interface Gadget {
  id: string
  name: string
  category: string
  price: number
  description: string
  imageUrl: string
  isNew?: boolean
  rating: number
  highlights: Array<{
    name: string
    value: string
  }>
  specs: {
    general: Record<string, any>
    display: Record<string, any>
    performance: Record<string, any>
    camera?: Record<string, any>
    connectivity: Record<string, any>
    battery: Record<string, any>
    additional?: Record<string, any>
  }
}