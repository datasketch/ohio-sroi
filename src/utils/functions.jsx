export function proxy1(lista) {
    return lista[0] * lista[1] * lista[2]
}

export function proxy1_formula(lista) {
    return `${lista[0]} * ${lista[1]} * ${lista[2]} = ${lista[3]}`
}

export function proxy2(lista) {
    return lista[0] * lista[1] + lista[2] * lista[3] + lista[4] * lista[5]
}

export function proxy2_formula(lista) {
    return `${lista[0]} * ${lista[1]} + ${lista[2]} * ${lista[3]} + ${lista[4]} * ${lista[5]} = ${lista[6]}`
}

export function proxy3(lista) {
    return lista[0] * lista[1]
}

export function proxy3_formula(lista) {
    return `${lista[0]} * ${lista[1]} = ${lista[2]}`
}

export function proxy9(lista) {
    return (lista[0] + lista[1] + lista[2]) * lista[3] * lista[4]
}

export function proxy9_formula(lista) {
    return `(${lista[0]} + ${lista[1]} + ${lista[2]}) * ${lista[3]} * ${lista[4]} = ${lista[5]}`
}

export function proxy10(lista) {
    return (lista[0] + lista[1]) * lista[2]
}

export function proxy10_formula(lista) {
    return `(${lista[0]} + ${lista[1]}) * ${lista[2]} = ${lista[3]}`
}

export function proxy11(lista) {
    return proxy1(lista) - (lista[0] * lista[1] * lista[2] * lista[3])
}

export function proxy11_formula(lista) {
    return `(${lista[0]} * ${lista[1]} * ${lista[2]}) - (${lista[0]} * ${lista[1]} * ${lista[2]} * ${lista[3]}) = ${lista[4]}`
}

export function proxy12(lista) {
    return 2 * proxy3(lista)
}

export function proxy12_formula(lista) {
    return `2 * ${lista[0]} * ${lista[1]} = ${lista[2]}`
}

export function proxy18_formula(a, b, c, d) {
    return `${a} + ${b} + ${c} = ${d}`
}

export function environmental(a, b, c) {
    const out = [
        "kg of aluminum printing plates reused ",
        "Dollar Value of EC per 1000 kg of aluminum framing ($) (Greenspec, 2023)",
        "Total embodied carbon cost savings of aluminum reused",
        "kg of wood for flowers",
        "Dollar Value of EC per 1000 kg of processed wood ($) (Greenspec, 2023)",
        "Total embodied carbon cost savings of processed wood reused",
        "Total Tons of reused/upcycled materials (pounds to tons converstion)",
        "metric tons CO2 equivalent per ton of food waste (O'Brien, 2016, Table 6)",
        "Social Cost of Carbon",
        "Total carbon cost avoided of reused materials"
    ]
    const values = []

    values.push(a * 0.45)
    values.push(14229)
    values.push(values[0] * values[1] / 1000)
    values.push(b * 0.45)
    values.push(36.72)
    values.push(values[3] * values[4] / 1000)
    values.push((a + b + c) / 2000)
    values.push(1.54)
    values.push(151)
    values.push(values[6] * values[7] * values[8])
    let total = values[2] + values[5] + values[9]

    return {
        out,
        values,
        total
    }
}

export function totalTable(lista, total) {
    let str = ""
    let c = 1
    for (let item of lista) {
        str = str + `${item}`
        if (c != lista.length) {
            str = str + ` + `
        }
        c = c + 1
    }
    str = str + ` = ${total}`
    return str
}

export function valueFormat(value, unit) {
    let config = {}

    switch (unit) {
        case 'currency':
            config = { style: 'currency', currency: 'USD' }
            break;
        case 'percentage':
            config = { style: 'percent' }
            break;
        case '':
            config = {}
            break;
        default:
            config = { style: 'currency', currency: 'USD' }
            break;
    }

    return Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2, ...config }).format(+value)
}

export const getNumbers = (txt) => parseFloat(txt.match(/[\d.]+/g).join(''))
