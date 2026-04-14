import Config from "./config";

const SnsUtil = {
    shareKakao: () => {
        if (!Kakao.isInitialized()) {
            Kakao.init(Config.kakaoApiKey);
        }

        Kakao.Link.sendDefault({
            objectType: 'text',
            text: '에버타임 서비스포탈.',
            link: {
                mobileWebUrl: Config.everTimeUrl,
                webUrl: Config.everTimeUrl
            }
        });
    }
}

export default SnsUtil;