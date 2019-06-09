var users = require("./models/user");
var faker = require("faker");
var Store = require("./models/store");
var Product = require("./models/product");

// Define a user
var newUser = new users({
  username: "cruzst",
  email: "cruzst@gmail.com",
  firstName: "steve",
  lastName: "cruz",
  profile_image: faker.image.avatar(),
  address: {
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: "199392"
  },
  isSeller: true
});

// create the seed function
function seedUsers() {
  users.find({ username: "cruzst" }, function(err, foundUser) {
    if (Object.keys(foundUser).length === 0) {
      users.register(newUser, "password", (err, user) => {
        if (err) {
          console.log(newUser + "Error while registering" + err);
          return;
        } else {
          var storename = "One Stop Fake Shop";
          var description =
            "This is a smaple store with products that were generated using faker.js! We're not real!";
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
            /* Create an array of tags for the product */
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
              store: "One Stop Fake Shop",
              tags: tagArray
            };

            Product.create(tempproduct, function(err, newProduct) {
              Store.findOneAndUpdate(
                { name: "One Stop Fake Shop" },
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

      console.log("Registered Steve");
    } else {
      console.log("User: Steve exists");
      return;
    }
  });
}
module.exports = seedUsers;
