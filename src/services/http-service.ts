import apiClient from "./api-client";

export interface Entity {
  id: number;
}

class HttpService {
  controller = new AbortController();
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll<T>() {
    const request = apiClient.get<T[]>(this.endPoint, {
      signal: this.controller.signal,
    });

    return { request, cancel: () => this.controller.abort() };
  }

  add<T>(entity: T) {
    return apiClient.post<T>(this.endPoint, entity);
  }

  edit<T extends Entity>(entity: T) {
    return apiClient.put<T>(this.endPoint + entity.id, entity);
  }

  delete<T>(id: T) {
    return apiClient.delete<T>(this.endPoint + `/${id}`);
  }
}

const create = (endPoint: string) => new HttpService(endPoint);

export default create;
