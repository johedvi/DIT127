import superagent from "superagent";

/* Run with 'npx ts-node setup.ts' in terminal */
const request = superagent;

/* Create forum with ID Cooking */
(async () => {
    try{
        const forumToCreate = {
        title:'Cooking',
        description:'We love to cook food!',
        owner:'Adam'
        };
        const postToCreate = {
        
        };
        const res1 = await request.put("localhost:8080/forum").send(forumToCreate);
        console.log(res1.statusCode);
        /*const res2 = await request.put(`localhost:3000/forum${forumToCreate.title}/post`).send(postToCreate);
        console.log(res2.statusCode);*/
    }catch(e:any){console.error(e);}
})();