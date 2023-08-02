const CountryList = ({ countries, filter }) => {
    if(countries.length < 1) {
        return null
    }
    //Do filtering stuff
    console.log('Test', countries[0].name.common)
    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter))
    console.log('ShowedCountries', countriesToShow)
    console.log('Filter', filter)
    if(countriesToShow.length > 10){
        console.log("Over 10")
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if(countriesToShow.length === 1){
        console.log("Only 1")
        return (
            <DetailedView country={countriesToShow[0]}></DetailedView>
        )
    }
    else if(countriesToShow.length === 0){
        console.log('Empty country list')
        return (
            <div>No matches! Try something else</div>
        )
    }
    else {
        const x = countriesToShow.map(country => country)
        console.log('X', x)
        console.log("Showing 2-10")
        return (
        <div>
            <ul>          
            {countriesToShow.map(country =>
                <ShortView key={country.name.common} country={country}></ShortView>)}
            </ul>
        </div>
    )}
}

const ShortView = ({ country }) => {
    console.log(country)
    return (
        <li>{country.name.common}</li>
    )
}

const DetailedView = ({ country }) => {
    console.log(country)
    // console.log(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital[0]}</div>
            <div>Area: {country.area}</div>
            <LanguageList languages={country.languages}></LanguageList>
        </div>
    )
}

const LanguageList = ({languages}) => {
    const x = Object.entries(languages).forEach(([key, value]) => value)
    console.log('x', x)
    return (
        <div>
            <h4>Languages:</h4>
            <ul>
            {/* {Object.entries(languages).forEach(([key, value]) => {
                // printLanguage(value)})} */}
            </ul>
        </div>
    )
}

const printLanguage = (value) => {
    console.log('test', value)
    return <li>{value}</li>
}

const Test = ({entry}) => {
    console.log('entry:', entry)
    return(
        <li>{entry}</li>
    )
}

export default CountryList;