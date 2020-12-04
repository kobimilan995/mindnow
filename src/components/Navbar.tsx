import React from 'react';
import {Link} from "react-router-dom";
import {HOME_PAGE_ROUTE, INGREDIENTS_PAGE_ROUTE} from "../constants/routes";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={HOME_PAGE_ROUTE} className="navbar-brand" href="/#">Mindnow Salad Bar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" href="/#" to={INGREDIENTS_PAGE_ROUTE}>Ingredients</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}