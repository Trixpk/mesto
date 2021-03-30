export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _isOk(result) {
        if(result.ok) {
            return result.json();
        }

        return Promise.reject(`Ошибка: ${result.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
        })
        .then((result) => {
            return this._isOk(result);
        })
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._isOk(result);
        })
    }

    deleteCard(itemId) {
        return fetch(this._baseUrl + '/cards/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            return this._isOk(result);
        })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then((result) => {
            return this._isOk(result);
        })
    }

    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._isOk(result);
        })
    }

    changeAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._isOk(result);
        })
    }

    addLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'PUT'
        }).then((result) => {
            return this._isOk(result);
        })
    }

    deleteLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            return this._isOk(result);
        })
    }
}