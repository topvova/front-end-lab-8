'use strict';
let rootNode = document.getElementById("root");

// Your code goes here

//creates container for all items from structure array
//and parse each array element
function generateFolderTree(structure) {
    const container = new TreeItem().setClass('folder-root').getNode();
    //parsing each element from structure array
    structure.forEach(element => container.appendChild(parseStructure(element).getNode()));
    return container;
}

function parseStructure(element, margin = 0) {
    //check if current element is folder
    if (element['folder'] === true) {
        //if so, add it to container
        const folder = new TreeItem().setClass('folder')
            .setLeftMargin(margin).setIcon('folder').setText(element['title']);

        margin += 10;
        //check if this folder contains some sub items
        if (element['children']) {
            //if so, parse them and append to container
            element['children'].forEach(child => folder.addChild(parseStructure(child, margin)));
        } else {
            //if no, append `Folder is empty` to it
            folder.addChild(new TreeItem().setClass('empty').setLeftMargin(margin).setText('Folder is empty'));
        }
        return folder;

    } else {
        //if no, this is a file, so let's add it to container
        return new TreeItem().setClass('file').setIcon('insert_drive_file')
            .setLeftMargin(margin).setText(element['title']);
    }
}

rootNode.appendChild(generateFolderTree(structure));

// utility structure that simplifies creating and manipulating DOM nodes
function TreeItem(tagName = 'div') {

    this.tagName = tagName; //which DOM element to create
    this.children = []; // array of all direct children of current folder, for files it's empty
    this.isFolder = false;
    this.isOpened = false; //folder specific flag, used to choose between open/close folder functions

    const domElement = document.createElement(this.tagName); //underlying DOM element for TreeItem abstraction, every TreeItem has access to its own node

    //-------------------Builder methods to simplify creation of DOM object------------------
    //add list of classes to domElement
    this.setClass = (...classNames) => {
        this.isFolder = classNames.includes('folder');
        domElement.setAttribute('class', classNames.join(' '));
        return this;
    };
    //sets icon before folder/file name
    this.setIcon = (iconType = (() => { throw new Error("You must provide icon type") })()) => {
        const img = document.createElement('i');
        img.setAttribute('class', 'material-icons');
        img.textContent = iconType;
        domElement.insertBefore(img, domElement.firstChild);
        return this;
    };
    //the purpose of it is to mimic tree structure of all dom elements
    this.setLeftMargin = pad => {
        domElement.setAttribute('style', 'margin-left:' + pad + 'px;');
        return this;
    };
    //title for folder or file
    this.setText = text => {
        domElement.appendChild(document.createTextNode(text));
        return this;
    };

    //the only way to get access to underlying domElement
    this.getNode = () => domElement;

    //adds all direct successors into TreeItem
    this.addChild = (node) => {
        this.children.push(node);
        return this;
    };

    //----------------Folder specific methods----------------------------

    //show inner elements of particular folder.
    //If that folder has inner folder in opened state then content of latter folder will be displayed as well.
    this.open = () => {
        this.children.reverse().forEach((child) => {
            if (child.isFolder && child.isOpened) {
                this.getNode().parentNode.insertBefore(child.getNode(), this.getNode().nextSibling);
                child.open(this.getNode());
            } else {
                this.getNode().parentNode.insertBefore(child.getNode(), this.getNode().nextSibling);
            }
        });
    };
    //hides all content of folder despite of folder nesting
    this.close = () => {
        this.children.reverse().forEach(child => {
            if (child.isFolder && child.isOpened) {
                child.close();
            }
            this.getNode().parentNode.removeChild(child.getNode());
        });
    };

    //handling user clicks on folders
    domElement.addEventListener('click', () => {
        if (this.isFolder) {
            if (this.isOpened) {
                this.getNode().firstChild.textContent = 'folder';//change folder image
                this.close();
                this.isOpened = false;
            } else {
                this.getNode().firstChild.textContent = 'folder_open';//change folder image
                this.open();
                this.isOpened = true;
            }
        }
    });
}