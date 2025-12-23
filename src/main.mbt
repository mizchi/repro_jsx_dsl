// Minimal reproduction case for optional argument bundle size issue
//
// Switch between cases by commenting/uncommenting:
// - case1(): Simple counter (minimal)
// - case2(): Complex app with multiple components (realistic)

// =============================================================================
// Case 1: Simple Counter (Minimal)
// =============================================================================

///|
fn case1() -> @dom.DomNode {
  let count = @signal.Signal::new(0)
  @dom.div(class="container", [
    @dom.h1([@dom.text("Counter")]),
    @dom.div(class="count", [@dom.text_sig(count)]),
    @dom.button(on=@dom.events().click(fn(_) { count.set(count.get() + 1) }), [
      @dom.text("+"),
    ]),
    @dom.button(on=@dom.events().click(fn(_) { count.set(count.get() - 1) }), [
      @dom.text("-"),
    ]),
  ])
}

// =============================================================================
// Case 2: Complex App (Realistic)
// =============================================================================

// Counter with computed values

///|
fn counter_section() -> @dom.DomNode {
  let count = @signal.Signal::new(0)
  let doubled = @signal.memo(fn() { count.get() * 2 })
  let is_even = @signal.memo(fn() { count.get() % 2 == 0 })
  @dom.div(class="section counter-section", [
    @dom.h2([@dom.text("Counter")]),
    @dom.p([@dom.text_dyn(fn() { "Count: \{count.get()}" })]),
    @dom.p([@dom.text_dyn(fn() { "Doubled: \{doubled()}" })]),
    @dom.p([@dom.text_dyn(fn() { if is_even() { "Even" } else { "Odd" } })]),
    @dom.div(class="buttons", [
      @dom.button(
        on=@dom.events().click(fn(_) { count.update(fn(n) { n - 1 }) }),
        [@dom.text("-")],
      ),
      @dom.button(
        on=@dom.events().click(fn(_) { count.update(fn(n) { n + 1 }) }),
        [@dom.text("+")],
      ),
      @dom.button(on=@dom.events().click(fn(_) { count.set(0) }), [
        @dom.text("Reset"),
      ]),
    ]),
  ])
}

// Input with character count

///|
fn input_section() -> @dom.DomNode {
  let text = @signal.Signal::new("")
  let char_count = @signal.memo(fn() { text.get().length() })
  @dom.div(class="section input-section", [
    @dom.h2([@dom.text("Input")]),
    @dom.input(
      type_="text",
      placeholder="Type something...",
      on=@dom.events().input(fn(e) {
        let target : @js.Any = e.target() |> @js.identity
        let value : String = target._get("value").cast()
        text.set(value)
      }),
    ),
    @dom.p([@dom.text_dyn(fn() { "Characters: \{char_count()}" })]),
    @dom.p([@dom.text_dyn(fn() { "You typed: \{text.get()}" })]),
  ])
}

// Conditional rendering

///|
fn conditional_section() -> @dom.DomNode {
  let show_message = @signal.Signal::new(true)
  @dom.div(class="section conditional-section", [
    @dom.h2([@dom.text("Conditional")]),
    @dom.button(
      on=@dom.events().click(fn(_) { show_message.update(fn(b) { not(b) }) }),
      [@dom.text_dyn(fn() { if show_message.get() { "Hide" } else { "Show" } })],
    ),
    @dom.show(fn() { show_message.get() }, fn() {
      @dom.div(
        class="message",
        style="padding: 10px; background-color: #e0f7fa; margin-top: 10px;",
        [@dom.text("This message is conditionally rendered.")],
      )
    }),
  ])
}

// Todo item structure

///|
priv struct TodoItem {
  id : Int
  text : String
  completed : Bool
}

// Todo list with for_each

