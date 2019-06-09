var users = require("./models/user");
var faker = require("faker");

var newUser = new users({
  username: "tanm",
  email: "tanm@gmail.com",
  firstName: "Michelle",
  lastName: "Tan",
  profile_image: faker.image.avatar(),
  address: {
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: "19104"
  },
  isSeller: false
});

function seedMichelle() {
  users.find({ username: "tanm" }, function(err, foundUser) {
    if (Object.keys(foundUser).length === 0) {
      users.register(newUser, "password", (err, user) => {
        if (err) {
          console.log(user + "Error while registering" + err);
          return;
        } else {
          console.log("registered Michelle");
        }
      });
    } else {
      console.log("User: Michelle exists");
      return;
    }
  });
}
module.exports = seedMichelle;
