function firstLetterFormat(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatText(string) {
    const textString = string.split('-');
    const capitalizedWords = textString.map(e => e.charAt(0).toUpperCase() + e.slice(1));
    return capitalizedWords.join(' ');
}

export {formatText, firstLetterFormat};