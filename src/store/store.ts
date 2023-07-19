import { create } from 'zustand'
import zukeeper from 'zukeeper'

export interface BeerItem {
    id: string,
    name: string,
    tagline: string,
    food_pairing: string[],
    first_brewed: string,
    image_url: string,
    description: string,
}

export interface BeerState {
    beerListAll: BeerItem[],
    setBeerList: (beers: BeerItem[]) => BeerItem[],
    filterBeerListAll: (filter: string[]) => BeerItem[],
}

  export const useBeerStore = create<BeerState>()( 
    zukeeper(
        (set: any) => ({
            beerListAll: [],
            setBeerList: (beersFromApi: BeerState[], idArrToDel?: any) => set((state: BeerState) => {
                const data = [...state.beerListAll, ...beersFromApi]
                const newData = data.filter((item: any) => idArrToDel.indexOf(item.id) === -1)
                return { beerListAll: [...newData] }
            }),
            filterBeerListAll: (idArrToDel: string[]) => set((state: BeerState) => ({ beerListAll: state.beerListAll.filter((beer: BeerItem) => idArrToDel.indexOf(beer.id) === -1 )})),
            })
    )   
)

window.store = useBeerStore 
