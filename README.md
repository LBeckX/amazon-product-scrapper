# Amazon product scrapper

`$ npm i amazon-product-scrapper`

Simple to use and take a look at the examples `src/examples`

## Load Products

#### How to use in commonjs

```javascript
const {AmazonProduct} = require("amazon-product-scrapper");

const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```

#### How to use in module

```typescript
import {AmazonProduct} from "amazon-product-scrapper";

const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```

## Search for products

```javascript
const {AmazonSearch} = require("amazon-product-scrapper");

const amazonSearch = new AmazonSearch('https://www.amazon.de/')

const response = await amazonSearch.search('nintendo')

console.log(response)
```

#### How to use in module

```typescript
import {AmazonSearch} from "amazon-product-scrapper";

const amazonSearch = new AmazonSearch('https://www.amazon.de/')

const response = await amazonSearch.search('nintendo')

console.log(response)
```
