export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(aboutSelector);
      
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        about: this._aboutElement.textContent,
      };
    }
  
    setUserInfo({ nombre, about }) {
      if (nombre) this._nameElement.textContent = nombre; 
      if (about) this._aboutElement.textContent = about; 
    }
  }
  