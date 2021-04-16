import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);
	const [contacto, setContacto] = useState([]);

	if (store.contact_id != "") {
		useEffect(() => {
			fetch(
				"https://assets.breatheco.de/apis/fake/contact/" +
					store.contact_id
			)
				.then(resp => resp.json())
				.then(datos => setContacto(datos));
		}, []);
	}

	if (store.contact_id == "") {
		//Render ADD
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								value={store.full_name}
								name="full_name"
								className="form-control"
								placeholder="Full Name"
								onChange={e => actions.capturaCampos(e)}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								value={store.email}
								name="email"
								className="form-control"
								placeholder="Enter email"
								onChange={e => actions.capturaCampos(e)}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								value={store.phone}
								name="phone"
								className="form-control"
								placeholder="Enter phone"
								onChange={e => actions.capturaCampos(e)}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								value={store.address}
								name="address"
								className="form-control"
								placeholder="Enter address"
								onChange={e => actions.capturaCampos(e)}
							/>
						</div>
						<button
							type="button"
							className="btn btn-primary form-control"
							onClick={e => actions.handleAdd(e)}>
							save
						</button>
						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
					</form>
				</div>
			</div>
		);
	}
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
						onClick={e => actions.handleEdit(e)}>
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
