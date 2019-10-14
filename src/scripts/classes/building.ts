
export abstract class Building {

	protected _width: number;

	constructor(width: number) {
		this._width = width;
	}

	public get width(): number {
		return this._width;
	}
}
