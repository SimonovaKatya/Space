import Planet from './scripts/classes/planet';
import M from '../node_modules/materialize-css/dist/js/materialize.js';
import {Colony} from './scripts/classes/colony';
import {Factory} from './scripts/classes/factory';

class Space {
	content: HTMLElement = document.getElementById('content') as HTMLElement;
	header: HTMLElement = document.getElementById('header') as HTMLElement;
	planetInfo = [
		{
			name: 'Земля',
			x: 50,
			y: 50,
		},
		{
			name: 'Марс',
			x: 150,
			y: 310,
		},
		{
			name: 'Сатурн',
			x: 250,
			y: 100,
		},
		{
			name: 'Нептун',
			x: 440,
			y: 80,
		},
		{
			name: 'Венера',
			x: 40,
			y: 680,
		},
		{
			name: 'Уран',
			x: 243,
			y: 334,
		},
		{
			name: 'Юпитер',
			x: 653,
			y: 542,
		}
	];
	planetList: Planet[] = [];
	currentPlanet: Planet = null;
	currentColony: Colony = null;

	planetHeaderElement = {
		createColonyButton: null,
		backPlanetListButton: null,
		planetInfo: null,
	};

	colonyHeaderElement = {
		createFactoryButton: null,
		backColonyListButton: null,
		colonyInfo: null,
	};

	timer: NodeJS.Timeout;

	constructor() {
		this.initialize();
	}

	private initialize = (): void => {
		document.addEventListener('DOMContentLoaded', function() {
			const modalList = document.querySelectorAll('.modal');
				M.Modal.init(modalList);
		});

		this.planetInfo.forEach((planet) => {this.planetList.push(new Planet(planet.x, planet.y, planet.name)); });
		this.renderPlanetList();
	}

	private renderPlanetList() {
		const ul: HTMLUListElement = document.createElement('ul');
		ul.classList.add('collection');
		this.planetList.forEach((planet, id) => {
			const li = document.createElement('li');
			li.append(`${planet.name} Координаты: х:${planet.x} y:${planet.y}`);
			li.classList.add('grey-custom');
			li.classList.add('collection-item');
			li.classList.add('grey');
			li.classList.add('darken-3');
			li.dataset.id = id.toString();
			li.onclick = this.choosePlanetCallback;
			ul.append(li);
		});
		this.content.append(ul);
	}

	private clearBoard() {
		const cNode = this.content.cloneNode(false);
		this.content.parentNode.replaceChild(cNode, this.content);
		this.content = document.getElementById('content') as HTMLElement;
	}

	private clearHeader() {
		Object.keys(this.planetHeaderElement).forEach((key) => {
			if (this.planetHeaderElement[key]) {
				this.planetHeaderElement[key].remove();
			}
		});

		Object.keys(this.colonyHeaderElement).forEach((key) => {
			if (this.colonyHeaderElement[key]) {
				this.colonyHeaderElement[key].remove();
			}
		});
	}

	private choosePlanetCallback = (e) => {
		this.clearBoard();

		this.currentPlanet = this.planetList[e.target.dataset.id];
		this.renderColonyList(this.currentPlanet.colonyList);
		this.renderPlanetHeader();

		const colonyCreate = document.getElementById('colonyCreate') as HTMLElement;
		colonyCreate.onsubmit = this.createColonyCallback;
	}

