'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order} = require('../server/db/models')

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
    price: 19.99,
    description: 'a handheld virtual pet'
  },
  {
    name: 'Kush Ball',
    imageUrl:
      'https://www.sensationalkids.ie/wp-content/uploads/2017/08/009398_3-1.jpg',
    price: 2.95,
    description:
      "It's the Koosh Ball - named for the sound it makes when it hits your hand."
  },
  {
    name: 'Furby',
    imageUrl:
      'https://apennyformychildishthoughts.files.wordpress.com/2012/03/furby.jpg',
    price: 33.95,
    description:
      'A newly purchased Furby starts out speaking entirely "Furbish", the unique language that all Furbies use, but is programmed to start using English words and phrases in place of Furbish over time.'
  }
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

  console.log(`seeded ${users.length} users and ${products.length} products`)
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
