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
        category: faker.commerce.product(),
        longDesc: faker.commerce.productDescription(),
        imgFile: images[Math.floor(Math.random() * images.length)]
    }
}



shouldSucceed = {
    singleObject: generateFakeObject(),
    multipleObjects: [
    ]
}

for(let index = 0; index < 100; index++) {
    shouldSucceed.multipleObjects.push(generateFakeObject());
}



module.exports = {shouldSucceed}