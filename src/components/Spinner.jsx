import React from 'react'

function Spinner() {
    return (
        <div className="text-center">
            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Please wait...</p>
        </div>
    )
}

export default Spinner
