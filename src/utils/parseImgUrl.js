
const APP_URL = import.meta.env.VITE_APP_URL;

const parseImgUrl = (imgUrl) => {
    if (imgUrl) {
        return imgUrl
    } else {
        return "/imgs/website/defaultUser.webp"
    }


}

export default parseImgUrl;