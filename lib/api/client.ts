type RequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
};

type ApiError = {
  message: string;
  status: number;
};

export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const { method = "GET", headers = {}, body } = config;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiClientError(
        data.message || `API error: ${response.statusText}`,
        response.status
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiClientError(error.message, 0);
    }

    throw new ApiClientError("An unknown error occurred", 0);
  }
}

export default apiClient;
