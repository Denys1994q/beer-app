import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BeerState {
    beerList: any,
    setBeerList: (beers: any) => void,
    filterBeerList: (filter: string) => void,
}

  export const useBeerStore: any = create<BeerState>()(
    devtools(
      persist(
        (set) => ({
        beerList: null,
        setBeerList: (beersFromApi) => set(() => ({ beerList: beersFromApi })),
        filterBeerList: (filter: string) => set((state) => ({ beerList: state.beerList.filter((beer: any) => beer.id !== filter) }))
        }),
        
        {
          name: 'beer-storage',
        }
      )
    )
  )