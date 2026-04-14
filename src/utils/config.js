const Config = {
    profile: process.env.NEXT_PUBLIC_PROFILE,
    everTimeGATrackingId: process.env.NEXT_PUBLIC_EVERTIME_GA_TRACKING_ID,
    payrollGATrackingId: process.env.NEXT_PUBLIC_PAYROLL_GA_TRACKING_ID,
    apiServer: process.env.NEXT_PUBLIC_API_SERVER,
    frontServer: process.env.NEXT_PUBLIC_FRONT_SERVER,
    editorImageUploadUrl: process.env.NEXT_PUBLIC_API_SERVER + "/api/v1/files/inline",
    everTimeUrl: process.env.NEXT_PUBLIC_EVERTIME_URL || "https://www.evertime.co.kr",
    everTimeAppUrl: process.env.NEXT_PUBLIC_EVERTIME_APP_URL || "https://evertimebasic.web.flextudio.com",
    kakaoApiKey: "989faa8fc144359963bd2238f293765b"
};

export default Config;
