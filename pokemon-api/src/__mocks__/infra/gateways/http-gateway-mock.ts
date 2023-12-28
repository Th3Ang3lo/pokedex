import { HttpGateway } from "@/infra/gateways/http-gateway";
import { vi } from "vitest";

export class HttpGatewayMock implements HttpGateway {
    public post = vi.fn();
    public get = vi.fn();

    public reset() {
        this.post.mockReset();
        this.get.mockReset();
    }

    public mockPost(statusCode: number, response: any) {
        this.post.mockResolvedValue({
            statusCode,
            response
        });
    }

    public mockGet(statusCode: number, response: any) {
        this.get.mockResolvedValue({
            statusCode,
            response
        });
    }
}