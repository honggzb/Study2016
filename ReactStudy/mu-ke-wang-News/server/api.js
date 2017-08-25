const ListAPI = {
  lists: [
    { de: 1, name: "Ben Blocker", position: "G" },
    { id: 2, name: "Dave Defender", position: "D" },
    { id: 3, name: "Sam Sweeper", position: "D" },
    { id: 4, name: "Matt Midfielder", position: "M" },
    { id: 5, name: "William Winger", position: "M" },
    { id: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.lists},
  get: function(id) {
    const isList = p => p.id === id;
    return this.lists.find(isList);
  }
}

export default ListAPI;
