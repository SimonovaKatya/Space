import {Storage} from './storage';
import {Factory} from './factory';
import {Resource} from './resource';

export class Colony {

	private _peopleCount: number;
	private _age: number;
	private _name: string;
	private _factoryList: Factory[];
	private _storage: Storage;

	constructor(peopleCount: number, age: number, name: string) {
		this._peopleCount = peopleCount;
		this._age = age;
		this._name = name;
		this._storage = new Storage();
		this._factoryList = [];
	}

	public get name(): string {
		return this._name;
	}
	public get age(): number {
		return this._age;
	}
	public get peopleCount(): number {
		return this._peopleCount;
	}

	public get storage(): Storage {
		return this._storage;
	}

	public get factoryList(): Factory[] {
		return this._factoryList;
	}

	public createFactory(width: number, type: string, speed: number) {
		const newResource = new Resource(type);
		const newFactory = new Factory(width, newResource, speed);
		this._factoryList.push(newFactory);
		this._storage.addResource(newResource);
	}

	public deleteFactory(id: number) {
		this._factoryList[id].stopMine();
		this._factoryList.splice(id, 1);
	}
}
