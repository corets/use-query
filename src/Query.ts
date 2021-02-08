import { GetQuery, PatchQuery, QueryHandle, SetQuery } from "./types"

export class Query<TValue extends object> implements QueryHandle<TValue> {
  get: GetQuery<TValue>
  set: SetQuery<TValue>
  put: PatchQuery<TValue>

  constructor(
    get: GetQuery<TValue>,
    set: SetQuery<TValue>,
    put: PatchQuery<TValue>
  ) {
    this.get = get
    this.set = set
    this.put = put
  }
}
