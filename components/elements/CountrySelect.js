import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"

const CountrySelect = ({ setSelectedCountryCode, showCode, selectedApp }) => {
  const countries = [
    { name: "Afghanistan", code: "af", flag: "af.png" },
    { name: "Algeria", code: "dz", flag: "dz.png" },
    { name: "Angola", code: "ao", flag: "ao.png" },
    { name: "Argentina", code: "ar", flag: "ar.png" },
    { name: "Australia", code: "au", flag: "au.png" },
    { name: "Austria", code: "at", flag: "at.png" },
    { name: "Bangladesh", code: "bd", flag: "bd.png" },
    { name: "Belarus", code: "by", flag: "by.png" },
    { name: "Belgium", code: "be", flag: "be.png" },
    { name: "Belize", code: "bz", flag: "bz.png" },
    { name: "Bolivia", code: "bo", flag: "bo.png" },
    { name: "Bosnia and Herzegovina", code: "ba", flag: "ba.png" },
    { name: "Botswana", code: "bw", flag: "bw.png" },
    { name: "Brazil", code: "br", flag: "br.png" },
    { name: "Bulgaria", code: "bg", flag: "bg.png" },
    { name: "Cambodia", code: "kh", flag: "kh.png" },
    { name: "Cameroon", code: "cm", flag: "cm.png" },
    { name: "Canada", code: "ca", flag: "ca.png" },
    { name: "Chile", code: "cl", flag: "cl.png" },
    { name: "China", code: "cn", flag: "cn.png" },
    { name: "Colombia", code: "co", flag: "co.png" },
    { name: "Congo, D.R.", code: "cd", flag: "cd.png" },
    { name: "Costa Rica", code: "cr", flag: "cr.png" },
    { name: "Croatia", code: "hr", flag: "hr.png" },
    { name: "Cyprus", code: "cy", flag: "cy.png" },
    { name: "Czech Republic", code: "cz", flag: "cz.png" },
    { name: "Côte d'Ivoire", code: "ci", flag: "ci.png" },
    { name: "Denmark", code: "dk", flag: "dk.png" },
    { name: "Dominican R.", code: "do", flag: "do.png" },
    { name: "Ecuador", code: "ec", flag: "ec.png" },
    { name: "Egypt", code: "eg", flag: "eg.png" },
    { name: "El Salvador", code: "sv", flag: "sv.png" },
    { name: "Estonia", code: "ee", flag: "ee.png" },
    { name: "Finland", code: "fi", flag: "fi.png" },
    { name: "France", code: "fr", flag: "fr.png" },
    { name: "Gabon", code: "ga", flag: "ga.png" },
    { name: "Georgia", code: "ge", flag: "ge.png" },
    { name: "Germany", code: "de", flag: "de.png" },
    { name: "Greece", code: "gr", flag: "gr.png" },
    { name: "Guatemala", code: "gt", flag: "gt.png" },
    { name: "Honduras", code: "hn", flag: "hn.png" },
    { name: "Hong Kong", code: "hk", flag: "hk.png" },
    { name: "Hungary", code: "hu", flag: "hu.png" },
    { name: "Iceland", code: "is", flag: "is.png" },
    { name: "India", code: "in", flag: "in.png" },
    { name: "Indonesia", code: "id", flag: "id.png" },
    { name: "Iran, Islamic Republic of", code: "ir", flag: "ir.png" },
    { name: "Iraq", code: "iq", flag: "iq.png" },
    { name: "Ireland", code: "ie", flag: "ie.png" },
    { name: "Israel", code: "il", flag: "il.png" },
    { name: "Italy", code: "it", flag: "it.png" },
    { name: "Japan", code: "jp", flag: "jp.png" },
    { name: "Jordan", code: "jo", flag: "jo.png" },
    { name: "Kazakhstan", code: "kz", flag: "kz.png" },
    { name: "Kenya", code: "ke", flag: "ke.png" },
    { name: "Korea, Republic of", code: "kr", flag: "kr.png" },
    { name: "Kosovo", code: "xk", flag: "xk.png" },
    { name: "Kuwait", code: "kw", flag: "kw.png" },
    { name: "Lao People's D.R.", code: "la", flag: "la.png" },
    { name: "Latvia", code: "lv", flag: "lv.png" },
    { name: "Lebanon", code: "lb", flag: "lb.png" },
    { name: "Libya", code: "ly", flag: "ly.png" },
    { name: "Lithuania", code: "lt", flag: "lt.png" },
    { name: "Luxembourg", code: "lu", flag: "lu.png" },
    { name: "Macao", code: "mo", flag: "mo.png" },
    { name: "Malawi", code: "mw", flag: "mw.png" },
    { name: "Malaysia", code: "my", flag: "my.png" },
    { name: "Maldives", code: "mv", flag: "mv.png" },
    { name: "Mexico", code: "mx", flag: "mx.png" },
    { name: "Montenegro", code: "me", flag: "me.png" },
    { name: "Morocco", code: "ma", flag: "ma.png" },
    { name: "Myanmar", code: "mm", flag: "mm.png" },
    { name: "Nauru", code: "nr", flag: "nr.png" },
    { name: "Netherlands", code: "nl", flag: "nl.png" },
    { name: "New Zealand", code: "nz", flag: "nz.png" },
    { name: "Nicaragua", code: "ni", flag: "ni.png" },
    { name: "Nigeria", code: "ng", flag: "ng.png" },
    { name: "Norway", code: "no", flag: "no.png" },
    { name: "Oman", code: "om", flag: "om.png" },
    { name: "Pakistan", code: "pk", flag: "pk.png" },
    { name: "Panama", code: "pa", flag: "pa.png" },
    { name: "Paraguay", code: "py", flag: "py.png" },
    { name: "Peru", code: "pe", flag: "pe.png" },
    { name: "Philippines", code: "ph", flag: "ph.png" },
    { name: "Poland", code: "pl", flag: "pl.png" },
    { name: "Portugal", code: "pt", flag: "pt.png" },
    { name: "Qatar", code: "qa", flag: "qa.png" },
    { name: "Romania", code: "ro", flag: "ro.png" },
    { name: "Russian Federation", code: "ru", flag: "ru.png" },
    { name: "Rwanda", code: "rw", flag: "rw.png" },
    { name: "Saudi Arabia", code: "sa", flag: "sa.png" },
    { name: "Senegal", code: "sn", flag: "sn.png" },
    { name: "Serbia", code: "rs", flag: "rs.png" },
    { name: "Singapore", code: "sg", flag: "sg.png" },
    { name: "Slovakia", code: "sk", flag: "sk.png" },
    { name: "Slovenia", code: "si", flag: "si.png" },
    { name: "South Africa", code: "za", flag: "za.png" },
    { name: "Spain", code: "es", flag: "es.png" },
    { name: "Sri Lanka", code: "lk", flag: "lk.png" },
    { name: "Sudan", code: "sd", flag: "sd.png" },
    { name: "Sweden", code: "se", flag: "se.png" },
    { name: "Switzerland", code: "ch", flag: "ch.png" },
    { name: "Syrian Arab Republic", code: "sy", flag: "sy.png" },
    { name: "Taiwan", code: "tw", flag: "tw.png" },
    { name: "Tanzania, United Republic of", code: "tz", flag: "tz.png" },
    { name: "Thailand", code: "th", flag: "th.png" },
    { name: "Togo", code: "tg", flag: "tg.png" },
    { name: "Trinidad and Tobago", code: "tt", flag: "tt.png" },
    { name: "Tunisia", code: "tn", flag: "tn.png" },
    { name: "Turkey", code: "tr", flag: "tr.png" },
    { name: "Uganda", code: "ug", flag: "ug.png" },
    { name: "Ukraine", code: "ua", flag: "ua.png" },
    { name: "United Arab Emirates", code: "ae", flag: "ae.png" },
    { name: "United Kingdom", code: "gb", flag: "gb.png" },
    { name: "United States", code: "us", flag: "us.png" },
    { name: "Uruguay", code: "uy", flag: "uy.png" },
    { name: "Uzbekistan", code: "uz", flag: "uz.png" },
    { name: "Venezuela", code: "ve", flag: "ve.png" },
    { name: "Vietnam", code: "vn", flag: "vn.png" },
    { name: "Yemen", code: "ye", flag: "ye.png" },
    { name: "Zambia", code: "zm", flag: "zm.png" },
    { name: "Zimbabwe", code: "zw", flag: "zw.png" },
  ]

  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
    flag: "in.png",
  })
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filteredData = countries.filter(
      country =>
        country.name.toLowerCase().includes(lowercasedFilter) ||
        country.code.toLowerCase().includes(lowercasedFilter),
    )
    setFilteredCountries(filteredData)
  }, [searchTerm])

  const handleSelectCountry = country => {
    setSelectedCountry(country)
    setSelectedCountryCode(country.code)
    setIsDropdownActive(false)
  }

  // close the dropdown when clicking outside
  const countrySelectionBoxRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        countrySelectionBoxRef.current &&
        !countrySelectionBoxRef.current.contains(event.target)
      ) {
        setIsDropdownActive(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ******************************
  useEffect(() => {
    if (selectedApp) {
      handleEvent(selectedApp)
    }
  }, [selectedApp])

  const handleEvent = event => {
    // console.log("Select APP", event)
  }

  // *********************************

  return (
    <div
      ref={countrySelectionBoxRef}
      className="country-selection-box"
    >
      <div
        className={`country-select-button ${isDropdownActive ? "active" : ""}`}
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <span>
          <Image
            src={`https://flagcdn.com/40x30/${selectedCountry.flag}`}
            alt={selectedCountry.name}
            width={40}
            height={30}
            className="country-flags"
          />
          {showCode ? selectedCountry.code.toUpperCase() : selectedCountry.name}
        </span>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </i>
      </div>
      {isDropdownActive && (
        <div className="country-search-box">
          <div className="content-country active">
            <div className="search">
              <input
                spellCheck="false"
                autoComplete="off"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="options">
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <li
                    key={country.code}
                    className={
                      country.code === selectedCountry.code ? "selected" : ""
                    }
                    onClick={() => handleSelectCountry(country)}
                  >
                    <Image
                      src={`https://flagcdn.com/40x30/${country.flag}`}
                      alt={country.name}
                      width={40}
                      height={30}
                      className="country-flags"
                    />
                    {showCode ? country.code.toUpperCase() : country.name}
                  </li>
                ))
              ) : (
                <p style={{ marginTop: "10px" }}>Oops! Country not found</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySelect
