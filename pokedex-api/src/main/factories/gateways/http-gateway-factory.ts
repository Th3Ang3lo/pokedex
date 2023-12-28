import { HttpGatewayImplementation } from "@/infra/gateways/implementations/http-gateways";

export function httpGatewayFactory() {
    return new HttpGatewayImplementation();
}