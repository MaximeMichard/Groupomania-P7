export class AuthService{
    isAuth: boolean;

    constructor(/* private userservice:UserService */){}
    
    signIn(){
        return new Promise((resolve,reject) => {
            setTimeout(()=> {
                this.isAuth = true;
                resolve(true);
                
            }, 2000
            );
        });
    };
    signOut(){
        this.isAuth= false;
    }
    getToken(){
        /* localStorage.setItem('token',response.token); */
    }

    
}