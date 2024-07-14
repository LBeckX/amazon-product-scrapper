# Amazon product scrapper

`npm i amazon-product-scrapper`

Simple to use and take a look at the examples
`src/examples`

```typescript
const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```
