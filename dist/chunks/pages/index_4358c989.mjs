/* empty css                           */import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderComponent, d as createAstro, e as renderSlot, f as renderHead } from '../astro_3390bf94.mjs';
import 'html-escaper';
import 'clsx';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import hexRgb from 'hex-rgb';
import numeral from 'numeral';
import { Tooltip } from 'react-tooltip';
import CurrencyInput from 'react-currency-input-field';
import Mexp from 'math-expression-evaluator';
import { usePDF } from 'react-to-pdf';
import * as Switch from '@radix-ui/react-switch';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-black py-4"> <img class="mx-auto"${addAttribute(`${"/"}/images/logo-ds.svg`, "src")} alt=""> </footer>`;
}, "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/components/Footer.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="h-20 lg:h-9 bg-darmouth-green lg:bg-british-racing-green relative"> ${renderComponent($$result, "Header_logo", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/components/Header_logo", "client:component-export": "default" })} </header>`;
}, "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/components/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ousroi.datasketch.co/");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Poppins:wght@400;600&display=swap" rel="stylesheet"><link rel="icon" href="https://www.ohio.edu/favicon.ico" type="image/x-icon"><title>', "</title>", '</head> <body class="font-poppins"> <noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade"></noscript> ', " <main> ", " </main> ", ' <!-- Simple Analytics - 100% privacy-first analytics --> <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"><\/script> </body> </html>'])), addAttribute(description, "content"), title, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/layout/BaseLayout.astro", void 0);

const OutcomeText = ({ data, color, socialValue, socialValue2, showReturn = true }) => {
  const ret = socialValue ? parseFloat(socialValue).toFixed(2) : parseFloat(data.general.return).toFixed(2);
  const ret2 = socialValue2 ? parseFloat(socialValue2).toFixed(2) : parseFloat(data.general.returnMin).toFixed(2);
  return /* @__PURE__ */ jsx(Fragment, { children: data.general.ranges === "yes" ? /* @__PURE__ */ jsxs(Fragment, { children: [
    "For every ",
    /* @__PURE__ */ jsxs("span", { className: "font-semibold text-3xl", style: { color }, children: [
      " $",
      data.general.invested
    ] }),
    " invested, ",
    data.general.title,
    " ",
    /* @__PURE__ */ jsx("br", {}),
    " creates an estimated ",
    /* @__PURE__ */ jsxs("span", { className: "font-semibold text-3xl", style: { color }, children: [
      "$",
      ret2,
      " - $",
      ret.toString(),
      " "
    ] }),
    showReturn && data.general.returnDescription
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    "For every ",
    /* @__PURE__ */ jsxs("span", { className: "font-semibold text-3xl", style: { color }, children: [
      " $",
      data.general.invested
    ] }),
    " invested, ",
    data.general.title,
    " creates an estimated ",
    /* @__PURE__ */ jsxs("span", { className: "font-semibold text-3xl", style: { color }, children: [
      " $",
      ret.toString(),
      " "
    ] }),
    showReturn && data.general.returnDescription
  ] }) });
};

function formatAs(txt, unit = '') {
    let value = '';

    switch (unit) {
        case 'currency':
            value = '$0,0.00';
            break;
        case 'percentage':
            value = '0%';
            break;
        default:
            value = '0,0.00';
            break;
    }

    return numeral(txt).format(value)
}

function parseToNumber(txt) {
    return numeral(txt).value()
}

function valueFormat(value) {
    return Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)
}

function TableAccordion({ color = "#00694E", setIsOpen, rows, span = true, data, groupByStakeholders, id }) {
  const rgb = hexRgb(color, { format: "array", alpha: 0.1 });
  const rgba = `rgba(${rgb.join(", ")})`;
  const getDataState = (e) => {
    const isOpen = e.target.closest(".AccordionTrigger").getAttribute("data-state") !== "open";
    setIsOpen(isOpen);
  };
  const addingRows = () => {
    const values = [...data.proxy_inputs, ...data.proxy_values];
    rows = rows.map((item) => {
      const vars = item.variables.split(",");
      let temp = item.formula;
      for (let variable of vars) {
        temp = temp.replaceAll(variable, values.find((ele) => ele.id === variable)?.value);
      }
      item.formula_str = `${temp} = ${item.value}`;
      const vars2 = vars.map((variable) => {
        const description = values.find((v) => v.id === variable);
        return description;
      });
      item.rows = vars2;
      return item;
    });
  };
  addingRows();
  return /* @__PURE__ */ jsx(Accordion.Root, { type: "single", collapsible: true, children: rows && rows.map((item, i) => /* @__PURE__ */ jsxs(Accordion.Item, { className: "AccordionItem", value: `item-${i}`, children: [
    /* @__PURE__ */ jsxs(Accordion.Header, { className: "AccordionHeader py-4", style: { color: `rgb(${rgb.slice(0, 3).join(",")})`, backgroundColor: rgba, borderColor: color }, children: [
      /* @__PURE__ */ jsx("div", { className: classNames("", { "col-span-2": !span, "col-span-2 px-0": span }), children: /* @__PURE__ */ jsx("h4", { className: "text-sm lg:text-base text-black", children: groupByStakeholders ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : item.stakeholders }) }),
      /* @__PURE__ */ jsx("div", { className: classNames({ "col-span-7": !span, "col-span-7 px-0": span }), children: /* @__PURE__ */ jsx("h4", { className: "text-sm lg:text-base text-black", children: item.description }) }),
      /* @__PURE__ */ jsxs("div", { className: classNames("flex items-center gap-x-8", { "col-span-3": !span, "col-span-3 px-0": span }), children: [
        /* @__PURE__ */ jsx("div", { className: "w-10/12", children: item.valueMin ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end ", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-black", children: "[high]" }),
            /* @__PURE__ */ jsxs("h4", { className: classNames("text-sm font-semibold text-black text-right", item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : ""), children: [
              "$ ",
              valueFormat(item.value)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end ", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-black", children: "[low]" }),
            /* @__PURE__ */ jsxs("h4", { className: classNames("text-sm font-semibold text-black text-right", item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : ""), children: [
              "$ ",
              valueFormat(item.valueMin)
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("h4", { className: classNames("text-sm font-semibold text-black text-right", item.changed ? `bg-[#00C1D4]/10 border-[#00C1D4] border-dashed border-2 rounded-md` : ""), children: [
          "$ ",
          valueFormat(item.value)
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "w-2/12 flex justify-end", children: /* @__PURE__ */ jsx(Accordion.Trigger, { onClick: (e) => getDataState(e), className: "AccordionTrigger", style: { backgroundColor: color }, "aria-label": `${item.stakeholders} details`, children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: "AccordionChevron", "aria-hidden": true }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Accordion.Content, { className: "AccordionContent", style: { backgroundColor: rgba, borderColor: color }, children: [
      /* @__PURE__ */ jsx("div", { className: "AccordionContentChildren", style: { borderColor: color }, children: item.rows.map((item2, j) => {
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: classNames("py-2", { "col-span-2": !span, "col-span-2 px-0": span }), children: j === 0 && /* @__PURE__ */ jsx("p", { className: "text-black text-sm", children: "How do we calculate this?" }) }, `outcomes-${i + 1}-1-${id}-${j}`),
          /* @__PURE__ */ jsx("div", { className: classNames({ "col-span-7 py-2": !span, "col-span-7 px-0 py-2": span }), children: item2?.ref ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "text-black text-sm", children: [
            item2?.description,
            " ",
            /* @__PURE__ */ jsx("a", { href: `/${data.general.organization}/${data.general.database}/?tab=tab3#tabs`, target: "_blank", className: "text-[#A4D65E] underline", children: item2?.ref }, `outcomess-${j + 1}`)
          ] }, `outcomes-${j + 1}`) }) : /* @__PURE__ */ jsx("p", { className: "text-black text-sm", children: item2?.description }, `outcomes-${j + 1}`) }, `outcomes-${i + 1}-2-${id}-${j}`),
          item2.ranges ? /* @__PURE__ */ jsxs("div", { className: classNames("text-sm font-semibold -translate-x-20 text-right py-2", { "col-span-3": !span, "col-span-3 px-0": span }), children: [
            formatAs(item2?.valueMin, item2?.unit),
            " - ",
            formatAs(item2?.value, item2?.unit)
          ] }, `outcomes-${i + 1}-3-${id}-${j}`) : /* @__PURE__ */ jsx("div", { className: classNames("text-sm font-semibold -translate-x-20 text-right py-2", { "col-span-3": !span, "col-span-3 px-0": span }), children: formatAs(item2?.value, item2?.unit) }, `outcomes-${i + 1}-3-${id}-${j}`)
        ] });
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between border-t-[0.5px] py-4 pr-20", style: { borderColor: rgba }, children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: /* @__PURE__ */ jsx("p", { className: "text-gray-2 text-sm", children: "Formula" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-6", children: /* @__PURE__ */ jsx("p", { className: "text-black text-sm", children: " " }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: /* @__PURE__ */ jsx("p", { className: "text-gray-2 text-sm", children: item.formula_str }) })
      ] })
    ] })
  ] }, `acc-item-${i}-${item.stakeholders}-${id}`)) });
}

