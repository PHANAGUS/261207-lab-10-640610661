import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  const rooms = readDB();

  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
  if (roomIdx === -1)
    return res.status(404).json({ ok: false, message: "Invalid room id" });

  const msgIdx = rooms[roomIdx].messages.findIndex(
    (x) => x.messageId === messageId
  );
  if (msgIdx === -1)
    return res.status(404).json({ ok: false, massage: "Invalid massage id" });

  rooms[roomIdx].messages.splice(msgIdx, 1);
  writeDB(rooms);

  return res.json({ ok: true });
}
