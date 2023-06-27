export class QueryOneResult<T> {
  constructor(public messages?: Array<string>, public entity?: T) {}
};

export class QueryArrayResult<T> {
  constructor(public messages?: Array<string>, public entities?: Array<T>) {}
}