// Class declarations
class Room {
    constructor(name, img) {
        this._name = name;
        this._roomImage = img;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
        this._inventory = [];
    }

    get name() {
        return this._name;
    }

    get roomImage() {
        return this._roomImage;
    }

    get description() {
        return this._description;
    }

    get character() {
        return this._character;
    }

    get inventory() {
        return this._inventory;
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("description is too short.");
            return;
        }
        this._description = value;
    }

    set character(value) {
        this._character = value;
    }

    describe() {
        return "As you look around the " + this._name + " you can see " + this._description;
    }

    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink;
    }

    getDetails() {
        const entries = Object.entries(this._linkedRooms);
        let details = [];
        for (const [direction, room] of entries) {
            let text = " The " + room._name + " is to the " + direction;
            details.push(text);
        }
        return details;
    }

    move(direction) {
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            alert("You can't go that way");
            alert(this._name);
            return this;
        }
    }
}

class Character {
    constructor(name) {
        (this._name = name), (this._description = "");
        this._conversation = "";
    }
    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._description = value;
    }

    set conversation(value) {
        if (value.length < 4) {
            alert("conversation is too short.");
            return;
        }
        this._conversation = value;
    }
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get conversation() {
        return this._conversation;
    }

    describe() {
        return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }

    converse() {
        return this._name + " says " + "'" + this._conversation + "'";
    }
}

class Item {
    constructor(name) {
        (this._name = name), (this._description = ""), (this._img = "");
    }

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short.");
            return;
        }
        this._name = value;
    }

    set description(value) {
        if (value.length < 4) {
            alert("Decription is too short.");
            return;
        }
        this._name = value;
    }

    set img(value) {
        this._img = value;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get img() {
        return this._img;
    }

    img() {
        return this._img;
    }

    describe() {
        return "The " + this._name + " is " + this._description;
    }
}

// Creating Rooms
const DimlyLitRoom = new Room("Dimly Lit Room", "dimroom.jpg");
DimlyLitRoom.description =
    "two tall windows shining light into the room. You have no idea how you got here... You must find a way to escape!";

const UpstairsHall = new Room("Upstairs Hall", "upstairshall.jpg");
UpstairsHall.description = "a long narrow corridor. There must be a staircase around here...";

const MasterBedRoom = new Room("Master Bed Room", "masterbedroom.jpg");
MasterBedRoom.description =
    "a large bed and dresser. You find an old rusty key. What could this be for?...";

const GrandStaircase = new Room("Grand Staircase", "grandstaircase.jpg");
GrandStaircase.description = "down to the main foyer. Time to find a way out of here.";

const LivingRoom = new Room("Living Room", "enchantedchateau.jpg");
LivingRoom.description = "A GHOST!!!";

const FrontEntrance = new Room("Front Entrance", "frontentrance.jpg");
FrontEntrance.description = "a huge door leading out of this place. Let's open it.";

// End room
const ExitRoom = new Room("Exit Room", "enchantedchateau.jpg");
ExitRoom.description = "Exit";

// Creating Items
const DoorKey = new Item("Door Key");
DoorKey.description = "a rusty looking key for a door";
DoorKey.img = "key.jpg";

let currentItem = [];

// Linking Rooms
DimlyLitRoom.linkRoom("north", UpstairsHall);

UpstairsHall.linkRoom("east", MasterBedRoom);
UpstairsHall.linkRoom("west", GrandStaircase);
UpstairsHall.linkRoom("south", DimlyLitRoom);

MasterBedRoom.linkRoom("west", UpstairsHall);

GrandStaircase.linkRoom("east", UpstairsHall);
GrandStaircase.linkRoom("west", LivingRoom);
GrandStaircase.linkRoom("north", FrontEntrance);

FrontEntrance.linkRoom("south", GrandStaircase);
FrontEntrance.linkRoom("north", ExitRoom);


const Ghost = new Character("Ghost");
Ghost.description = "a scary Ghost";
Ghost.description = "i am a ghost";
LivingRoom.character = Ghost;

let directions = ["north", "south", "east", "west"];



function displayInventory(item) {
    let inventorySlot = document.getElementById("inv1");

    // Only check the array when it has something in it or error
    if (item.length > 0) {
        inventorySlot.src = item[0].img;
    } else {
        inventorySlot.src = "";
    }
}


function displayRoomInfo(room) {
    document.getElementById("usertext").classList.add("hidden");

    let directions = ["north", "south", "east", "west"];

    // Set room Image and title
    let image = document.getElementById("roomimg");
    image.src = room.roomImage;
    let label = document.getElementById("imglabel");
    label.innerHTML = "<p>" + room.name + "</p>";

    // If in master bedroom pickup key and set inventory
    if (room.name === "Master Bed Room") {
        currentItem.push(DoorKey);
    }
    displayInventory(currentItem);

    // If character in room display character message
    let occupantMsg = "";
    if (room.character === "") {
        occupantMsg = "";
    } else {
        occupantMsg = "<p>" + room.character.describe() + ". " + room.character.converse() + "</p>";
    }

    // If at front entrance remove input if no key
    if (room.name === "Front Entrance" && currentItem.length < 1) {
        directions = directions.filter(direction => direction !== "north");
    }

    // If escaped, else if died, else display normal room description
    if (room.name === "Exit Room" && currentItem.length > 0) {
        textContent = "<p>" + "YOU ESCAPED!" + "</p>";
        typewriterEffect(textContent);

        document.getElementById("playbutton").classList.remove("hidden");
        document.getElementById("usertext").classList.add("hidden");
    } else if (room.name === "Living Room") {
        textContent = "<p>" + occupantMsg + "YOU DIED!" + "</p>";
        typewriterEffect(textContent);

        document.getElementById("playbutton").classList.remove("hidden");
        document.getElementById("usertext").classList.add("hidden");
    } else {
        textContent = "<p>" + room.describe() + "</p>" + occupantMsg + "<p>" + room.getDetails() + "</p>";
        typewriterEffect(textContent);
        document.getElementById("usertext").focus();
    }

    // Use the updated directions array for command validation
    input(directions);

    setTimeout(function(){ document.getElementById("usertext").classList.remove("hidden"); }, 5000);
}

function input(directions) {
    console.log(directions)
    document.getElementById("usertext").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;

            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command);
                document.getElementById("usertext").value = "";
                displayRoomInfo(currentRoom);
            }
        }
    });
}

function startGame() {
    document.getElementById("usertext").classList.add("hidden");
    currentItem = [];
    currentRoom = DimlyLitRoom;
    displayRoomInfo(currentRoom);

    document.getElementById("playbutton").classList.add("hidden");
    // document.getElementById("usertext").classList.remove("hidden");
    document.getElementById("playbutton").addEventListener("click", startGame);

    input(directions);
    setTimeout(function(){ document.getElementById("usertext").classList.remove("hidden"); }, 5000);
}

startGame();
