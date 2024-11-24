function getFlagByCountry(country: string): string {
    const exceptionTable: { [key: string]: string } = {
        SCT: 'https://www.svgrepo.com/show/405661/flag-scotland.svg'
    }

    if (Object.keys(exceptionTable)?.includes(country)) {
        return exceptionTable[country]
    }

    return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`
}

export default getFlagByCountry