export default class UserInfo {
    constructor({ profileName, profileInfo }) {
        this._info = document.querySelector(profileInfo);
        this._name = document.querySelector(profileName);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }

    setUserInfo({ name, info }) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}