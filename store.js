class Good {

    constructor(id, name, description, sizes, price, available){
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable(new_available) {
        this.available = new_available
        return this
    }
}



class GoodsList {

    #goods
    constructor(filter, sortPrice, sortDir){
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        const filteredList = this.#goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice) {
            return filteredList
        }
        if (this.sortDir) {           
            return filteredList.sort((a, b) => a.price - b.price)
        } else if (!this.sortDir) {
            return filteredList.sort((a, b) => b.price - a.price)
        }
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        const ind = this.#goods.findIndex(good => good.id == id)
        if (ind != undefined) {
            this.#goods.splice(ind, 1)
        }
    }
}
const list = new GoodsList()


const jacket = new Good(1, 'Jacket', '63% Cotton, 37% Polyester', ['m', 'l'], 70, true)
const sweatshirt = new Good(2, 'Sweatshirt', '50% Cotton, 50% Polyester', ['m'], 25, true)
const hoodie = new Good(3, 'Hoodie', 'Comfy Material', ['s', 'm'], 15, true)
const hat = new Good(4, 'Hat', 'convenient cap', ['m'], 40, true)
const beach_shirt = new Good(5, 'Beach Shirts', 'The Hawaiian Shirts Unisex', ['s', 'm', 'l', 'xl'], 26, true)
const fleece_jacket = new Good(6, 'Fleece Jacket', '100% Polyester', ['l', 'xl'], 80, true)

const catalog = new GoodsList(/Jacket/gi, true, true)

jacket.setAvailable(false)

catalog.add(jacket)
catalog.add(sweatshirt)
catalog.add(hoodie)
catalog.add(hat)
catalog.add(beach_shirt)
catalog.add(fleece_jacket)

catalog.remove(1)

// console.log(catalog.list)

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }
    get totalAmount() {
        return this.goods.map(good => good.amount).reduce((a, b) => a + b, 0)
    }
    get totalSum() {
        return this.goods.reduce((a, b) => a + b.price * b.amount, 0)
    }

    add(good, amount) {
        const ind = this.goods.findIndex(product => product.id == good.id)
        if (ind >= 0) {
            this.goods[ind].amount += amount
            good.amount = amount;
        } else {
            let newGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount)
            this.goods.push(newGood)
        } 
    }

    remove(good, amount) {
        const ind = this.goods.findIndex(product => product.id == good.id)
        if (ind >= 0) {
            if (this.goods[ind].amount - amount <= 0) {
                this.goods.splice(ind, 1)
            } else {
                this.goods[ind].amount -= amount
            }
        }
    }

    clear() {
        this.goods.splice(0, this.goods.length)
    }

    removeUnavailable() {
        return this.goods.filter(good => good.available == true)
    }
}

const basket = new Basket()

basket.add(jacket, 3)
basket.add(hoodie, 2)
basket.add(hat, 5)


// console.log(basket.totalAmount)
// console.log(basket.totalSum)

// basket.remove(jacket, 2)
// basket.remove(hat, 6)

// basket.clear()

// console.log(basket.goods)


console.log(basket.removeUnavailable())
