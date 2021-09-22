const faker = require('faker');
const fs = require('fs');

faker.setLocale('vi');

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  return Object.keys([...Array(n)]).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    createAt: Date.now(),
    updateAt: Date.now(),
  }));
};

const randomProductList = (categoryList, numbersOfProduct) => {
  if (numbersOfProduct <= 0) return [];

  let productList = [];

  for (const category of categoryList) {
    let products = Object.keys([...Array(numbersOfProduct)]).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      color: faker.commerce.color(),
      price: +faker.commerce.price(),
      description: faker.commerce.productDescription(),
      thumbnailUrl: faker.image.imageUrl(400, 400),
      categoryId: category.id,
      createAt: Date.now(),
      updateAt: Date.now(),
    }));
    productList = [...productList, ...products];
  }
  return productList;
};

(() => {
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 4);
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Po',
    },
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate success');
  });
})();
