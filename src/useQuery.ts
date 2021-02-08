import { useHistory } from "react-router"
import { parse, stringify } from "query-string"
import { GetQuery, PutQuery, SetQuery, UseQuery } from "./types"
import { Query } from "./Query"
import { useMemo } from "react"

export const useQuery: UseQuery = <TValue extends object>(
  initialValue,
  stripValues = [undefined, null, "", 0, "0"]
) => {
  const history = useHistory()
  const queryString = history.location.search

  return useMemo(() => {
    const query = {
      ...initialValue,
      ...parse(queryString),
    }

    const updateQuery = (state) => {
      const newQueryString = stringify(
        pickBy(state, (value) => !stripValues.includes(value))
      )

      history.push({ search: newQueryString })
    }

    const get: GetQuery<TValue> = () => query
    const set: SetQuery<TValue> = (state) => updateQuery(state)
    const put: PutQuery<TValue> = (state) => updateQuery({ ...query, ...state })

    return new Query(get, set, put)
  }, [queryString])
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
