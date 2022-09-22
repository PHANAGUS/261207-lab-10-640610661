import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();

    const roomId = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    const result = rooms[roomIdx].messages;
    return res.json({ ok: true, massages: result });
  } else if (req.method === "POST") {
    const rooms = readDB();

    const roomId = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    //read request body
    const text = req.body.text;
    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid text input" });

    //create new id
    const newId = uuidv4();
    const newMassage = {
      messageId: newId,
      text: text,
    };
    // const newMs = rooms[roomIdx].messages;
    // newMs.push(newMassage);
    // rooms[roomIdx].messages = newMs;

    rooms[roomIdx].messages.push(newMassage);

    writeDB(rooms);
    return res.json({ ok: true, massage: newMassage });
  }
}
