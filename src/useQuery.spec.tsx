import { useQuery } from "./useQuery"
import { MemoryRouter, Route } from "react-router-dom"
import React from "react"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

describe("useQuery", () => {
  let receivedQuery: any
  let renders = 0
  it("uses query", () => {
    const Test = () => {
      renders++
      const query = useQuery({ foo: "foo", bar: "baz" })
      receivedQuery = query

      return (
        <h1>
          {query.get().foo},{query.get().bar}
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

    act(() => receivedQuery.put({ bar: "yolo" }))

    expect(renders).toBe(2)
    expect(target.text()).toBe("foo,yolo")

    act(() => receivedQuery.set({ foo: "swag" }))

    expect(renders).toBe(3)
    expect(target.text()).toBe("swag,baz")

    const cachedInstance = receivedQuery

    act(() => receivedQuery.set({ foo: "swag" }))

    expect(renders).toBe(4)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: "" }))

    expect(renders).toBe(5)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: null }))

    expect(renders).toBe(6)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: undefined }))

    expect(renders).toBe(7)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: 0 }))

    expect(renders).toBe(8)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: "0" }))

    expect(renders).toBe(9)
    expect(target.text()).toBe("swag,baz")
    expect(cachedInstance === receivedQuery).toBe(true)

    act(() => receivedQuery.put({ bar: "x" }))

    expect(renders).toBe(10)
    expect(target.text()).toBe("swag,x")
    expect(cachedInstance === receivedQuery).toBe(false)
  })
})
