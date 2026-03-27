'use strict'

function buildPeopleGraph () {
  const people = []

  function createPerson (name, age) {
    return {
      name,
      age,
      friends: [],
      parents: [],
      children: []
    }
  }

  // Populate the array with people
  people.push(createPerson('John', 50))
  people.push(createPerson('Jane', 48))
  people.push(createPerson('Mike', 28))
  people.push(createPerson('Sara', 26))
  people.push(createPerson('Tom', 30))
  people.push(createPerson('Lily', 27))
  people.push(createPerson('Emily', 5))
  people.push(createPerson('Jack', 3))
  people.push(createPerson('Alice', 65))
  people.push(createPerson('Bob', 66))

  // Define relationships

  // John and Jane are parents of Mike and Sara
  people[0].children.push(people[2], people[3]) // John's children
  people[1].children.push(people[2], people[3]) // Jane's children
  people[2].parents.push(people[0], people[1]) // Mike's parents
  people[3].parents.push(people[0], people[1]) // Sara's parents

  // Tom and Lily are parents of Emily and Jack
  people[4].children.push(people[6], people[7]) // Tom's children
  people[5].children.push(people[6], people[7]) // Lily's children
  people[6].parents.push(people[4], people[5]) // Emily's parents
  people[7].parents.push(people[4], people[5]) // Jack's parents

  // Alice and Bob are John's and Jane's parents (grandparents)
  people[0].parents.push(people[8], people[9]) // John's parents
  people[1].parents.push(people[8], people[9]) // Jane's parents
  people[8].children.push(people[0], people[1]) // Alice's children
  people[9].children.push(people[0], people[1]) // Bob's children

  // Add friends relationships (mutual circular relationships)
  people[2].friends.push(people[4]) // Mike and Tom are friends
  people[4].friends.push(people[2])

  people[3].friends.push(people[5]) // Sara and Lily are friends
  people[5].friends.push(people[3])

  people[0].friends.push(people[9]) // John and Bob (his father) are friends
  people[9].friends.push(people[0])

  people[1].friends.push(people[8]) // Jane and Alice (her mother) are friends
  people[8].friends.push(people[1])

  return people
}

module.exports = buildPeopleGraph()
