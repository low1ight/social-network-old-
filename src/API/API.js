import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "72e25552-b2c1-4c84-899d-e7e03c72d53f"}
    //72e25552-b2c1-4c84-899d-e7e03c72d53f main
    //5eaa11d5-b7e1-4e20-b84b-6495867db236 smurf
});

export const usersAPI = {
    getUsers(currentPage) {
        return instance.get(`users?page=${currentPage}&count=35`)
            .then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    }
};
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    getFollowStatus(id) {
        return instance.get(`follow/${id}`)
    },
    setStatus(text) {
        return instance.put('profile/status', {status: text})
    },
    setPhoto(file) {
        let formData = new FormData();
        formData.append('image', file);
        return instance.put('profile/photo', formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })

    },
    editProfile(data) {
        return instance.put('profile', data)
    }
};
export const dialogsAPI = {
    startDialog(id) {    /*start new dialog,refresh your companion so that he was on top*/
      return instance.put(`dialogs/${id}`)
    },
    getDialogs() {
        return instance.get('dialogs')
    },
    "getCurrentDialogsMessage"(id) {
        return instance.get(`dialogs/${id}/messages/new?newerThen=2019-12-15`).then(response => response.data)
        // return instance.get(`dialogs/${id}/messages/new?newerThen=2019-12`)

    },
    sendMessage(id,messages) {
        return instance.post(`dialogs/${id}/messages`, {body:messages})

    },
    checkNewMessage() {
        return instance.get('dialogs/messages/new/count')
    },
    checkMessageViewedStatus(messageId) {
        return instance.get(`dialogs/messages/${messageId}/viewed`)
    }
};
export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(data) {
        return instance.post('auth/login', data)
            .then(response => response.data)
    },
    logout() {
        return instance.post('auth/logout')
            .then(response => response.data)
    },
    getCaptcha() {
        return instance.post('security/get-captcha-url')
            .then(response => response.data.url)

    }
};
