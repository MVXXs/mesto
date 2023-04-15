class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
        }
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }

    setUserAvatar(link){
        this._userAvatar.src = link.avatar;
    }
}

export { UserInfo };