function Table({ color, data, isLarge = false, top = "top-2/3", count, span = true, data2, isGeneric = false, groupByStakeholders }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLimit, setHasLimit] = useState(false);
  const hasRow = !!data.rows;
  const anchor = `.tooltip-value${count}`;
  const tableRef = useRef();
  useEffect(() => {
    if (!tableRef.current)
      return;
    const element = tableRef.current;
    const { offsetWidth, scrollWidth } = element;
    const limitWidth = scrollWidth - offsetWidth;
    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      if (limitWidth - 5 > scrollLeft) {
        setHasLimit(false);
      } else {
        setHasLimit(true);
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [tableRef.current]);
  if (isLarge) {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden shadow relative", children: [
      /* @__PURE__ */ jsx("div", { className: "pt-5 pb-2.5 pl-5 pr-4", style: {
        backgroundColor: isGeneric ? "#fff" : color
      }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsxs("h3", { className: classNames("text-base lg:text-xl", { "text-white": !isGeneric, "text-black": isGeneric }), children: [
          data.title,
          hasRow && /* @__PURE__ */ jsxs("button", { className: `pl-1 tooltip-value${count}`, children: [
            !isGeneric && /* @__PURE__ */ jsx("img", { src: `${"/"}/images/icons/information-icon.svg`, alt: "information icon" }),
            isGeneric && /* @__PURE__ */ jsx("img", { src: `${"/"}/images/icons/information-generic-icon.svg`, alt: "information icon" })
          ] })
        ] }) }),
        hasRow && /* @__PURE__ */ jsxs("div", { className: "flex md:justify-end justify-between items-center gap-x-4", children: [
          /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "Total Value" }),
          data.ranges ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2 ml-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
              /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[high]" }),
              /* @__PURE__ */ jsx("div", { className: "bg-white rounded py-0.5 px-5 min-w-[180px] text-right", children: /* @__PURE__ */ jsxs("p", { className: "text-base lg:text-xl", children: [
                "$ ",
                valueFormat(data.totalValue)
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
              /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[low]" }),
              /* @__PURE__ */ jsx("div", { className: "bg-white rounded py-0.5 px-5 min-w-[180px]", children: /* @__PURE__ */ jsxs("p", { className: "text-base lg:text-xl text-right", children: [
                "$ ",
                valueFormat(data.totalValueMin)
              ] }) })
            ] })
          ] }) : /* @__PURE__ */ jsx("div", { className: "bg-white rounded py-0.5 px-5 min-w-[180px] w-", children: /* @__PURE__ */ jsxs("p", { className: "text-base lg:text-xl text-right", children: [
            "$ ",
            valueFormat(data.totalValue)
          ] }) })
        ] })
      ] }) }),
      hasRow && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { ref: tableRef, className: "overflow-x-scroll lg:overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-[1000px] lg:w-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 py-1 px-5 bg-white", children: [
            /* @__PURE__ */ jsx("div", { className: classNames("", { "col-span-2": !span, "col-span-2 px-0": span }), children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-xs lg:text-sm", children: groupByStakeholders ? "Type of impact" : "Who is impacted?" }) }),
            /* @__PURE__ */ jsx("div", { className: classNames("", { "col-span-7": !span, "col-span-8 px-0": span }), children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-xs lg:text-sm", children: "What changed?" }) }),
            /* @__PURE__ */ jsx("div", { className: classNames("pl-12", { "col-span-3": !span, "col-span-2 px-0": span }), children: /* @__PURE__ */ jsxs("h4", { className: "text-gray-2 text-xs lg:text-sm flex gap-1", children: [
              "Value ",
              /* @__PURE__ */ jsx("img", { className: `value${count}`, src: `${"/"}/images/icons/information-generic-icon.svg`, alt: "information icon" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(TableAccordion, { setIsOpen, color, rows: data.rows, span, data: data2, groupByStakeholders, id: data.id })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { anchorSelect: `.value${count}`, place: "right", style: { width: "250px", color: "black", background: "white", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }, children: "The values listed below are fiscal proxies, which are monetary representations of impacts for which there is no set market value. Fiscal proxies often take the form of costs avoided or benefits achieved." })
      ] }) }),
      !hasRow && /* @__PURE__ */ jsx("div", { className: "py-4 px-5 bg-white", children: /* @__PURE__ */ jsx("p", { className: "text-gray-2 text-sm", children: "None at this time" }) }),
      /* @__PURE__ */ jsx(Tooltip, { anchorSelect: anchor, place: "right", style: { width: "250px", color: "black", background: "white", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }, children: data.tooltip }),
      /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-right-full": hasLimit, "right-4": !hasLimit }), children: ">" }),
      /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-left-full": !hasLimit, "left-4": hasLimit }), children: "<" })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "pt-5 pb-2.5 pl-5 pr-8", style: {
        backgroundColor: isGeneric ? "#fff" : color
      }, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: classNames("text-xl", { "text-white": !isGeneric, "text-black": isGeneric }), children: data.title }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white pt-5 pb-1.5 pl-5 pr-8", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm", children: "Description" }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm", children: "Value" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white pb-10 pl-5 pr-8", children: data.rows.map(({ description, value, unit }, i) => {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b-[0.5px] border-b-silver py-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-black", children: description }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-black", children: value })
        ] }, `row-${i + 1}`);
      }) })
    ] });
  }
}

