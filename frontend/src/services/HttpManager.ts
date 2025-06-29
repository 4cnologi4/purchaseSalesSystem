import { AuthService } from "./auth.service";

class HttpManager {
    private static instance: HttpManager;
    public authService = AuthService;

    private constructor() { }

    public static getInstance(): HttpManager {
        if (!HttpManager.instance) {
            HttpManager.instance = new HttpManager();
        }
        return HttpManager.instance;
    }
}

export const httpManager = HttpManager.getInstance(); 