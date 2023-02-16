import superagent from "superagent";

/* Run with 'npx ts-node setup.ts' in terminal */
const request = superagent;

/* Create forum with ID Cooking */
(async () => {
    try{
        const forum1 = {
        title:'Cooking',
        description:'We love to cook food!',
        owner:'Adam'
        };
        const post1 = {
        title:'Cooking pasta',
        content:'--------------- 1234',
        };
        const comment1 = {
            author:'Noob Cook',
            content:'--------'
        }
        const f1 = await request.put("localhost:8080/forum").send(forum1);
        console.log(f1.statusCode);
        const p1 = await request.put(`localhost:8080/forum/${forum1.title}/post`).send(post1);
        console.log(p1.statusCode);

        const forum2 = {
            title:'Gaming',
            description:'We love to game!',
            owner:'Gamer1337'
        };
        const post2 = {
            title:'Top games',
            content:'2013',
        };
        const f2 = await request.put("localhost:8080/forum").send(forum2);
        console.log(f2.statusCode);
        const p2 = await request.put(`localhost:8080/forum/${forum2.title}/post`).send(post2);
        console.log(p2.statusCode);

        const post3 = {
            title:'Top games',
            content:'2022',
        };
        const p3 = await request.put(`localhost:8080/forum/${forum2.title}/post`).send(post3);
        console.log(p3.statusCode);




    }catch(e:any){console.error(e);}
})();