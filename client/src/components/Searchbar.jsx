import React from 'react'
import '../styles/searchbar.css';

const Searchbar = () => {
  return (
    <div className="searchbar w-full h-full">
    <div className="searchbar-wrapper">
        <div className="searchbar-center">
            <input type="text" className="searchbar-input" maxLength="2048" name="q" autoCapitalize="off" autoComplete="off" title="Search" placeholder="Type here to search..."/>
        </div>
        <div className="searchbar-left">
            <div className="search-icon-wrapper">
                <span className="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</div>
  )
}

export default Searchbar
