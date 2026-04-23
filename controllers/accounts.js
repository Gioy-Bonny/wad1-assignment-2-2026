'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';
import e from 'express';

//create an accounts object
const accounts = {

    //index function to render index page
    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
            error: request.query.error ? true : false,
        };
        response.render('index', viewData);
    },

    //login function to render login page
    login(request, response) {
        const viewData = {
            title: 'Login to the Service',
            error: request.query.error,
        };
        response.render('login', viewData);
    },

    //logout function to render logout page
    logout(request, response) {
        response.cookie('gallery', '');
        response.redirect('/');
    },

    //signup function to render signup page
    signup(request, response) {
        const viewData = {
            title: 'Login to the Service',
            error: request.query.error,
        };
        response.render('signup', viewData);
    },

    //register function to render the registration page for adding a new user
    register(request, response) {
        const user = request.body;
        const existingUser = userStore.getUserByEmail(user.email); 
        if (existingUser) {
            logger.info('same Email')
            response.redirect('/signup?error=Email already in use');
            return;
        }
        user.id = uuidv4();
        userStore.addUser(user);
        logger.info('registering ' + user.email);
        response.redirect('/');
    },

    //authenticate function to check user credentials and either render the login page again or the start page.
    authenticate(request, response) {
        const user = userStore.getUserByEmail(request.body.email);
        const password = request.body.password;

        if (user && user.password === password) {
            response.cookie('gallery', user.email);
            logger.info('logging in' + user.email);
            response.redirect('/start');
        } else {
            // Render the login page again with the error flag set to true
            response.render('index', { error: true });
        }
    },

    //utility function getCurrentUser to check who is currently logged in
    getCurrentUser(request) {
        const userEmail = request.cookies.gallery;
        return userStore.getUserByEmail(userEmail);
    },

    forgotPasswordView(request, response) {
        const viewData = {
            title: 'Forgot Password',
            error: request.query.error,
        };
        response.render('forgotpassword', viewData);
    },

    forgotPassword(request, response) {
        const email = request.body;
        const user = userStore.getUserByEmail(email);
        if (user) {
            user.password = 'password';
            userStore.updateUser(user);
            logger.info('Password reset to default for ' + user.email);
            response.redirect('/');
        } else {
            logger.info('Forgot password failed: email not found ' + email);
            response.redirect('/forgotpassword?error=true');
        }
    },

    changePasswordView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            response.render('changepassword', { title: 'Change Password', error: request.query.error });
        } else {
            response.redirect('/');
        }
    },

    verifyPassword(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            const { currentPassword } = request.body;
            if (loggedInUser.password === currentPassword) {
                response.redirect('/newpassword');
            } else {
                logger.info('Wrong current password for ' + loggedInUser.email);
                response.redirect('/changepassword?error=wrong');
            }
        } else {
            response.redirect('/');
        }
    },

    newPasswordView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            response.render('newpassword', { title: 'New Password', error: request.query.error });
        } else {
            response.redirect('/');
        }
    },

    newPassword(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (loggedInUser) {
            const { newPassword, confirmPassword } = request.body;
            if (newPassword !== confirmPassword) {
                response.redirect('/newpassword?error=nomatch');
                return;
            }
            userStore.updateUser({ ...loggedInUser, password: newPassword });
            logger.info('Password changed for ' + loggedInUser.email);
            response.redirect('/start');
        } else {
            response.redirect('/');
        }
    },

}

export default accounts;
