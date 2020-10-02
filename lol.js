import * as sdk from "matrix-js-sdk";
const client = sdk.createClient("https://matrix.org");
client.publicRooms(function (err, data) {
  console.log("Public Rooms: %s", JSON.stringify(data));
});
const main = async () => {
  await client.startClient({ initialSyncLimit: 10 });
  client.once("sync", function (state, prevState, res) {
    if (state === "PREPARED") {
      console.log("prepared");
    } else {
      console.log(state);
      process.exit(1);
    }
  });
  const content = {
    body: "message text",
    msgtype: "m.text",
  };
  client.sendEvent("roomId", "m.room.message", content, "", (err, res) => {
    console.log(err);
  });
  client.on("Room.timeline", function (event, room, toStartOfTimeline) {
    if (event.getType() !== "m.room.message") {
      return; // only use messages
    }
    console.log(event.event.content.body);
  });
};
