
export class Resource {

	private _type: string;
	private _count = 0;
	private _limit = 100;

	constructor(type: string) {
		this._type = type;
	}

	public get type(): string {
		return this._type;
	}

	public get count(): number {
			return this._count;
	}

	public get limit(): number {
		return this._limit;
	}

	public setCount(extraCount = 1) {
		if (this._limit <= this._count) {
			return false;
		}
		this._count = this._count + extraCount;
		return true;
	}
}
