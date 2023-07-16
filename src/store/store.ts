import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import zukeeper from 'zukeeper'

interface BeerState {
    beerListAll: any,
    beerListRendered: any,
    setBeerList: (beers: any) => void,
    filterBeerList: (filter: string) => void,
    addToBeerListRendered: (beers: any) => void,
}

  export const useBeerStore: any = create<BeerState>()( 
    zukeeper(
        (set: any) => ({
            beerListAll: [],
            beerListRendered: [],
            setBeerList: (beersFromApi: any) => set((state: any) => ({ beerListAll: [...beersFromApi] })),
            setBeerListRendered: () => set((state: any) => ({ beerListRendered: state.beerListAll.slice(0,15) })),
            filterBeerList: (filter: string) => set((state: any) => ({ beerListRendered: state.beerListRendered.filter((beer: any) => beer.id !== filter) })),
            addToBeerListRendered: (newBeers: any) => set((state: any) => ({ beerListRendered: [...state.beerListRendered, ...newBeers] })),
            })
    )   
)

window.store = useBeerStore 

// export const useBeerStore: any = create<BeerState>()(
//     devtools(
//       persist(
//         (set) => ({
//             beerListAll: [],
//             beerListRendered: [],
//             setBeerList: (beersFromApi) => set((state) => ({ beerListAll: beersFromApi })),
//             filterBeerList: (filter: string) => set((state) => ({ beerListRendered: state.beerListRendered.filter((beer: any) => beer.id !== filter) })),
//             addToBeerListRendered: (newBeers) => set((state) => ({ beerListRendered: [...state.beerListRendered, ...newBeers] })),
//         }),
//         {
//           name: 'beer-storage',
//         }
//       )
//     )
//   )