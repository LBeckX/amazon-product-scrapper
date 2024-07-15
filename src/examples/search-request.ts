import {AmazonSearch} from "../AmazonSearch.js";

const amazonSearch = new AmazonSearch(new URL('https://www.amazon.de/'))

// Go to page 2
amazonSearch.page = 2

const response = await amazonSearch.search('nintendo')

console.log(response)
