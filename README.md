# Amazon product scrapper

`$ npm i amazon-product-scrapper`

Simple to use and take a look at the examples `src/examples`

## Load Products

```typescript
import {AmazonProduct} from "amazon-product-scrapper";

// For commonjs
// const {AmazonProduct} = require("amazon-product-scrapper");

const url = 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/'

const amazonProduct = new AmazonProduct()

const product = await amazonProduct.getProduct(url)

console.log(product)
```

Example Response

```typescript
const product = {
    image: 'https://m.media-amazon.com/images/I/41fL86WwqeL._SY300_SX300_QL70_ML2_.jpg',
    images: [
        'https://m.media-amazon.com/images/I/71518kysQyL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/6100go3AN0L._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61Fx0wVu7rL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61fvHA2dtbL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61cgQSaN7cL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61zwnZz1JML._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61SCXvgBRVL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61mIv1BJNaL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71AcU22TODL._SL1500_.jpg'
    ],
    title: 'Nintendo Switch-Konsole Neon-Rot/Neon-Blau',
    titles: ['Nintendo Switch-Konsole Neon-Rot/Neon-Blau'],
    link: 'https://www.amazon.de/Nintendo-Switch-Konsole-Neon-Rot-Neon-Blau/dp/B0BHDDH5W1/',
    price: {
        amount: '279,00€',
        discountPercent: '-3%',
        currency: '€',
        basisPrice: '288,00€'
    },
    rating: {
        classes: 'a-icon a-icon-star a-star-4-5 cm-cr-review-stars-spacing-big',
        description: '4,7 von 5 Sternen',
        amount: '4.552 Sternebewertungen'
    },
    overview: {
        table: [[String]],
        bullets: [String]
    },
    details: {
        features: [String],
        tables: [[[String]]]
    },
    reviews: {
        top: [
            [Object]
        ]
    }
}
```

---

## Search for products

```typescript
import {AmazonSearch} from "amazon-product-scrapper";

// For commonjs
// const {AmazonSearch} = require("amazon-product-scrapper");

const amazonSearch = new AmazonSearch('https://www.amazon.de/')

const response = await amazonSearch.search('nintendo')

console.log(response)
```

Example response

```typescript
const response = {
    products: [
        {
            image: 'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY218_.jpg',
            images: [
                'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY218_.jpg',
                'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY327_QL65_.jpg',
                'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY436_QL65_.jpg',
                'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY545_QL65_.jpg',
                'https://m.media-amazon.com/images/I/714mELI+eGL._AC_UY654_QL65_.jpg'
            ],
            title: 'Nintendo Switch Konsole - Grau',
            titles: [ 'Nintendo Switch Konsole - Grau' ],
            link: 'https://www.amazon.de/Nintendo-Switch-Konsole-Grau-2019/dp/B07W13KJZC/ref=sr_1_37',
            price: { amount: '', basisPrice: '', currency: '' },
            rating: {
                classes: 'a-icon a-icon-star-small a-star-small-5 aok-align-bottom',
                amount: '15.828',
                description: '4,8 von 5 Sternen'
            }
        },
        ...
    ],
    page: 2,
    pages: 20,
    url: 'https://www.amazon.de/s?k=nintendo&page=2'
}
```