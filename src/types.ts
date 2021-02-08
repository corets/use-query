export type UseQuery = <TValue extends object>(
  initialValue: TValue,
  stripValues?: any[]
) => QueryHandle<TValue>

export type GetQuery<TValue extends object> = () => TValue
export type SetQuery<TValue extends object> = (value: Partial<TValue>) => void
export type PutQuery<TValue extends object> = (value: Partial<TValue>) => void

export interface QueryHandle<TValue extends object> {
  get: GetQuery<TValue>
  set: SetQuery<TValue>
  put: PutQuery<TValue>
}