const mexp = new Mexp();
const safeEval = (expr) => {
  const lexed = mexp.lex(expr);
  const postfixed = mexp.toPostfix(lexed);
  return mexp.postfixEval(postfixed);
};
function Interactive({ top = "top-2/3", data, url }) {
  const color = data.general.theme;
  const isGeneric = true;
  const [values, setValues] = useState([...data.proxy_inputs, ...data.proxy_values]);
  const [outputs, setOutputs] = useState(data.proxy_inputs);
  const [tables, setTables] = useState(data.tabs[0].tables);
  const [socialValue, setSocialValue] = useState(data.general.return);
  const [socialValue2, setSocialValue2] = useState(data.general.returnMin);
  const tableRefCosts = useRef();
  const tableRefNumbers = useRef();
  const [hasLimit, setHasLimit] = useState(false);
  const [hasLimitNumbers, setHasLimitNumbers] = useState(false);
  const [prev, setPrev] = useState(0);
  const [link, setLink] = useState("");
  const { toPDF, targetRef } = usePDF({
    filename: "calculator-results.pdf",
    page: {
      margin: 20,
      format: "letter",
      orientation: "portrait"
    }
  });
  const getCurrencyInputConfig = (item) => {
    const config = { decimalsLimit: 2, allowNegativeValue: false, step: 1 };
    if (item.unit === "currency") {
      config.prefix = "$";
    }
    if (item.unit === "percentage") {
      config.suffix = "%";
    }
    return config;
  };
  const handleFieldChange = (value, index, unit, min = false) => {
    let parsedValue = parseToNumber(value);
    if (unit === "percentage") {
      parsedValue = parsedValue / 100;
    }
    if (min) {
      setOutputs((prevState) => {
        const i = prevState.findIndex((el) => el.id === index);
        prevState[i].valueMin = parsedValue;
        return [...prevState];
      });
    } else {
      setOutputs((prevState) => {
        const i = prevState.findIndex((el) => el.id === index);
        prevState[i].value = parsedValue;
        return [...prevState];
      });
    }
    if (parsedValue !== prev) {
      updateTable();
    }
    setPrev(parsedValue);
  };
  const updateTable = (change = true) => {
    let social = 0;
    let social2 = 0;
    const update = tables.map((tbl) => {
      const totalValue = tbl.rows.reduce((total, row) => {
        const vars = row.variables.split(",").map((v) => v.trim());
        const fx = vars.reduce((fx2, v) => {
          const value = values.find((item) => item.id === v)?.value;
          return fx2.replaceAll(v, value);
        }, row.formula);
        const prevValue = row.value;
        const result3 = safeEval(fx);
        row.value = result3;
        row.formula_str = `${fx} = ${result3}`;
        if (change) {
          row.changed = prevValue !== result3;
        }
        return total + result3;
      }, 0);
      tbl.totalValue = totalValue;
      social += totalValue;
      if (tbl.ranges) {
        const totalValue2 = tbl.rows.reduce((total, row) => {
          const vars = row.valueMin ? row.variables2.split(",").map((v) => v.trim()) : row.variables.split(",").map((v) => v.trim());
          const fx = vars.reduce((fx2, v) => {
            const tmp = values.find((item) => item.id === v);
            const value = tmp?.ranges ? tmp?.valueMin : tmp?.value;
            return fx2.replaceAll(v, value);
          }, row.valueMin ? row.formula2 : row.formula);
          row.valueMin ? row.valueMin : row.value;
          const result3 = safeEval(fx);
          if (row.valueMin) {
            row.valueMin = result3;
          } else {
            row.value = result3;
          }
          return total + result3;
        }, 0);
        tbl.totalValueMin = totalValue2;
        social2 += totalValue2;
      } else {
        social2 += totalValue;
      }
      return tbl;
    });
    const div_formula = data.general.formula;
    const fg = data.general.variables.split(",").map((v) => v.trim()).reduce((fg2, v) => {
      const value = values.find((item) => item.id === v)?.value;
      return fg2.replaceAll(v, value);
    }, div_formula);
    const formula = fg.replaceAll("SUM(proxies)", social);
    const formula2 = fg.replaceAll("SUM(proxies)", social2);
    const result = safeEval(formula);
    const result2 = safeEval(formula2);
    setSocialValue(result);
    setSocialValue2(result2);
    setTables(update);
  };
  const generateLink = () => {
    const params = new URLSearchParams();
    outputs.forEach((item) => {
      params.append(item.id, item.value.toString());
      if (item.ranges) {
        params.append(`m_${item.id}`, item.valueMin.toString());
      }
    });
    setLink(`${window.location.hostname}?tab=tab2&${params.toString()}#tabs`);
  };
  useEffect(() => {
    const element = tableRefCosts.current;
    const { offsetWidth, scrollWidth } = element;
    const limitWidth = scrollWidth - offsetWidth;
    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      if (limitWidth - 5 > scrollLeft) {
        setHasLimit(false);
      } else {
        setHasLimit(true);
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [tableRefCosts.current]);
  useEffect(() => {
    const element = tableRefNumbers.current;
    const { offsetWidth, scrollWidth } = element;
    const limitWidth = scrollWidth - offsetWidth;
    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      if (limitWidth - 5 > scrollLeft) {
        setHasLimitNumbers(false);
      } else {
        setHasLimitNumbers(true);
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [tableRefNumbers.current]);
  useEffect(() => {
    const params = new URLSearchParams(url);
    const tmp = [...outputs];
    params.forEach((value, key) => {
      if (key !== "tab") {
        if (key.startsWith("m_")) {
          const i = tmp.findIndex((el) => el.id === key.replace("m_", ""));
          if (i !== -1) {
            tmp[i].valueMin = parseFloat(value);
          }
        } else {
          const i = tmp.findIndex((el) => el.id === key);
          if (i !== -1) {
            tmp[i].value = parseFloat(value);
          }
        }
      }
    });
    setOutputs(tmp);
    updateTable(false);
  }, [url]);
  return /* @__PURE__ */ jsx("div", { className: "pb-9", children: /* @__PURE__ */ jsxs("div", { className: "mx-10 pt-10", ref: targetRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "u-container", children: [
      /* @__PURE__ */ jsx("div", { className: "pb-12", children: /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-semibold", style: { color }, children: "Calculate the details" }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-2xl py-8 px-10 rounded-2xl shadow-lg", style: { backgroundColor: hexRgb(color, { format: "css", alpha: 0.05 }) }, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl text-center", children: /* @__PURE__ */ jsx(OutcomeText, { data, color, showReturn: false, socialValue, socialValue2 }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 rounded-lg text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-2 text-center mt-3 text-lg lg:text-base", children: data.general.returnDescription }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden flex flex-col lg:flex-row gap-x-5", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-16 lg:w-2/3 flex flex-col justify-between mt-16", children: tables.map((table, i) => /* @__PURE__ */ jsx(
        Table,
        {
          color,
          data: table,
          isLarge: true,
          count: i,
          span: false,
          data2: data,
          isGeneric: true
        },
        `table-${i + 1}`
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 lg:w-1/3 mt-16", children: [
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { ref: tableRefCosts, className: "overflow-x-scroll lg:overflow-hidden rounded-2xl shadow", children: /* @__PURE__ */ jsxs("div", { className: "w-[450px] lg:w-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "pt-5 pb-2.5 pl-5 pr-8", style: {
            backgroundColor: "#fff" 
          }, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsx("h3", { className: "text-base lg:text-xl text-black font-medium", children: "What are the costs?" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 py-1 px-5 bg-white", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-7", children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm", children: "Description" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-5 pl-12", children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm text-end", children: "Value" }) })
          ] }),
          outputs.filter((out) => out.type === "cost").map((item, i) => /* @__PURE__ */ jsxs("div", { className: "grid pb-3 grid-cols-12 py-1 px-5 bg-white", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-7", children: /* @__PURE__ */ jsx("h4", { className: "text-sm lg:text-base text-black", children: item.description }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-5 pl-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
                item.ranges && /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[high]" }),
                /* @__PURE__ */ jsx(
                  CurrencyInput,
                  {
                    className: "w-full text-right border rounded-md border-black/30 p-1 inputclass",
                    value: item.unit === "percentage" ? parseToNumber(item.value) * 100 : parseToNumber(item.value),
                    onValueChange: (value) => handleFieldChange(value, item.id, item.unit),
                    ...getCurrencyInputConfig(item)
                  }
                )
              ] }),
              item.ranges && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
                /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[high]" }),
                /* @__PURE__ */ jsx(
                  CurrencyInput,
                  {
                    className: "w-full text-right border rounded-md border-black/30 p-1 inputclass",
                    value: item.unit === "percentage" ? parseToNumber(item.valueMin) * 100 : parseToNumber(item.valueMin),
                    onValueChange: (value) => handleFieldChange(value, item.id, item.unit, true),
                    ...getCurrencyInputConfig(item)
                  }
                )
              ] })
            ] })
          ] }, `output-${i}`)),
          /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-right-full": hasLimit, "right-4": !hasLimit }), children: ">" }),
          /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-left-full": !hasLimit, "left-4": hasLimit }), children: "<" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { ref: tableRefNumbers, className: "overflow-x-scroll lg:overflow-hidden rounded-2xl shadow mt-5", children: /* @__PURE__ */ jsxs("div", { className: "w-[800px] lg:w-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "pt-5 pb-2.5 pl-5 pr-8", style: {
            backgroundColor: "#fff" 
          }, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsx("h3", { className: "text-base lg:text-xl text-black font-medium", children: "What are the numbers?" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 py-1 px-5 bg-white", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-7", children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm", children: "Description" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-5 pl-12", children: /* @__PURE__ */ jsx("h4", { className: "text-gray-2 text-sm text-end", children: "Value" }) })
          ] }),
          outputs.filter((out) => out.type !== "cost").map((item, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 py-2 px-5 bg-white ", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-7", children: /* @__PURE__ */ jsx("h4", { className: "text-black", children: item.description }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-5 pl-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
                item.ranges && /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[high]" }),
                /* @__PURE__ */ jsx(
                  CurrencyInput,
                  {
                    className: "w-full text-right border rounded-md border-black/30 p-1 inputclass",
                    value: item.unit === "percentage" ? parseToNumber(item.value) * 100 : parseToNumber(item.value),
                    onValueChange: (value) => handleFieldChange(value, item.id, item.unit),
                    ...getCurrencyInputConfig(item)
                  }
                )
              ] }),
              item.ranges && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 justify-end", children: [
                /* @__PURE__ */ jsx("p", { className: classNames("text-xs lg:text-sm text-right", { "text-white": !isGeneric, "text-gray-2": isGeneric }), children: "[low]" }),
                /* @__PURE__ */ jsx(
                  CurrencyInput,
                  {
                    className: "w-full text-right border rounded-md border-black/30 p-1 inputclass",
                    value: item.unit === "percentage" ? parseToNumber(item.valueMin) * 100 : parseToNumber(item.valueMin),
                    onValueChange: (value) => handleFieldChange(value, item.id, item.unit, true),
                    ...getCurrencyInputConfig(item)
                  }
                )
              ] })
            ] })
          ] }, `another-outputs-${i}`)),
          /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-right-full": hasLimitNumbers, "right-4": !hasLimitNumbers }), children: ">" }),
          /* @__PURE__ */ jsx("div", { className: classNames(`absolute ${top} -translate-y-1/2 w-8 h-8 bg-robin-egg-blue text-white text-2xl rounded-full grid place-items-center duration-300 lg:hidden`, { "-left-full": !hasLimitNumbers, "left-4": hasLimitNumbers }), children: "<" })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-2 px-5 bg-white rounded-2xl shadow mt-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium", children: "Share" }),
          /* @__PURE__ */ jsx("p", { children: "Share or save your content" }),
          /* @__PURE__ */ jsxs("button", { onClick: generateLink, className: "flex items-center gap-x-2 w-full py-2 px-4 rounded-lg justify-center mt-3", style: { backgroundColor: hexRgb(color, { format: "css", alpha: 0.05 }), border: `1px solid ${color}`, color }, children: [
            /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsx("path", { d: "M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsx("path", { d: "M14.0002 11C13.5707 10.4259 13.0228 9.95081 12.3936 9.60706C11.7645 9.2633 11.0687 9.05888 10.3535 9.00766C9.63841 8.95645 8.92061 9.05963 8.24885 9.31021C7.5771 9.5608 6.96709 9.95293 6.4602 10.46L3.4602 13.46C2.54941 14.403 2.04544 15.666 2.05683 16.977C2.06822 18.288 2.59407 19.542 3.52111 20.4691C4.44815 21.3961 5.70221 21.922 7.01319 21.9334C8.32418 21.9448 9.58719 21.4408 10.5302 20.53L12.2402 18.82", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsx("path", { d: "M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
              /* @__PURE__ */ jsx("path", { d: "M14.0002 11C13.5707 10.4259 13.0228 9.9508 12.3936 9.60704C11.7645 9.26328 11.0687 9.05886 10.3535 9.00765C9.63841 8.95643 8.92061 9.05961 8.24885 9.3102C7.5771 9.56079 6.96709 9.95291 6.4602 10.46L3.4602 13.46C2.54941 14.403 2.04544 15.666 2.05683 16.977C2.06822 18.288 2.59407 19.542 3.52111 20.4691C4.44815 21.3961 5.70221 21.922 7.01319 21.9334C8.32418 21.9447 9.58719 21.4408 10.5302 20.53L12.2402 18.82", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })
            ] }),
            "Generate link"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full border border-black/30 rounded-lg relative my-3 px-2 py-1.5", children: [
            /* @__PURE__ */ jsx("input", { type: "text", value: link, className: "w-full border-black" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                disabled: !link,
                onClick: () => navigator.clipboard.writeText(link),
                className: "absolute right-0 top-[1px] rounded-lg px-2 py-1",
                style: { backgroundColor: link ? hexRgb(color, { format: "css", alpha: 0.99 }) : "grey", border: `1px solid white`, color: "white" },
                children: "Copy"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-black/30" }),
            /* @__PURE__ */ jsx("p", { className: "text-black/30", children: "Or" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-black/30" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => toPDF(),
              className: "flex items-center gap-x-2 w-full py-2 px-4 rounded-lg justify-center hover:text-white mt-5",
              style: { backgroundColor: hexRgb(color, { format: "css", alpha: 0.05 }), border: `1px solid ${color}`, color },
              children: [
                /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                  /* @__PURE__ */ jsx("path", { d: "M12 17V3", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
                  /* @__PURE__ */ jsx("path", { d: "M6 11L12 17L18 11", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }),
                  /* @__PURE__ */ jsx("path", { d: "M19 21H5", stroke: color, "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" })
                ] }),
                "Download"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}

function OutcomeChain({ title, graphs }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 space-y-12 md:space-y-24 lg:space-y-32 xl:space-y-48", children: graphs.map((graph, i) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: graph, alt: `graph-${i + 1}` }) }, `graph-${i + 1}`);
    }) })
  ] });
}

