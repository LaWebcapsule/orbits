import semanticRelease from "semantic-release" ;

semanticRelease({
    // Core options
    branches: [
      "git-actions"
    ],
    repositoryUrl: "https://github.com/LaWebcapsule/Orbits",
}).then((result)=>{
    console.log(result)
})