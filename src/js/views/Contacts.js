import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});
	const [agenda, setAgenda] = useState([]);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/contact/agenda/agenda_luis1grfe"
		)
			.then(resp => resp.json())
			.then(datos => setAgenda(datos));
	}, []);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div
					id="contacts"
					className="panel-collapse collapse show"
					aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{agenda.map((info, id) => (
							<ContactCard
								onDelete={() => setState({ showModal: true })}
								key={id}
								id={info.id}
								full_name={info.full_name}
								address={info.address}
								phone={info.phone}
								email={info.email}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() => setState({ showModal: false })}
			/>
		</div>
	);
};
