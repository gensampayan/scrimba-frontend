import React from "react"
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import Data from "./data"

export default function App() {
    console.log(Data)
    const details = Data.map((detail) => {
        return <Card 
            key={detail.id}
            detail={detail}
        />
    })
    return (
        <div className="container">
            <Navbar />
            <section className="card-list">
                {details}
            </section>
        </div>
    )
}
