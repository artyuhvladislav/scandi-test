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
                        symbol
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

export const getProductItemQuery = (id: string) => (`
    query {
        product(id: "${id}") {
            name
            inStock
            gallery
            description
            attributes {
                name
                items {
                    value
                }
            }
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            brand
        }
    }
`);


