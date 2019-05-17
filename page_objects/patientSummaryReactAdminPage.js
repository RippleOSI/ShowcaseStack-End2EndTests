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
        patientBanner: {
            selector: "#patientBanner",
            locateStrategy: 'css selector',
            elements: {
                name: {
                    selector: "#patientBanner-name",
                    locateStrategy: 'css selector'
                },
                doctor: {
                    selector: "#patientBanner-doctor",
                    locateStrategy: 'css selector'
                },
                address: {
                    selector: "#patientBanner-address",
                    locateStrategy: 'css selector'
                },
                phone: {
                    selector: "#patientBanner-phone",
                    locateStrategy: 'css selector'
                },
                gender: {
                    selector: "#patientBanner-gender",
                    locateStrategy: 'css selector'
                },
                nhsNumber: {
                    selector: "#patientBanner-nhsNumber",
                    locateStrategy: 'css selector'
                },
            },
        },
        patientSummary: {
            selector: "#patientSummary",
            locateStrategy: 'css selector',
            elements: {
                topThreeThingsPanel: {
                    selector: "#block-top3Things",
                    locateStrategy: 'css selector'
                }
            }
        },
        patientSummaryTop: {
            selector: "#patientSummary-Top",
            locateStrategy: 'css selector',
            elements: {
                iconSettings: {
                    selector: "#icon-settings",
                    locateStrategy: 'css selector'
                }
            }
        },
        settingsModalWindow: {
            selector: "#settingsModalWindow",
            locateStrategy: 'css selector',
            elements: {
                closeIcon: {
                    selector: "#closeIcon",
                    locateStrategy: 'css selector'
                }
            }
        }
    },
    elements: {}
};