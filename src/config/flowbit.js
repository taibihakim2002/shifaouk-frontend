const button = {
    "base": "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4",
    "disabled": "pointer-events-none opacity-50",
    "fullSized": "w-full",
    "grouped": "rounded-none border-l-0 first:rounded-s-lg first:border-l last:rounded-e-lg focus:ring-2",
    "pill": "rounded-full",
    "size": {
        "xs": "h-8 px-3 text-xs",
        "sm": "h-9 px-3 text-[13px]",
        "md": "h-10 px-5 text-sm",
        "lg": "h-12 px-5 text-base",
        "xl": "h-[52px] px-6 text-base"
    },
    "color": {
        "primary": "bg-primaryColor text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
        "default": "bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
        "alternative": "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",
        "blue": "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        "cyan": "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
        "dark": "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
        "gray": "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
        "green": "bg-green-500 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        "indigo": "bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800",
        "light": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
        "lime": "bg-lime-700 text-white hover:bg-lime-800 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800",
        "pink": "bg-pink-700 text-white hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800",
        "purple": "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
        "red": "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
        "teal": "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
        "yellow": "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
        "noColor": "bg-transparent text-dark"
    },
    "outlineColor": {
        "default": "border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800",
        "primary": "border border-primaryColor text-primaryColor hover:border-none hover:bg-primaryColor hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800",
        "blue": "border border-blue-700 text-blue-700 hover:border-blue-800 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:hover:text-white dark:focus:ring-blue-800",
        "cyan": "border border-cyan-700 text-cyan-700 hover:border-cyan-800 hover:bg-cyan-800 hover:text-white focus:ring-cyan-300 dark:border-cyan-500 dark:text-cyan-500 dark:hover:border-cyan-700 dark:hover:bg-cyan-700 dark:hover:text-white dark:focus:ring-cyan-800",
        "dark": "border border-gray-800 text-gray-800 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800",
        "gray": "border border-gray-700 text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800",
        "green": "border border-green-700 text-green-700 hover:border-green-800 hover:bg-green-800 hover:text-white focus:ring-green-300 dark:border-green-600 dark:text-green-500 dark:hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-800",
        "indigo": "border border-indigo-700 text-indigo-700 hover:border-indigo-800 hover:bg-indigo-800 hover:text-white focus:ring-indigo-300 dark:border-indigo-600 dark:text-indigo-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-white dark:focus:ring-indigo-800",
        "lime": "border border-lime-700 text-lime-700 hover:border-lime-800 hover:bg-lime-800 hover:text-white focus:ring-lime-300 dark:border-lime-600 dark:text-lime-500 dark:hover:border-lime-700 dark:hover:bg-lime-700 dark:hover:text-white dark:focus:ring-lime-800",
        "pink": "border border-pink-700 text-pink-700 hover:border-pink-800 hover:bg-pink-800 hover:text-white focus:ring-pink-300 dark:border-pink-600 dark:text-pink-500 dark:hover:border-pink-700 dark:hover:bg-pink-700 dark:hover:text-white dark:focus:ring-pink-800",
        "purple": "border border-purple-700 text-purple-700 hover:border-purple-800 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-600 dark:text-purple-400 dark:hover:border-purple-700 dark:hover:bg-purple-700 dark:hover:text-white dark:focus:ring-purple-800",
        "red": "border border-red-700 text-red-700 hover:border-red-800 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:border-red-700 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-red-800",
        "teal": "border border-teal-700 text-teal-700 hover:border-teal-800 hover:bg-teal-800 hover:text-white focus:ring-teal-300 dark:border-teal-600 dark:text-teal-400 dark:hover:border-teal-700 dark:hover:bg-teal-700 dark:hover:text-white dark:focus:ring-teal-800",
        "yellow": "border border-yellow-400 text-yellow-400 hover:border-yellow-500 hover:bg-yellow-500 hover:text-white focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900"
    }
}

