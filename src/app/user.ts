export class User {
    constructor(
       public name: string,
       public email: string,
       public password: string,
       public confirmpassword: string,
       public requestedAdminAccess: boolean
    ){}
 }
 