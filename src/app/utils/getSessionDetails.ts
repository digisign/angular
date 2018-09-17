export class GetSetSessionDetails {

    userInfoDetails() {
      return JSON.parse(sessionStorage.getItem('userInfo')) || {};
    }

}