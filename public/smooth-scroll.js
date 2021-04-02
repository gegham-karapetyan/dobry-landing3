/*! smooth-scroll v15.0.1 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element &&
  !Element.prototype.closest &&
  (Element.prototype.closest = function (e) {
    var t,
      n = (this.document || this.ownerDocument).querySelectorAll(e),
      o = this;
    do {
      for (t = n.length; --t >= 0 && n.item(t) !== o; );
    } while (t < 0 && (o = o.parentElement));
    return o;
  }),
  (function () {
    function e(e, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }
    if ("function" == typeof window.CustomEvent) return !1;
    (e.prototype = window.Event.prototype), (window.CustomEvent = e);
  })(),
  (function () {
    for (
      var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0;
      n < t.length && !window.requestAnimationFrame;
      ++n
    )
      (window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[t[n] + "CancelAnimationFrame"] ||
          window[t[n] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (t, n) {
        var o = new Date().getTime(),
          i = Math.max(0, 16 - (o - e)),
          r = window.setTimeout(function () {
            t(o + i);
          }, i);
        return (e = o + i), r;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (e) {
          clearTimeout(e);
        });
  })(),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return t(e);
        })
      : "object" == typeof exports
      ? (module.exports = t(e))
      : (e.SmoothScroll = t(e));
  })(
    "undefined" != typeof global
      ? global
      : "undefined" != typeof window
      ? window
      : this,
    function (e) {
      "use strict";
      var t = {
          ignore: "[data-scroll-ignore]",
          header: null,
          topOnEmptyHash: !0,
          speed: 500,
          speedAsDuration: !1,
          durationMax: null,
          durationMin: null,
          clip: !0,
          offset: 0,
          easing: "easeInOutCubic",
          customEasing: null,
          updateURL: !0,
          popstate: !0,
          emitEvents: !0,
        },
        n = function () {
          return (
            "querySelector" in document &&
            "addEventListener" in e &&
            "requestAnimationFrame" in e &&
            "closest" in e.Element.prototype
          );
        },
        o = function () {
          var e = {};
          return (
            Array.prototype.forEach.call(arguments, function (t) {
              for (var n in t) {
                if (!t.hasOwnProperty(n)) return;
                e[n] = t[n];
              }
            }),
            e
          );
        },
        i = function (t) {
          return !!(
            "matchMedia" in e &&
            e.matchMedia("(prefers-reduced-motion)").matches
          );
        },
        r = function (t) {
          return parseInt(e.getComputedStyle(t).height, 10);
        },
        a = function (e) {
          var t;
          try {
            t = decodeURIComponent(e);
          } catch (n) {
            t = e;
          }
          return t;
        },
        u = function (e) {
          "#" === e.charAt(0) && (e = e.substr(1));
          for (
            var t,
              n = String(e),
              o = n.length,
              i = -1,
              r = "",
              a = n.charCodeAt(0);
            ++i < o;

          ) {
            if (0 === (t = n.charCodeAt(i)))
              throw new InvalidCharacterError(
                "Invalid character: the input contains U+0000."
              );
            (t >= 1 && t <= 31) ||
            127 == t ||
            (0 === i && t >= 48 && t <= 57) ||
            (1 === i && t >= 48 && t <= 57 && 45 === a)
              ? (r += "\\" + t.toString(16) + " ")
              : (r +=
                  t >= 128 ||
                  45 === t ||
                  95 === t ||
                  (t >= 48 && t <= 57) ||
                  (t >= 65 && t <= 90) ||
                  (t >= 97 && t <= 122)
                    ? n.charAt(i)
                    : "\\" + n.charAt(i));
          }
          var u;
          try {
            u = decodeURIComponent("#" + r);
          } catch (e) {
            u = "#" + r;
          }
          return u;
        },
        c = function (e, t) {
          var n;
          return (
            "easeInQuad" === e.easing && (n = t * t),
            "easeOutQuad" === e.easing && (n = t * (2 - t)),
            "easeInOutQuad" === e.easing &&
              (n = t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1),
            "easeInCubic" === e.easing && (n = t * t * t),
            "easeOutCubic" === e.easing && (n = --t * t * t + 1),
            "easeInOutCubic" === e.easing &&
              (n =
                t < 0.5
                  ? 4 * t * t * t
                  : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
            "easeInQuart" === e.easing && (n = t * t * t * t),
            "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t),
            "easeInOutQuart" === e.easing &&
              (n = t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
            "easeInQuint" === e.easing && (n = t * t * t * t * t),
            "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t),
            "easeInOutQuint" === e.easing &&
              (n =
                t < 0.5
                  ? 16 * t * t * t * t * t
                  : 1 + 16 * --t * t * t * t * t),
            e.customEasing && (n = e.customEasing(t)),
            n || t
          );
        },
        s = function () {
          return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          );
        },
        l = function (t, n, o, i) {
          var r = 0;
          if (t.offsetParent)
            do {
              (r += t.offsetTop), (t = t.offsetParent);
            } while (t);
          return (
            (r = Math.max(r - n - o, 0)),
            i && (r = Math.min(r, s() - e.innerHeight)),
            r
          );
        },
        m = function (e) {
          return e ? r(e) + e.offsetTop : 0;
        },
        d = function (e, t) {
          var n = t.speedAsDuration ? t.speed : Math.abs((e / 1e3) * t.speed);
          return t.durationMax && n > t.durationMax
            ? t.durationMax
            : t.durationMin && n < t.durationMin
            ? t.durationMin
            : n;
        },
        f = function (t) {
          if (history.replaceState && t.updateURL && !history.state) {
            var n = e.location.hash;
            (n = n || e.pageYOffset),
              history.replaceState(
                { smoothScroll: JSON.stringify(t), anchor: n || e.pageYOffset },
                document.title,
                n || e.location.href
              );
          }
        },
        h = function (e, t, n) {
          t ||
            (history.pushState &&
              n.updateURL &&
              history.pushState(
                { smoothScroll: JSON.stringify(n), anchor: e.id },
                document.title,
                e === document.documentElement ? "#top" : "#" + e.id
              ));
        },
        p = function (t, n, o) {
          0 === t && document.body.focus(),
            o ||
              (t.focus(),
              document.activeElement !== t &&
                (t.setAttribute("tabindex", "-1"),
                t.focus(),
                (t.style.outline = "none")),
              e.scrollTo(0, n));
        },
        g = function (t, n, o, i) {
          if (n.emitEvents && "function" == typeof e.CustomEvent) {
            var r = new CustomEvent(t, {
              bubbles: !0,
              detail: { anchor: o, toggle: i },
            });
            document.dispatchEvent(r);
          }
        };
      return function (r, v) {
        var y,
          w,
          E,
          S,
          b,
          A,
          O,
          C = {};
        (C.cancelScroll = function (e) {
          cancelAnimationFrame(O), (O = null), e || g("scrollCancel", y);
        }),
          (C.animateScroll = function (n, i, r) {
            var a = o(y || t, r || {}),
              u = "[object Number]" === Object.prototype.toString.call(n),
              f = u || !n.tagName ? null : n;
            if (u || f) {
              var v = e.pageYOffset;
              a.header && !S && (S = document.querySelector(a.header)),
                b || (b = m(S));
              var w,
                E,
                A,
                I = u
                  ? n
                  : l(
                      f,
                      b,
                      parseInt(
                        "function" == typeof a.offset
                          ? a.offset(n, i)
                          : a.offset,
                        10
                      ),
                      a.clip
                    ),
                q = I - v,
                M = s(),
                F = 0,
                L = d(q, a),
                x = function (t, o) {
                  var r = e.pageYOffset;
                  if (t == o || r == o || (v < o && e.innerHeight + r) >= M)
                    return (
                      C.cancelScroll(!0),
                      p(n, o, u),
                      g("scrollStop", a, n, i),
                      (w = null),
                      (O = null),
                      !0
                    );
                },
                H = function (t) {
                  w || (w = t),
                    (F += t - w),
                    (E = F / parseInt(L, 10)),
                    (E = E > 1 ? 1 : E),
                    (A = v + q * c(a, E)),
                    e.scrollTo(0, Math.floor(A)),
                    x(A, I) || ((O = e.requestAnimationFrame(H)), (w = t));
                };
              0 === e.pageYOffset && e.scrollTo(0, 0),
                h(n, u, a),
                g("scrollStart", a, n, i),
                C.cancelScroll(!0),
                e.requestAnimationFrame(H);
            }
          });
        var I = function (t) {
            if (
              !i() &&
              0 === t.button &&
              !t.metaKey &&
              !t.ctrlKey &&
              "closest" in t.target &&
              (E = t.target.closest(r)) &&
              "a" === E.tagName.toLowerCase() &&
              !t.target.closest(y.ignore) &&
              E.hostname === e.location.hostname &&
              E.pathname === e.location.pathname &&
              /#/.test(E.href)
            ) {
              var n = u(a(E.hash)),
                o =
                  y.topOnEmptyHash && "#" === n
                    ? document.documentElement
                    : document.querySelector(n);
              (o = o || "#top" !== n ? o : document.documentElement),
                o && (t.preventDefault(), f(y), C.animateScroll(o, E));
            }
          },
          q = function (e) {
            if (
              null !== history.state &&
              history.state.smoothScroll &&
              history.state.smoothScroll === JSON.stringify(y)
            ) {
              var t = history.state.anchor;
              (t &&
                0 !== t &&
                !(t = document.querySelector(u(a(history.state.anchor))))) ||
                C.animateScroll(t, null, { updateURL: !1 });
            }
          },
          M = function (e) {
            A ||
              (A = setTimeout(function () {
                (A = null), (b = m(S));
              }, 66));
          };
        return (
          (C.destroy = function () {
            y &&
              (document.removeEventListener("click", I, !1),
              e.removeEventListener("resize", M, !1),
              e.removeEventListener("popstate", q, !1),
              C.cancelScroll(),
              (y = null),
              (w = null),
              (E = null),
              (S = null),
              (b = null),
              (A = null),
              (O = null));
          }),
          (C.init = function (i) {
            if (!n())
              throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            C.destroy(),
              (y = o(t, i || {})),
              (S = y.header ? document.querySelector(y.header) : null),
              (b = m(S)),
              document.addEventListener("click", I, !1),
              S && e.addEventListener("resize", M, !1),
              y.updateURL &&
                y.popstate &&
                e.addEventListener("popstate", q, !1);
          }),
          C.init(v),
          C
        );
      };
    }
  );
