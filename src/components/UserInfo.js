export default class UserInfo {
    constructor({ profileName, profileInfo, avatar }) {
        this._info = document.querySelector(profileInfo);
        this._name = document.querySelector(profileName);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo({ name, info, avatar }) {
        this._name.textContent = name;
        this._info.textContent = info;
        this._avatar.src = avatar;
    }

    getUserId() {
        return this._id;
    }
}