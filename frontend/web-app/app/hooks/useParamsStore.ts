import { create } from 'zustand'

export enum OrderByOptions {
  make = 'make',
  endingSoon = 'endingSoon',
  new = 'new',
}

export enum FilterByOptions {
  live = 'live',
  endingSoon = 'endingSoon',
  finished = 'finished',
}

type State = {
  pageNumber: number
  pageSize: number
  pageCount: number
  searchTerm: string
  searchValue: string
  orderBy: string
  filterBy: string
  seller?: string
  winner?: string
}

type Actions = {
  setParams: (params: Partial<State>) => void
  reset: () => void
  setSearchValue: (value: string) => void
}

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: '',
  searchValue: '',
  orderBy: OrderByOptions.new,
  filterBy: FilterByOptions.live,
  seller: undefined,
  winner: undefined,
}

export const useParamsStore = create<State & Actions>()((set) => ({
  ...initialState,

  setParams: (newParams: Partial<State>) => {
    set((state) => {
      if (newParams.pageNumber) {
        return {
          ...state,
          pageNumber: newParams.pageNumber,
        }
      }

      return {
        ...state,
        ...newParams,
        pageNumber: 1,
      }
    })
  },

  reset: () => set(initialState),

  setSearchValue: (value: string) => {
    set({ searchValue: value })
  },
}))
