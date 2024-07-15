# Amazon product scrapper

`npm i amazon-product-scrapper`

Simple to use and take a look at the examples
`src/examples`

// type: commonjs

```javascript
const {AmazonProduct} = require("amazon-product-scrapper");

const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```

// type: module

```typescript
import {AmazonProduct} from "amazon-product-scrapper";

const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```