const drawer = {
    "root": {
        "base": "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
        "backdrop": "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
        "edge": "bottom-16",
        "position": {
            "top": {
                "on": "left-0 right-0 top-0 w-full transform-none",
                "off": "left-0 right-0 top-0 w-full -translate-y-full"
            },
            "right": {
                "on": "right-0 top-0 h-screen w-80 transform-none",
                "off": "right-0 top-0 h-screen w-80 translate-x-full"
            },
            "bottom": {
                "on": "bottom-0 left-0 right-0 w-full transform-none",
                "off": "bottom-0 left-0 right-0 w-full translate-y-full"
            },
            "left": {
                "on": "left-0 top-0 h-screen w-80 transform-none",
                "off": "left-0 top-0 h-screen w-80 -translate-x-full"
            }
        }
    },
    "header": {
        "inner": {
            "closeButton": "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            "closeIcon": "h-4 w-4",
            "titleCloseIcon": "sr-only",
            "titleIcon": "me-2.5 h-4 w-4",
            "titleText": "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        },
        "collapsed": {
            "on": "hidden",
            "off": "block"
        }
    },
    "items": {
        "base": ""
    }
}
const footer = {
    "root": {
        "base": "w-full rounded-none bg-white shadow-none md:flex md:items-center md:justify-between dark:bg-gray-800",
        "container": "w-full p-6",
        "bgDark": "bg-gray-800"
    },
    "groupLink": {
        "base": "flex flex-wrap text-sm text-gray-100 dark:text-white",
        "link": {
            "base": "me-4 last:mr-0 md:mr-6",
            "href": "hover:underline"
        },
        "col": "flex-col space-y-4"
    },
    "icon": {
        "base": "text-gray-500 dark:hover:text-white",
        "size": "h-5 w-5"
    },
    "title": {
        "base": "mb-6 text-sm font-semibold uppercase text-gray-200 dark:text-white"
    },
    "divider": {
        "base": "my-6 w-full border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700"
    },
    "copyright": {
        "base": "text-sm text-gray-500 sm:text-center dark:text-gray-400",
        "href": "ml-1 hover:underline",
        "span": "ml-1"
    },
    "brand": {
        "base": "mb-4 flex items-center sm:mb-0",
        "img": "mr-3 h-8",
        "span": "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
    }
}

const input = {
    "base": "flex",
    "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    "field": {
        "base": "relative w-full",
        "icon": {
            "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
            "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
        },
        "rightIcon": {
            "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
            "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
        },
        "input": {
            "base": "block w-full border focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
            "sizes": {
                "sm": "p-2 sm:text-xs",
                "md": "p-2 text-sm",
                "lg": "p-4 sm:text-base"
            },
            "colors": {
                "primary": "border-primaryColor bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                "gray": "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
                "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
            },
            "withRightIcon": {
                "on": "pr-10",
                "off": ""
            },
            "withIcon": {
                "on": "pl-10",
                "off": ""
            },
            "withAddon": {
                "on": "rounded-r-lg",
                "off": "rounded-lg"
            },
            "withShadow": {
                "on": "shadow-sm dark:shadow-sm-light",
                "off": ""
            }
        }
    }
}
const tab = {
    "base": "flex flex-col gap-2",
    "tablist": {
        "base": "flex text-center",
        "variant": {
            "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
            "underline": "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
            "pills": "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
            "fullWidth": "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400"
        },
        "tabitem": {
            "base": "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ms-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
            "variant": {
                "default": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "bg-gray-100 text-primaryColor dark:bg-gray-800 dark:text-primary-500",
                        "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    }
                },
                "underline": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "rounded-t-lg border-b-2 border-primaryColor text-primary-600 dark:border-primary-500 dark:text-primary-500",
                        "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    }
                },
                "pills": {
                    "base": "",
                    "active": {
                        "on": "rounded-lg bg-primary-600 text-white",
                        "off": "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                    }
                },
                "fullWidth": {
                    "base": "ml-0 flex w-full rounded-none first:ml-0",
                    "active": {
                        "on": "rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
                        "off": "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                }
            },
            "icon": "me-2 h-5 w-5"
        }
    },
    "tabitemcontainer": {
        "base": "",
        "variant": {
            "default": "",
            "underline": "",
            "pills": "",
            "fullWidth": ""
        }
    },
    "tabpanel": "py-3"
}


const adminSettingsTabs = {
    "base": "flex flex-col gap-5",
    "tablist": {
        "base": "flex text-center m-auto border rounded-lg px-0",
        "variant": {
            "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
            "underline": "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
            "pills": "md:w-2/3 justify-center items-center flex-wrap text-sm font-medium text-gray-500 dark:text-gray-400",
            "fullWidth": "grid w-full grid-flow-col  rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400"
        },
        "tabitem": {
            "base": "flex-1 flex flex-col gap-2 items-center justify-center rounded-t-lg p-5 text-sm font-medium  focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
            "variant": {
                "default": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500",
                        "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    }
                },
                "underline": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "rounded-t-lg border-b-2 border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500",
                        "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    }
                },
                "pills": {
                    "base": "",
                    "active": {
                        "on": "rounded-lg bg-[#2534A8] text-white",
                        "off": "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                    }
                },
                "fullWidth": {
                    "base": "ml-0 flex w-full rounded-none first:ml-0",
                    "active": {
                        "on": "rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
                        "off": "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                }
            },
            "icon": "mr-2 h-7 w-7"
        }
    },
    "tabitemcontainer": {
        "base": "",
        "variant": {
            "default": "",
            "underline": "",
            "pills": "",
            "fullWidth": ""
        }
    },
    "tabpanel": "py-3"
}
const checkbox = {
    "base": "h-4 w-4 appearance-none rounded border border-gray-300 bg-gray-100 bg-[length:0.55em_0.55em] bg-center bg-no-repeat checked:border-transparent checked:bg-gray-700 checked:bg-check-icon focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:checked:border-transparent dark:checked:bg-current",
    "color": {
        "default": "text-primary-600 focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-primary-600",
        "dark": "text-gray-800 focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800",
        "failure": "text-red-900 focus:ring-red-900 dark:ring-offset-red-900 dark:focus:ring-red-900",
        "gray": "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
        "info": "text-cyan-800 focus:ring-cyan-800 dark:ring-offset-gray-800 dark:focus:ring-cyan-800",
        "light": "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
        "purple": "text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600",
        "success": "text-green-800 focus:ring-green-800 dark:ring-offset-green-800 dark:focus:ring-green-800",
        "warning": "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
        "blue": "text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700",
        "cyan": "text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600",
        "green": "text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600",
        "indigo": "text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700",
        "lime": "text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700",
        "pink": "text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600",
        "red": "text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600",
        "teal": "text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600",
        "yellow": "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400"
    },
    "indeterminate": "border-transparent bg-current bg-dash-icon dark:border-transparent dark:bg-current"
}



const authDialog = {
    "root": {
        "base": "fixed inset-x-0 top-0 z-40 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
        "show": {
            "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
            "off": "hidden"
        },
        "sizes": {
            "sm": "max-w-sm",
            "md": "max-w-md",
            "lg": "max-w-lg",
            "xl": "max-w-xl",
            "2xl": "max-w-2xl",
            "3xl": "max-w-3xl",
            "4xl": "max-w-4xl",
            "5xl": "max-w-5xl",
            "6xl": "max-w-6xl",
            "7xl": "max-w-7xl"
        },
        "positions": {
            "top-left": "items-start justify-start",
            "top-center": "items-start justify-center",
            "top-right": "items-start justify-end",
            "center-left": "items-center justify-start",
            "center": "items-center justify-center",
            "center-right": "items-center justify-end",
            "bottom-right": "items-end justify-end",
            "bottom-center": "items-end justify-center",
            "bottom-left": "items-end justify-start"
        }
    },
    "content": {
        "base": "relative w-full p-0 md:p-4 h-auto",
        "inner": "relative flex max-h-[95dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
    },
    "body": {
        "base": "flex-1 overflow-auto p-6",
        "popup": "pt-0"
    },
    "header": {
        "base": "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
        "popup": "border-b-0 p-2",
        "title": "text-xl font-medium text-gray-900 dark:text-white",
        "close": {
            "base": "ms-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            "icon": "h-5 w-5"
        }
    },
    "footer": {
        "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
        "popup": "border-t"
    }
}
const dashSide = {
    "root": {
        "base": "h-full",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full overflow-y-auto overflow-x-hidden bg-gray-50 px-5 py-5 dark:bg-gray-800"
    },
    "collapse": {
        "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        "icon": {
            "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "open": {
                "off": "",
                "on": "text-gray-900"
            }
        },
        "label": {
            "base": "ml-3 flex-1 whitespace-nowrap text-left",
            "icon": {
                "base": "h-6 w-6 transition delay-0 ease-in-out",
                "open": {
                    "on": "rotate-180",
                    "off": ""
                }
            }
        },
        "list": "space-y-2 py-2"
    },
    "cta": {
        "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
        "color": {
            "blue": "bg-cyan-50 dark:bg-cyan-900",
            "dark": "bg-dark-500 dark:bg-dark-900",
            "failure": "bg-red-50 dark:bg-red-900",
            "gray": "bg-alternative-50 dark:bg-alternative-900",
            "green": "bg-green-50 dark:bg-green-900",
            "light": "bg-light-50 dark:bg-light-900",
            "red": "bg-red-50 dark:bg-red-900",
            "purple": "bg-purple-50 dark:bg-purple-900",
            "success": "bg-green-50 dark:bg-green-900",
            "yellow": "bg-yellow-50 dark:bg-yellow-900",
            "warning": "bg-yellow-50 dark:bg-yellow-900"
        }
    },
    "item": {
        "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-[15px]  text-gray-900 hover:bg-gray-400 hover:text-white dark:text-white dark:hover:bg-gray-700",
        "active": "bg-gray-400 text-white dark:bg-gray-700",
        "collapsed": {
            "insideCollapse": "group w-full pl-8 transition duration-75",
            "noIcon": "font-bold"
        },
        "content": {
            "base": "flex-1 whitespace-nowrap px-3"
        },
        "icon": {
            "base": "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "active": "text-white dark:text-gray-100"
        },
        "label": "text-[13px] p-1",
        "listItem": ""
    },
    "items": {
        "base": ""
    },
    "itemGroup": {
        "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
        "base": "mb-5 flex items-center pl-2.5",
        "collapsed": {
            "on": "hidden",
            "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        },
        "img": "mr-3 h-6 sm:h-7"
    }
}
const table = {
    "root": {
        "base": "-z-1 w-full text-start text-sm text-gray-500 dark:text-gray-400",
        "shadow": "absolute start-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
        "wrapper": ""
    },
    "body": {
        "base": "group/body",
        "cell": {
            "base": "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg"
        }
    },
    "head": {
        "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
        "cell": {
            "base": "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
        }
    },
    "row": {
        "base": "group/row",
        "hovered": "hover:bg-gray-50 dark:hover:bg-gray-600",
        "striped": "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
    }
}


const customThemeDatePicker = {
    "root": {
        "base": "relative"
    },
    "popup": {
        "root": {
            "base": "absolute top-10 z-50 block pt-2",
            "inline": "relative top-0 z-auto",
            "inner": "inline-block w-full shadow-none border rounded-lg bg-white p-6 dark:bg-gray-700"
        },
        "header": {
            "base": "",
            "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
            "selectors": {
                "base": "mb-2 flex justify-between",
                "button": {
                    "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                    "prev": "",
                    "next": "",
                    "view": ""
                }
            }
        },
        "view": {
            "base": "p-2"
        },
        "footer": {
            "base": "mt-2 flex justify-center",
            "button": {
                "base": "w-32 rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                "today": "bg-primaryColor text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
                "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }
        }
    },
    "views": {
        "days": {
            "header": {
                "base": "mb-6 grid grid-cols-7",
                "title": "h-6 text-center text-[11px] md:text-sm lg:text-[16px] font-medium leading-6 text-gray-500 dark:text-gray-400"
            },
            "items": {
                "base": "grid w-full grid-cols-7 gap-2",
                "item": {
                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm lg:text-[16px] font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    "selected": "bg-primaryColor text-white hover:bg-cyan-600",
                    "disabled": "text-gray-300"
                }
            }
        },
        "months": {
            "items": {
                "base": "grid w-full grid-cols-4 gap-2",
                "item": {
                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                    "disabled": "text-gray-500"
                }
            }
        },
        "years": {
            "items": {
                "base": "grid w-full grid-cols-4 gap-2",
                "item": {
                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                    "disabled": "text-gray-500"
                }
            }
        },
        "decades": {
            "items": {
                "base": "grid w-full grid-cols-4 gap-2",
                "item": {
                    "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                    "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
                    "disabled": "text-gray-500"
                }
            }
        }
    }
};


export default { button, drawer, footer, input, tab, checkbox, authDialog, adminSettingsTabs, table, dashSide, customThemeDatePicker }