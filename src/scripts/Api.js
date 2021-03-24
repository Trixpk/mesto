export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
        .then((result) => {
            if(result.ok) {
                return result.json();
            }

            return Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }

    changeAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
    }
}