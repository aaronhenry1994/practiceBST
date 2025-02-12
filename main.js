class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

const sTArray = [1, 7, 4, 23, 8, 9, 67, 6345, 324];

function findMid(array) {
    const mid = array[Math.floor((array.length - 1) / 2)];

    let midI = array.indexOf(mid);
    array.splice(midI, 1);
    

    return mid;
};

function splitArray(array) {
    let leftSide = array.slice(0, 4);
    let rightSide = array.slice(4, 9);

    return { leftSide, rightSide };
};

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array);
    };

    buildTree(array) {
        array.sort((a, b) => a - b);

        const data = findMid(array);
        const dataHolder = new Node(data);
        this.root = dataHolder;

        let sides = splitArray(array);
        let leftSide = sides.leftSide;
        console.log(leftSide);
        let rightSide = sides.rightSide;

            const lData = findMid(leftSide);
            const lDataHolder = new Node(lData);
            console.log(lDataHolder);

            const rData = findMid(rightSide);
            const rDataHolder = new Node(rData);
            console.log(rDataHolder);

            const lData2 = findMid(leftSide);
            const lData2Holder = new Node(lData2);

            const rData2 = findMid(rightSide);
            const rData2Holder = new Node(rData2);

            dataHolder.left = lDataHolder;
            dataHolder.right = rDataHolder;

            dataHolder.left.left = lData2Holder;

            dataHolder.right.right = rData2Holder;

            const finalTwo = (array) => {
                let lowerNum = array[0];
                let higherNum = array[1];

                return { lowerNum, higherNum };
            };

            let lSide = finalTwo(leftSide);
            let rSide = finalTwo(rightSide);

            const lowerLData = new Node(lSide.lowerNum);
            const higherLData = new Node(lSide.higherNum);

            const lowerRData = new Node(rSide.lowerNum);
            const higherRData = new Node(rSide.higherNum);

            dataHolder.left.left.left = lowerLData;
            dataHolder.left.left.right = higherLData;

            dataHolder.right.right.left = lowerRData;
            dataHolder.right.right.right = higherRData

            return dataHolder;
        
    };

    inOrderTraversal(node) {
        if (node) {
            inOrderTraversal(node.left); //Traverses left subtree.
            console.log(node.data);
            inOrderTraversal(node.right); //Traverse right subtree.
        }
    };

    insert(root, data) {
        const newNode = new Node(data);

        if (this.root == null) {
            return this.root = newNode;
        };

        let current = root;
        console.log(current);
        console.log(data);
        console.log(current.left, current.right);

        if (current == null) {
            this.insert(root, data);
        }
        if (current.data < data) {
            current = current.left;
            if (current.left == null) {
                console.log(current, '1')
                current.left = newNode;
                return root;
            };
            console.log(current, '2');
            this.insert(current, data);
        };
        if (current.data > data) {
            current = current.right;
            if (current.right == null) {
                console.log(current, '3');
                current.right = newNode;
                return root;
            };
            console.log(current, '4');
            this.insert(current, data);
        };
        return root;
    };

    delete(root, value) {
        let current = root;
        console.log(current.data, 'Delete method');

        //Go left to find the value (current < value)
        if (current.data === value) {
            current.data = null;
            if (current.left !== null) {
                current.data = current.left;
            };
            if (current.right !== null) {
                current.data = current.right;
            }
        }
        if (current.data < value) {
            this.delete(current.left, value);
        };
        if (current.data > value) {
            this.delete(current.right, value)
        };
        

        //Go right to find the value

        return root;
    };

    };

let tree = new Tree(sTArray);

function inOrderTraversal(node) {
    if (node) {
        inOrderTraversal(node.left); //Traverses left subtree.
        console.log(node.data);
        inOrderTraversal(node.right); //Traverse right subtree.
    }
};

console.log(tree.root, 'Right here');
console.log(tree.insert(tree.root, 5));
console.log(tree.root, 'And here');
console.log(tree.insert(tree.root, 20), 'Hello');
console.log(tree.root);
console.log(tree.delete(tree.root, 1));