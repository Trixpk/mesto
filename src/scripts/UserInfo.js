export default class UserInfo {
    constructor(nameSelector, infoSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {name: this._nameElement.textContent, info: this._infoElement.textContent};
    }

    setUserInfo(name, info) {
        document.querySelector('.profile__name').textContent = name;
        document.querySelector('.profile__profession').textContent = info;
    }
}