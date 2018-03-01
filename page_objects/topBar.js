module.exports = {
    sections: {
        userInfo: {
            selector: '.dropdown-user.dropdown-menu',
            elements: {
                avatar: 'div.user-profile-image img',
                name: '.user-profile-info .name',
                userType: '.user-profile-info .role',
                email: '.user-profile-info .email',
                birthday: '.user-profile-info .birthday',
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