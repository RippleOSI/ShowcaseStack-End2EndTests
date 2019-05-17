module.exports = {
    commands: [],
    sections: {
        topbarTopPart: {
            selector: "#topbarTopPart",
            locateStrategy: 'css selector',
            elements: {
                logoutIcon: {
                    selector: "#icon-profile",
                    locateStrategy: 'css selector'
                },
            }
        },
        sidebarMenu: {
            selector: "#sidebarMenu",
            locateStrategy: 'css selector',
            elements: {
                summaryItem: {
                    selector: "#menu-summary",
                    locateStrategy: 'css selector'
                },
                topThreeThingsItem: {
                    selector: "#menu-top3Things",
                    locateStrategy: 'css selector'
                },
            }
        },
        userPanel: {
            selector: "#userPanel",
            locateStrategy: 'css selector',
            elements: {
                signOut: {
                    selector: "#signOut",
                    locateStrategy: 'css selector'
                }
            }
        },
        tableHeader: {
            selector: "#tableHeader",
            locateStrategy: 'css selector',
            elements: {
                title: {
                    selector: "#tableHeader-title",
                    locateStrategy: 'css selector'
                }
            }
        },
        listTemplate: {
            selector: "#listTemplate",
            locateStrategy: 'css selector',
            elements: {
                listTop3Things: {
                    selector: "#list-top3Things",
                    locateStrategy: 'css selector',
                },
                tableRow: {
                    selector: "table tbody tr",
                    locateStrategy: 'css selector'
                },
                editButton: {
                    selector: "#editButton",
                    locateStrategy: 'css selector',
                }
            }
        },
        topThreeThingsForm: {
            selector: "#form",
            locateStrategy: 'css selector',
            elements: {
                name1: {
                    selector: "#name1",
                    locateStrategy: 'css selector',
                },
                name2: {
                    selector: "#name2",
                    locateStrategy: 'css selector',
                },
                name3: {
                    selector: "#name3",
                    locateStrategy: 'css selector',
                },
                description1: {
                    selector: "#description1",
                    locateStrategy: 'css selector',
                },
                description2: {
                    selector: "#description2",
                    locateStrategy: 'css selector',
                },
                description3: {
                    selector: "#description3",
                    locateStrategy: 'css selector',
                },
                saveButton: {
                    selector: "#saveButton",
                    locateStrategy: 'css selector',
                }
            }
        }

    },
    elements: {}
};