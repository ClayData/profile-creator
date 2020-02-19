const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const axios = require("axios");



const writeFileAsync = util.promisify(fs.writeFile);

profileGenerator();

async function profileGenerator(){
    try{
    const response = await inquirer.prompt([
        {
            type:"input",
            message:"What is your GitHub username?",
            name:"username"
        },
        {
            type:"input",
            message:"What color do you want your profile to be?",
            name:"background"
        }
])

    const username = response.username;
    const color = response.background;

    gitResult(username, color);
    
    
    }
    catch (err) {
        return console.log(err);
      }
}

function gitResult(name, c){
    const queryUrl = `https://api.github.com/users/${name}`; 
    axios.get(queryUrl).then(function(result){
        
        const info = result.data;
        const userBio = info.bio;
        const followers = info.followers;
        const repos = info.public_repos;
        const location = info.location;
        const blog = info.blog;
        const following = info.following;
        const profPic = info.avatar_url;
        const gitLink = info.html_url;
        

        const starredUrl = `https://api.github.com/users/${name}/starred`;
    axios.get(starredUrl).then(function(response){
       const starNum = response.data.length;
       

       const html = 
       `
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
           <link rel="stylesheet" href="styles.css">
           <title>Document</title>
        <style>
        body {background-color: ${c};}
        
        </style>
       </head>
       <body>
        <div class="container">
           <div class="row"> 
           <div class="jumbotron jumbotron-fluid container">
               <div class="container">
                 <h1 class="display-4"></h1>
                 <p class="lead"></p>
              <div class="row">
               <div class="col-4"></div>   
                <div class="col-5">
                 <img src="${profPic}">
                </div> 
              </div>
              <div class="row">
              <div class="col-5"></div>  
                <div class="col-3">
                 <h2>${name}</h2>
                </div>
              </div>  
              <div class="row">
                <div class="col-5"></div>  
                <div class="col-3">
                 <p>${userBio}</p>
                 </div>
              </div>   
              <div class="row">
                <div class="col-1"></div>  
                <div class="col-3">
                    <a href="${blog}">Blog</a>
                </div>   
                <div class="col-2"></div>
                <div class="col-4">
                    <a href="${gitLink}">GitHub</a>
                </div>
                <div class="col-2">
                    <a href="https://www.google.com/maps/place/${location}/">St. Paul Minnesota</a>
                </div>
             </div>
                </div>
             </div>
           </div>
           <div class="row">
               <div class="col-2"></div>
              <div class="col-3"> 
                <div class="card text-center" style="width: 14rem;">
                <div class="card-body">
                    <h5 class="card-title">Public Repositories</h5>
                    <p class="card-text">${repos}</p>
                </div>
                </div>
              </div>
              <div class="col-2"></div>
              <div class="col-3">
                <div class="card text-center" style="width: 14rem;">
                <div class="card-body">
                    <h5 class="card-title">Followers</h5>
                    <p class="card-text">${followers}</p>
                </div>
                </div>
                </div>
            </div>
             <div class="row">
                <div class="col-2"></div>
             <div class="col-3">   
                <div class="card text-center" style="width: 14rem;">
                <div class="card-body">
                    <h5 class="card-title">GitHub Stars</h5>
                    <p class="card-text">${starNum}</p>
                </div>
                </div>
            </div>  
            <div class="col-2"></div>
            <div class="col-3">
                <div class="card text-center" style="width: 14rem;">
                <div class="card-body">
                    <h5 class="card-title">Following</h5>
                    <p class="card-text">${following}</p>
                </div>
                </div>
            </div>
        </div>
       </div>
</body>
</html>
    `   ;

        writeFileAsync("index.html", html)

       
    
   
});

    })

};