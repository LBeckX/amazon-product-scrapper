import {AmazonProduct} from "../AmazonProduct.js";

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct('https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/')

console.log(product?.asin)

process.exit(0)