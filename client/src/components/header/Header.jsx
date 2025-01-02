import React, { useContext, useState } from "react";
import "./Header.css";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

// Header component
const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();

    // Function to handle option increment/decrement
    const handleOption = (name, operation) => {
        setOptions((prev) => ({
            ...prev,
            [name]: operation === "i" ? prev[name] + 1 : Math.max(0, prev[name] - 1),
        }));
    };

    const {dispatch}=useContext(SearchContext)

    // Function to navigate to the search results
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
        navigate("/hotels", { state: { destination, dates, options } });
    };

    // Reusable Counter Component for Options
    const OptionCounter = ({ name, label, value, minValue }) => (
        <div className="optionItem">
            <span className="optionText">{label}</span>
            <div className="optionCounter">
                <button
                    disabled={value <= minValue}
                    className="optionCounterButton"
                    onClick={() => handleOption(name, "d")}
                >
                    -
                </button>
                <span className="optionCounterNumber">{value}</span>
                <button
                    className="optionCounterButton"
                    onClick={() => handleOption(name, "i")}
                >
                    +
                </button>
            </div>
        </div>
    );

    return (
        <div className="header">
            <div
                className={type === "list" ? "headerContainer listMode" : "headerContainer"}
            >
                <div className="headerList">
                    {[
                        { icon: faBed, label: "Stays" },
                        { icon: faPlane, label: "Flights" },
                        { icon: faCar, label: "Car rentals" },
                        { icon: faBed, label: "Attractions" },
                        { icon: faTaxi, label: "Airport taxis" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`headerListItem ${index === 0 ? "active" : ""}`}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Conditional Rendering for Search Section */}
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or
                            more with a free Lamabooking account
                        </p>
                        <button className="headerBtn">Sign in / Register</button>
                        
                        {/* Search Section */}
                        <div className="headerSearch">
                            {/* Destination Input */}
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>

                            {/* Date Range Selector */}
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                    className="headerSearchText"
                                >
                                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                                        dates[0].endDate,
                                        "MM/dd/yyyy"
                                    )}`}
                                </span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs
                                        onChange={(item) => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>

                            {/* Options Selector */}
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span
                                    onClick={() => setOpenOptions(!openOptions)}
                                    className="headerSearchText"
                                >
                                    {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                                </span>
                                {openOptions && (
                                    <div className="options">
                                        <OptionCounter
                                            name="adult"
                                            label="Adult"
                                            value={options.adult}
                                            minValue={1}
                                        />
                                        <OptionCounter
                                            name="children"
                                            label="Children"
                                            value={options.children}
                                            minValue={0}
                                        />
                                        <OptionCounter
                                            name="room"
                                            label="Room"
                                            value={options.room}
                                            minValue={1}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
