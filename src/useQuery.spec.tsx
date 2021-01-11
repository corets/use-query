import { useQuery } from "./useQuery"
import { MemoryRouter, Route } from "react-router-dom"
import React from "react"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

describe("useQuery", () => {
  let receivedSetQuery: any
  let renders = 0
  it("uses query", () => {
    const Test = () => {
      renders++
      const [query, setQuery] = useQuery({ foo: "foo" })
      receivedSetQuery = setQuery

      return <h1>{query.foo}</h1>
    }

    const wrapper = mount(
      <MemoryRouter>
        <Route component={Test} />
      </MemoryRouter>
    )
    const target = wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target.text()).toBe("foo")

    act(() => receivedSetQuery({ foo: "bar" }))
    expect(renders).toBe(2)
    expect(target.text()).toBe("bar")
  })
})