///|
fn todo_section() -> @dom.DomNode {
  let todos : @signal.Signal[Array[TodoItem]] = @signal.Signal::new([])
  let input_text = @signal.Signal::new("")
  let next_id = @signal.Signal::new(1)
  let total = @signal.memo(fn() { todos.get().length() })
  let completed_count = @signal.memo(fn() {
    todos.get().filter(fn(item) { item.completed }).length()
  })
  fn add_todo() {
    let text = input_text.get()
    if text != "" {
      let id = next_id.get()
      next_id.set(id + 1)
      todos.update(fn(items) {
        let new_items = items.copy()
        new_items.push({ id, text, completed: false })
        new_items
      })
      input_text.set("")
    }
  }

  fn toggle_todo(id : Int) {
    todos.update(fn(items) {
      items.map(fn(item) {
        if item.id == id {
          { ..item, completed: not(item.completed) }
        } else {
          item
        }
      })
    })
  }

  fn remove_todo(id : Int) {
    todos.update(fn(items) { items.filter(fn(item) { item.id != id }) })
  }

  @dom.div(class="section todo-section", [
    @dom.h2([@dom.text("Todo List")]),
    @dom.form(
      on=@dom.events().submit(fn(e) {
        e.preventDefault()
        add_todo()
      }),
      [
        @dom.input(
          type_="text",
          placeholder="Add a todo...",
          on=@dom.events().input(fn(e) {
            let target : @js.Any = e.target() |> @js.identity
            input_text.set(target._get("value").cast())
          }),
        ),
        @dom.create_element("button", [("type", @dom.attr_static("submit"))], [
          @dom.text("Add"),
        ]),
      ],
    ),
    @dom.p([@dom.text_dyn(fn() { "\{completed_count()}/\{total()} completed" })]),
    @dom.ul([
      @dom.for_each(fn() { todos.get() }, fn(todo, _index) {
        let todo_id = todo.id
        @dom.create_element(
          "li",
          [
            (
              "style",
              @dom.attr_dynamic(fn() {
                let is_completed = todos
                  .get()
                  .iter()
                  .any(fn(item) { item.id == todo_id && item.completed })
                if is_completed {
                  "text-decoration: line-through; opacity: 0.6;"
                } else {
                  "text-decoration: none; opacity: 1;"
                }
              }),
            ),
          ],
          [
            @dom.span(
              style="cursor: pointer;",
              on=@dom.events().click(fn(_) { toggle_todo(todo_id) }),
              [@dom.text(todo.text)],
            ),
            @dom.button(
              style="margin-left: 10px;",
              on=@dom.events().click(fn(_) { remove_todo(todo_id) }),
              [@dom.text("x")],
            ),
          ],
        )
      }),
    ]),
  ])
}

// Parse int helper using JS parseInt

///|
extern "js" fn parse_int(s : String) -> Int? =
  #|(s) => { const n = parseInt(s, 10); return isNaN(n) ? undefined : n; }

// Style example with dynamic styles

///|
fn style_section() -> @dom.DomNode {
  let hue = @signal.Signal::new(180)
  let size = @signal.Signal::new(100)
  @dom.div(class="section style-section", [
    @dom.h2([@dom.text("Dynamic Style")]),
    @dom.create_element(
      "div",
      [
        (
          "style",
          @dom.attr_dynamic(fn() {
            "width: \{size.get()}px; height: \{size.get()}px; background-color: hsl(\{hue.get()}, 70%, 50%); transition: all 0.3s ease; border-radius: 8px;"
          }),
        ),
      ],
      [],
    ),
    @dom.div([
      @dom.label([@dom.text("Hue: ")]),
      @dom.input(
        type_="range",
        value="180",
        attrs=[("min", @dom.Attr::AttrInt(0)), ("max", @dom.Attr::AttrInt(360))],
        on=@dom.events().input(fn(e) {
          let target : @js.Any = e.target() |> @js.identity
          let value : String = target._get("value").cast()
          match parse_int(value) {
            Some(n) => hue.set(n)
            None => ()
          }
        }),
      ),
    ]),
    @dom.div([
      @dom.label([@dom.text("Size: ")]),
      @dom.input(
        type_="range",
        value="100",
        attrs=[
          ("min", @dom.Attr::AttrInt(50)),
          ("max", @dom.Attr::AttrInt(200)),
        ],
        on=@dom.events().input(fn(e) {
          let target : @js.Any = e.target() |> @js.identity
          let value : String = target._get("value").cast()
          match parse_int(value) {
            Some(n) => size.set(n)
            None => ()
          }
        }),
      ),
    ]),
  ])
}

///|
fn case2() -> @dom.DomNode {
  @dom.div(
    class="app",
    style="padding: 20px; max-width: 800px; margin: 0 auto;",
    [
      @dom.h1([@dom.text("Luna Examples - Complex App")]),
      @dom.p([
        @dom.text("Multiple components demonstrating bundle size impact."),
      ]),
      @dom.hr(),
      counter_section(),
      @dom.hr(),
      input_section(),
      @dom.hr(),
      conditional_section(),
      @dom.hr(),
      todo_section(),
      @dom.hr(),
      style_section(),
    ],
  )
}

// =============================================================================
// Main - Switch between cases here
// =============================================================================

///|
fn main {
  // ===== CASE 1: Simple Counter =====
  // let view = case1()

  // ===== CASE 2: Complex App =====
  let view = case2()
  match @js_dom.document().getElementById("app") {
    Some(app) => @dom.mount_to(app, view)
    None => println("Error: #app not found")
  }
}
