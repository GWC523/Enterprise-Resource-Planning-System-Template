import { faker } from "@faker-js/faker";

export function createRandomCustomer() {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName().toString(),
    address: faker.address.cityName().toString(),
    branch: "Sample Co. - " + faker.address.cityName().toString(),
    registeredOn: faker.date.past().toDateString(),
  };
}

export const getCustomerDummies = (num) => {
  let customers = []
  for (let i = 0; i < num; i++) {
    customers.push(createRandomCustomer())
  }

  return customers
} 

