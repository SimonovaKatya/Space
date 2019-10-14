import {Resource} from './resource';
import {Building} from './building';

export class Storage extends Building {
	private _resourceList: Resource[];

	constructor() {
		super(100); // пока что ширина пусть будет 100
		this._resourceList = [];
	}

	public get resourceList(): Resource[] {
		return this._resourceList;
	}

	public addResource(resource: Resource) {
		this._resourceList.push(resource);
	}
}
