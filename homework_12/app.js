'use strict';

class Title {
    constructor(title) {
        const node = document.createElement('h1');
        node.classList.add('title-bar');
        node.innerHTML = title;
        this.node = node;
    }

    set title(title) {
        this.node.innerHTML = title;
    }
}

class Tank {
    constructor(data) {
        this.data = data;
        this.details = () => new TankDetails(data);

        const template = `
            <figure>
                <img src="${data.preview}" alt="${data.model}" title="${data.model.toUpperCase()}"/>
                <figcaption><img src="${data.country_image}" alt="${data.country}" title="${data.country}"/>
                <span class="level">${data.level}</span> ${data.model}</figcaption>
            </figure>
        `;

        const node = document.createElement('div');
        node.innerHTML = template;
        node.classList.add('tank-item');

        this.node = node;
        this.node.addEventListener('click', (e) => {
            window.location.href = `${document.location.pathname}#${this.data.model.split(' ').join('-')}`;
        });
    }

}

class TankDetails {
    constructor(tankData) {
        console.log('init tankdetails')
        let table = '';

        Object.keys(tankData.details).forEach((detail) => {
            table += `<tr><td>${detail}</td><td>${tankData.details[detail]}</td><tr>`
        });

        const template = `
            <div>
                <h2>Preview</h2>
                <img src="${tankData.preview}" alt="${tankData.model}" title="${tankData.model}" />
            </div>
            <div>
                <h2>Characteristic</h2>
                <table>
                ${table}
                </table>
            </div>
        `;

        const node = document.createElement('div');
        node.innerHTML = template;
        node.classList.add('tank-details');

        const backToList = document.createElement('div');
        backToList.textContent = 'Back to list view';
        backToList.classList.add('back');
        backToList.addEventListener('click', () => window.location.href = `${document.location.pathname}#thumbnails`);

        node.appendChild(backToList);
        this.node = node;
    }
}

class TankList {
    constructor(tankArray) {
        this.tanks = tankArray.map((t) => {
            return new Tank(t);
        });

        const tankListContainer = document.createElement('div');
        this.tanks.forEach((elem) => {
            tankListContainer.appendChild(elem.node)
        });
        this.node = tankListContainer;
    }
}

const App = {
    routes: {
        'thumbnails': 'thumbnails'
    },

    thumbnails: function () {
        this.title.title = 'Most popular tanks';
        this.root.appendChild(this.list.node);
    },

    handle: function () {
        if (this.root.lastChild && this.root.lastChild.className != 'title-bar') {
            this.root.removeChild(this.root.lastChild);
        }
        const route = this.routes[document.location.hash.substring(1)];

        if (route) {
            this[route]();
        }
    },

    init: function () {
        this.root = document.getElementById('root');
        this.list = new TankList(tanks);
        this.list.tanks.forEach(t => {
            const tankHash = t.data.model.split(' ').join('-');
            this.routes[tankHash] = tankHash;
            this[tankHash] = function () {
                this.title.title = `<span><img src="${t.data.country_image}" alt="${t.data.country}" title="${t.data.country}"/>${t.data.model.toUpperCase()} (level ${t.data.level})</span>`;
                this.root.appendChild(t.details().node)
            }.bind(this);
        });
        this.title = new Title('');
        this.root.appendChild(this.title.node);
        window.addEventListener('hashchange', () => App.handle());
        window.addEventListener('load', () => App.handle());
    }
};

App.init();
