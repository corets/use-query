import { useHistory } from "react-router"
import { parse, stringify } from "query-string"
import { UseQuery } from "./types"

export const useQuery: UseQuery = (initialState) => {
  const history = useHistory()
  const queryString = history.location.search

  const query = {
    ...initialState,
    ...parse(queryString),
  }

  const setQuery = (state) => {
    const newQuery = pickBy(
      { ...query, ...state },
      (value) => ![undefined, null, 0, ""].includes(value)
    )

    const newQueryString = stringify(newQuery)

    history.push({ search: newQueryString })
  }

  return [query, setQuery]
}

const pickBy = (
  object: Record<any, any>,
  predicate: (value: any) => boolean
): Record<any, any> => {
  return Object.keys(object).reduce((accumulator, key) => {
    const value = object[key]

    if (predicate(value)) {
      accumulator[key] = value
    }

    return accumulator
  }, {})
}
