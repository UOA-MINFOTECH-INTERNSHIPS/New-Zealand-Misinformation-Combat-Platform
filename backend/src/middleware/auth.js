//this file is mainly use to ensure a user authorization to perform a task
/* the basic flow is
user click like button => auth middleware(next) if auth allows user to preceed
then user can call the like function*/
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        const token =req.header.authorization.split("")[1];
        const isCustomerAuth = token.length < 500;
        let decodedData;
        if (token && isCustomerAuth) {
            //verifying the token and the system token which is 'test'
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData ?.id; 
        }
        /*call next() to pass the action to next thing
        eg. user need to be permmitted to delete a post, 
        before they can delete they need to be authorized*/
        next();
    }catch (error) {
        console.log(error);
    }
}

export default auth;