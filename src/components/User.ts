export class User {
  diaplayName: string;
  email: string;
  photoUrl: string;
  uid: string;
  refreshToken: string;

  constructor(
    displayName: string,
    email: string,
    photoUrl: string,
    uid: string,
    refreshToken: string
  ) {
    this.diaplayName = displayName;
    this.email = email;
    this.photoUrl = photoUrl;
    this.uid = uid;
    this.refreshToken = refreshToken;
  }
}
