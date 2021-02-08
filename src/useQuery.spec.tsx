import { useQuery } from "./useQuery"
import { MemoryRouter, Route } from "react-router"
import React from "react"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

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

    const wrapper = mount(
      <MemoryRouter>
        <Route component={Test} />
      </MemoryRouter>
    )
    const target = wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target.text()).toBe("foo,baz")

    act(() => receivedPatchQuery({ bar: "yolo" }))

    expect(renders).toBe(2)
    expect(target.text()).toBe("foo,yolo")

    act(() => receivedSetQuery({ foo: "swag" }))

    expect(renders).toBe(3)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedSetQuery({ foo: "swag" }))

    expect(renders).toBe(4)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: "" }))

    expect(renders).toBe(5)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: null }))

    expect(renders).toBe(6)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: undefined }))

    expect(renders).toBe(7)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: 0 }))

    expect(renders).toBe(8)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: "0" }))

    expect(renders).toBe(9)
    expect(target.text()).toBe("swag,baz")

    act(() => receivedPatchQuery({ bar: "x" }))

    expect(renders).toBe(10)
    expect(target.text()).toBe("swag,x")
  })
})
