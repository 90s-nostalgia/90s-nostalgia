'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
// const {Order} = require('../server/db/models')

const users = [
  {
    name: 'Jason',
    defaultShipping: 'Angel Grove, CA',
    defaultBilling: 'Angel Grove, CA',
    email: 'jason@powerrangers.com'
  },
  {
    name: 'Lisa Simpson',
    defaultShipping: 'Springfield',
    defaultBilling: 'Springfield',
    email: 'lisa@simpsons.com'
  },
  {
    name: 'Will Smith',
    defaultShipping: 'Bel Air, Los Angeles, CA',
    defaultBilling: 'Bel Air, Los Angeles, CA',
    email: 'will@priceofbelair.com'
  }
]

const products = [
  {
    name: 'Tamagotchi',
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_db777eca-8f58-4929-a40d-1314919fe36e?wid=488&hei=488&fmt=webp',
    price: 2000,
    description: 'a handheld virtual pet'
  },
  {
    name: 'Kush Ball',
    imageUrl:
      'https://www.sensationalkids.ie/wp-content/uploads/2017/08/009398_3-1.jpg',
    price: 295,
    description:
      "It's the Koosh Ball - named for the sound it makes when it hits your hand."
  },
  {
    name: 'Furby',
    imageUrl:
      'https://apennyformychildishthoughts.files.wordpress.com/2012/03/furby.jpg',
    price: 3395,
    description:
      'A newly purchased Furby starts out speaking entirely "Furbish", the unique language that all Furbies use, but is programmed to start using English words and phrases in place of Furbish over time.'
  },
  {
    name: 'Pogs',
    imageUrl:
      'https://i.etsystatic.com/17817890/r/il/cb66b0/1935801901/il_1588xN.1935801901_ni97.jpg',
    price: 200,
    description: 'POGs are the old-fashioned game of the future.'
  },
  {
    name: 'Beanie Babies',
    imageUrl: 'http://www.tycollector.com/beanies/bb-images/snort-4002.jpg',
    price: 500,
    description: 'Beans", making them "beanie".'
  },
  {
    name: 'Skip-It',
    imageUrl: 'https://i.redd.it/cnr85gneoue01.jpg',
    price: 2500,
    description: 'The very best thing of all, there’s a counter on this ball!'
  },
  {
    name: 'Moon Shoes',
    imageUrl:
      'https://images.lillianvernon.com/catalog/product/450x450/71364/71364_lv741.jpg',
    price: 4000,
    description: 'Pure fun. Anti-gravity bounce develops balance, agility.'
  },
  {
    name: 'Blockbuster Rewards Card',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Blockbuster_logo.svg',
    price: 2000,
    description: 'Never be without a movie.'
  },
  {
    name: 'Little Mermaid on VHS',
    imageUrl: 'https://usercontent2.hubstatic.com/8320065.jpg',
    price: 1995,
    description:
      'Somewhere under the sea and beyond your imagination is an adventure in fantasy.'
  }
]

const orders = [
  // {
  //   items: [1, 2, 2, 2, 3],
  //   orderShipping: 'Maryland',
  //   orderBilling: 'Maryland',
  //   fulfilled: true
  // },
  // {
  //   items: [3, 2],
  //   orderShipping: 'New Hampshire',
  //   orderBilling: 'Vermont',
  //   fulfilled: false
  // },
  // {
  //   items: [1],
  //   orderShipping: 'New Hampshire',
  //   orderBilling: 'Vermont',
  //   fulfilled: true
  //   // userId: 80
  // }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  // await Promise.all(
  //   orders.map(order => {
  //     return Order.create(order)
  //   })
  // )

  console.log(
    `seeded ${users.length} users, ${products.length} products, and ${
      orders.length
    } orders`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
