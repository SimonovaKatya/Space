import {Colony} from './colony';

class Planet {

	private _x: number;
	private _y: number;
	private _name: string;
	private _colonyList: Colony[];

	constructor(x: number, y: number, name: string) {
		this._x = x;
		this._y = y;
		this._name = name;
		this._colonyList = [];
	}

	public get name(): string {
		return this._name;
	}

	public get x(): number {
		return this._x;
	}

	public get y(): number {
		return this._y;
	}
	public get colonyList(): Colony[] {
		return this._colonyList;
	}

	public createColony(name: string, age: number, peopleCount: number) {
		this._colonyList.push(new Colony(peopleCount, age, name));
	}

	public deleteColony(id: number) {
		this._colonyList[id].factoryList.forEach((factory) => { factory.stopMine(); });
		this._colonyList.splice(id, 1);
	}
}

export default Planet;
