import {AmazonProduct} from "../AmazonProduct.js";

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct('https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/')

// const product: any = await amazonProduct.getProduct('https://www.amazon.de/Philips-SH91-50-Ersatzscherk%C3%B6pfe-Rasierer/dp/B0937DT67K/')

// const product: any = await amazonProduct.getProduct('https://www.amazon.de/Pocket-Kinder-701-KXD-orange/dp/B08K2ZC3LH/')

// const product = await amazonProduct.getProduct('https://www.amazon.de/Ninebot-KickScooter-G30D-Powered-Segway/dp/B092DVQSML')

console.log(product)

process.exit(0)