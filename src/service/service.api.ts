import { API_BASE_URL, API_KEY_2, API_KEY_1 } from "../constant";
import { AlertBottomSnackbar } from "../snackbar";
import { ITopHeadline } from "../types";

class ServiceApi {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public fetchHeadlines = async (page: number): Promise<ITopHeadline | null> => {
        try {
            const urlParams = `country=in&pageSize=20&page=${page}`;
            const res = await fetch(`${this.baseUrl}/top-headlines?${urlParams}`, {
                headers: {
                    "X-Api-Key": API_KEY_2,
                    "Accept": "application/json"
                }
            });
            const data = await res.json();
            if (res.ok) {
                return data;
            } else {
                throw new Error(data.message ?? "Something went wrong, try again");
            }
        } catch (err) {
            AlertBottomSnackbar.show(err.message, "error");
            return null;
        }
    }
}

export const serviceApi = new ServiceApi(API_BASE_URL);