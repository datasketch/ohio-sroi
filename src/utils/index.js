import numeral from 'numeral';


export function formatAs(txt, unit = '') {
    let value = ''

    switch (unit) {
        case 'currency':
            value = '$0,0.00'
            break;
        case 'percentage':
            value = '0%'
            break;
        default:
            value = '0,0.00'
            break;
    }

    return numeral(txt).format(value)
}

export function parseToNumber(txt) {
    return numeral(txt).value()
}

export function valueFormat(value) {
    return Intl.NumberFormat("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value)
}