	private renderPlanetHeader() {
		this.planetHeaderElement.planetInfo = document.createElement('span');
		this.planetHeaderElement.planetInfo.append(`Планета: ${this.currentPlanet.name}`);

		this.planetHeaderElement.createColonyButton = document.createElement('a');
		this.planetHeaderElement.createColonyButton.classList.add('waves-effect');
		this.planetHeaderElement.createColonyButton.classList.add('waves-light');
		this.planetHeaderElement.createColonyButton.classList.add('btn');
		this.planetHeaderElement.createColonyButton.classList.add('grey-custom');
		this.planetHeaderElement.createColonyButton.classList.add('right');
		this.planetHeaderElement.createColonyButton.classList.add('modal-trigger');
		this.planetHeaderElement.createColonyButton.append('Создать колонию');
		this.planetHeaderElement.createColonyButton.href = '#modal1';

		this.planetHeaderElement.backPlanetListButton = document.createElement('a');
		this.planetHeaderElement.backPlanetListButton.classList.add('waves-effect');
		this.planetHeaderElement.backPlanetListButton.classList.add('waves-light');
		this.planetHeaderElement.backPlanetListButton.classList.add('btn');
		this.planetHeaderElement.backPlanetListButton.classList.add('grey-custom');
		this.planetHeaderElement.backPlanetListButton.classList.add('right');
		this.planetHeaderElement.backPlanetListButton.append('К списку планет');
		this.planetHeaderElement.backPlanetListButton.onclick = this.backPlanetListCallback;

		this.header.append(this.planetHeaderElement.planetInfo);
		this.header.append(this.planetHeaderElement.createColonyButton);
		this.header.append(this.planetHeaderElement.backPlanetListButton);
	}

	private renderColonyList(colonyList: Colony[]) {
		if (colonyList.length) {
			const ul: HTMLUListElement = document.createElement('ul');

			ul.classList.add('collection');
			colonyList.forEach((colony, id) => {
				const span = document.createElement('span');
				span.append(`Колония: ${colony.name} Возраст: ${colony.age} Колличество жителей: ${colony.peopleCount}`);
				span.dataset.id = id.toString();
				span.onclick = this.chooseColonyCallback;

				const i: HTMLElement = document.createElement('i');
				i.append('delete');
				i.classList.add('material-icons');
				i.classList.add('form-text');
				i.dataset.id = id.toString();
				i.onclick = this.deleteColumn;

				const li = document.createElement('li');
				li.append(span);
				li.append(i);
				li.classList.add('grey-custom');
				li.classList.add('collection-item');
				li.classList.add('grey');
				li.classList.add('darken-3');
				li.classList.add('valign-wrapper');
				li.classList.add('my-container');
				ul.append(li);
			});
			this.content.append(ul);
		}
	}

	private backPlanetListCallback = () => {
		this.clearBoard();
		this.clearHeader();
		this.currentPlanet = null;
		this.renderPlanetList();
	}

	private createColonyCallback = (e) => {
		e.preventDefault();
		this.currentPlanet.createColony(e.target[0].value, e.target[1].value, e.target[2].value);
		e.target[0].value = '';
		e.target[1].value = '';
		e.target[2].value = '';
		e.target[0].nextElementSibling.classList.remove('active');
		e.target[1].nextElementSibling.classList.remove('active');
		e.target[2].nextElementSibling.classList.remove('active');
		this.clearBoard();
		this.renderColonyList(this.currentPlanet.colonyList);
	}

	private chooseColonyCallback = (e) => {
		this.clearBoard();
		this.clearHeader();

		this.currentColony = this.currentPlanet.colonyList[e.target.dataset.id];

		this.renderColonyHeader();
		this.renderFactoryList(this.currentColony.factoryList);

		const factoryCreate = document.getElementById('factoryCreate') as HTMLElement;
		factoryCreate.onsubmit = this.createFactoryCallback;
	}

