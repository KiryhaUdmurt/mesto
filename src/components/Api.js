export default class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _getHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: this._token,
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/v1/cohort-61/users/me`, {
            headers: this._getHeaders(),
        })
            .then(this._getJson);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/v1/cohort-61/cards`, {
            headers: this._getHeaders(),
        })
        .then(this._getJson);

    }

    changeProfileInfo(data) {
        return fetch(`${this._baseUrl}/v1/cohort-61/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
        .then(this._getJson);
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/v1/cohort-61/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getJson);
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/v1/cohort-61/cards/${_id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
        .then(this._getJson)
    }
}