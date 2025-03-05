class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};

const sTArray = [1, 7, 4, 23, 8, 9, 4, 2, 5, 7, 9, 67, 6345, 324];

function findMid(array) {
    const mid = array[Math.floor((array.length - 1) / 2)];

    let midI = array.indexOf(mid);
    array.splice(midI, 1);
    

    return mid;
};

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array);
    };

    buildTree(array) {
        array.sort((a, b) => a - b);

        const uniqueArray = [...new Set(array)];
        console.log(uniqueArray);
        array = uniqueArray;
        console.log(array);

        const data = findMid(array);
        const dataHolder = new Node(data);
        console.log(dataHolder, 'new Tree');

        //Need to turn all below code into a method or loop that runs through array
        //until empty
        //If I set up the BST sequentually, it will make searching it easier
        console.log(array);

        //Split the "sides" of the array to make it easier to determine the spread of the BST
        //Make loops to set up each side.

        let leftSide = array.splice(0, 5);
        let rightSide = array;
    
        console.log(leftSide);
        console.log(rightSide);
        console.log(dataHolder);

        let left0 = findMid(leftSide);
        let right0 = findMid(rightSide)

        dataHolder.left = new Node(left0)
        dataHolder.right = new Node(right0);
        console.log(dataHolder);
        console.log(leftSide, rightSide);

        let leftLeft = leftSide.splice(0, 2);
        console.log(leftLeft, leftSide);
        let left1 = leftLeft[0];
        let left2 = leftLeft[1];
        let left3 = leftSide[0];
        let left4 = leftSide[1];
        console.log(left3, left4);

        if (left1 < left2) {
            dataHolder.left.left = new Node(left2)
            dataHolder.left.left.left = new Node(left1);
        };
        if (left1 > left2) {
            dataHolder.left.left = new Node(left1);
            dataHolder.left.left.left = new Node(left2);
        };
        if (left3 > left4) {
            dataHolder.left.right = new Node(left3);
            dataHolder.left.right.right = new Node(left4);
        };
        if (left3 < left4) {
            dataHolder.left.right = new Node(left4);
            dataHolder.left.right.right = new Node(left3);
        };
        
        let rightLeft = array.splice(0, 2);
        console.log(rightLeft, rightSide);
        let right1 = rightLeft[0];
        let right2 = rightLeft[1];
        let right3 = rightSide[0];
        let right4 = rightSide[1];

        if (right1 < right2) {
            dataHolder.right.left = new Node(right2)
            dataHolder.right.left.left = new Node(right1);
        };
        if (right1 > right2) {
            dataHolder.right.left = new Node(right1);
            dataHolder.right.left.left = new Node(right2);
        };
        if (right3 > right4) {
            dataHolder.right.right = new Node(right3);
            dataHolder.left.right.right = new Node(right4);
        };
        if (right3 < right4) {
            dataHolder.right.right = new Node(right4);
            dataHolder.right.right.right = new Node(right3);
        };

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

        if (current == null) {
            this.insert(root, data);
        };

        if (current.data > data) {
            console.log(current.data, data);
            console.log('left');
            if (current.left != null) {
                current = current.left;
            };
            if (current.left == null) {
                if (current.data === data) {
                    return root;
                };
                current.left = newNode;
                return root;
            };
            this.insert(current, data);
        };
        if (current.data < data) {
            console.log(current.data, data);
            console.log('right');
            console.log(current, current.right, newNode);
            if (current.right != null) {
                current = current.right;
            };
            if (current.right == null) {
                if (current.data === data) {
                    return root;
                };
                current.right = newNode;
                console.log(current.right, current, newNode);
                return root;
            };
            this.insert(current, data);
        };
        
        return root;
    };

    find(root, value) {
        let current = root;
        console.log(current.data);
        console.log(current.left);
        console.log(current.right); 

        //Easy exits out of the method if anything is found
        if (current.data === null) {
            return root
        };
        if (current.left.data === value) {
            current = current.left;
            console.log(current.data);
            if (current.left.data === null) {
                this.find(root, value);
            };
            return current.data
        };
        if (current.right.data === value) {
            current.data = current.right;
            console.log(current.data);
            if (current.right.data === null) {
                this.find(root, value);
            }
            return current.data
        };
        if (current.data === value) {
            console.log(current.data, value);
            return current.data
        };

        //Searching the subtrees for value
        if (current.data < value) {
            this.find(current.left, value)
        };
        if (current.data > value) {
            this.find(current.right, value)
        };
        return {current, value}
    };

    delete(root, value) {
        let current = root;

        if (current.data === value) {
            console.log(current.data, value);
            current = null;
            console.log(current.data, value);
            if (current.left != null) {
                current = current.left;
            };
            if (current.right != null) {
                current = current.left;
            };
            return root;
        };
        if (current.data > value) {
            console.log(current.data, value);
            console.log(current.left);
            this.delete(current.left, value);
        };
        if (current.data < value) {
            console.log(current.data, value);
            console.log(current.right);
            this.delete(current.right, value);
        };
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
console.log(tree.insert(tree.root, 20));
console.log(tree.insert(tree.root, 3));

console.log(tree.root);
console.log(tree.find(tree.root, 4));
console.log(tree.delete(tree.root, 20));