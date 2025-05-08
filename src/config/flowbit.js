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
        "green": "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        "indigo": "bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800",
        "light": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
        "lime": "bg-lime-700 text-white hover:bg-lime-800 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800",
        "pink": "bg-pink-700 text-white hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800",
        "purple": "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
        "red": "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
        "teal": "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
        "yellow": "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
        "noColor": "bg-transparent text-dark "
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
                "md": "p-2.5 text-sm",
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
export default { button, drawer, footer, input, tab }