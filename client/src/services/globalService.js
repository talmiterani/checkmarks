const FORMAT_TYPES = {
    FORMAT: 'format',
};

const PAGE_SIZE_LIST = 8
export const globalService = {
    FORMAT_TYPES,
    PAGE_SIZE_LIST
}

export const useDisplay = (user) => {
    const words = (user || "").split(' ');
    if(words.length === 1) {
        return words[0][0].toUpperCase()
    } else {
        return (words[0][0] + words[1][0]).toUpperCase()
    }
}