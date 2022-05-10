class Auth {
  constructor(address) {
    this._address = address;
  }
  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  };
  registration({ email, password }) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  }
  authorization({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  }
  getUser(jwt) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
}
const auth = new Auth("https://api.mesto-backend.nomoredomains.xyz");
export default auth;
