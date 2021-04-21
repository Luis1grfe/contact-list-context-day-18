const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			new_contact: [],
			full_name: "",
			email: "",
			address: "",
			phone: "",
			full_nameedi: "",
			emailedi: "",
			addressedi: "",
			phoneedi: "",
			contact_id: "",
			contact_id2: ""
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			capturaCampos: e => {
				const store = getStore();
				console.log(e.target.value);
				setStore({ ...store, [e.target.name]: e.target.value });
			},
			handleEdit: e => {
				const store = getStore();
				const {
					full_nameedi,
					emailedi,
					agenda_slugedi,
					addressedi,
					phoneedi,
					contact_id
				} = getStore();
				e.preventDefault();

				setStore({
					...store,
					new_contact: [
						...store.new_contact,
						{
							full_name: full_nameedi,
							email: emailedi,
							agenda_slug: agenda_slugedi,
							address: addressedi,
							phone: phoneedi
						}
					],
					full_nameedi: "",
					emailedi: "",
					agenda_slugedi: "",
					addressedi: "",
					phoneedi: "",
					contact_id: ""
				});
				fetch(
					"https://assets.breatheco.de/apis/fake/contact/" +
						contact_id,
					{
						method: "PUT",
						body: JSON.stringify({
							full_name: full_nameedi,
							email: emailedi,
							agenda_slug: "agenda_luis1grfe",
							address: addressedi,
							phone: phoneedi
						}),
						headers: new Headers({
							"Content-Type": "application/json"
						})
					}
				)
					.then(resp => resp.json())
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},
			handleID: e => {
				let idcontact = e;
				console.log("Paso por hanldeID " + idcontact);
				const store = getStore();
				setStore({ ...store, contact_id: idcontact });
				console.log("Paso por el store " + store.contact_id);
			},
			handleDelete: e => {
				console.log(e);
				let contact_id = e;
				console.log("Paso por let contact_id " + contact_id);
				const store = getStore();
				setStore({ ...store, contact_id: "" });
				console.log("Paso por el set store vacio " + store.contact_id);
				fetch(
					"https://assets.breatheco.de/apis/fake/contact/" +
						contact_id,
					{
						method: "DELETE",
						header: {
							Accept: "application/json",
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => resp.json())
					.then(data => console.log("prueba " + data.msg))
					.catch(error => console.log(error));
			},

			handleAdd: e => {
				const store = getStore();
				const {
					full_name,
					email,
					agenda_slug,
					address,
					phone
				} = getStore();
				e.preventDefault();

				setStore({
					...store,
					new_contact: [
						...store.new_contact,
						{
							full_name: full_name,
							email: email,
							agenda_slug: agenda_slug,
							address: address,
							phone: phone
						}
					],
					full_name: "",
					email: "",
					agenda_slug: "",
					address: "",
					phone: ""
				});
				localStorage.setItem(
					"New_contact",
					JSON.stringify(store.new_contact)
				);
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify({
						full_name: full_name,
						email: email,
						agenda_slug: "agenda_luis1grfe",
						address: address,
						phone: phone
					}),
					mode: "cors",
					headers: new Headers({
						"Content-Type": "application/json"
					})
				})
					.then(res => res.json())
					.then(response =>
						console.log("Success:", JSON.stringify(response))
					)
					.catch(error => console.error("Error:", error));
			}
		}
	};
};

export default getState;
