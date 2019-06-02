var users = require("./models/user");
var faker = require("faker");
var Store = require("./models/store");
var Product = require("./models/product");

var newUser = new users({
  username: "nievesr",
  email: "nievesr@gmail.com",
  firstName: "Dom",
  lastName: "Nieves",
  profile_image: faker.image.image(),
  address: {
    street: "123 Fake St",
    city: "Fake City",
    state: "NJ",
    zipcode: 12345
  },
  isSeller: true
});

function seedDom() {
  users.find({ username: "nievesr" }, function(err, foundUser) {
    if (Object.keys(foundUser).length === 0) {
      users.register(newUser, "password", (err, user) => {
        if (err) {
          console.log(newUser + "Error while registering" + err);
          return;
        } else {
          var storename = "DomStore";
          var description = "Desription for the store owned by Dom Nieves";
          var owner = {
            id: user._id,
            username: user.username
          };

          var newStore = {
            name: storename,
            description: description,
            owner: owner,
            image_path: faker.image.image()
          };

          Store.create(newStore, function(err, createdStore) {
            if (err) {
              console.log(err);
            } else {
              user.storesOwned.push(createdStore.name);
              user.save();
            }
          });

          // populate the store with products
          for (i = 0; i < 20; i++) {
            let tempproduct = {
              name: faker.commerce.productName(),
              description: faker.lorem.paragraphs(),
              image: faker.image.image(),
              Quantity: faker.random.number(),
              Price: faker.commerce.price(),
              Weight: faker.random.number(),
              NumberSold: 0,
              owner: owner,
              store: "DomStore"
            };

            Product.create(tempproduct, function(err, newProduct) {
              Store.findOneAndUpdate(
                { name: "DomStore" },
                { $addToSet: { products: newProduct } },
                { upsert: true, new: true },
                function(err, cb) {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            });
          }
        }
      });

      console.log("Registered Dom");
    } else {
      console.log("User: Dom exists");
      return;
    }
  });
}
module.exports = seedDom;
