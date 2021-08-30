import React, { useRef } from 'react'

function SearchForm({ getPublicationsForTitle, fetchResult }) {
    const titleRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        const title = titleRef.current.value

        if (title === '') fetchResult() 
        else getPublicationsForTitle({ title })
    }

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container">
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input ref={titleRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default React.memo(SearchForm)
