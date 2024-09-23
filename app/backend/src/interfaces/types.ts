export interface IAccessToken {
  access_token: string;
}

export type IPaginationArgs<T> = T & {
  skip?: number;
  take?: number;
  includeCount?: boolean;
};

export interface IPaginatedResult<T> {
  results: T[];
  pagination: {
    total: number;
    size: number;
    skip: number;
    take: number;
    hasMore?: boolean;
  };
}

export interface IEntityService {
  findAll(params: IPaginationArgs<unknown>): Promise<IPaginatedResult<unknown>>;
  findOne?(id: string, params: unknown): Promise<unknown>;
  create(data: unknown): Promise<unknown>;
  update(id: string, data: unknown): Promise<unknown>;
  delete?(id: string): Promise<unknown>;
}

export type ReqStrategy = {
  body: {
    email: string;
    password: string;
  };
};

export interface IRequestUser {
  id: string;
  email: string;
  active: boolean;
  role: string;
}

export interface ITokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  active: boolean;
}
