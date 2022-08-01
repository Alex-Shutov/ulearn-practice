const {getAllFilePathsWithExtension, readFile, getFileName} = require('./fileSystem');
const {readLine} = require('./console');

const TODO_PREFIX = '\/\/ TODO ';

const handlerFromCommand = {
    'exit': handleExit,
    'show': handleShow,
    'important': handleImportant,
    'user': handleUser,
    'sort': handleSort,
    'date': handleDate,
};


const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);


function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => {
        return {name: getFileName(path), content: readFile(path)}
    });
}

function processCommand(commandLine) {
    const [command, ...args] = commandLine.split(' ');
    const handler = handlerFromCommand[command];
    if (handler) {
        handler(args);
    } else {
        console.log('wrong command');
    }
}

function handleExit() {
    process.exit(0);
}

function handleShow() {
    showTodos(readAllTodos());
}

function handleImportant() {
    showTodos(readAllTodos()
        .filter(todo => todo.importance > 0));
}

function handleUser(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return;
    }
    const user = args[0].trim().toUpperCase();
    showTodos(readAllTodos()
        .filter(todo => todo.user && todo.user.toUpperCase() === user));
}

function handleSort(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return;
    }

    const compare = getCompare(args[0].trim());
    if (!compare) {
        console.log('wrong arguments');
        return;
    }

    showTodos(readAllTodos().sort(compare));
}

function handleDate(args) {
    if (!args[0]) {
        console.log('wrong arguments');
        return;
    }

    const minDate = new Date(args[0]);
    if (isNaN(minDate.getTime())) {
        console.log('wrong arguments');
        return;
    }
    showTodos(readAllTodos()
        .filter(todo => todo.date >= minDate));
}

function readAllTodos() {
    const todos = [];
    for (const file of files) {
        for (const line of file.content.split('\n')) {
            const todoIndex = line.indexOf(TODO_PREFIX);
            if (todoIndex >= 0) {
                const todoString = line.substr(todoIndex + TODO_PREFIX.length);
                const todo = parseTodo(file.name, todoString);
                todos.push(todo);
            }
        }
    }
    return todos;
}

function parseTodo(fileName, todoString) {
    const parts = todoString.split(';');

    let user = '';
    let date = null;
    let comment = '';
    if (parts.length >= 3) {
        user = parts[0].trim();
        const datePart = parts[1].trim();
        if (datePart.length > 0) {
            date = new Date(datePart);
        }
        comment = parts.slice(2).join(';').trim();
    } else if (parts.length === 2) {
        user = parts[0].trim();
        comment = parts.slice(1).join(';').trim();
    } else {
        comment = parts[0].trim();
    }
    const importance = getImportance(comment);

    return {comment, importance, user, date, fileName};
}

function getImportance(comment) {
    if (!comment.includes('!'))
        return 0;

    let result = 0;
    for (let i = 0; i < comment.length; i++) {
        if (comment[i] === '!') {
            result++;
        }
    }
    return result;
}

function showTodos(todos) {
    const rows = [];
    const header = ['!', 'user', 'date', 'file', 'comment'];
    rows.push(header);
    for (const todo of todos) {
        rows.push(buildRow(todo));
    }

    const colMaxSizes = [1, 10, 10, 20, 50];
    const colSizes = colMaxSizes.map((max, col) =>
        Math.min(max, getMax(rows.map(row => row[col].length))));
    const rowSize = colSizes.reduce((a, b) => a + b)
        + 3 + 5*(colSizes.length - 1) + 3;

    showRow(rows[0], colSizes);
    console.log('-'.repeat(rowSize));
    for(let i = 1; i < rows.length; i++) {
        showRow(rows[i], colSizes);
    }
    console.log('-'.repeat(rowSize));
}

function buildRow(todo) {
    return [
        todo.importance > 0 ? '!' : ' ',
        todo.user || '',
        (todo.date && formatDate(todo.date)) || '',
        todo.fileName || '',
        todo.comment || '',
    ];
}

function showRow(values, sizes) {
    const cells = values.map((value, i) => formatValue(value, sizes[i]));
    const row = '|  ' + cells.join('  |  ') + '  |';
    console.log(row);
}

function formatValue(value, maxLength) {
    if (value.length <= maxLength) {
        return value.padEnd(maxLength);
    }
    if (maxLength <= 3) {
        return value.substr(0, maxLength);
    }
    return value.substr(0, maxLength - 3) + '...';
}

function formatDate(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function getCompare(compareName) {
    switch (compareName) {
        case 'importance':
            return (a, b) => compareNumbersDescending(a.importance, b.importance);
        case 'user':
            return (a, b) => compareStrings(a.user, b.user);
        case 'date':
            return (a, b) => compareDatesDescending(a.date, b.date);
    }
    return null;
}

function compareStrings(a, b) {
    if (!a && !b) {
        return 0;
    }
    if (!a) {
        return 1;
    }
    if (!b) {
        return -1;
    }
    return a.toUpperCase().localeCompare(b.toUpperCase());
}

function compareDatesDescending(a, b) {
    if (!a && !b) {
        return 0;
    }
    if (!a) {
        return 1;
    }
    if (!b) {
        return -1;
    }
    return compareNumbersDescending(a.getTime(), b.getTime());
}

function compareNumbersDescending(a, b) {
    return a === b ? 0 : b - a;
}

function getMax(numbers) {
    return Math.max.apply(null, numbers);
}

// TODO you can do it!
