import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { selectedAppCountry,selectedCountryAtom} from "../../context/store";
import { countries } from "../util";

const CountrySelect = ({ setSelectedCountryCode, showCode }) => {
  const [_, setSelectedAppCountryCode] = useAtom(selectedAppCountry);
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(lowercasedFilter) ||
        country.code.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredCountries(filteredData);
  }, [searchTerm]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCountryCode(country.code);
    setSelectedAppCountryCode(country.code);
    setIsDropdownActive(false);
  };

  // close the dropdown when clicking outside
  const countrySelectionBoxRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countrySelectionBoxRef.current &&
        !countrySelectionBoxRef.current.contains(event.target)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div ref={countrySelectionBoxRef} className="country-selection-box">
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="options">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
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
  );
};

export default CountrySelect;
