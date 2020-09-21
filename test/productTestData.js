const faker = require('faker');

const images = [
    "hoodie-ash.9845e671.png",
    "hoodie-fire.b961747e.png",
    "hoodie-ocean.68b3445e.png",
    "skateboard-generic.10eb1082.png",
    "skateboard-greta.4821b55a.png",
    "wheel-rocket.a369221f.png",
    "wheel-spinner.4c4b7208.png",
    "wheel-wave.7ae85ee6.png"
]

function generateFakeObject() {
    return {
        title: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price()),
        shortDesc: faker.name.gender(),
        longDesc: faker.commerce.productDescription(),
        imgFile: images[Math.floor(Math.random() * images.length)],
        serial: String(faker.random.number())
    }
}

let shouldSucceed = {
    singleObject: generateFakeObject(),
    multipleObjects: [
    ]
}

let shouldFail = {
    missingTitle: {
        price: Math.ceil(faker.commerce.price()),
        shortDesc: faker.name.gender(),
        longDesc: faker.commerce.productDescription(),
        imgFile: images[Math.floor(Math.random() * images.length)]
    },
    missingPrice: {
        title: faker.commerce.productName(),
        shortDesc: faker.name.gender(),
        longDesc: faker.commerce.productDescription(),
        imgFile: images[Math.floor(Math.random() * images.length)]
    },
    missingShortDesc: {
        title: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price()),
        longDesc: faker.commerce.productDescription(),
        imgFile: images[Math.floor(Math.random() * images.length)]
    },
    missingLongDesc: {
        title: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price()),
        shortDesc: faker.name.gender(),
        imgFile: images[Math.floor(Math.random() * images.length)]
    },
    missingImgFile: {
        title: faker.commerce.productName(),
        price: Math.ceil(faker.commerce.price()),
        shortDesc: faker.name.gender(),
        longDesc: faker.commerce.productDescription(),
    }
}

for(let index = 0; index < 100; index++) {
    shouldSucceed.multipleObjects.push(generateFakeObject());
}

updateData = generateFakeObject()



module.exports = {shouldSucceed, shouldFail, updateData}