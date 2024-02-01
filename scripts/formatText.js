function firstLetterFormat(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatText(str) {
    const words = str.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export {formatText, firstLetterFormat};