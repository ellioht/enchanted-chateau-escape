// Class declarations
class Room {
    constructor(name,img) {
        this._name = name;
        this._roomImage = img;
        this._description = "";
        this._linkedRooms = {};
        this._character = "";
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
        return "Looking around the " + this._name + " you can see " + this._description;
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
        (this._name = name), (this._description = "");
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

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    describe() {
        return "The " + this._name + " is " + this._description;
    }
}

// Creating Rooms
const DimlyLitRoom = new Room("Dimly Lit Room", "dimroom.jpg");
DimlyLitRoom.description =
    "A large storage room on the top floor with a single lightbulb struggling to light the entire room";

const UpstairsHall = new Room("Upstairs Hall", "upstairshall.jpg");
UpstairsHall.description = "A long thin hall with a window at the end";

const MasterBedRoom = new Room("Master Bed Room", "masterbedroom.jpg");
MasterBedRoom.description =
    "The largest bedroom in the building with a large bed covered in silk sheets and an old fireplace";

const GrandStaircase = new Room("Grand Staircase", "grandstaircase.jpg");
GrandStaircase.description = "A grand staircase that leads to the main foyer of the bulding";

// Linking Rooms
DimlyLitRoom.linkRoom("north", UpstairsHall);

UpstairsHall.linkRoom("east", MasterBedRoom);
UpstairsHall.linkRoom("west", GrandStaircase);
UpstairsHall.linkRoom("south", DimlyLitRoom);

MasterBedRoom.linkRoom("west", UpstairsHall);

GrandStaircase.linkRoom("east", UpstairsHall);


function displayRoomInfo(room) {
    // Set room Image
    let image = document.getElementById("roomimg")
    image.src = room.roomImage;

    let label = document.getElementById("imglabel")
    label.innerHTML = "<p>" + room.name + "</p>";

    let occupantMsg = "";
    if (room.character === "") {
        occupantMsg = "";
    } else {
        occupantMsg = "<p>" + room.character.describe() + ". " + room.character.converse() + "</p>";
    }

    textContent = "<p>" + room.describe() + "</p>" + occupantMsg + "<p>" + room.getDetails() + "</p>";

    typewriterEffect(textContent);
    document.getElementById("usertext").focus();
}

function startGame() {
    currentRoom = DimlyLitRoom;
    displayRoomInfo(currentRoom);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            command = document.getElementById("usertext").value;
            const directions = ["north", "south", "east", "west"];
            if (directions.includes(command.toLowerCase())) {
                currentRoom = currentRoom.move(command);
                document.getElementById("usertext").value = "";
                displayRoomInfo(currentRoom);
            } else {
                document.getElementById("usertext").value = "";
                alert("that is not a valid command please try again");
            }
        }
    });
}

startGame();
