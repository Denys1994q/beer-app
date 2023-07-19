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

interface BeerState {
    // всі товари, з яких фільтрується список для товарів, які потрапляють в рендер
    beerListAll: BeerItem[],
    setBeerList: (beers: BeerItem[]) => void,
    filterBeerListAll: (filter: string[]) => void,
}

  export const useBeerStore = create<BeerState>()( 
    zukeeper(
        (set: any) => ({
            beerListAll: [],
            setBeerList: (beersFromApi: BeerState[], idArrToDel?: any) => set((state: BeerState) => {
                console.log('idArrToDel', idArrToDel)
                const data = [...state.beerListAll, ...beersFromApi]
                console.log('data', data)
                const newD = data.filter((item: any) => idArrToDel.indexOf(item.id) === -1)
                console.log('newD', newD)
                
                return { beerListAll: [...newD] }
            }),
            filterBeerListAll: (idArrToDel: string[]) => set((state: BeerState) => ({ beerListAll: state.beerListAll.filter((beer: BeerItem) => idArrToDel.indexOf(beer.id) === -1 )})),
            })
    )   
)

window.store = useBeerStore 
