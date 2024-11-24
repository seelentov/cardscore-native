const localizeCountriesTable: { [key: string]: string } = {
    "RU": "РОССИЯ",
    "US": "СОЕДИНЕННЫЕ ШТАТЫ АМЕРИКИ",
    "CA": "КАНАДА",
    "GB": "АНГЛИЯ",
    "DE": "ГЕРМАНИЯ",
    "FR": "ФРАНЦИЯ",
    "IT": "ИТАЛИЯ",
    "ES": "ИСПАНИЯ",
    "JP": "ЯПОНИЯ",
    "CN": "КИТАЙ",
    "IN": "ИНДИЯ",
    "BR": "БРАЗИЛИЯ",
    "AU": "АВСТРАЛИЯ",
    "ZA": "ЮАР",
    "MX": "МЕКСИКА",
    "AR": "АРГЕНТИНА",
    "CO": "КОЛУМБИЯ",
    "KR": "КОРЕЯ",
    "EG": "ЕГИПЕТ",
    "GR": "ГРЕЦИЯ",
    "SE": "ШВЕЦИЯ",
    "NO": "НОРВЕГИЯ",
    "NL": "НИДЕРЛАНДЫ",
    "BE": "БЕЛЬГИЯ",
    "CH": "ШВЕЙЦАРИЯ",
    "AT": "АВСТРИЯ",
    "PT": "ПОРТУГАЛИЯ",
    "DK": "ДАНИЯ",
    "FI": "ФИНЛЯНДИЯ",
    "AE": "ОАЭ",
    "SA": "САУДИВСКАЯ АРАВИЯ",
    "TR": "ТУРЦИЯ",
    "IR": "ИРАН",
    "IL": "ИЗРАИЛЬ",
    "SCT": "ШОТЛАНДИЯ",
    "LV": "ЛАТВИЯ",
    "RO": "РУМЫНИЯ",
    "BY": "БЕЛАРУСЬ",

}

const localizeCountriesEngTable: { [key: string]: string } = {
    "RU": "Russia",
    "US": "USA",
    "CA": "Canada",
    "GB": "England",
    "DE": "Germany",
    "FR": "France",
    "IT": "Italy",
    "ES": "Spain",
    "JP": "Japan",
    "CN": "China",
    "IN": "India",
    "BR": "Brazil",
    "AU": "Australia",
    "ZA": "South Africa",
    "MX": "Mexico",
    "AR": "Argentina",
    "CO": "Colombia",
    "KR": "South Korea",
    "EG": "Egypt",
    "GR": "Greece",
    "SE": "Sweden",
    "NO": "Norway",
    "NL": "Netherlands",
    "BE": "Belgium",
    "CH": "Switzerland",
    "AT": "Austria",
    "PT": "Portugal",
    "DK": "Denmark",
    "FI": "Finland",
    "AE": "United Arab Emirates",
    "SA": "Saudi Arabia",
    "TR": "Turkey",
    "IR": "Iran",
    "IL": "Israel",
    "SCT": "Scotland"
}

const localizeCountry = (country: string): string => localizeCountriesTable[country] || ''


export const localizeReverseCountry = (country: string): string => Object.keys(localizeCountriesTable).find(key => country?.includes(localizeCountriesTable[key])) || Object.keys(localizeCountriesEngTable).find(key => localizeCountriesEngTable[key] === country) || "";

export default localizeCountry