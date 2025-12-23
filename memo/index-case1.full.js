(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const Option$None$0$ = { $tag: 0 };
function Option$Some$0$(param0) {
  this._0 = param0;
}
Option$Some$0$.prototype.$tag = 1;
function $64$mizchi$47$luna$47$platform$47$dom$47$element$46$AttrValue$Static(param0) {
  this._0 = param0;
}
$64$mizchi$47$luna$47$platform$47$dom$47$element$46$AttrValue$Static.prototype.$tag = 0;
class $PanicError extends Error {
}
function $panic() {
  throw new $PanicError();
}
function $bound_check(arr, index) {
  if (index < 0 || index >= arr.length) throw new Error("Index out of bounds");
}
function Result$Err$1$(param0) {
  this._0 = param0;
}
Result$Err$1$.prototype.$tag = 0;
function Result$Ok$1$(param0) {
  this._0 = param0;
}
Result$Ok$1$.prototype.$tag = 1;
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds = { $tag: 1 };
const Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex = { $tag: 0 };
const moonbitlang$core$builtin$$int_to_string_js = (x, radix) => {
  return x.toString(radix);
};
const moonbitlang$core$builtin$$JSArray$push = (arr, val) => {
  arr.push(val);
};
const moonbitlang$core$builtin$$JSArray$set_length = (arr, len) => {
  arr.length = len;
};
const mizchi$js$core$$Any$_call = (obj, key, args) => obj[key](...args);
const mizchi$js$core$$is_nullish = (v) => v == null;
const mizchi$js$core$$new_object = () => ({});
const mizchi$js$core$$Any$_set = (obj, key, value) => {
  obj[key] = value;
};
const Option$None$2$ = { $tag: 0 };
function Option$Some$2$(param0) {
  this._0 = param0;
}
Option$Some$2$.prototype.$tag = 1;
const mizchi$js$browser$dom$$document = () => document;
const mizchi$js$browser$dom$$Document$createElement = (self, tag) => self.createElement(tag);
const mizchi$js$browser$dom$$Document$createTextNode = (self, data) => self.createTextNode(data);
function $64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$El(param0) {
  this._0 = param0;
}
$64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$El.prototype.$tag = 0;
function $64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$Txt(param0) {
  this._0 = param0;
}
$64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$Txt.prototype.$tag = 1;
const mizchi$luna$platform$dom$element$$apply_event_handler = (elem, name, handler) => elem.addEventListener(name, handler);
const mizchi$luna$platform$dom$element$$HandlerMap$click = (m, handler) => {
  m.click = handler;
  return m;
};
const mizchi$luna$platform$dom$element$$HandlerMap$to_attrs = (m) => Object.entries(m).map(([k, v]) => ({ _0: k, _1: { $tag: 2, _0: v } }));
const Option$None$3$ = { $tag: 0 };
function Option$Some$3$(param0) {
  this._0 = param0;
}
Option$Some$3$.prototype.$tag = 1;
const Option$None$4$ = { $tag: 0 };
const Option$None$5$ = { $tag: 0 };
const $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger = { method_0: moonbitlang$core$builtin$$Logger$write_string$0$, method_1: moonbitlang$core$builtin$$Logger$write_substring$1$, method_2: moonbitlang$core$builtin$$Logger$write_view$0$, method_3: moonbitlang$core$builtin$$Logger$write_char$0$ };
const mizchi$luna$luna$signal$$effect_id_counter = { val: 0 };
const mizchi$luna$luna$signal$$reactive_context = { current_subscriber: void 0, current_cleanups: Option$None$0$ };
const repro$jsx$45$like$src$$_main$46$constr$47$339 = "container";
const repro$jsx$45$like$src$$_main$46$constr$47$340 = "count";
function moonbitlang$core$builtin$$Eq$equal$2$(_x_5248, _x_5249) {
  if (_x_5248 === 0) {
    {
      return false;
    }
  } else {
    {
      return true;
    }
  }
}
function moonbitlang$core$builtin$$StringBuilder$new$46$inner(size_hint) {
  return { val: "" };
}
function moonbitlang$core$builtin$$Logger$write_char$0$(self, ch) {
  const _bind = self;
  _bind.val = `${_bind.val}${String.fromCodePoint(ch)}`;
}
function moonbitlang$core$builtin$$op_notequal$2$(x, y) {
  return !moonbitlang$core$builtin$$Eq$equal$2$(x);
}
function moonbitlang$core$array$$Array$at$3$(self, index) {
  const len = self.length;
  if (index >= 0 && index < len) {
    $bound_check(self, index);
    return self[index];
  } else {
    return $panic();
  }
}
function moonbitlang$core$builtin$$Logger$write_string$0$(self, str) {
  const _bind = self;
  _bind.val = `${_bind.val}${str}`;
}
function moonbitlang$core$string$$String$sub$46$inner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === void 0) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end < 0 ? len + _end | 0 : _end;
  }
  const start$2 = start < 0 ? len + start | 0 : start;
  if (start$2 >= 0 && (start$2 <= end$2 && end$2 <= len)) {
    let _tmp;
    if (start$2 < len) {
      const _p = self.charCodeAt(start$2);
      _tmp = 56320 <= _p && _p <= 57343;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      return new Result$Err$1$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    let _tmp$2;
    if (end$2 < len) {
      const _p = self.charCodeAt(end$2);
      _tmp$2 = 56320 <= _p && _p <= 57343;
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      return new Result$Err$1$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$InvalidIndex);
    }
    return new Result$Ok$1$({ str: self, start: start$2, end: end$2 });
  } else {
    return new Result$Err$1$(Error$moonbitlang$47$core$47$builtin$46$CreatingViewError$46$IndexOutOfBounds);
  }
}
function moonbitlang$core$builtin$$Logger$write_substring$1$(self, value, start, len) {
  let _tmp;
  _L: {
    _L$2: {
      const _bind = moonbitlang$core$string$$String$sub$46$inner(value, start, start + len | 0);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        _tmp = _ok._0;
      } else {
        const _err = _bind;
        _err._0;
        break _L$2;
      }
      break _L;
    }
    _tmp = $panic();
  }
  moonbitlang$core$builtin$$Logger$write_view$0$(self, _tmp);
}
function moonbitlang$core$builtin$$Show$to_string$4$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner();
  const _p = { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger };
  if (self) {
    _p.method_table.method_0(_p.self, "true");
  } else {
    _p.method_table.method_0(_p.self, "false");
  }
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$5$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner();
  moonbitlang$core$builtin$$Show$output$6$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$builtin$$Show$to_string$7$(self) {
  const logger = moonbitlang$core$builtin$$StringBuilder$new$46$inner();
  moonbitlang$core$builtin$$Show$output$8$(self, { self: logger, method_table: $$$64$moonbitlang$47$core$47$builtin$46$StringBuilder$36$as$36$64$moonbitlang$47$core$47$builtin$46$Logger });
  return logger.val;
}
function moonbitlang$core$int$$Int$to_string$46$inner(self, radix) {
  return moonbitlang$core$builtin$$int_to_string_js(self, radix);
}
function moonbitlang$core$builtin$$Show$to_string$9$(self) {
  return self.str.substring(self.start, self.end);
}
function moonbitlang$core$builtin$$Iterator$next$10$(self) {
  const _func = self;
  return _func();
}
function moonbitlang$core$builtin$$Iterator$iter$10$(self) {
  return (yield_) => {
    while (true) {
      const _bind = moonbitlang$core$builtin$$Iterator$next$10$(self);
      if (_bind === void 0) {
        return 1;
      } else {
        const _Some = _bind;
        const _x = _Some;
        const _bind$2 = yield_(_x);
        if (_bind$2 === 1) ;
        else {
          return 0;
        }
        continue;
      }
    }
  };
}
function moonbitlang$core$builtin$$Logger$write_view$0$(self, str) {
  const _bind = self;
  _bind.val = `${_bind.val}${moonbitlang$core$builtin$$Show$to_string$9$(str)}`;
}
function moonbitlang$core$array$$Array$push$11$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$array$$Array$push$10$(self, value) {
  moonbitlang$core$builtin$$JSArray$push(self, value);
}
function moonbitlang$core$builtin$$Iter$run$10$(self, f) {
  const _func = self;
  return _func(f);
}
function moonbitlang$core$builtin$$Show$output$6$(self, logger) {
  logger.method_table.method_0(logger.self, moonbitlang$core$int$$Int$to_string$46$inner(self, 10));
}
function moonbitlang$core$array$$ArrayView$iterator$10$(self) {
  const i = { val: 0 };
  const _p = () => {
    if (i.val < (self.end - self.start | 0)) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return void 0;
    }
  };
  return _p;
}
function moonbitlang$core$array$$Array$iterator$10$(self) {
  return moonbitlang$core$array$$ArrayView$iterator$10$({ buf: self, start: 0, end: self.length });
}
function moonbitlang$core$array$$Array$iter$10$(self) {
  return moonbitlang$core$builtin$$Iterator$iter$10$(moonbitlang$core$array$$Array$iterator$10$(self));
}
function moonbitlang$core$builtin$$Iter$any$10$(self, f) {
  return moonbitlang$core$builtin$$op_notequal$2$(moonbitlang$core$builtin$$Iter$run$10$(self, (k) => f(k) ? 0 : 1));
}
function moonbitlang$core$builtin$$println$12$(input) {
  console.log(input);
}
function moonbitlang$core$array$$Array$unsafe_truncate_to_length$3$(self, new_len) {
  moonbitlang$core$builtin$$JSArray$set_length(self, new_len);
}
function moonbitlang$core$array$$Array$clear$3$(self) {
  moonbitlang$core$array$$Array$unsafe_truncate_to_length$3$(self, 0);
}
function mizchi$js$core$$identity_option$13$(v) {
  return mizchi$js$core$$is_nullish(v) ? Option$None$2$ : new Option$Some$2$(v);
}
function mizchi$js$browser$dom$$Node$appendChild(self, child) {
  return mizchi$js$core$$Any$_call(self, "appendChild", [child]);
}
function mizchi$js$browser$dom$$Node$setTextContent(self, content) {
  mizchi$js$core$$Any$_set(self, "textContent", content);
}
function mizchi$js$browser$dom$$Element$setClassName(self, class_name) {
  mizchi$js$core$$Any$_set(self, "className", class_name);
}
function mizchi$js$browser$dom$$Element$setAttribute(self, name, value) {
  mizchi$js$core$$Any$_call(self, "setAttribute", [name, value]);
}
function mizchi$js$browser$dom$$Element$removeAttribute(self, name) {
  mizchi$js$core$$Any$_call(self, "removeAttribute", [name]);
}
function mizchi$js$browser$dom$$Document$getElementById(self, id) {
  const v = mizchi$js$core$$Any$_call(self, "getElementById", [id]);
  return mizchi$js$core$$identity_option$13$(v);
}
function mizchi$luna$luna$signal$$new_effect_id() {
  const id = mizchi$luna$luna$signal$$effect_id_counter.val;
  mizchi$luna$luna$signal$$effect_id_counter.val = id + 1 | 0;
  return id;
}
function mizchi$luna$luna$signal$$run_cleanups(cleanups) {
  let _tmp = cleanups.length - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      const _func = moonbitlang$core$array$$Array$at$3$(cleanups, i);
      _func();
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  moonbitlang$core$array$$Array$clear$3$(cleanups);
}
function mizchi$luna$luna$signal$$set_current_cleanups(cleanups) {
  const prev = mizchi$luna$luna$signal$$reactive_context.current_cleanups;
  mizchi$luna$luna$signal$$reactive_context.current_cleanups = cleanups;
  return prev;
}
function mizchi$luna$luna$signal$$run_with_cleanup_tracking$14$(cleanups, f) {
  const prev = mizchi$luna$luna$signal$$set_current_cleanups(new Option$Some$0$(cleanups));
  f();
  mizchi$luna$luna$signal$$reactive_context.current_cleanups = prev;
}
function mizchi$luna$luna$signal$$run_with_subscriber$14$(subscriber, f) {
  const prev = mizchi$luna$luna$signal$$reactive_context.current_subscriber;
  mizchi$luna$luna$signal$$reactive_context.current_subscriber = subscriber;
  f();
  mizchi$luna$luna$signal$$reactive_context.current_subscriber = prev;
}
function mizchi$luna$luna$signal$$effect(fn_) {
  const state = { active: true, cleanups: [] };
  const id = mizchi$luna$luna$signal$$new_effect_id();
  const runner_ref = { val: void 0 };
  const run_effect = () => {
    if (!state.active) {
      return void 0;
    }
    mizchi$luna$luna$signal$$run_cleanups(state.cleanups);
    const _bind = runner_ref.val;
    if (_bind === void 0) {
      return;
    } else {
      const _Some = _bind;
      const _runner = _Some;
      mizchi$luna$luna$signal$$run_with_subscriber$14$(_runner, () => {
        mizchi$luna$luna$signal$$run_with_cleanup_tracking$14$(state.cleanups, fn_);
      });
      return;
    }
  };
  const runner = { id, run: run_effect };
  runner_ref.val = runner;
  run_effect();
  const dispose = () => {
    state.active = false;
    mizchi$luna$luna$signal$$run_cleanups(state.cleanups);
  };
  return dispose;
}
function mizchi$luna$luna$signal$$Signal$get$6$(self) {
  const _bind = mizchi$luna$luna$signal$$reactive_context.current_subscriber;
  if (_bind === void 0) ;
  else {
    const _Some = _bind;
    const _subscriber = _Some;
    const already_subscribed = moonbitlang$core$builtin$$Iter$any$10$(moonbitlang$core$array$$Array$iter$10$(self.subscribers), (s) => s.id === _subscriber.id);
    if (!already_subscribed) {
      moonbitlang$core$array$$Array$push$10$(self.subscribers, _subscriber);
    }
  }
  return self.value;
}
function mizchi$luna$luna$signal$$Signal$new$6$(initial) {
  return { value: initial, subscribers: [] };
}
function mizchi$luna$luna$signal$$schedule_effect(effect) {
  {
    const _func = effect.run;
    _func();
    return;
  }
}
function mizchi$luna$luna$signal$$Signal$notify$6$(self) {
  const _arr = self.subscribers;
  const _len = _arr.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const subscriber = _arr[_i];
      mizchi$luna$luna$signal$$schedule_effect(subscriber);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function mizchi$luna$luna$signal$$Signal$set$6$(self, new_value) {
  self.value = new_value;
  mizchi$luna$luna$signal$$Signal$notify$6$(self);
}
function mizchi$luna$platform$dom$element$$text_node(content) {
  const doc = mizchi$js$browser$dom$$document();
  const initial = content();
  const node = mizchi$js$browser$dom$$Document$createTextNode(doc, initial);
  mizchi$luna$luna$signal$$effect(() => {
    const new_content = content();
    mizchi$js$browser$dom$$Node$setTextContent(node, new_content);
  });
  return new $64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$Txt(node);
}
function mizchi$luna$platform$dom$element$$text_from_signal$6$(sig) {
  return mizchi$luna$platform$dom$element$$text_node(() => moonbitlang$core$builtin$$Show$to_string$5$(mizchi$luna$luna$signal$$Signal$get$6$(sig)));
}
function mizchi$luna$platform$dom$element$$apply_static_attr(elem, name, value) {
  if (name === "className") {
    mizchi$js$browser$dom$$Element$setClassName(elem, value);
    return;
  } else {
    if (name === "value") {
      mizchi$js$core$$Any$_set(elem, "value", value);
      return;
    } else {
      if (name === "checked") {
        mizchi$js$core$$Any$_set(elem, "checked", value === "true");
        return;
      } else {
        if (name === "disabled") {
          if (value === "true") {
            mizchi$js$browser$dom$$Element$setAttribute(elem, "disabled", "");
            return;
          } else {
            mizchi$js$browser$dom$$Element$removeAttribute(elem, "disabled");
            return;
          }
        } else {
          mizchi$js$browser$dom$$Element$setAttribute(elem, name, value);
          return;
        }
      }
    }
  }
}
function mizchi$luna$platform$dom$element$$apply_style_string(elem, style) {
  mizchi$js$browser$dom$$Element$setAttribute(elem, "style", style);
}
function mizchi$luna$platform$dom$element$$apply_attribute(elem, name, value) {
  switch (value.$tag) {
    case 0: {
      const _Static = value;
      const _s = _Static._0;
      if (name === "style") {
        mizchi$luna$platform$dom$element$$apply_style_string(elem, _s);
        return;
      } else {
        mizchi$luna$platform$dom$element$$apply_static_attr(elem, name, _s);
        return;
      }
    }
    case 1: {
      const _Dynamic = value;
      const _getter = _Dynamic._0;
      mizchi$luna$luna$signal$$effect(() => {
        const new_value = _getter();
        if (name === "style") {
          mizchi$luna$platform$dom$element$$apply_style_string(elem, new_value);
          return;
        } else {
          mizchi$luna$platform$dom$element$$apply_static_attr(elem, name, new_value);
          return;
        }
      });
      return;
    }
    default: {
      const _Handler = value;
      const _handler = _Handler._0;
      if (name === "__ref") {
        _handler(elem);
        return;
      } else {
        mizchi$luna$platform$dom$element$$apply_event_handler(elem, name, _handler);
        return;
      }
    }
  }
}
function mizchi$luna$platform$dom$element$$DomElement$from_jsdom(elem) {
  return { inner: elem };
}
function mizchi$luna$platform$dom$element$$DomNode$to_jsdom(self) {
  switch (self.$tag) {
    case 0: {
      const _El = self;
      const _elem = _El._0;
      return _elem.inner;
    }
    case 1: {
      const _Txt = self;
      const _text = _Txt._0;
      return _text;
    }
    default: {
      const _Raw = self;
      return _Raw._0;
    }
  }
}
function mizchi$luna$platform$dom$element$$create_element(tag, attrs, children) {
  const doc = mizchi$js$browser$dom$$document();
  const elem = mizchi$js$browser$dom$$Document$createElement(doc, tag);
  const _len = attrs.length;
  let _tmp = 0;
  while (true) {
    const _i = _tmp;
    if (_i < _len) {
      const attr = attrs[_i];
      const _name = attr._0;
      const _value = attr._1;
      mizchi$luna$platform$dom$element$$apply_attribute(elem, _name, _value);
      _tmp = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _len$2 = children.length;
  let _tmp$2 = 0;
  while (true) {
    const _i = _tmp$2;
    if (_i < _len$2) {
      const child = children[_i];
      mizchi$js$browser$dom$$Node$appendChild(elem, mizchi$luna$platform$dom$element$$DomNode$to_jsdom(child));
      _tmp$2 = _i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new $64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$El(mizchi$luna$platform$dom$element$$DomElement$from_jsdom(elem));
}
function mizchi$luna$platform$dom$element$$mount_to(container, n) {
  mizchi$js$browser$dom$$Node$appendChild(container, mizchi$luna$platform$dom$element$$DomNode$to_jsdom(n));
}
function mizchi$luna$platform$dom$element$$ToDomNode$to_dom_node$12$(self) {
  const doc = mizchi$js$browser$dom$$document();
  return new $64$mizchi$47$luna$47$platform$47$dom$47$element$46$DomNode$Txt(mizchi$js$browser$dom$$Document$createTextNode(doc, self));
}
function mizchi$luna$platform$dom$element$$double_to_string(d) {
  const any = d;
  return mizchi$js$core$$Any$_call(any, "toString", []);
}
function moonbitlang$core$builtin$$Show$output$8$(self, logger) {
  switch (self.$tag) {
    case 0: {
      const _AttrString = self;
      const _s = _AttrString._0;
      logger.method_table.method_0(logger.self, _s);
      return;
    }
    case 1: {
      const _AttrNumber = self;
      const _d = _AttrNumber._0;
      logger.method_table.method_0(logger.self, mizchi$luna$platform$dom$element$$double_to_string(_d));
      return;
    }
    case 2: {
      const _AttrInt = self;
      const _i = _AttrInt._0;
      logger.method_table.method_0(logger.self, moonbitlang$core$int$$Int$to_string$46$inner(_i, 10));
      return;
    }
    default: {
      const _AttrBool = self;
      const _b = _AttrBool._0;
      logger.method_table.method_0(logger.self, moonbitlang$core$builtin$$Show$to_string$4$(_b));
      return;
    }
  }
}
function mizchi$luna$platform$dom$element$$Attr$to_attr_value(self) {
  return new $64$mizchi$47$luna$47$platform$47$dom$47$element$46$AttrValue$Static(moonbitlang$core$builtin$$Show$to_string$7$(self));
}
function mizchi$luna$platform$dom$element$$events() {
  return mizchi$js$core$$new_object();
}
function mizchi$luna$platform$dom$element$$build_props$46$inner(id, class_, style, on, ref_, attrs, dyn_attrs) {
  const result = [];
  if (class_ === void 0) ;
  else {
    const _Some = class_;
    const _v = _Some;
    moonbitlang$core$array$$Array$push$11$(result, { _0: "className", _1: new $64$mizchi$47$luna$47$platform$47$dom$47$element$46$AttrValue$Static(_v) });
  }
  if (on.$tag === 1) {
    const _Some = on;
    const _handlers = _Some._0;
    const _arr = mizchi$luna$platform$dom$element$$HandlerMap$to_attrs(_handlers);
    const _len = _arr.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const attr = _arr[_i];
        moonbitlang$core$array$$Array$push$11$(result, attr);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  if (attrs.$tag === 1) {
    const _Some = attrs;
    const _extra = _Some._0;
    const _len = _extra.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const pair = _extra[_i];
        moonbitlang$core$array$$Array$push$11$(result, { _0: pair._0, _1: mizchi$luna$platform$dom$element$$Attr$to_attr_value(pair._1) });
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  if (dyn_attrs.$tag === 1) {
    const _Some = dyn_attrs;
    const _extra = _Some._0;
    const _len = _extra.length;
    let _tmp = 0;
    while (true) {
      const _i = _tmp;
      if (_i < _len) {
        const pair = _extra[_i];
        moonbitlang$core$array$$Array$push$11$(result, pair);
        _tmp = _i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
  }
  return result;
}
function mizchi$luna$platform$dom$element$$div(id, class_, style, dyn_class, dyn_style, on, ref_, attrs, dyn_attrs, children) {
  const props = mizchi$luna$platform$dom$element$$build_props$46$inner(id, class_, style, on, ref_, attrs, dyn_attrs);
  return mizchi$luna$platform$dom$element$$create_element("div", props, children);
}
function mizchi$luna$platform$dom$element$$h1(id, class_, style, dyn_class, dyn_style, on, ref_, attrs, dyn_attrs, children) {
  const props = mizchi$luna$platform$dom$element$$build_props$46$inner(id, class_, style, on, ref_, attrs, dyn_attrs);
  return mizchi$luna$platform$dom$element$$create_element("h1", props, children);
}
function mizchi$luna$platform$dom$element$$button(disabled, id, class_, style, dyn_class, dyn_style, dyn_disabled, on, ref_, attrs, dyn_attrs, children) {
  const props = mizchi$luna$platform$dom$element$$build_props$46$inner(id, class_, style, on, ref_, attrs, dyn_attrs);
  return mizchi$luna$platform$dom$element$$create_element("button", props, children);
}
function mizchi$luna$platform$dom$element$$text(content) {
  return mizchi$luna$platform$dom$element$$ToDomNode$to_dom_node$12$(content);
}
function mizchi$luna$platform$dom$element$$text_sig$6$(sig) {
  return mizchi$luna$platform$dom$element$$text_from_signal$6$(sig);
}
(() => {
  const count = mizchi$luna$luna$signal$$Signal$new$6$(0);
  const view = mizchi$luna$platform$dom$element$$div(void 0, repro$jsx$45$like$src$$_main$46$constr$47$339, void 0, void 0, void 0, Option$None$3$, void 0, Option$None$4$, Option$None$5$, [mizchi$luna$platform$dom$element$$h1(void 0, void 0, void 0, void 0, void 0, Option$None$3$, void 0, Option$None$4$, Option$None$5$, [mizchi$luna$platform$dom$element$$text("Counter")]), mizchi$luna$platform$dom$element$$div(void 0, repro$jsx$45$like$src$$_main$46$constr$47$340, void 0, void 0, void 0, Option$None$3$, void 0, Option$None$4$, Option$None$5$, [mizchi$luna$platform$dom$element$$text_sig$6$(count)]), mizchi$luna$platform$dom$element$$button(-1, void 0, void 0, void 0, void 0, void 0, void 0, new Option$Some$3$(mizchi$luna$platform$dom$element$$HandlerMap$click(mizchi$luna$platform$dom$element$$events(), (_discard_) => {
    mizchi$luna$luna$signal$$Signal$set$6$(count, mizchi$luna$luna$signal$$Signal$get$6$(count) + 1 | 0);
  })), void 0, Option$None$4$, Option$None$5$, [mizchi$luna$platform$dom$element$$text("+")]), mizchi$luna$platform$dom$element$$button(-1, void 0, void 0, void 0, void 0, void 0, void 0, new Option$Some$3$(mizchi$luna$platform$dom$element$$HandlerMap$click(mizchi$luna$platform$dom$element$$events(), (_discard_) => {
    mizchi$luna$luna$signal$$Signal$set$6$(count, mizchi$luna$luna$signal$$Signal$get$6$(count) - 1 | 0);
  })), void 0, Option$None$4$, Option$None$5$, [mizchi$luna$platform$dom$element$$text("-")])]);
  const _bind = mizchi$js$browser$dom$$Document$getElementById(mizchi$js$browser$dom$$document(), "app");
  if (_bind.$tag === 1) {
    const _Some = _bind;
    const _app = _Some._0;
    mizchi$luna$platform$dom$element$$mount_to(_app, view);
    return;
  } else {
    moonbitlang$core$builtin$$println$12$("Error: #app not found");
    return;
  }
})();