function References({ list }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", { className: "list-disc space-y-10 text-sm lg:text-base pl-12 pr-9 lg:pl-40 lg:pr-36", children: list.map((item, i) => {
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: item.href, children: item.title }) }, `ref-${i}`);
  }) }) });
}

function TabSection({ color = "#00694E", tabs, url, data }) {
  const [currentTab, setCurrentTab] = useState("");
  const [show, setShow] = useState(false);
  const [groupByStakeholders, setGroupByStakeholders] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(url);
    const newTab = params.get("tab") ? params.get("tab") : "tab1";
    const newShow = params.get("display") !== "false";
    setCurrentTab(newTab);
    setShow(newShow);
  }, [url]);
  const handleGroupByStakeholders = () => {
    setGroupByStakeholders(!groupByStakeholders);
  };
  return (
    // TAB PARENT
    /* @__PURE__ */ jsxs(
      Tabs.Root,
      {
        value: currentTab,
        orientation: "horizontal",
        onValueChange: (value) => setCurrentTab(value),
        children: [
          /* @__PURE__ */ jsx(Tabs.List, { className: "u-container flex", "aria-label": "tabs", children: tabs.map(({ label }, i) => {
            if (label == "Program Details") {
              if (show) {
                return /* @__PURE__ */ jsx(Tabs.Trigger, { value: `tab${i + 1}`, className: "TabsTrigger", style: { color }, children: label }, `tab-trigger-${i + 1}`);
              }
            } else {
              return /* @__PURE__ */ jsx(Tabs.Trigger, { value: `tab${i + 1}`, className: "TabsTrigger", style: { color }, children: label }, `tab-trigger-${i + 1}`);
            }
          }) }),
          tabs.map((item, i) => {
            return /* @__PURE__ */ jsxs(Tabs.Content, { className: "bg-anti-flash-white ", value: `tab${i + 1}`, children: [
              item.type === "table" && /* @__PURE__ */ jsxs("div", { className: "pt-12 pb-9 relative", children: [
                data.general.bg_image1 && /* @__PURE__ */ jsx("img", { src: `${data.general.bg_image1}`, alt: "bg", className: "absolute right-0 max-w-[400px] opacity-40 -z-0" }),
                data.general.bg_image2 && /* @__PURE__ */ jsx("img", { src: `${data.general.bg_image2}`, alt: "bgh", className: "absolute bottom-0 max-w-[400px] opacity-40 -z-0" }),
                /* @__PURE__ */ jsxs("div", { className: "u-container", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-12", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-semibold", style: { color }, children: "Look at the details" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 z-10 ", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "", children: "Group by Stakeholders" }),
                      /* @__PURE__ */ jsx(
                        Switch.Root,
                        {
                          checked: groupByStakeholders,
                          onCheckedChange: handleGroupByStakeholders,
                          className: "w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default",
                          id: "airplane-mode",
                          children: /* @__PURE__ */ jsx(Switch.Thumb, { className: "block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-12", children: item[groupByStakeholders ? "tables_stakeholders" : "tables"].map((table, i2) => {
                    return /* @__PURE__ */ jsx(Table, { color, data: { ...table }, isLarge: true, count: i2, data2: data, groupByStakeholders }, `table-${i2 + 1}-${table.id}`);
                  }) })
                ] })
              ] }),
              item.type === "outcome_chain" && /* @__PURE__ */ jsx("div", { className: "pt-20 pb-36", children: /* @__PURE__ */ jsx("div", { className: "u-container", children: /* @__PURE__ */ jsx(OutcomeChain, { title: item.title, graphs: item.graphs }) }) }),
              item.type === "references" && /* @__PURE__ */ jsx("div", { className: "py-12 lg:py-16 xl:py-20", children: /* @__PURE__ */ jsx("div", { className: "u-container", children: /* @__PURE__ */ jsx(References, { list: item.list }) }) }),
              item.type === "interactive" && show && /* @__PURE__ */ jsx(Interactive, { data: JSON.parse(JSON.stringify(data)), url })
            ] }, `tab-content-${i + 1}`);
          })
        ]
      }
    )
  );
}

