export type UseQuery = <TValue extends object>(
  initialValue: TValue,
  stripValues?: any[]
) => [TValue, SetQuery<TValue>, PatchQuery<TValue>]

export type SetQuery<TValue extends object> = (value: Partial<TValue>) => void
export type PatchQuery<TValue extends object> = (value: Partial<TValue>) => void
