import type { ReactNode } from 'react'
import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

import GET_DATA from '../graphql/query.getSEOData.gql'

interface State {
  mainTitle: string | null
  mainParagraph: string | null
  col1Title: string | null
  col1Paragraph: string | null
  col2Title: string | null
  col2Paragraph: string | null
  col3Title: string | null
  col3Paragraph: string | null
  linksTitle: string | null
  links: string | null
}

type SEOContextType = {
  state: State
  dispatch: any
}

interface Actions {
  type: 'SET_DATA'
  args?: any
}

interface Facet {
  id: string
  key: string
  value: string
  quantity: number
  selected: boolean
  link: string | null
  name: string
}

const initialState: State = {
  mainTitle: null,
  mainParagraph: null,
  col1Title: null,
  col1Paragraph: null,
  col2Title: null,
  col2Paragraph: null,
  col3Title: null,
  col3Paragraph: null,
  linksTitle: null,
  links: null,
}

const reducer = (state: State, { type, args }: Actions) => {
  switch (type) {
    case 'SET_DATA': {
      return args
    }

    default:
      return state
  }
}

const SEOContext = createContext<SEOContextType>({
  state: initialState,
  dispatch: () => {},
})

const parseData = (data: any) => {
  return data
}

const getCategoryIdFromFacets = (selectedFacets: Facet[]) => {
  const categoriesSelected = selectedFacets
    .filter((facet) => !!/^category-\d+/.test(facet?.key ?? ''))
    .sort(
      (a, b) =>
        Number.parseInt(a?.key?.replace('category-', ''), 10) -
        Number.parseInt(b?.key?.replace('category-', ''), 10)
    )

  const [lastCategorySelected] = categoriesSelected?.reverse()

  return lastCategorySelected?.id ?? null
}

interface SEOContextProviderProps {
  isHome?: string | null
  children?: ReactNode | undefined
}

export const SEOContextProvider = ({
  isHome = null,
  children,
}: SEOContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { selectedFacets, params } = useSearchPage()
  const [getData, { called, data, error }] = useLazyQuery(GET_DATA)

  useEffect(() => {
    const categoryId = isHome
      ? 'main-site-home'
      : params?.id !== 'search'
      ? params?.id
      : getCategoryIdFromFacets(selectedFacets)

    if (categoryId) {
      getData({
        variables: {
          categoryId,
        },
      })
    }
  }, [getData, isHome, params?.id, selectedFacets])

  useEffect(() => {
    if (called) {
      if (error) {
        console.error(error)
      } else {
        dispatch({
          type: 'SET_DATA',
          args: parseData(data?.getSEOData ?? {}),
        })
      }
    }
  }, [called, data, error])

  return (
    <SEOContext.Provider value={{ state, dispatch }}>
      {children}
    </SEOContext.Provider>
  )
}

export const useSEOContext = () => {
  return useContext(SEOContext)
}
