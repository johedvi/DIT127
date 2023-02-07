import { Forum } from "../model/Forum";
import * as SuperTest from "supertest";
import { app } from "../index";
const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const t = "Cooking";
    const d = "For all of us who love to cook!";
    const o = "John Bull";
    const jsonSend = {"title" : t, "description" : d, "owner" : o};
    const res1 = await request.put("/forum").send(jsonSend);
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.title).toEqual(t);
    expect(res1.body.description).toEqual(d);
    expect(res1.body.owner).toEqual(o);
    const res2 = await request.get("/forum");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((forum : Forum) => forum.title)).toContain(t);
    expect(res2.body.map((forum : Forum) => forum.description)).toContain(d);
    expect(res2.body.map((forum : Forum) => forum.owner)).toContain(o);
});