export default class Api {
    constructor(options) {
        this._options = options;
    }

    // Centraliza la validación de respuestas HTTP
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`HTTP error! Status: ${res.status}`);
    }

    // Método general para manejar errores de red
    _handleError(err) {
        console.error(`Error: ${err}`);
        return Promise.reject(err);
    }

    // Combina múltiples promesas: Usuario + Tarjetas
    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]).catch(this._handleError);
    }

    // Obtiene las tarjetas iniciales
    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers,
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    // Obtiene la información del usuario
    getUserInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers,
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    // Actualiza la información del usuario
    postUserInfo(userData) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            }),
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    // Crea una nueva tarjeta
    postCard(cardData) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link,
            }),
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    // Elimina una tarjeta
    deleteCard(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                // No devuelvas JSON si no lo necesitas
                return; 
            })
            .catch(this._handleError);
    }

    // Agrega un "like" a una tarjeta
    addLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._options.headers,
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    // Elimina un "like" de una tarjeta
    deleteLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._options.headers,
        })
            .then(this._checkResponse)
            .catch(this._handleError);
    }

    updateProfilePicture(avatarUrl) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatarUrl,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Estado: ${res.status}`);
            }
            return res.json();
        });
    }
}
