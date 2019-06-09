var users = require("./models/user");
var faker = require("faker");
var Store = require("./models/store");
var Product = require("./models/product");

var newUser = new users({
  username: "nievesr",
  email: "nievesr@gmail.com",
  firstName: "Dom",
  lastName: "Nieves",
  profile_image: faker.image.avatar(),
  address: {
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: "07033"
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
          var storename = "Coopers R Us";
          var description =
            "A store that was created using faker.js! You're one stop shop for goodes that don't exist!";
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
            let tagArray = [];
            for (let i = 0; i < 20; i++) {
              tagArray.push(faker.commerce.productAdjective());
            }
            let tempname = faker.commerce.productName();
            let nameArray = tempname.split(" ");
            tagArray.push(nameArray);

            let tempproduct = {
              name: tempname,
              description: faker.lorem.paragraphs(),
              image: faker.image.image(),
              Quantity: faker.random.number(),
              Price: faker.commerce.price(),
              Weight: faker.random.number(),
              NumberSold: 0,
              owner: owner,
              store: "Coopers R Us",
              tags: tagArray
            };

            Product.create(tempproduct, function(err, newProduct) {
              Store.findOneAndUpdate(
                { name: "Coopers R Us" },
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
