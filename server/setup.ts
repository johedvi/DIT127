import superagent from "superagent";

/* Run with 'npx ts-node setup.ts' in terminal */
const request = superagent;

/* Create forum with ID Cooking */
(async () => {
    try{
        const forum1 = {
        title:'Cooking',
        description:'We love to cook food!',
        author:'Adam'
        };
        const post1 = {
        title:'Cooking pasta',
        content:'--------------- 1234',
        };
        const comment1 = {
            author:'Noob Cook',
            content:'--------'
        };
        const f1 = await request.put("localhost:8080/forum").send(forum1);
        const p1 = await request.put(`localhost:8080/forum/${forum1.title}/post`).send(post1);
        //const c1 = await request.put(`localhost:8080/forum/${forum1.title}/post`).send(comment1);

        const forum2 = {
            title:'Gaming',
            description:'We love to game!',
            author:'Gamer1337'
        };
        const post2 = {
            title:'Top games 2013',
            content:'2013',
        };
        const f2 = await request.put("localhost:8080/forum").send(forum2);
        const p2 = await request.put(`localhost:8080/forum/${forum2.title}/post`).send(post2);

        const post3 = {
            title:'Top games 2022',
            content:'2022',
        };
        const p3 = await request.put(`localhost:8080/forum/${forum2.title}/post`).send(post3);




    }catch(e:any){console.error(e);}
})();