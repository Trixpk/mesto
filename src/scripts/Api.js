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
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    deleteCard(itemId) {
        return fetch(this._baseUrl + '/cards/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
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
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    changeAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    addLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'PUT'
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }

    deleteLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            if(result.ok) {
                return result.json();
            }

            return new Promise.reject(`Ошибка: ${result.status}`);
        })
    }
}