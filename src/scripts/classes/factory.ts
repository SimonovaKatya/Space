import {Resource} from './resource';
import {Building} from './building';
import Timer = NodeJS.Timer;

export class Factory extends Building {

	private _resource: Resource;
	private _speed: number;
	private _timer: Timer; // Нужно чтобы остановить генерацию ресурса. Особенность реализации, к проектированию не имеет отношения.

	constructor(width: number, resource: Resource, speed: number = 10000) {
		super(width);
		this._resource = resource;
		this._speed = speed;
		this._timer = this.mineResource();
	}

	public get resource(): Resource {
		return this._resource;
	}

	public get speed(): number {
		return this._speed;
	}

	public mineResource() {
		return setInterval(() => {
			if (!this._resource.setCount()) {
				this.stopMine();
			}
		}, this._speed);
	}

	public stopMine() {
		clearInterval(this._timer);
	}
}
