const globalColors = {
    dark: '#161320',
    midDark: '#1E1E2E',
    gray: '#302D41',
    midGray: '#988BA2',
    light: '#D9E0EE',
    accentuated: '#C9CBFF',
    red: "#F28FAD",
    peach: '#F8BD96',
    green: "#ABE9B3",
    maroon: "#E8A2AF",

}


type priorityObj = { color: string, text: string }
export const usePriority = (priority: 1 | 2 | 3): priorityObj => {
    let returnValue: priorityObj;
    switch (priority) {
        case 1:
        default:
            returnValue = { color: globalColors.accentuated, text: 'normal' }
            break;
        case 2:
            returnValue = { color: globalColors.peach, text: 'necessity' }
            break;
        case 3:
            returnValue = { color: globalColors.red, text: 'important' }
            break;
    }
    return returnValue;
}

export default globalColors
