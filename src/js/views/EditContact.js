import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
	const { store, actions } = useContext(Context);
	const [contacto, setContacto] = useState([]);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/contact/" + store.contact_id
		)
			.then(resp => resp.json())
			.then(datos => setContacto(datos));
	}, []);
	//Render Edit

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							value={store.full_nameedi}
							name="full_nameedi"
							className="form-control"
							placeholder={contacto.full_name}
							onChange={e => actions.capturaCampos(e)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							value={store.emailedi}
							name="emailedi"
							className="form-control"
							placeholder={contacto.email}
							onChange={e => actions.capturaCampos(e)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							value={store.phoneedi}
							name="phoneedi"
							className="form-control"
							placeholder={contacto.phone}
							onChange={e => actions.capturaCampos(e)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							value={store.addressedi}
							name="addressedi"
							className="form-control"
							placeholder={contacto.address}
							onChange={e => actions.capturaCampos(e)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={e => {
							actions.handleEdit(e);
							setTimeout(() => {
								window.history.go(-1);
							}, 2000);
						}}>
						Edit
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
