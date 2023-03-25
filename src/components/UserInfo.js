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
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    };
    if (data.about) {
      this._info.textContent = data.about;
    };
    if (data.avatar) {
      this._avatar.src = data.avatar;
    };
    if (data._id) {
      this._id = data._id;
    };
  }

  getUserId() {
    return this._id;
  }
}
