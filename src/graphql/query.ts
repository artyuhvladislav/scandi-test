export const getProductQuery = (category: string) => (`
    query {
        category(input: { title: "${category}"}) {
            name
            products {
                id,
                gallery,
                inStock
                brand
                name
                prices {
                    amount
                    currency {
                        label
                    }
                }
            }
        }
    }
`);

export const getCurrencyQuery = `
    query {
        currencies {
            symbol
            label
        }
    }
`;

export const getCategoryQuery = `
    query {
        categories {
        name
        }
    }
`;


