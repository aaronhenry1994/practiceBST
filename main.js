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
        console.log(right1, right2, right3, right4);

        if (right1 < right2) {
            dataHolder.right.left = new Node(right2)
            dataHolder.right.left.left = new Node(right1);
        };
        if (right1 > right2) {
            dataHolder.right.left = new Node(right1);
            dataHolder.right.left.left = new Node(right2);
        };
        if (right3 > right4) {
            dataHolder.right.right = new Node(right4);
            dataHolder.left.right.right = new Node(right3);
        };
        if (right3 < right4) {
            dataHolder.right.right = new Node(right3);
            dataHolder.right.right.right = new Node(right4);
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

        //If the value is found, return true
        if (current.data === value) {
            console.log(current.data, value);
            return true;
        };

        if (current.data != value) {
            //Searching the subtrees for value
        if (current.data > value) {
            return this.find(current.left, value)
        };
        if (current.data < value) {
            return this.find(current.right, value)
        };
        
        };
    };

    delete(root, value) {
        if (root === null) {
            console.log("Done");
            return root;
        }

        if (value < root.data) {
            console.log(root.data, value, 'Left');
            root.left = this.delete(root.left, value);
        } else if (value > root.data) {
            console.log(root.data, value, 'Right');
            root.right = this.delete(root.right, value);
        } else {
            console.log(root.data, value, 'Found it');
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            // Node with two children: Get the in-order successor (smallest in the right subtree)
            let minNode = this.findMin(root.right);
            root.data = minNode.data;

            // Delete the in-order successor
            root.right = this.delete(root.right, minNode.data);
        }

        return root;
    };

    findMin(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    levelOrder(callback) {
        function callback() {
            q.push(current.left);
            q.push(current.right);
        };

        let current = this.root;
        console.log(current);

        let q = [];
        console.log(q);
        q.push(current);

        callback();

        current = current.left;
        callback();
        current = this.root;
        current = current.right;
        callback();

        current = this.root;
        current = current.left.left;
        console.log(current);
        callback();
        current = this.root;
        current = current.right.right;
    };

    inOrder(callback) {

    };

    preOrder(callback) {

    };

    postOrder(callback) {

    }


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
console.log(tree.delete(tree.root, 6345));
console.log(tree.find(tree.root, 324));

tree.levelOrder();