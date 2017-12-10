module.exports = {
    sections: {
        userInfo: {
            selector: '.dropdown-user.dropdown-menu',
            elements: {
                avatar: 'div.user-profile-image img',
                name: '.user-profile-info .name',
                userType: {
                    selector: 'div[@class="user-profile-info"]/div[@class="specification"]/div[1]',
                    locateStrategy: 'xpath'
                },
                email: {
                    selector: 'div[@class="user-profile-info"]/div[@class="specification"]/div[2]',
                    locateStrategy: 'xpath'
                },
                birthday: {
                    selector: 'div[@class="user-profile-info"]/div[@class="specification"]/div[3]',
                    locateStrategy: 'xpath'
                },
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