const faker = require('faker');
const casual = require('casual');
const fs = require('fs');
faker.setLocale('vi');

const cityList = [
  {
    code: 'hcm',
    name: 'Hồ Chí Minh',
  },
  {
    code: 'hn',
    name: 'Hà Nội',
  },
  {
    code: 'dn',
    name: 'Đà Nẵng',
  },
  {
    code: 'pt',
    name: 'Phan Thiết',
  },
];

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

const randomStudentList = (n) => {
  if (n <= 0) return [];

  return Object.keys([...Array(n)]).map(() => ({
    id: casual.uuid,
    name: casual.name,
    age: casual.integer(18, 27),
    mark: Number.parseFloat(casual.double(3, 10).toFixed(1)),
    gender: ['male', 'female'][casual.integer(1, 100) % 2],
    city: ['hcm', 'hn', 'dn', 'pt'][casual.integer(1, 100) % 5],
    createAt: Date.now(),
    updateAt: Date.now(),
  }));
};

(() => {
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 4);
  const studentList = randomStudentList(50);
  const db = {
    categories: categoryList,
    products: productList,
    students: studentList,
    cities: cityList,
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate success');
  });
})();
