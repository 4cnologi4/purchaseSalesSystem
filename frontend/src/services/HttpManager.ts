import { AuthService } from "./auth.service";
import { DiscountsService } from "./discounts.service";
import { ProductsService } from "./products.service";
import { SalesService } from "./sale.service";

class HttpManager {
    private static instance: HttpManager;
    public authService = AuthService;
    public productsService = ProductsService;
    public discountService = DiscountsService;
    public salesService = SalesService;

    private constructor() { }

    public static getInstance(): HttpManager {
        if (!HttpManager.instance) {
            HttpManager.instance = new HttpManager();
        }
        return HttpManager.instance;
    }
}

export const httpManager = HttpManager.getInstance(); 