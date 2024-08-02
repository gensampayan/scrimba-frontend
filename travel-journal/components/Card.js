import React from "react"

export default function Card(props) {
    return (
        <main className="card-container"> 
            <div className="img-wrapper">
                <img src={props.detail.imageUrl} className="location-img"/>  
            </div>
            <div className="details-wrapper">
                <img src="../images/pin.png" className="pin-icon"/>
                <span className="location">{props.detail.location}</span>
                <span><a href={props.detail.googleMapsUrl} target="_blank" className="link">View on Google Maps</a></span>
                <h2>{props.detail.title}</h2>
                <span className="date">{props.detail.startDate} - {props.detail.endDate}</span>
                <p className="description">{props.detail.description}</p>
            </div>
        </main>
    )
}