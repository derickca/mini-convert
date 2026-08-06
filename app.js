const {
  useState,
  useMemo
} = React;

/* --- Inline icons (lucide-style, no external requests) --- */
function Icon({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  children
}) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, children);
}
const Ruler = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m14.5 12.5 2-2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m11.5 9.5 2-2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m8.5 6.5 2-2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m17.5 15.5 2-2"
}));
const ArrowLeftRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "m16 3 4 4-4 4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 7H4"
}), /*#__PURE__*/React.createElement("path", {
  d: "m8 21-4-4 4-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 17h16"
}));
const DoorOpen = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M13 4h3a2 2 0 0 1 2 2v14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 20h3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 20h9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 12v.01"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"
}));

/* --- App --- */
const SCALES = [{
  label: "1:6 (Playscale)",
  value: 6
}, {
  label: "1:12 (Standard dollhouse)",
  value: 12
}, {
  label: "1:24 (Half scale)",
  value: 24
}, {
  label: "1:48 (Quarter scale)",
  value: 48
}, {
  label: "1:144 (Micro)",
  value: 144
}];
const REFERENCE_ITEMS = [{
  name: "Interior door height",
  real: 80
}, {
  name: "Ceiling height",
  real: 96
}, {
  name: "Kitchen counter height",
  real: 36
}, {
  name: "Dining table height",
  real: 30
}, {
  name: "Adult human height",
  real: 68
}, {
  name: "Standard brick",
  real: 8
}];
function toInches(value, unit) {
  const v = parseFloat(value);
  if (isNaN(v)) return 0;
  switch (unit) {
    case "in":
      return v;
    case "ft":
      return v * 12;
    case "cm":
      return v / 2.54;
    case "mm":
      return v / 25.4;
    default:
      return v;
  }
}
function fromInches(inches, unit) {
  switch (unit) {
    case "in":
      return inches;
    case "ft":
      return inches / 12;
    case "cm":
      return inches * 2.54;
    case "mm":
      return inches * 25.4;
    default:
      return inches;
  }
}
function formatFeetInches(totalInches) {
  const sign = totalInches < 0 ? "-" : "";
  totalInches = Math.abs(totalInches);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches - feet * 12;
  const inchesRounded = Math.round(inches * 100) / 100;
  if (feet === 0) return `${sign}${inchesRounded}"`;
  return `${sign}${feet}' ${inchesRounded}"`;
}
function formatNumber(n) {
  if (!isFinite(n)) return "0";
  const rounded = Math.round(n * 1000) / 1000;
  return rounded.toString();
}
function ScaleConverter() {
  const [scale, setScale] = useState(12);
  const [direction, setDirection] = useState("toMini");
  const [realValue, setRealValue] = useState("96");
  const [realUnit, setRealUnit] = useState("in");
  const [miniValue, setMiniValue] = useState("8");
  const [miniUnit, setMiniUnit] = useState("in");
  const realInches = useMemo(() => toInches(realValue, realUnit), [realValue, realUnit]);
  const miniInches = useMemo(() => toInches(miniValue, miniUnit), [miniValue, miniUnit]);
  const computedMiniInches = direction === "toMini" ? realInches / scale : miniInches;
  const computedRealInches = direction === "toReal" ? miniInches * scale : realInches;
  const handleRealChange = v => {
    setRealValue(v);
    setDirection("toMini");
  };
  const handleMiniChange = v => {
    setMiniValue(v);
    setDirection("toReal");
  };
  const displayMiniInches = direction === "toMini" ? computedMiniInches : miniInches;
  const displayRealInches = direction === "toReal" ? computedRealInches : realInches;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen w-full flex items-center justify-center p-6",
    style: {
      backgroundColor: "#16233F",
      backgroundImage: "linear-gradient(rgba(122,158,196,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(122,158,196,0.13) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
      fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-6 px-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center w-11 h-11 rounded-sm shrink-0",
    style: {
      backgroundColor: "#B8863B"
    }
  }, /*#__PURE__*/React.createElement(Ruler, {
    size: 22,
    color: "#16233F",
    strokeWidth: 2.25
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl tracking-tight",
    style: {
      fontFamily: "'Fraunces', Georgia, serif",
      color: "#F2E9D8",
      fontWeight: 600
    }
  }, "Miniature Scale Converter"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: "#7A9EC4"
    }
  }, "Real-world & dollhouse-scale measurements, side by side"))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-md p-6 sm:p-8",
    style: {
      backgroundColor: "#F2E9D8",
      border: "1px solid #B8863B",
      boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs uppercase tracking-widest mb-2",
    style: {
      color: "#8A6A2F",
      fontWeight: 600,
      letterSpacing: "0.08em"
    }
  }, "Scale ratio"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, SCALES.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.value,
    onClick: () => setScale(s.value),
    title: s.label,
    className: "px-3 py-1.5 rounded-sm text-sm transition-colors",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      backgroundColor: scale === s.value ? "#1B2A4A" : "transparent",
      color: scale === s.value ? "#F2E9D8" : "#1B2A4A",
      border: "1px solid #1B2A4A"
    }
  }, "1:", s.value)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm",
    style: {
      color: "#1B2A4A",
      fontFamily: "'IBM Plex Mono', monospace"
    }
  }, "1:"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    "aria-label": "Custom scale ratio",
    value: SCALES.some(s => s.value === scale) ? "" : scale,
    placeholder: "custom",
    onChange: e => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v) && v > 0) setScale(v);
    },
    className: "w-20 px-2 py-1.5 rounded-sm text-sm outline-none",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      border: "1px solid #B8863B",
      backgroundColor: "#FFFDF8",
      color: "#1B2A4A"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-sm p-4",
    style: {
      backgroundColor: "#FFFDF8",
      border: "1px solid rgba(27,42,74,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest",
    style: {
      color: "#8A6A2F",
      fontWeight: 600
    }
  }, "Real-life size")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    "aria-label": "Real-life size",
    value: realValue,
    onChange: e => handleRealChange(e.target.value),
    className: "flex-1 min-w-0 px-3 py-2 rounded-sm text-lg outline-none",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      border: "1px solid #1B2A4A",
      color: "#1B2A4A",
      backgroundColor: "transparent"
    }
  }), /*#__PURE__*/React.createElement("select", {
    value: realUnit,
    "aria-label": "Real-life unit",
    onChange: e => {
      setRealUnit(e.target.value);
      setDirection("toMini");
    },
    className: "px-2 py-2 rounded-sm text-sm outline-none",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      border: "1px solid #1B2A4A",
      color: "#1B2A4A",
      backgroundColor: "#F2E9D8"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "in"
  }, "in"), /*#__PURE__*/React.createElement("option", {
    value: "ft"
  }, "ft"), /*#__PURE__*/React.createElement("option", {
    value: "cm"
  }, "cm"), /*#__PURE__*/React.createElement("option", {
    value: "mm"
  }, "mm"))), realUnit === "ft" || realUnit === "in" ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1.5",
    style: {
      color: "#6B7A94"
    }
  }, "= ", formatFeetInches(displayRealInches)) : null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center -my-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center w-8 h-8 rounded-full",
    style: {
      backgroundColor: "#B8863B"
    }
  }, /*#__PURE__*/React.createElement(ArrowLeftRight, {
    size: 15,
    color: "#FFFDF8"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-sm p-4",
    style: {
      backgroundColor: "#FFFDF8",
      border: "1px solid rgba(27,42,74,0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest",
    style: {
      color: "#8A6A2F",
      fontWeight: 600
    }
  }, "Miniature size (1:", formatNumber(scale), ")")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    "aria-label": "Miniature size",
    value: direction === "toMini" ? formatNumber(fromInches(computedMiniInches, miniUnit)) : miniValue,
    onChange: e => handleMiniChange(e.target.value),
    className: "flex-1 min-w-0 px-3 py-2 rounded-sm text-lg outline-none",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      border: "1px solid #1B2A4A",
      color: "#1B2A4A",
      backgroundColor: "transparent"
    }
  }), /*#__PURE__*/React.createElement("select", {
    value: miniUnit,
    "aria-label": "Miniature unit",
    onChange: e => {
      setMiniUnit(e.target.value);
    },
    className: "px-2 py-2 rounded-sm text-sm outline-none",
    style: {
      fontFamily: "'IBM Plex Mono', monospace",
      border: "1px solid #1B2A4A",
      color: "#1B2A4A",
      backgroundColor: "#F2E9D8"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "in"
  }, "in"), /*#__PURE__*/React.createElement("option", {
    value: "ft"
  }, "ft"), /*#__PURE__*/React.createElement("option", {
    value: "cm"
  }, "cm"), /*#__PURE__*/React.createElement("option", {
    value: "mm"
  }, "mm"))), miniUnit === "ft" || miniUnit === "in" ? /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1.5",
    style: {
      color: "#6B7A94"
    }
  }, "= ", formatFeetInches(displayMiniInches)) : null)), /*#__PURE__*/React.createElement("div", {
    className: "mt-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement(DoorOpen, {
    size: 14,
    color: "#8A6A2F"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest",
    style: {
      color: "#8A6A2F",
      fontWeight: 600
    }
  }, "Quick reference at 1:", formatNumber(scale))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-sm overflow-hidden",
    style: {
      border: "1px solid rgba(27,42,74,0.15)"
    }
  }, REFERENCE_ITEMS.map((item, i) => {
    const mini = item.real / scale;
    return /*#__PURE__*/React.createElement("div", {
      key: item.name,
      className: "flex items-center justify-between px-3 py-2 text-sm",
      style: {
        backgroundColor: i % 2 === 0 ? "#FFFDF8" : "rgba(184,134,59,0.08)",
        color: "#1B2A4A"
      }
    }, /*#__PURE__*/React.createElement("span", null, item.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'IBM Plex Mono', monospace",
        color: "#8A6A2F"
      }
    }, formatFeetInches(mini)));
  })))), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-xs mt-4",
    style: {
      color: "#5A7295"
    }
  }, "Change either box \u2014 the other side updates to match the scale ratio.")));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(ScaleConverter));
