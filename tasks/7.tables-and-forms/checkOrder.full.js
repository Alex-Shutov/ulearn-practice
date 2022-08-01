const registeredOrders = [];
const fields = ['petType', 'gender', 'eyeColor', 'tailLength', 'name', 'dateOfBirth', 'email', 'phone', 'rules'];
const petTypes = ['cat', 'dog', 'tiger'];
const genders = ['boy', 'girl', 'none'];

function constructPageBody(req) {
    const missingFields = checkAllFields(req);
    let pageBody = '';

    if (missingFields.length) {
        pageBody = '<h3 class="error">В запросе нет обязательных полей:</h3><ul>';
        pageBody += missingFields.map(field => `<li>${field}</li>`).join('');
        pageBody += '</ul>';
    } else {
        const checkTypes = checkFieldTypes(req);

        if (checkTypes === true) {
            registeredOrders.push(req);
            pageBody =
                `
<h3>Ваш заказ добавлен!</h3>
<table class="orders">
<tr>
<th>Тип животного</th>
<th>Пол</th>
<th>Цвет глаз</th>
<th>Длина хвоста</th>
<th>Имя хозяина</th>
<th>Дата рождения</th>
<th>email</th>
<th>Телефон</th>
</tr>
`;
            pageBody += registeredOrders.map(order => `<tr>${fields
                .filter(field => field !== 'rules')
                .map(field => `<td>${order[field]}</td>`).join('')}</tr>`).join('');
            pageBody += '</table>'
        } else {
            pageBody = `<h3 class="error">Неверный тип данных</h3><p>${checkTypes}</p>`
        }

    }

    return pageBody;
}

function checkAllFields(req) {
    const missingFields = [];

    for (const field of fields) {
        if (!(field in req)) {
            missingFields.push(field);
        }
    }

    return missingFields;
}



function checkFieldTypes(req) {
    if (!petTypes.includes(req.petType)) {
        return `petType должен иметь значение ${petTypes.join(' или ')}`
    }
    if (!genders.includes(req.gender)) {
        return `gender должен иметь значение ${genders.join(' или ')}`
    }
    if (!/^#[0-9a-f]{3}(?:[0-9a-f]{3}$)?/i.test(req.eyeColor)) {
        return `eyeColor должен быть цветом в шестнадцатеричной системе счисления`
    }
    if (!/^\d+$/.test(req.tailLength)) {
        return `tailLength должен содержать только цифры`
    }
    if (!(req.tailLength >= 7 && req.tailLength <= 120)) {
        return `tailLength должен быть от 7 до 120`
    }
    if (!(req.name.length >= 3 && req.name.length <= 50)) {
        return `name должно содержать от 3 до 50 символов`
    }
    if (!/^[0-9./-]+$/.test(req.dateOfBirth)) {
        return `dateOfBirth должен быть датой`
    }
    if (!/.@./.test(req.email)) {
        return `невалидный email`
    }
    if (!req.phone.length) {
        return `поле phone обязательно для заполнения`
    }
    if (req.rules !== 'true') {
        return `поле rules должно быть равно "true"`
    }


    return true;
}

module.exports = constructPageBody;