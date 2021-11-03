import React, {useState, useEffect} from "react";
//import menuLinksData from "./data/menu_links.json";

const Header = () => {
	const [menuLinksData, setMenuLinksData] = useState([]);

	const loadMenuLinksData = async() => {
		// Query the API Gateway
		const resp = await fetch('https://u86zly1qok.execute-api.ap-southeast-1.amazonaws.com/Production/lil-landon-menu');
		let jsonData = await resp.json(); 

		// Assign response data to our state variable
		setMenuLinksData(jsonData);
	}

	useEffect(() => {
		// Load the menu links data from API Gateway
		loadMenuLinksData();
	}, []);

	return (
		<header id="intro">
			<article className="fullheight">
				<div className="hgroup">
					<h1>ODB Hotel</h1>
					<h2>P. Guevarra, San Juan</h2>
					<p>
						<a href="#welcome">
							<img
								src="https://landonhotel.com/images/misc/arrow.png"
								alt="down arrow"
							/>
						</a>
					</p>
				</div>
			</article>

			<nav id="nav">
				<div className="navbar">
					<div className="brand">
						<a href="#welcome">
							Landon <span>Hotel</span>
						</a>
					</div>
					<ul>
						{
							menuLinksData.map(
								(link) =>
								<li>
									<a className={`icon ${link.class}`} href={link.href}>
										<span>{link.text}</span>
									</a>
								</li>
							)
						}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header; 