	private renderColonyHeader() {
		this.colonyHeaderElement.colonyInfo = document.createElement('span');
		this.colonyHeaderElement.colonyInfo.append(`Колония: ${this.currentColony.name}`);

		this.colonyHeaderElement.createFactoryButton = document.createElement('a');
		this.colonyHeaderElement.createFactoryButton.classList.add('waves-effect');
		this.colonyHeaderElement.createFactoryButton.classList.add('waves-light');
		this.colonyHeaderElement.createFactoryButton.classList.add('btn');
		this.colonyHeaderElement.createFactoryButton.classList.add('grey-custom');
		this.colonyHeaderElement.createFactoryButton.classList.add('right');
		this.colonyHeaderElement.createFactoryButton.classList.add('modal-trigger');
		this.colonyHeaderElement.createFactoryButton.append('Создать фабрику');
		this.colonyHeaderElement.createFactoryButton.href = '#modal2';

		this.colonyHeaderElement.backColonyListButton = document.createElement('a');
		this.colonyHeaderElement.backColonyListButton.classList.add('waves-effect');
		this.colonyHeaderElement.backColonyListButton.classList.add('waves-light');
		this.colonyHeaderElement.backColonyListButton.classList.add('btn');
		this.colonyHeaderElement.backColonyListButton.classList.add('grey-custom');
		this.colonyHeaderElement.backColonyListButton.classList.add('right');
		this.colonyHeaderElement.backColonyListButton.append('К списку колоний');
		this.colonyHeaderElement.backColonyListButton.onclick = this.backColonyListCallback ;

		this.header.append(this.colonyHeaderElement.colonyInfo);
		this.header.append(this.colonyHeaderElement.createFactoryButton);
		this.header.append(this.colonyHeaderElement.backColonyListButton);
	}

	private renderFactoryList(factoryList: Factory[]) {
		if (factoryList.length) {
			this.renderResourceList();
			this.timer = setInterval(this.renderResourceList, 5000);

			const ul: HTMLUListElement = document.createElement('ul');
			ul.classList.add('collection');

			factoryList.forEach((factory, id) => {
				const span = document.createElement('span');
				span.append(`Фабрика: ${id + 1} Ресурс: ${factory.resource.type} Скорость добычи: ${factory.speed}`);
				span.dataset.id = id.toString();

				const i: HTMLElement = document.createElement('i');
				i.append('delete');
				i.classList.add('material-icons');
				i.classList.add('form-text');
				i.dataset.id = id.toString();
				i.onclick = this.deleteFactory;

				const li = document.createElement('li');
				li.append(span);
				li.append(i);
				li.classList.add('grey-custom');
				li.classList.add('collection-item');
				li.classList.add('grey');
				li.classList.add('darken-3');
				li.classList.add('valign-wrapper');
				li.classList.add('my-container');
				ul.append(li);
			});
			this.content.append(ul);
		}
	}

	private backColonyListCallback = () => {
		clearInterval(this.timer);
		this.clearBoard();
		this.clearHeader();
		this.currentColony = null;
		this.renderColonyList(this.currentPlanet.colonyList);
		this.renderPlanetHeader();
	}

	private deleteColumn = (e) => {
		this.currentPlanet.deleteColony(e.target.dataset.id);
		this.clearBoard();
		this.renderColonyList(this.currentPlanet.colonyList);
	}

	private createFactoryCallback = (e) => {
		e.preventDefault();
		this.currentColony.createFactory(e.target[0].value, e.target[1].value, e.target[2].value);
		e.target[0].value = '';
		e.target[1].value = '';
		e.target[2].value = '';
		e.target[0].nextElementSibling.classList.remove('active');
		e.target[1].nextElementSibling.classList.remove('active');
		e.target[2].nextElementSibling.classList.remove('active');
		this.clearBoard();
		this.renderFactoryList(this.currentColony.factoryList);
	}

	private renderResourceList = () => {
		const previosInfo: HTMLElement = document.getElementById('storageInfo') as HTMLElement;
		const resourceList = this.currentColony.storage.resourceList;
		if (resourceList.length) {
			const info = document.createElement('span');
			info.id = 'storageInfo';
			info.append(`В хранилище находится:`);
			resourceList.forEach((resource) => {
				info.append(`${resource.type}: ${resource.count} / ${resource.limit}  `);
			});
			if (previosInfo) {
				previosInfo.replaceWith(info);
			} else {
				this.content.append(info);
			}
		}
	}

	private deleteFactory = (e) => {
		this.currentColony.deleteFactory(e.target.dataset.id);
		this.clearBoard();
		this.renderFactoryList(this.currentColony.factoryList);
	}
}

new Space();
