module.exports = {
    sections: {
        userInfo: {
            selector: '.dropdown-user.dropdown-menu',
            elements: {
                avatar: 'div.user-profile-image img',
                name: '.user-profile-info .name',
                userType: '.user-profile-info div[ng-if="user.role"] em',
                email: '.user-profile-info div[ng-if="user.email"]',
                birthday: '.user-profile-info .gray em',
                info: {
                    selector: 'div[@class="user-profile-info"]/div[@class="specification"]/div[4]',
                    locateStrategy: 'xpath'
                },
                signOutButton: '.btn-signout'
            }
        }
    },
    elements: {
        userButton: '.btn-user'
    }
};