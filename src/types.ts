export type UseQuery = <TState extends object>(initialState: TState) => [TState, (state: Partial<TState>) => void]