function Home({ data }) {
  const [url, setURL] = useState("");
  const color = data.general.theme;
  useEffect(() => {
    setURL(window.location.search);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "-mt-20 lg:-mt-32 u-container bg-white", children: /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-16", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("img", { className: "max-w-96", src: data.general.logo, alt: data.general.title }) }),
        /* @__PURE__ */ jsx("div", { className: "text-center text-xl", children: /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx(OutcomeText, { data, color }) }) })
      ] }) }),
      data.general.main_image && /* @__PURE__ */ jsx("img", { src: data.general.main_image, alt: "", className: "mx-auto" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-5 items-center justify-between mt-16", children: [
        /* @__PURE__ */ jsx("h2", { children: data.general.subtitle }),
        /* @__PURE__ */ jsx("img", { src: `${"/"}/images/logo-5.svg`, alt: "" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { id: "tabs", children: /* @__PURE__ */ jsx(TabSection, { color: data.general.theme, tabs: data.tabs, url, data }) }),
    /* @__PURE__ */ jsxs("div", { className: "u-container py-16 flex gap-x-16 items-center", children: [
      /* @__PURE__ */ jsx("img", { src: `${"/"}/images/div2.svg`, alt: "" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm lg:text-base", children: data.general.description })
    ] })
  ] });
}

const general = {
	organization: "ohio-university-sroi",
	database: "coad-sroi",
	logo: "https://res.cloudinary.com/randommonkey/image/upload/v1733162084/datasketch/media/ohio-university-sroi/COAD-Logo-Full-Name_k8lsun.png",
	banner: "https://res.cloudinary.com/randommonkey/image/upload/v1733162581/datasketch/media/ohio-university-sroi/COAD-Logo-Full-Name_bd3cwn.png",
	theme: "#2E6173",
	main_image: "https://res.cloudinary.com/randommonkey/image/upload/v1733162108/datasketch/media/ohio-university-sroi/office_bldg_autumn_pfns2f.jpg",
	bg_image1: "",
	bg_image2: "",
	ranges: "yes",
	title: "COAD Employer Sponsored County-wide Child Care Center",
	invested: "1",
	formula: "SUM(proxies)/pi_1",
	variables: "pi_1",
	"return": "6.626809966303645",
	returnMin: "5.688474070492222",
	returnDescription: "",
	subtitle: "Social Return on Investment Impact Calculator created by",
	description: "Social Return on Investment (SROI) is a method of calculating and communicating impact using dollar values. SROI measures the social value created by an organization’s activities, products, services or community initiatives. SROI combines social, economic, and environmental impacts into a comprehensive financial measurement of social value in a holistic measure of impact.",
	totalProxies: "1988042.989891093",
	totalProxiesMin: "1706542.221147667"
};
const proxy_inputs = [
	{
		id: "pi_1",
		value: 300000,
		valueMin: null,
		type: "cost",
		"unit ": "currency",
		description: "Operating Costs",
		changed: false,
		ranges: false
	},
	{
		id: "pi_2",
		value: 3360,
		valueMin: 950,
		type: "user_input",
		"unit ": "currency",
		description: "Revenue per child served",
		changed: false,
		ranges: true
	},
	{
		id: "pi_3",
		value: 80,
		valueMin: 56.41,
		type: "user_input",
		"unit ": "",
		description: "Number of adults with children at the child care facility",
		changed: false,
		ranges: true
	},
	{
		id: "pi_4",
		value: 13.33,
		valueMin: null,
		type: "user_input",
		"unit ": "",
		description: "Number  of staff members  at the child care facility",
		changed: false,
		ranges: false
	},
	{
		id: "pi_5",
		value: 80,
		valueMin: null,
		type: "user_input",
		"unit ": "",
		description: "Number of children served  at the child care facility",
		changed: false,
		ranges: false
	}
];
const proxy_values = [
	{
		id: "pv_1",
		value: 5795.01,
		valueMin: null,
		unit: "currency",
		description: "CPI adjusted value of annual absenteeism costs roughly per year for each hourly worker",
		ref: "(Absenteeism, Circadian, 2005)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_2",
		value: 0.45,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of parents who miss work due to insufficient childcare",
		ref: "(Ready Nation, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_3",
		value: 0.49,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of  parents who quit their jobs or got fired because of child care problems ",
		ref: "(Child Care Crisis, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_4",
		value: 0.1138,
		valueMin: null,
		unit: "percentage",
		description: "Annual turnover rate in Ohio",
		ref: "(Ohio LMI, 2022)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_5",
		value: 0.2,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of an hourly employee's salary : Cost of turonver to businesses a result of lack of childcare services",
		ref: "(Care for Business, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_6",
		value: 5197,
		valueMin: null,
		unit: "currency",
		description: "Cost of turnover 20% Cost of average annual salary of High School graduates for Adams County 2020 ",
		ref: "(Data Ohio, 2020)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_7",
		value: 25985,
		valueMin: null,
		unit: "currency",
		description: "Average annual salary of an adult with high school diploma",
		ref: "(Data Ohio, 2020)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_8",
		value: 31011,
		valueMin: null,
		unit: "currency",
		description: "Average annual salary of an adult with high school diploma with 10 years of experience",
		ref: "(Data Ohio, 2020)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_9",
		value: 4.3,
		valueMin: null,
		unit: "days",
		description: "Number of days of work missed every six months due to insufficient child care services by caregivers",
		ref: "(Ready Nation, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_10",
		value: 5,
		valueMin: null,
		unit: "hours",
		description: "Number of hours less workers with insuffiecient child care (reduce 40 hour workweek to less than 35 hour workweek)",
		ref: "(Child Care Crisis, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_11",
		value: 5,
		valueMin: null,
		unit: "months",
		description: "Average time spent (months) unemployed and looking for a job (low wage)",
		ref: "(BLS, 2024)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_12",
		value: 21.05,
		valueMin: null,
		unit: "currency",
		description: "Median hourly wage in Appalachian Ohio",
		ref: "(BLS, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_13",
		value: 0.44,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of parents who reduce hours due to insufficient childcare",
		ref: "(Child Care Crisis, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_14",
		value: 0.74,
		valueMin: null,
		unit: "percentage",
		description: "Discount for those who will receive unemployment, only 26% applied for it in 2022",
		ref: "(BLS, 2022)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_15",
		value: 0.1,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of children at-risk in Ohio",
		ref: "(NCPP, 2010)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_16",
		value: 37462.2,
		valueMin: null,
		unit: "currency",
		description: "CPI adjusted value of annual cost of incarceration per person in a state prison in Ohio",
		ref: "(Health Policy Institute of Ohio, 2019)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_17",
		value: 13.15,
		valueMin: null,
		unit: "currency",
		description: "Median hourly wage for child care workers in Ohio",
		ref: "(Policy Matters Ohio, 2024)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_18",
		value: 0.66,
		valueMin: null,
		unit: "percentage",
		description: "Child Care Centers reported staff shortage",
		ref: "(Early Care and Education Consortium, 2022)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_19",
		value: 0.4,
		valueMin: null,
		unit: "percentage",
		description: "Annual turnover rates for child care workers nationwide  40%. HIGH",
		ref: "(University of Nebraska, 2018)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_20",
		value: 0.26,
		valueMin: null,
		unit: "percentage",
		description: "Annual turnover rates for child care workers nationwide  26% LOW",
		ref: "(University of Nebraska, 2018)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_21",
		value: 0.38,
		valueMin: null,
		unit: "percentage",
		description: "Percentage of child care providers report that they are considering leaving their child care job due to stress, burnout and less pay",
		ref: "(University of Oregon, 2021)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_22",
		value: 1470,
		valueMin: null,
		unit: "currency",
		description: "Average annual cost of insufficient childcare to taxpayers ",
		ref: "(Bishop, 2023)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_23",
		value: 0.7,
		valueMin: null,
		unit: "percentage",
		description: "At-risk children who do not get high-quality early childhood experiences, more likely to get arrested for violent crime",
		ref: "(American Progress, 2013)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_24",
		value: 11,
		valueMin: null,
		unit: "months",
		description: "On average, compared to children who attend preschool, children who do not attend preschool are going to serve 11 months more in prison",
		ref: "(Journal of Human Resources, 2006)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_25",
		value: 0.22,
		valueMin: null,
		unit: "percentage",
		description: "Early childhood educators with a bachelorâ€™s degree are paid 22% less than their colleagues in the Kâ€“8 system",
		ref: "(Research for Action, 2021)",
		changed: false,
		ranges: false
	},
	{
		id: "pv_26",
		value: 16.86,
		valueMin: null,
		unit: "currency",
		description: "Target salary for Child Care workers to match the salary scale of their colleagues in K-8 system",
		ref: "",
		changed: false,
		ranges: false
	},
	{
		id: "pv_27",
		value: 0.42,
		valueMin: null,
		unit: "percentage",
		description: "Turnover cost without loss due absences and lost productivity accounted for 42% of the total cost of turnover",
		ref: "",
		changed: false,
		ranges: false
	},
	{
		id: "pv_28",
		value: 0.5,
		valueMin: null,
		unit: "percentage",
		description: "Cost of turnover, 50% of annual salary",
		ref: "",
		changed: false,
		ranges: false
	}
];
const tabs = [
	{
		tables: [
			{
				changed: false,
				ranges: true,
				rows: [
					{
						type: "general",
						stakeholders: "Community",
						description: "More local investment, thriving economy ",
						value: 117600,
						valueMin: null,
						variables: "pv_22,pi_5",
						formula: "pi_5*pv_22",
						variables2: "",
						formula2: ""
					},
					{
						type: "general",
						stakeholders: "Employers",
						description: "Decreased call-offs and increased productivity",
						value: 231803.96912,
						valueMin: 163450.77372574,
						variables: "pv_3,pv_4,pi_3,pv_6,pv_2,pv_1",
						formula: "pi_3*pv_2*pv_1+pi_3*pv_3*pv_4*pv_6",
						variables2: "pv_3,pv_4,pi_3,pv_6,pv_2,pv_1",
						formula2: "pi_3*pv_2*pv_1+pi_3*pv_3*pv_4*pv_6"
					},
					{
						type: "general",
						stakeholders: "Families",
						description: "Ability to retain jobs, work more hours",
						value: 558858.2733333334,
						valueMin: 394064.9399841666,
						variables: "pv_12,pv_3,pv_14,pv_13,pv_11,pv_10,pv_9,pi_3,pv_2,pv_7",
						formula: "pi_3*pv_2*pv_9*pv_12*2*8+pi_3*pv_13*pv_10*pv_12*52+pi_3*pv_3*pv_7*pv_11*pv_14/12",
						variables2: "pv_12,pv_3,pv_14,pv_13,pv_11,pv_10,pv_9,pi_3,pv_2,pv_7",
						formula2: "pi_3*pv_2*pv_9*pv_12*2*8+pi_3*pv_13*pv_10*pv_12*52+pi_3*pv_3*pv_7*pv_11*pv_14/12"
					},
					{
						type: "general",
						stakeholders: "Children",
						description: "Increased future earnings from family financial stability",
						value: 704056,
						valueMin: null,
						variables: "pv_7,pv_8,pi_5",
						formula: "pi_5*pv_7*0.01*10+pi_5*pv_8*0.02*10",
						variables2: "",
						formula2: ""
					},
					{
						type: "general",
						stakeholders: "Children",
						description: "Increased social and emotional skills",
						value: 192305.96,
						valueMin: null,
						variables: "pv_23,pv_15,pv_24,pv_16,pi_5",
						formula: "pi_5*pv_24*pv_23*pv_15*pv_16/12",
						variables2: "",
						formula2: ""
					},
					{
						type: "general",
						stakeholders: "Staff",
						description: "Better paid employees",
						value: 183418.78743776,
						valueMin: 135064.54743776,
						variables: "pv_17,pi_4,pv_18,pv_27,pi_2,pv_28,pv_26,pv_21,pv_20,pi_5",
						formula: "pi_4*pv_26*2080-pi_4*pv_17*2080+pi_4*pv_18*pv_20*pv_17*2080*pv_28*pv_27+pv_18*pv_21*pi_2*pi_5",
						variables2: "pv_17,pi_4,pv_18,pv_27,pi_2,pv_28,pv_26,pv_21,pv_20,pi_5",
						formula2: "pi_4*pv_26*2080-pi_4*pv_17*2080+pi_4*pv_18*pv_20*pv_17*2080*pv_28*pv_27+pv_18*pv_21*pi_2*pi_5"
					}
				],
				id: "general",
				title: "General",
				tooltip: "",
				totalValue: 1988042.9898910935,
				totalValueMin: 1706542.2211476667
			}
		],
		list: [
		],
		label: "Dashboard",
		type: "table",
		tables_stakeholders: [
			{
				changed: false,
				ranges: false,
				rows: [
					{
						type: "general",
						stakeholders: "Community",
						description: "More local investment, thriving economy ",
						value: 117600,
						valueMin: null,
						variables: "pv_22,pi_5",
						formula: "pi_5*pv_22",
						variables2: "",
						formula2: ""
					}
				],
				id: "Community",
				title: "What is the impact on Community?",
				tooltip: "",
				totalValue: 117600,
				totalValueMin: 117600
			},
			{
				changed: false,
				ranges: true,
				rows: [
					{
						type: "general",
						stakeholders: "Employers",
						description: "Decreased call-offs and increased productivity",
						value: 231803.96912,
						valueMin: 163450.77372574,
						variables: "pv_3,pv_4,pi_3,pv_6,pv_2,pv_1",
						formula: "pi_3*pv_2*pv_1+pi_3*pv_3*pv_4*pv_6",
						variables2: "pv_3,pv_4,pi_3,pv_6,pv_2,pv_1",
						formula2: "pi_3*pv_2*pv_1+pi_3*pv_3*pv_4*pv_6"
					}
				],
				id: "Employers",
				title: "What is the impact on Employers?",
				tooltip: "",
				totalValue: 231803.96912,
				totalValueMin: 163450.77372574
			},
			{
				changed: false,
				ranges: true,
				rows: [
					{
						type: "general",
						stakeholders: "Families",
						description: "Ability to retain jobs, work more hours",
						value: 558858.2733333334,
						valueMin: 394064.9399841666,
						variables: "pv_12,pv_3,pv_14,pv_13,pv_11,pv_10,pv_9,pi_3,pv_2,pv_7",
						formula: "pi_3*pv_2*pv_9*pv_12*2*8+pi_3*pv_13*pv_10*pv_12*52+pi_3*pv_3*pv_7*pv_11*pv_14/12",
						variables2: "pv_12,pv_3,pv_14,pv_13,pv_11,pv_10,pv_9,pi_3,pv_2,pv_7",
						formula2: "pi_3*pv_2*pv_9*pv_12*2*8+pi_3*pv_13*pv_10*pv_12*52+pi_3*pv_3*pv_7*pv_11*pv_14/12"
					}
				],
				id: "Families",
				title: "What is the impact on Employers?",
				tooltip: "",
				totalValue: 558858.2733333334,
				totalValueMin: 394064.9399841666
			},
			{
				changed: false,
				ranges: false,
				rows: [
					{
						type: "general",
						stakeholders: "Children",
						description: "Increased future earnings from family financial stability",
						value: 704056,
						valueMin: null,
						variables: "pv_7,pv_8,pi_5",
						formula: "pi_5*pv_7*0.01*10+pi_5*pv_8*0.02*10",
						variables2: "",
						formula2: ""
					},
					{
						type: "general",
						stakeholders: "Children",
						description: "Increased social and emotional skills",
						value: 192305.96,
						valueMin: null,
						variables: "pv_23,pv_15,pv_24,pv_16,pi_5",
						formula: "pi_5*pv_24*pv_23*pv_15*pv_16/12",
						variables2: "",
						formula2: ""
					}
				],
				id: "Children",
				title: "What is the impact on Children?",
				tooltip: "",
				totalValue: 896361.96,
				totalValueMin: 896361.96
			},
			{
				changed: false,
				ranges: true,
				rows: [
					{
						type: "general",
						stakeholders: "Staff",
						description: "Better paid employees",
						value: 183418.78743776,
						valueMin: 135064.54743776,
						variables: "pv_17,pi_4,pv_18,pv_27,pi_2,pv_28,pv_26,pv_21,pv_20,pi_5",
						formula: "pi_4*pv_26*2080-pi_4*pv_17*2080+pi_4*pv_18*pv_20*pv_17*2080*pv_28*pv_27+pv_18*pv_21*pi_2*pi_5",
						variables2: "pv_17,pi_4,pv_18,pv_27,pi_2,pv_28,pv_26,pv_21,pv_20,pi_5",
						formula2: "pi_4*pv_26*2080-pi_4*pv_17*2080+pi_4*pv_18*pv_20*pv_17*2080*pv_28*pv_27+pv_18*pv_21*pi_2*pi_5"
					}
				],
				id: "Staff",
				title: "What is the impact on Staff?",
				tooltip: "",
				totalValue: 183418.78743776,
				totalValueMin: 135064.54743776
			}
		]
	},
	{
		tables: [
		],
		list: [
		],
		label: "Program Details",
		type: "interactive"
	},
	{
		tables: [
		],
		list: [
			{
				title: "Circadian. (2005). Absenteeism: The bottom-line killer. Circadian Information Limited Partnership",
				href: "https://circadian.com/white-paper-absenteeism "
			},
			{
				title: "Bishop, S. (2023). $122 billion: The growing, annual cost of the infant-toddler child care crisis. ReadyNation",
				href: "https://strongnation.s3.amazonaws.com"
			},
			{
				title: "KPMG. (2024, May). Childcare crisis and the state of work in America",
				href: "https://earlylearningnation.com/2023/02/1-in-4-parents-report-being-fired-for-work-interruptions-due-to-child-care-breakdowns/ "
			},
			{
				title: "Ohio Bureau of Labor Market Information. (2022). Industry turnover rates. ",
				href: "https://ohiolmi.com/Home/CountyProfiles/Industry_Turnover_Rates "
			},
			{
				title: "Care for Business. (2023). Future of benefits report.",
				href: "https://hubspotusercontent-na1.net"
			},
			{
				title: "Earnings and Educational Attainment by County, DataOhio,  2020",
				href: "https://data.ohio.gov/wps/portal/gov/data/view/earnings-and-educational-attainment-by-county"
			},
			{
				title: "U.S. Bureau of Labor Statistics. (2023). Occupational employment and wage statistics: Median hourly wage. ",
				href: "https://www.bls.gov/oes/current/oes_3900004.htm"
			},
			{
				title: "ReadyNation. (2023). Report: $122 billion: The growing, annual cost of the infant-toddler child care crisis.",
				href: "https://www.strongnation.org/articles/2038-122-billion-the-growing-annual-cost-of-the-infant-toddler-child-care-crisis"
			},
			{
				title: "National Center for Children in Poverty. (2010). Young children at risk: National and state prevalence of risk factors. ",
				href: "https://www.nccp.org/publication/young-children-at-risk/#:~:text=Poverty%2C%20in%20combination%20with%20one%20of%20the,level%20and%20headed%20by%20a%20single%20parent."
			},
			{
				title: "Health Policy Institute of Ohio. (2019). Criminal justice and health. ",
				href: "https://www.healthpolicyohio.org/our-work/facts-figures/criminal-justice-and-health#:~:text=Connections%20between%20criminal%20justice%20and%20health&text=It%20costs%20about%20%2430%2C558%20per,state%20prison%20incarceration%20this%20year."
			},
			{
				title: "Policy Matters Ohio. (2024). Ohioâ€™s child care crisis",
				href: "https://www.policymattersohio.org/research-policy/shared-prosperity-thriving-ohioans/basic-needs-unemployment-insurance/basic-needs/ohios-childcare-crisis"
			},
			{
				title: "Early Care and Education Consortium. (2022). The child care workforce shortage: Solutions from around the country",
				href: "https://www.ececonsortium.org/wp-content/uploads/2022/06/ECEC_Workforce-Report_6.2.22.pdf"
			},
			{
				title: "Roberts, A. M., Gallagher, K. C., Sarver, S. L., & Daro, A. M. (2018). Early childhood teacher turnover in Nebraska. Buffett Early Childhood Institute at the University of Nebraska",
				href: "https://buffettinstitute.nebraska.edu/-/media/beci/docs/early-childhood-teacher-turnover-in-nebraska-new.pdf?la=en"
			},
			{
				title: "SquareSpace. (2021). Child care shortages: A growing crisis.",
				href: "https://static1.squarespace.com/static/5e7cf2f62c45da32f3c6065e/t/61a51257cb3aea5591b7aedd/1638208087990/child-care-shortages-nov2021.pdf"
			},
			{
				title: "ReadyNation. (2023). Report: $122 billion: The growing, annual cost of the infant-toddler child care crisis",
				href: "https://www.strongnation.s3.amazonaws.com"
			},
			{
				title: "American Progress. (2019). Investing in our children",
				href: "https://www.americanprogress.org/article/investing-in-our-children/"
			},
			{
				title: "Belfield, C., Nores, M., Barnett, W. S., & Schweinhart, L. (2006). The High/Scope Perry Preschool Program: Costâ€“benefit analysis using data from the age-40 followup. Journal of Human Resources, 41(1), 162â€“190",
				href: "https://www.researchgate.net/publication/227637188_The_HighScope_Perry_Preschool_Program_Cost-Benefit_Analysis_Using_Data_from_the_Age-40_Followup"
			}
		],
		label: "References",
		type: "references"
	}
];
const siteData = {
	general: general,
	proxy_inputs: proxy_inputs,
	proxy_values: proxy_values,
	tabs: tabs
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home Page", "description": "Esta es la p\xE1gina inicial" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> ${siteData.general.banner && renderTemplate`<img class="w-full h-36 lg:h-full object-cover object-center"${addAttribute(siteData.general.banner, "src")} alt="banner">`} </div>  ${renderComponent($$result2, "Home", Home, { "data": siteData, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/components/Home", "client:component-export": "default" })} ` })}`;
}, "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/pages/index.astro", void 0);

const $$file = "/Users/felipeleongiraldo/Proyectos/ohio-sroi/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
