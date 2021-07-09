import { useQuery } from "./useQuery"
import { MemoryRouter, Route } from "react-router"
import React from "react"
import { act, render, screen } from "@testing-library/react"

describe("useQuery", () => {
  let receivedQuery: any
  let receivedSetQuery: any
  let receivedPatchQuery: any
  let renders = 0

  it("uses query", () => {
    const Test = () => {
      renders++
      const [query, setQuery, patchQuery] = useQuery({ foo: "foo", bar: "baz" })
      receivedQuery = query
      receivedSetQuery = setQuery
      receivedPatchQuery = patchQuery

      return (
        <h1>
          {query.foo},{query.bar}
        </h1>
      )
    }

    render(<MemoryRouter>
      <Route component={Test} />
    </MemoryRouter>)

    const target = screen.getByRole("heading")

    expect(renders).toBe(1)
    expect(target).toHaveTextContent("foo,baz")

    act(() => receivedPatchQuery({ bar: "yolo" }))

    expect(renders).toBe(2)
    expect(target).toHaveTextContent("foo,yolo")

    act(() => receivedSetQuery({ foo: "swag" }))

    expect(renders).toBe(3)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedSetQuery({ foo: "swag" }))

    expect(renders).toBe(4)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: "" }))

    expect(renders).toBe(5)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: null }))

    expect(renders).toBe(6)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: undefined }))

    expect(renders).toBe(7)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: 0 }))

    expect(renders).toBe(8)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: "0" }))

    expect(renders).toBe(9)
    expect(target).toHaveTextContent("swag,baz")

    act(() => receivedPatchQuery({ bar: "x" }))

    expect(renders).toBe(10)
    expect(target).toHaveTextContent("swag,x")
  })
})
