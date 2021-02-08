import { GetQuery, PutQuery, QueryHandle, SetQuery } from "./types"

export class Query<TValue extends object> implements QueryHandle<TValue> {
  get: GetQuery<TValue>
  set: SetQuery<TValue>
  put: PutQuery<TValue>

  constructor(
    get: GetQuery<TValue>,
    set: SetQuery<TValue>,
    put: PutQuery<TValue>
  ) {
    this.get = get
    this.set = set
    this.put = put
  }
}
